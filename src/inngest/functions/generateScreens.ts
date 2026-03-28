import { BASE_VARIABLES, FrameType, THEME_LIST } from '@/lib/constants';
import { inngest } from '../client';
import { generateText, Output, stepCountIs } from 'ai';
import { google } from '@/server/google';
import z from 'zod';
import { ANALYSIS_PROMPT, GENERATION_SYSTEM_PROMPT } from '@/lib/prompt';
import { db } from '@/server/db';
import { projects } from '@/server/schema';
import { frames as framesTable } from '@/server/schema';
import { and, eq } from 'drizzle-orm';
import { unsplashTool } from './tools/unsplashTool';

const AnalysisSchema = Output.object({
	schema: z.object({
		theme: z.string().describe('The specific visual Theme Id'),
		screens: z
			.array(
				z.object({
					id: z
						.string()
						.describe('Unique Identifier for the screen using kebab case'),
					name: z.string().describe('Short, descriptive name of the screen'),
					purpose: z
						.string()
						.describe(
							'One Clear sentence explaining what this screen accomplishes for the user and its role in the design',
						),
					visualDescription: z
						.string()
						.describe(
							"A dense, high fidelity visual directive (like an image generation prompt). describe the layout, specific data examples (eg. 'Oct-Mar', component heirarchy, and physical attirbutes (e.g. 'Chuncky Cards', 'Floaring header', 'Floaring Action Button', 'Bottom Navigation', Header with user avatar.",
						),
				}),
			)
			.min(1)
			.max(4),
	}),
});

export const generateScreens = inngest.createFunction(
	{ id: 'generate-screen' },
	{ event: 'test/generate.screens' },
	async ({ event, step, publish }) => {
		const {
			userId,
			projectId,
			prompt,
			frames,
			theme: existingTheme,
		} = event.data;
		const CHANNEL = `user:${userId}`;
		console.log('INSIDE INNGEST RUNNING EVENT');

		await publish({
			channel: CHANNEL,
			topic: 'generation.start',
			data: {
				status: 'running',
				projectId,
			},
		});

		const isRegeneration = Array.isArray(frames) && frames.length > 0;
		const analysis = await step.run('analyze-and-plan', async () => {
			await publish({
				channel: CHANNEL,
				topic: 'analysis.start',
				data: {
					status: 'analyzing',
					projectId,
				},
			});
			const contextHtml = isRegeneration
				? frames
						.slice(0, 4)
						.map((frame: FrameType) => frame.htmlContent)
						.join('\n')
				: '';
			const analysisPrompt = isRegeneration
				? `
                USER REQUEST: ${prompt}
                SELECTED THEME: ${existingTheme}
                CONTEXT HTML: ${contextHtml}`
				: `
                USER PROMPT: ${prompt}`;

			const { output } = await generateText({
				model: google('gemini-2.5-flash'),
				output: AnalysisSchema,
				prompt: analysisPrompt,
				system: ANALYSIS_PROMPT,
			});

			const themeToUse = isRegeneration ? existingTheme : output.theme;

			if (!isRegeneration) {
				await db
					.update(projects)
					.set({ theme: themeToUse })
					.where(and(eq(projects.id, projectId), eq(projects.userId, userId)));
			}

			await publish({
				channel: CHANNEL,
				topic: 'analysis.complete',
				data: {
					status: 'generating',
					totalScreens: output.screens.length,
					screens: output.screens,
					theme: themeToUse,
					projectId,
				},
			});
			return { ...output, themeToUse };
		});

		for (let i = 0; i < analysis.screens.length; i++) {
			const screenPlan = analysis.screens[i];

			const selectedTheme = THEME_LIST.find(
				(t) => t.id === analysis.themeToUse,
			);

			const fullThemeCSS = `
                ${BASE_VARIABLES}
                ${selectedTheme?.style ?? ''}
            `;

			await step.run(`generate-screen-${i}`, async () => {
				const result = await generateText({
					model: google('gemini-2.5-flash'),
					prompt: `
                - Screen ${i + 1}/${analysis.screens.length}

                Screen ID: ${screenPlan.id}
                Screen Name: ${screenPlan.name}
                Screen Purpose: ${screenPlan.purpose}

                VISUAL DESCRIPTION:
                ${screenPlan.visualDescription}

                THEME STYLE (Use these variables for colors):
                ${fullThemeCSS}

                CRITICAL REQUIREMENTS:

                1. Generate ONLY raw HTML markup for this mobile app screen using Tailwind CSS.
                2. Use Tailwind classes for layout, spacing, typography, shadows.
                3. Use theme CSS variables ONLY for color properties.
                4. All content must be inside a single root <div>.
                5. Do not include markdown, comments, <html>, <body>, or <head>.
                6. Ensure the layout grows naturally so iframe scrollHeight works.

                Generate the complete HTML now.
                `.trim(),
					system: GENERATION_SYSTEM_PROMPT,
					stopWhen: stepCountIs(5),
					tools: {
						searchUnsplash: unsplashTool,
					},
				});

				let finalHtml = result.text ?? '';

				// Remove markdown wrappers
				finalHtml = finalHtml.replace(/```(html)?/g, '');

				// Extract only root div
				const match = finalHtml.match(/<div[\s\S]*<\/div>/);
				if (match) finalHtml = match[0];

				// Insert frame with Drizzle
				const [frame] = await db
					.insert(framesTable)
					.values({
						projectId,
						title: screenPlan.name,
						htmlContent: finalHtml,
					})
					.returning();

				await publish({
					channel: CHANNEL,
					topic: 'frame.created',
					data: {
						frame,
						screenId: screenPlan.id,
						projectId,
					},
				});

				return {
					success: true,
					frame,
				};
			});
		}

		await publish({
			channel: CHANNEL,
			topic: 'generation.complete',
			data: {
				status: 'completed',
				projectId,
			},
		});
	},
);
