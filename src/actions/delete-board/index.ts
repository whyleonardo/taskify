"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { createAuditLog } from "../create-audit-log"
import { DeleteBoard } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { decreaseAvailableCount } from "@/lib/org-limit"
import { auth } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { checkSubscription } from "@/lib/subscription"

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const isPro = await checkSubscription()

	const { id } = data

	let board

	try {
		// eslint-disable-next-line no-unused-vars
		board = await db.board.delete({
			where: {
				orgId,
				id,
			},
		})

		if (!isPro) {
			await decreaseAvailableCount()
		}

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: board.id,
			entityTitle: board.title,
			entityType: ENTITY_TYPE.BOARD,
		})
	} catch (error) {
		return {
			error: "Failed to delete",
		}
	}

	revalidatePath(`/org/${orgId}`)
	redirect(`/org/${orgId}`)

	return {}
}

export const deleteBoard = createSafeAction(DeleteBoard, handler)
