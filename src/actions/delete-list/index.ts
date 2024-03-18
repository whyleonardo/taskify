"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { DeleteList } from "./schema"
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

	const { id, boardId } = data

	let list

	try {
		// eslint-disable-next-line no-unused-vars
		list = await db.list.delete({
			where: {
				boardId,
				id,
				board: {
					orgId,
				},
			},
		})

		await createAuditLog({
			action: ACTION.DELETE,
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
		})
	} catch (error) {
		return {
			error: "Failed to delete",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: list }
}

export const deleteList = createSafeAction(DeleteList, handler)
