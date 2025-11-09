import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const videoInformations = sqliteTable("informations", {
	id: integer("id").primaryKey(),
	live: text("live").notNull(),
	title: text("title").notNull(),
	subtitle: text("subtitle").notNull(),
	after: integer("after").notNull(),
	notes: text("notes"),
	created_at: integer("created_at", { mode: "timestamp" }).default(
		sql`(CURRENT_TIMESTAMP)`,
	),
});
