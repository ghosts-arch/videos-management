import { redirect } from "@sveltejs/kit";
import z from "zod";
import { form, getRequestEvent, query } from "$app/server";
import { auth } from "$lib/auth";

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
			redirect(303, "/dashboard");
		}
	},
);

export const getSession = query(() => {
	return auth.api.getSession({
		headers: getRequestEvent().request.headers,
	});
});
