"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { UpdateCard } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const { id, boardId, ...values } = data

	let card

	try {
		card = await db.card.update({
			where: {
				id,
				list: {
					board: {
						orgId,
					},
				},
			},
			data: {
				...values,
			},
		})

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: card.id,
			entityTitle: card.title,
			entityType: ENTITY_TYPE.CARD,
		})
	} catch (error) {
		return {
			error: "Failed to update",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: card,
	}
}

export const updateCard = createSafeAction(UpdateCard, handler)
