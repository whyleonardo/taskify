"use client"

import { ElementRef, useRef } from "react"

import { FormSubmit } from "@/components/form/form-submit"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
	PopoverClose,
} from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"

import { copyList } from "@/actions/copy-list"
import { deleteList } from "@/actions/delete-list"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { Copy, MoreHorizontal, Plus, Trash2, X } from "lucide-react"
import { toast } from "sonner"

interface ListOptionsProps {
	data: List
	onAddCard: () => void
}

export const ListOptions = ({ data, onAddCard }: ListOptionsProps) => {
	const closeButtonRef = useRef<ElementRef<"button">>(null)

	const { execute: executeDelete } = useAction(deleteList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" deleted!`)
			closeButtonRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeCopy } = useAction(copyList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" copied!`)
			closeButtonRef.current?.click()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onCopy = (formData: FormData) => {
		const id = formData.get("id") as string
		const boardId = formData.get("boardId") as string

		executeCopy({ id, boardId })
	}

	const onDelete = (formData: FormData) => {
		const id = formData.get("id") as string
		const boardId = formData.get("boardId") as string

		executeDelete({ id, boardId })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button className="size-auto p-2" variant="ghost">
					<MoreHorizontal className="size-4" />
				</Button>
			</PopoverTrigger>

			<PopoverContent
				className="px-0 py-3"
				align="center"
				sideOffset={30}
				side="bottom"
			>
				<div className="pb-4 text-center text-sm font-medium">List actions</div>

				<PopoverClose
					asChild
					className="absolute right-2 top-2 size-auto p-2"
					ref={closeButtonRef}
				>
					<Button variant="ghost">
						<X className="size-4" />
					</Button>
				</PopoverClose>

				<Button
					onClick={onAddCard}
					className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
					variant="ghost"
				>
					<Plus className="mr-2 size-4" />
					Add card
				</Button>

				<form action={onCopy}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal"
						variant="ghost"
					>
						<Copy className="mr-2 size-4" />
						Copy list
					</FormSubmit>
				</form>

				<Separator className="my-2" />

				<form action={onDelete}>
					<input hidden name="id" id="id" value={data.id} />
					<input hidden name="boardId" id="boardId" value={data.boardId} />
					<FormSubmit
						className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal text-red-500 hover:text-red-500/75"
						variant="ghost"
					>
						<Trash2 className="mr-2 size-4" />
						Delete this list
					</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
