"use server"

import { revalidatePath } from "next/cache"

import { DeleteBoard } from "./schema"
import { InputType, ReturnType } from "./types"

import { createSafeAction } from "@/lib/create-safe-action"
import { db } from "@/lib/db"
import { redirect } from "@/lib/navigation"
import { auth } from "@clerk/nextjs"

const handler = async (data: InputType): Promise<ReturnType> => {
	const { userId, orgId } = auth()

	if (!userId || !orgId) {
		return {
			error: "Unauthorized",
		}
	}

	const { id } = data

	let board

	try {
		board = await db.board.delete({
			where: {
				orgId,
				id,
			},
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
