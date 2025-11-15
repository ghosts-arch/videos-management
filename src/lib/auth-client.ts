import { env } from "$env/dynamic/private";
import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";

export const { signIn, useSession, signOut } = createAuthClient({
	baseURL: env.BETTER_AUTH_URL,
	plugins: [adminClient()],
});
