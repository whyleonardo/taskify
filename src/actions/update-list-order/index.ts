"use server"

import { revalidatePath } from "next/cache"

import { UpdateListOrder } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const { items, boardId } = data

	let lists

	try {
		const transaction = items.map((list) =>
			db.list.update({
				where: {
					id: list.id,
					board: {
						orgId,
					},
				},
				data: {
					order: list.order,
				},
			}),
		)

		lists = await db.$transaction(transaction)
	} catch (error) {
		return {
			error: "Failed to create",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: lists,
	}
}

export const updateListOrder = createSafeAction(UpdateListOrder, handler)
