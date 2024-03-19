"use server"

import { revalidatePath } from "next/cache"

import { createAuditLog } from "../create-audit-log"
import { createBoardSchema } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit"
import { auth } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"
import { checkSubscription } from "@/lib/subscription"

async function handler(data: InputType): Promise<ReturnType> {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const canCreate = await hasAvailableCount()
	const isPro = await checkSubscription()

	if (!canCreate && !isPro) {
		return {
			error:
				"You have reached your limit of free board. Please upgrade to create more.",
		}
	}

	const { title, image } = data

	const [imageId, imageThumbUrl, imageFullUrl, imageLinkHTML, imageUserName] =
		image.split("|")

	if (
		!imageId ||
		!imageThumbUrl ||
		!imageFullUrl ||
		!imageLinkHTML ||
		!imageUserName
	) {
		return {
			error: "Missing fields. Failed to create board.",
		}
	}

	let board

	try {
		board = await db.board.create({
			data: {
				title,
				imageId,
				imageThumbUrl,
				imageFullUrl,
				imageLinkHTML,
				imageUserName,
				orgId,
			},
		})

		if (!isPro) {
			await incrementAvailableCount()
		}

		await createAuditLog({
			action: ACTION.CREATE,
			entityId: board.id,
			entityTitle: board.title,
			entityType: ENTITY_TYPE.BOARD,
		})
	} catch (error) {
		return {
			error: "Failed to create",
		}
	}

	revalidatePath(`/board/${board.id}`)
	return { data: board }
}

export const createBoard = createSafeAction(createBoardSchema, handler)
