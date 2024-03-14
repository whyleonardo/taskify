import { notFound } from "next/navigation"

import { BoardNavbar } from "./_components/board-navbar"

import { getBoardById } from "@/actions/get-board-by-id"
import { db } from "@/lib/db"
import { redirect } from "@/lib/navigation"
import { auth } from "@clerk/nextjs"
import { startCase } from "lodash"

interface BoardIdLayoutProps {
	children: React.ReactNode
	params: {
		boardId: string
		locale: string
	}
}

interface GenerateMetadataProps extends Omit<BoardIdLayoutProps, "children"> {}

export async function generateMetadata({ params }: GenerateMetadataProps) {
	const { locale, boardId } = params

	const board = await db.board.findUnique({
		where: {
			id: boardId,
		},
	})

	if (!board) {
		return {
			title: startCase("board"),
		}
	}

	if (locale === "en") {
		return {
			title: startCase(board.title || "board"),
		}
	}

	if (locale === "br") {
		return {
			title: startCase(board.title || "quadro"),
		}
	}
}

const BoardIdLayout = async ({ children, params }: BoardIdLayoutProps) => {
	const { orgId } = auth()

	if (!orgId) {
		redirect("/select-org")
		return null
	}

	const board = await getBoardById(params.boardId, orgId)

	if (!board) {
		notFound()
	}

	return (
		<div
			className="relative h-full bg-cover bg-center bg-no-repeat"
			style={{ backgroundImage: `url(${board.imageFullUrl})` }}
		>
			<BoardNavbar board={board} />
			<div className="absolute inset-0 bg-black/10" />

			<main className="relative h-full pt-28">{children}</main>
		</div>
	)
}

export default BoardIdLayout
