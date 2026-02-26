import { Elysia } from 'elysia';
import { db } from '@/server/db';
import { users } from '../schema/index';
import { z } from 'zod';

export const userRouter = new Elysia({ prefix: '/users' }).post(
	'/onboard',
	async ({ body }) => {
		console.log('INSERTING USER INSERTING USER');
		const { clerkId, email, firstName, lastName, imageUrl } = body;
		const values: typeof users.$inferInsert = {
			clerkId,
			email,
		};

		if (firstName !== undefined) values.firstName = firstName;
		if (lastName !== undefined) values.lastName = lastName;
		if (imageUrl !== undefined) values.imageUrl = imageUrl;

		try {
			await db
				.insert(users)
				.values(values)
				.onConflictDoUpdate({
					target: users.clerkId,
					set: {
						email,
						...(firstName !== undefined && { firstName }),
						...(lastName !== undefined && { lastName }),
						...(imageUrl !== undefined && { imageUrl }),
						updatedAt: new Date(),
					},
				});

			console.log('USER INSERTED USER INSERTED');
			return { success: true };
		} catch (error) {
			console.error('DB ERROR:', error);
			throw error;
		}
		return { success: true };
	},
	{
		body: z.object({
			clerkId: z.string(),
			email: z.string().email(),
			imageUrl: z.string().optional(),
			firstName: z.string().optional(),
			lastName: z.string().optional(),
		}),
	},
);
