"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { CopyList } from "./schema"
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
		const listToCopy = await db.list.findUnique({
			where: {
				id,
				boardId,
				board: {
					orgId,
				},
			},
			include: {
				cards: true,
			},
		})

		if (!listToCopy) {
			return {
				error: "List not found!",
			}
		}

		const lastList = await db.list.findFirst({
			where: {
				boardId,
			},
			orderBy: { order: "desc" },
			select: { order: true },
		})

		const newOrder = lastList ? lastList.order + 1 : 1

		// eslint-disable-next-line no-unused-vars
		list = await db.list.create({
			data: {
				boardId: listToCopy.boardId,
				title: `${listToCopy.title} - Copy`,
				order: newOrder,
				cards: {
					createMany: {
						data: listToCopy.cards.map((card) => ({
							title: card.title,
							description: card.description,
							order: card.order,
						})),
					},
				},
			},
			include: {
				cards: true,
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
			error: "Failed to delete",
		}
	}

	revalidatePath(`/board/${boardId}`)

	return { data: list }
}

export const copyList = createSafeAction(CopyList, handler)
