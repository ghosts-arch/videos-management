import { error, redirect } from "@sveltejs/kit";
import { z } from "zod";
import { form, getRequestEvent, query } from "$app/server";
import { auth } from "$lib/auth";
import { getSession } from "./auth.remote";

async function isAdmin() {
	const session = await getSession();
	if (session?.user.role !== "admin") {
		error(401, "Non autorisé");
	}
}

export const getUsers = query(async () => {
	// await requireAuth();
	await isAdmin();
	const users = await auth.api.listUsers({
		query: {},
		headers: getRequestEvent().request.headers,
	});
	console.log("after");
	return users.users;
});

export const createUser = form(
	z.object({
		email: z.email(),
		name: z.string(),
		password: z.string(),
	}),
	async ({ email, name, password }) => {
		// await requireAuth();
		await isAdmin();
		await auth.api.createUser({
			body: { email, name, password, role: "user" },
		});
		redirect(303, "/admin");
	},
);
