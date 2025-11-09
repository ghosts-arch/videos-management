import { betterAuth } from "better-auth";
import { db } from "./server/db";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { sveltekitCookies } from "better-auth/svelte-kit";
import { getRequestEvent } from "$app/server";
import * as schema from "$lib/server/db/schema";
import { admin } from "better-auth/plugins";
export const auth = betterAuth({
	emailAndPassword: { enabled: true },
	database: drizzleAdapter(db, { provider: "sqlite", schema: schema }),
	plugins: [sveltekitCookies(getRequestEvent), admin()],
});
