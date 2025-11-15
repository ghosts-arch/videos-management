import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql/web";
import { env } from "$env/dynamic/private";

if (!env.TURSO_DATABASE_URL) throw new Error("DATABASE_URL is not set");
if (!env.TURSO_AUTH_TOKEN) throw new Error("TURSO_AUTH_TOKEN is not set");

// const client = new Database(env.DATABASE_URL);
console.log(env.TURSO_DATABASE_URL);

const client = createClient({
	url: env.TURSO_DATABASE_URL,
	authToken: env.TURSO_AUTH_TOKEN,
});
export const db = drizzle({
	client,
});
