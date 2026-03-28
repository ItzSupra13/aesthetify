import { Elysia } from 'elysia';
import { db } from '@/server/db';
import { projects } from '../schema/index';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { authMiddleware } from './middlewares';
import { generateProjectName } from '@/lib/generateProjectName';
import { status } from 'elysia';
import { inngest } from '@/inngest/client';

export const projectRouter = new Elysia({ prefix: '/projects' })
	.use(authMiddleware)
	.get('/', async ({ user }) => {
		console.log('INSIDE GET PROJECTS ENDPOINT');
		const userProjects = await db
			.select({
				id: projects.id,
				title: projects.title,
				createdAt: projects.createdAt,
				thumbnail: projects.thumbnail,
			})
			.from(projects)
			.where(eq(projects.userId, user.id))
			.orderBy(desc(projects.createdAt))
			.limit(10);

		console.log('MY PROJECTS FINISHED GETTING');
		return userProjects;
	})
	.get(
		'/:id',
		async ({ params, user }) => {
			console.log("GETTING FRAMES AND PROJECT")
			const project = await db.query.projects.findFirst({
				where: eq(projects.id, params.id),
				with: {
					frames: true,
				},
			});

			if (!project || project.userId !== user.id) {
				return status(404, { message: 'Project not found' });
			}
			console.log("GOT PROJECT AND FRAMES!")
			return project;
		},
		{
			params: z.object({
				id: z.string(),
			}),
		},
	)
	.post(
		'/',
		async ({ body, user }) => {
			const projectName = await generateProjectName(body);
			console.log('GOT PROJECT NAME GOT PROJECT NAME, ', projectName);
			const { description } = body;

			console.log('INSERTING PROJECT INSERTING PROJECT');
			const [project] = await db
				.insert(projects)
				.values({
					userId: user.id,
					title: projectName,
					theme: description,
					//   status: "provisioning"
				})
				.returning();
			
			console.log('INSERTED PROJECT!');
			try {
				console.log("RUNNING INNGEST WITH PROMPT: ", body.description);
				await inngest.send({
					name: "test/generate.screens",
					data: {
						userId: user.id,
						projectId: project.id,
						prompt: body.description,
					}
				})
			}
			catch (e) {
				console.error("INNGEST ERROR: ", e);
			}
			return {
				id: project.id,
			};
		},
		{
			body: z.object({
				description: z.string(),
			}),
		},
	);
