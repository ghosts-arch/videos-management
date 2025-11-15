import { error, redirect } from "@sveltejs/kit";
import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { command, form, query } from "$app/server";
import { db } from "$lib/server/db";
import * as schema from "$lib/server/db/schema";
import { getSession } from "./auth.remote";

async function requireAuth() {
	return (await getSession())?.user ?? error(401, "Non autorisé");
}

export const getVideosInformations = query(async () => {
	// await requireAuth();
	const videoInformations = await db
		.select()
		.from(schema.videoInformations)
		.orderBy(desc(schema.videoInformations.created_at));
	return videoInformations;
});

export const getVideoInformations = query(
	z.pipe(
		z.string(),
		z.transform((id) => Number(id)),
	),
	async (id: number) => {
		// await requireAuth();
		const [videoInformations] = await db
			.select()
			.from(schema.videoInformations)
			.where(eq(schema.videoInformations.id, id));
		if (!videoInformations) {
			error(404, "Videos Informations not found");
		}
		return videoInformations;
	},
);

export const updateVideoInformations = form(
	z.object({
		id: z.pipe(
			z.string(),
			z.transform((id) => Number(id)),
		),
		live: z.string(),
		title: z.string(),
		subtitle: z.string(),
		after: z.number(),

		notes: z.string(),
	}),
	async ({ id, live, title, subtitle, after, notes }) => {
		// await requireAuth();
		await db
			.update(schema.videoInformations)
			.set({ live, title, subtitle, after, notes })
			.where(eq(schema.videoInformations.id, id));
		// getVideoInformations().refresh();
		redirect(303, "/dashboard");
	},
);

export const createVideoInformations = form(
	z.object({
		live: z.string().nonempty(),
		title: z.string().nonempty(),
		subtitle: z.string().nonempty(),
		after: z.number().nonoptional(),
		notes: z.string(),
	}),
	async ({ live, title, subtitle, after, notes }) => {
		await requireAuth();
		await db
			.insert(schema.videoInformations)
			.values({ live, title, subtitle, after, notes });
		// getVideoInformations().refresh();
		redirect(303, "/dashboard");
	},
);

export const updateStatus = command(
	z.object({
		id: z.pipe(
			z.string(),
			z.transform((id) => Number(id)),
		),
		newStatus: z.literal(["à faire", "en cours", "terminée"]),
	}),
	async ({ id, newStatus }) => {
		// await requireAuth();
		await db
			.update(schema.videoInformations)
			.set({ status: newStatus })
			.where(eq(schema.videoInformations.id, id));
	},
);
