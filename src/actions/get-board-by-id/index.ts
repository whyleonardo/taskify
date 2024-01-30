import { db } from "@/lib/db"

export async function getBoardById(boardId: string, orgId: string) {
	const board = await db.board.findUnique({
		where: {
			id: boardId,
			orgId,
		},
	})

	return board
}
