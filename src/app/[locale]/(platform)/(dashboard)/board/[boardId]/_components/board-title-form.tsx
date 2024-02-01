"use client"

import { ElementRef, useRef, useState } from "react"

import { FormInput } from "@/components/form/form-input"
import { Button } from "@/components/ui/button"

import { updateBoard } from "@/actions/update-board"
import { useAction } from "@/hooks/use-action"
import { Board } from "@prisma/client"
import { toast } from "sonner"

interface BoardTitleFormProps {
	board: Board
}
const BoardTitleForm = ({ board }: BoardTitleFormProps) => {
	const { execute } = useAction(updateBoard, {
		onSuccess: (data) => {
			toast.success(`Board ${data.title} updated!`)
			setTitle(data.title)
			disableEditing()
		},
		onError: (error) => {
			toast.error(error)
		},
	})
	const [isEditing, setIsEditing] = useState(false)
	const [title, setTitle] = useState(board.title)

	const formRef = useRef<ElementRef<"form">>(null)
	const inputRef = useRef<ElementRef<"input">>(null)

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			inputRef.current?.focus()
			inputRef.current?.select()
		})
	}

	const onBlur = () => {
		formRef.current?.requestSubmit()
		if (document.activeElement !== inputRef.current) setIsEditing(false)
	}

	const disableEditing = () => {}

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string

		execute({
			title,
			id: board.id,
		})
	}

	if (isEditing) {
		return (
			<form
				action={onSubmit}
				className="flex items-center gap-x-2"
				ref={formRef}
			>
				<FormInput
					id="title"
					ref={inputRef}
					onBlur={onBlur}
					defaultValue={title}
					className="h-7 border-white bg-transparent px-2 py-1 text-lg font-bold focus-visible:outline-none focus-visible:ring-transparent"
				/>
			</form>
		)
	}

	return (
		<Button
			className="h-auto w-auto p-1 px-2 text-lg font-bold text-white"
			variant="transparent"
			onClick={enableEditing}
		>
			{title}
		</Button>
	)
}

export default BoardTitleForm
