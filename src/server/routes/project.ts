import { Elysia } from 'elysia';
import { db } from '@/server/db';
import { projects } from '../schema/index';
import { z } from 'zod';
import { eq } from "drizzle-orm";
import { users } from '@/server/schema/user';
import { authMiddleware } from './middlewares';
import { generateProjectName } from '@/lib/generateProjectName';

export const projectRouter = new Elysia({ prefix: '/projects' })
	.use(authMiddleware)
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
