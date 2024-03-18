"use client"

import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { copyCard } from "@/actions/copy-card"
import { deleteCard } from "@/actions/delete-card"
import { useAction } from "@/hooks/use-action"
import { useCardModal } from "@/hooks/use-card-modal"
import { CardWithList } from "@/types/list-and-cards"
import { Copy, Loader2Icon, Trash } from "lucide-react"
import { toast } from "sonner"

interface ActionsProps {
	data: CardWithList
}

export const Actions = ({ data }: ActionsProps) => {
	const params = useParams()
	const cardModal = useCardModal()

	const { execute: executeCopyCard, isLoading: isLoadingCopy } = useAction(
		copyCard,
		{
			onSuccess: () => {
				toast.success("Card was copied!")
				cardModal.onClose()
			},
			onError: (error) => {
				toast.error(error)
			},
		},
	)
	const { execute: executeDeleteCard, isLoading: isLoadingDelete } = useAction(
		deleteCard,
		{
			onSuccess: () => {
				cardModal.onClose()
			},
			onError: (error) => {
				toast.error(error)
			},
		},
	)

	const onCopy = () => {
		const boardId = params.boardId as string

		executeCopyCard({ boardId, id: data.id })
	}

	const onDelete = () => {
		const boardId = params.boardId as string

		executeDeleteCard({ boardId, id: data.id })
	}

	return (
		<div className="mt-2 space-y-2">
			<p className="text-xs font-semibold">Actions</p>

			<Button
				onClick={onCopy}
				disabled={isLoadingCopy}
				className="w-full justify-start bg-transparent text-foreground shadow-none hover:bg-muted-foreground/15"
			>
				{isLoadingCopy ? (
					<Loader2Icon className="mr-2 size-4 animate-spin" />
				) : (
					<Copy className="mr-2 size-4" />
				)}
				Copy
			</Button>

			<Button
				onClick={onDelete}
				disabled={isLoadingDelete}
				className="w-full justify-start text-red-500 hover:bg-red-50 hover:text-red-500"
				variant="ghost"
			>
				{isLoadingDelete ? (
					<Loader2Icon className="mr-2 size-4 animate-spin" />
				) : (
					<Trash className="mr-2 size-4" />
				)}
				Delete
			</Button>
		</div>
	)
}

Actions.Skeleton = function ActionsSkeleton() {
	return (
		<div className="mt-2 space-y-2">
			<Skeleton className="h-4 w-20" />
			<Skeleton className="h-8 w-full" />
			<Skeleton className="h-8 w-full" />
		</div>
	)
}
