import { redirect } from "@sveltejs/kit";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { db } from "./server/db";

export const auth = betterAuth({
	emailAndPassword: { enabled: true },
	database: drizzleAdapter(db, { provider: "sqlite", schema: schema }),
	plugins: [sveltekitCookies(getRequestEvent), admin()],
});

export const requireLogin = () => {
	const { locals } = getRequestEvent();
	if (!locals.session) {
		redirect(302, "/");
	}
};
