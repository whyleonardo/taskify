"use server"

import { db } from "@/lib/db"

export async function getBoards(orgId: string) {
	if (!orgId) {
		return
	}

	return await db.board.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	})
}
