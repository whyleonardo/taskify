"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

import { DeleteBoard } from "./schema"
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
