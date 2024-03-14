"use client"

import { ElementRef, useRef, useState } from "react"

import { FormInput } from "@/components/form/form-input"

import { updateList } from "@/actions/update-list"
import { useAction } from "@/hooks/use-action"
import { List } from "@prisma/client"
import { toast } from "sonner"
import { useEventListener } from "usehooks-ts"

interface ListHeaderProps {
	data: List
}

export const ListHeader = ({ data }: ListHeaderProps) => {
	const [title, setTitle] = useState(data.title)
	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<"form">>(null)
	const inputRef = useRef<ElementRef<"input">>(null)

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}
	const { execute } = useAction(updateList, {
		onSuccess: (data) => {
			toast.success(`Renamed to "${data.title}"`)
			setTitle(data.title)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			formRef.current?.requestSubmit()
		}
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string
		const boardId = formData.get("boardId") as string
		const id = formData.get("id") as string

		if (title === data.title) {
			return disableEditing()
		}

		execute({ title, boardId, id })
	}

	useEventListener("keydown", onKeyDown)

	return (
		<div className="flex items-start justify-between gap-2 px-2 pt-2 text-sm font-semibold">
			{isEditing ? (
				<form action={onSubmit} ref={formRef} className="flex-1 px-[2px]">
					<FormInput
						ref={inputRef}
						placeholder="Enter list title..."
						defaultValue={title}
						onBlur={onBlur}
						id="title"
						className="h-7 w-full truncate rounded-sm border-transparent bg-transparent px-[7px] py-1 text-sm font-medium transition hover:border-input focus:border-input"
					/>

					<input hidden id="id" name="id" value={data.id} readOnly />
					<input
						hidden
						id="boardId"
						name="boardId"
						value={data.boardId}
						readOnly
					/>
					<button type="submit" hidden />
				</form>
			) : (
				<button
					onClick={enableEditing}
					className="h-7 w-full border-transparent px-2.5 py-1 text-start text-sm font-medium"
				>
					{title}
				</button>
			)}
		</div>
	)
}
