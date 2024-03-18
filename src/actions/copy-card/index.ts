"use server"

import { revalidatePath } from "next/cache"

import { CopyCard } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { list } from "unsplash-js/dist/methods/photos"

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const { id, boardId } = data

	let card

	try {
		const cardToCopy = await db.card.findUnique({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
		})

		if (!cardToCopy) {
			return {
				error: "Card not found!",
			}
		}

		const lastCard = await db.card.findFirst({
			where: {
				listId: cardToCopy.listId,
			},
			orderBy: { order: "desc" },
			select: { order: true },
		})

		const newOrder = lastCard ? lastCard.order + 1 : 1

		// eslint-disable-next-line no-unused-vars
		card = await db.card.create({
			data: {
				title: `${cardToCopy.title} - Copy`,
				order: newOrder,
				description: cardToCopy.description,
				listId: cardToCopy.listId,
			},
		})
	} catch (error) {
		return {
			error: "Failed to delete",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: card }
}

export const copyCard = createSafeAction(CopyCard, handler)
