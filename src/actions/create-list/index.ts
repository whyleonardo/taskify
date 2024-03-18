"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { CreateList } from "./schema"
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

	const { title, boardId } = data

	let list

	try {
		const board = await db.board.findUnique({
			where: {
				id: boardId,
				orgId,
			},
		})

		const lastList = await db.list.findFirst({
			where: { boardId },
			orderBy: { order: "desc" },
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		if (!board) {
			return {
				error: "Board not found!",
			}
		}

		list = await db.list.create({
			data: {
				title,
				boardId,
				order: newOrder,
			},
		})

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: list.id,
			entityTitle: list.title,
			entityType: ENTITY_TYPE.LIST,
		})
	} catch (error) {
		return {
			error: "Failed to create",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return {
		data: list,
	}
}

export const createList = createSafeAction(CreateList, handler)
