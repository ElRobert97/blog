import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { integer, text } from "drizzle-orm/sqlite-core";
import { sqliteTable } from "drizzle-orm/sqlite-core";

export const postsTable = sqliteTable("posts", {
  id: text("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull().unique(),
  excerpt: text("excerpt").notNull().unique(),
  content: text("content").notNull().unique(),
  coverImageUrl: text("cover_image_url").notNull().unique(),
  published: integer("published", { mode: "boolean" }).notNull(),
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
  author: text("author").notNull(),
});

export type PostsTableSelectMode = InferSelectModel<typeof postsTable>;
export type PostsTableInsertMode = InferInsertModel<typeof postsTable>;
