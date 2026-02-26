import { relations } from "drizzle-orm";
import { users } from "./user";
import { projects } from "./project";
import { frames } from "./frame";

export const usersRelations = relations(users, ({ many }) => ({
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  user: one(users, {
    fields: [projects.userId],
    references: [users.id],
  }),
  frames: many(frames),
}));

export const framesRelations = relations(frames, ({ one }) => ({
  project: one(projects, {
    fields: [frames.projectId],
    references: [projects.id],
  }),
}));
