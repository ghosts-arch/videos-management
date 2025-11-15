// See https://svelte.dev/docs/kit/types#app.d.ts

import type { auth } from "$lib/auth";
import type { Session } from "better-auth";

type User = typeof auth.$Infer.Session.user;
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			session?: Session;
			user?: User;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}
