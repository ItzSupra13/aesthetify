import { Elysia } from 'elysia';
import { db } from '@/server/db';
import { projects } from '../schema/index';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import { users } from '@/server/schema/user';
import { authMiddleware } from './middlewares';
import { generateProjectName } from '@/lib/generateProjectName';
import { status } from 'elysia';

export const projectRouter = new Elysia({ prefix: '/projects' })
	.use(authMiddleware)
	.get('/', async ({ clerkUserId }) => {
		console.log('INSIDE GET ENDPOINT');
		if (!clerkUserId) {
			throw new Error('Unauthorized');
		}
		const user = await db.query.users.findFirst({
			where: eq(users.clerkId, clerkUserId),
		});
		if (!user) {
			throw new Error('User not found in database');
		}
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

		console.log('MY PROJECTS:', userProjects);
		return userProjects;
	})
	.get(
		'/:id',
		async ({ params, clerkUserId }) => {
			console.log("GETTING FRAMES AND PROJECT")
			const user = await db.query.users.findFirst({
				where: eq(users.clerkId, clerkUserId),
			});

			if (!user) {
				throw new Error('User not found');
			}

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
		async ({ body, clerkUserId }) => {
			// console.log(
			// 	'GETTING PROJECT NAME GETTING PROJECT NAME for user id, ',
			// 	clerkUserId,
			// );

			const projectName = await generateProjectName(body);
			// console.log('GOT PROJECT NAME GOT PROJECT NAME, ', projectName);
			const { description } = body;

			// console.log('INSERTING PROJECT INSERTING PROJECT');
			const user = await db.query.users.findFirst({
				where: eq(users.clerkId, clerkUserId),
			});

			if (!user) {
				throw new Error('User not found in database');
			}
			const [project] = await db
				.insert(projects)
				.values({
					userId: user.id,
					title: projectName,
					theme: description,
					//   status: "provisioning"
				})
				.returning();

			// start inngest server
			console.log('INSERTED PROJECT!');
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
