/*
import { eq, not } from "drizzle-orm";
import z from "zod";
import { command, form, query } from "$app/server";
import { db } from "$lib/server/db";
import * as tables from "$lib/server/db/schema/schema";

export const getTodos = query(async () => {
	const todos = await db.select().from(tables.todo);
	return todos;
});

export const createTodo = form(
	z.object({
		text: z.string().nonempty(),
	}),
	async ({ text }) => {
		await db.insert(tables.todo).values({ text: text });
		await getTodos().refresh();
	},
);

export const updateTodo = command(z.number(), async (id) => {
	await db
		.update(tables.todo)
		.set({ isCompleted: not(tables.todo.isCompleted) })
		.where(eq(tables.todo.id, id));
	await getTodos().refresh();
});

export const deleteTodo = command(z.number(), async (id) => {
	await db.delete(tables.todo).where(eq(tables.todo.id, id));
	await getTodos().refresh();
});
*/
