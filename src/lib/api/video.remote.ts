import { z } from "zod";
import { form, query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { redirect } from "@sveltejs/kit";
import { desc } from "drizzle-orm";
export const getVideoInformations = query(async () => {
	const videoInformations = await db
		.select()
		.from(schema.videoInformations)
		.orderBy(desc(schema.videoInformations.created_at));
	return videoInformations;
});

export const createVideoInformations = form(
	z.object({
		live: z.string().nonempty(),
		title: z.string().nonempty(),
		subtitle: z.string().nonempty(),
		after: z.number().nonoptional(),
		notes: z.string(),
	}),
	async ({ live, title, subtitle, after, notes }) => {
		await db
			.insert(schema.videoInformations)
			.values({ live, title, subtitle, after, notes });
		// getVideoInformations().refresh();
		redirect(303, "/");
	},
);
