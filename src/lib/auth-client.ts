import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";

export const { signIn, useSession } = createAuthClient({
	baseURL: "http://localhost:5173/",
	plugins: [adminClient()],
});
