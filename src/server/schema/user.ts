import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from "@paralleldrive/cuid2";

export const users = pgTable('users', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),
  clerkId: text('clerk_id').notNull().unique(),

  email: text('email').notNull().unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  imageUrl: text('image_url'),

  credits: integer('credits').notNull().default(150),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
