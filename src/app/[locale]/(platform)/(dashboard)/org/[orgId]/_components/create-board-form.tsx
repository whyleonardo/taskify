"use client"

import { FormButton } from "./form-button"
import { FormInput } from "./form-input"

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

interface CreateBoardFormProps {
	creationSuccess: string
	creationFailed: string
}

export const CreateBoardForm = ({
	creationSuccess,
	creationFailed,
}: CreateBoardFormProps) => {
	const { execute, fieldErrors } = useAction(createBoard, {
		onSuccess: () => {
			toast.success(creationSuccess)
		},
		onError: () => {
			toast.error(creationFailed)
		},
		onComplete: () => {
			toast.info("Completed")
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string

		execute({ title })
	}
	return (
		<form action={onSubmit} className="flex items-center gap-x-2">
			<FormInput errors={fieldErrors} />

			<FormButton />
		</form>
	)
}
