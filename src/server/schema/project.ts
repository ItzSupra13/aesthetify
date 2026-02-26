import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from "@paralleldrive/cuid2";
import { users } from './user';

export const projects = pgTable('projects', {
  id: text('id').$defaultFn(() => createId()).primaryKey(),

  userId: text('user_id')
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),

  title: text('title').notNull(),
  theme: text('theme'),
    thumbnail: text('thumbnail'),
//   status: text('status').notNull()

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});
