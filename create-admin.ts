import { createClient } from "@libsql/client/web";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin } from "better-auth/plugins";

import { drizzle } from "drizzle-orm/libsql/web";
import * as schema from "./src/lib/server/db/schema";

if (!process.env.TURSO_DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!process.env.TURSO_AUTH_TOKEN)
	throw new Error("TURSO_AUTH_TOKEN is not set");

// const client = new Database(env.DATABASE_URL);

const client = createClient({
	url: process.env.TURSO_DATABASE_URL,
	authToken: process.env.TURSO_AUTH_TOKEN,
});
const db = drizzle({
	client,
});

export const auth = betterAuth({
	emailAndPassword: { enabled: true },
	database: drizzleAdapter(db, { provider: "sqlite", schema: schema }),
	plugins: [admin()],
});

await auth.api.createUser({
	body: {
		email: process.env.ADMIN_EMAIL!,
		name: process.env.ADMIN_NAME!,
		password: process.env.ADMIN_PASSWORD!,
		role: "admin",
	},
});
