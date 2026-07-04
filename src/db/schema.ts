import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const links = sqliteTable("links", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    slug: text("slug").notNull().unique(),
    url: text("url").notNull(),
    clicks: integer("clicks").default(0).notNull(),
    createdAt: integer("created_at").default(sql`(strftime('%s', 'now'))`).notNull(),
    expiresAt: integer("expires_at").default(sql`(strftime('%s', 'now', '+7 days'))`).notNull()
})