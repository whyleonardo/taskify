import Link from "next/link"
import { redirect } from "next/navigation"

import { FormPopover } from "@/components/form/form-popover"
import { Hint } from "@/components/hint"
import { Icons } from "@/components/icons"
import { Skeleton } from "@/components/ui/skeleton"

import { getBoards } from "@/actions/get-boards"
import { auth } from "@clerk/nextjs"

export const BoardList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		return redirect("/create-org")
	}

	const boards = await getBoards(orgId)

	return (
		<div className="space-y-4">
			<div className="flex items-center text-lg font-semibold">
				<Icons.user className="mr-2 h-6 w-6" />
				Your Boards
			</div>

			<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{boards &&
					boards.map((board) => (
						<Link
							href={`/board/${board.id}`}
							key={board.id}
							className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-primary bg-cover bg-center bg-no-repeat p-2 transition md:hover:scale-105 dark:bg-primary/20"
							style={{
								backgroundImage: `url(${board.imageFullUrl})`,
							}}
						>
							<div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
							<p className="relative font-semibold text-white">{board.title}</p>
						</Link>
					))}

				<FormPopover side="bottom" sideOffset={10}>
					<div
						role="button"
						className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted shadow-sm transition hover:opacity-70"
					>
						<p className="text-sm">Create New Board</p>
						<span className="text-xs">5 remaining</span>
						<Hint
							sideOffset={65}
							side="bottom"
							description={`
							Free Workspaces can have up to 5 open boards. For unlimited boards, upgrade this workspace.
							`}
						>
							<Icons.help className="absolute bottom-2 right-2 h-4 w-4 transition-transform hover:scale-110" />
						</Hint>
					</div>
				</FormPopover>
			</div>
		</div>
	)
}

BoardList.Skeleton = function SkeletonBoardList() {
	return (
		<div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
			<Skeleton className="aspect-video h-full w-full p-2" />
		</div>
	)
}
