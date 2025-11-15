import { adminClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/svelte";

export const { signIn, useSession, signOut } = createAuthClient({
	plugins: [adminClient()],
});
