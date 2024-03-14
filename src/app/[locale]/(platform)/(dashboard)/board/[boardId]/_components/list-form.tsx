"use client"

import { useParams, useRouter } from "next/navigation"
import { ElementRef, useEffect, useRef, useState } from "react"

import { FormInput } from "@/components/form/form-input"
import { FormSubmit } from "@/components/form/form-submit"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

import { ListWrapper } from "./list-wrapper"

import { createList } from "@/actions/create-list"
import { CreateList } from "@/actions/create-list/schema"
import { useAction } from "@/hooks/use-action"
import { X } from "lucide-react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface ListFormProps {}

export const ListForm = ({}: ListFormProps) => {
	const params = useParams()
	const router = useRouter()

	const [isEditing, setIsEditing] = useState(false)

	const formRef = useRef<ElementRef<"form">>(null)
	const inputRef = useRef<ElementRef<"input">>(null)

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			inputRef.current?.focus()
		})
	}

	const disableEditing = () => {
		setIsEditing(false)
	}

	const { execute, fieldErrors } = useAction(createList, {
		onSuccess: (data) => {
			toast.success(`List "${data.title}" was created!`)
			disableEditing()
			router.refresh()
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing()
		}
	}

	useEventListener("keydown", onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string
		const boardId = formData.get("boardId") as string

		execute({ title, boardId })
	}

	if (isEditing) {
		return (
			<ListWrapper>
				<form
					action={onSubmit}
					ref={formRef}
					className="w-full space-y-4 rounded-md bg-background p-3 shadow-md"
				>
					<FormInput
						id="title"
						errors={fieldErrors}
						placeholder="Enter list title..."
						ref={inputRef}
						className="h-7 border-transparent px-2 py-1 text-sm font-medium transition hover:border-input focus:border-input  "
					/>

					<input hidden value={params.boardId} name="boardId" />
					<div className="flex items-center gap-1">
						<FormSubmit>Add List</FormSubmit>
						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="size-5" />
						</Button>
					</div>
				</form>
			</ListWrapper>
		)
	}

	return (
		<ListWrapper>
			<button
				onClick={enableEditing}
				className="flex w-full items-center rounded-md bg-background p-3 text-sm font-medium text-foreground transition hover:bg-background/80"
			>
				<Icons.plus className="mr-2 size-4" />
				Add a list
			</button>
		</ListWrapper>
	)
}
