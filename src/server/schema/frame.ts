import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { projects } from './project';

export const frames = pgTable('frames', {
	id: text('id')
		.$defaultFn(() => createId())
		.primaryKey(),

	projectId: text('project_id')
		.notNull()
		.references(() => projects.id, { onDelete: 'cascade' }),

	title: text('title').notNull(),
	htmlContent: text('html_content').notNull(),

	createdAt: timestamp('created_at').notNull().defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
});
