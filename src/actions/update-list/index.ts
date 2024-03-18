"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { UpdateList } from "./schema"
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

	const { title, id, boardId } = data

	let list

	try {
		list = await db.list.update({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			data: {
				title,
			},
		})

		await createAuditLog({
			action: ACTION.UPDATE,
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
		})
	} catch (error) {
		return {
			error: "Failed to update",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: list,
	}
}

export const updateList = createSafeAction(UpdateList, handler)
