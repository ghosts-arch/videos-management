import { form, getRequestEvent, query } from "$app/server";
import { auth } from "$lib/auth";
import { redirect } from "@sveltejs/kit";
import z from "zod";

export const getSession = query(async () => {
	return await auth.api.getSession({
		headers: getRequestEvent().request.headers,
	});
});

async function requireAuth() {
	const session = await getSession();
	console.log(session);
	if (!session?.user) {
		redirect(307, "/auth/login");
	}
	return session?.user;
}

export const getUser = query(async () => {
	return await requireAuth();
});

export const login = form(
	z.object({
		email: z.string(),
		password: z.string().check(z.minLength(8)),
	}),
	async ({ email, password }) => {
		const response = await auth.api.signInEmail({
			body: { email, password },
			asResponse: true,
		});
		if (response.ok) {
			redirect(303, "/");
		}
	},
);
