"use client"

import { useParams } from "next/navigation"
import { ElementRef, KeyboardEventHandler, forwardRef, useRef } from "react"

import { FormSubmit } from "@/components/form/form-submit"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"

import { createCard } from "@/actions/create-card"
import { useAction } from "@/hooks/use-action"
import { Plus, X } from "lucide-react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface CardFormProps {
	disableEditing: () => void
	enableEditing: () => void
	listId: string
	isEditing: boolean
}

export const CardForm = forwardRef<HTMLTextAreaElement, CardFormProps>(
	({ disableEditing, isEditing, enableEditing, listId }, ref) => {
		const params = useParams()

		const formRef = useRef<ElementRef<"form">>(null)

		const { execute, fieldErrors } = useAction(createCard, {
			onSuccess: (data) => {
				toast.success(`Card ${data.title} created!`)
				disableEditing()
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

		useOnClickOutside(formRef, disableEditing)
		useEventListener("keydown", onKeyDown)

		const onTextareaKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (
			e,
		) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault()
				formRef.current?.requestSubmit()
			}
		}

		const onSubmit = (formData: FormData) => {
			const title = formData.get("title") as string
			const listId = formData.get("listId") as string
			const boardId = params.boardId as string

			execute({ title, listId, boardId })
		}

		if (isEditing) {
			return (
				<form
					action={onSubmit}
					ref={formRef}
					className="m-1 space-y-4 px-1 py-0.5"
				>
					<FormTextarea
						id="title"
						name="title"
						onKeyDown={onTextareaKeyDown}
						ref={ref}
						spellCheck={false}
						errors={fieldErrors}
						placeholder="Enter a title for this card"
					/>

					<input hidden id="listId" name="listId" value={listId} />

					<div className="flex items-center gap-1">
						<FormSubmit>Create</FormSubmit>
						<Button onClick={disableEditing} size="sm" variant="ghost">
							<X className="size-5" />
						</Button>
					</div>
				</form>
			)
		}

		return (
			<div className="px-2 pt-2">
				<Button
					onClick={enableEditing}
					className="h-auto w-full justify-start px-2 py-1.5 text-sm text-muted-foreground"
					variant="ghost"
				>
					<Plus className="mr-2 size-4" />
					Add a card
				</Button>
			</div>
		)
	},
)

CardForm.displayName = "CardForm"
