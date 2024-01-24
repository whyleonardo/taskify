"use client"

import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"

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
		<form action={onSubmit} className="flex flex-col gap-2">
			<FormInput label="Title" id="title" errors={fieldErrors} />

			<FormSubmit>Save</FormSubmit>
		</form>
	)
}
