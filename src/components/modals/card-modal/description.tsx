"use client"

import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"

import { FormSubmit } from "@/components/form/form-submit"
import { FormTextarea } from "@/components/form/form-textarea"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { updateCard } from "@/actions/update-card"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types/list-and-cards"
import { useQueryClient } from "@tanstack/react-query"
import { AlignLeft } from "lucide-react"
import { toast } from "sonner"
import { useEventListener, useOnClickOutside } from "usehooks-ts"

interface DescriptionProps {
	data: CardWithList
}

export const Description = ({ data }: DescriptionProps) => {
	const [isEditing, setIsEditing] = useState(false)
	const queryClient = useQueryClient()
	const params = useParams()

	const textareaRef = useRef<ElementRef<"textarea">>(null)
	const formRef = useRef<ElementRef<"form">>(null)

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["card", data.id],
			})

			toast.success("Description is changed")
		},
	})

	const disableEditing = () => {
		setIsEditing(false)
	}

	const enableEditing = () => {
		setIsEditing(true)

		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	const onKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Escape") {
			disableEditing()
		}
	}

	useEventListener("keydown", onKeyDown)
	useOnClickOutside(formRef, disableEditing)

	const onSubmit = (formData: FormData) => {
		const description = formData.get("description") as string
		const boardId = params.boardId as string

		execute({ description, boardId, id: data.id })
		disableEditing()
	}

	return (
		<div className="flex w-full items-start gap-3">
			<AlignLeft className="mt-0.5 size-5" />

			<div className="w-full">
				<p className="mb-2 font-semibold">Description</p>

				{isEditing ? (
					<form action={onSubmit} ref={formRef} className="space-y-2">
						<FormTextarea
							id="description"
							name="description"
							defaultValue={data.description || undefined}
							className="relative mt-2 min-h-[78px] w-full"
							placeholder="Add a more detailed description..."
							errors={fieldErrors}
						/>

						<div className="flex items-center gap-2">
							<FormSubmit>Save</FormSubmit>
							<Button
								variant="ghost"
								size="sm"
								onClick={disableEditing}
								type="button"
							>
								Cancel
							</Button>
						</div>
					</form>
				) : (
					<div
						role="button"
						onClick={enableEditing}
						className="min-h-[78px] rounded-md bg-muted-foreground/10 px-3 py-2.5 text-sm font-medium"
					>
						{data.description || (
							<span className="text-muted-foreground/80">
								Add a more detailed description...
							</span>
						)}
					</div>
				)}
			</div>
		</div>
	)
}

Description.Skeleton = function DescriptionSkeleton() {
	return (
		<div className="flex w-full items-start gap-3">
			<Skeleton className="size-6" />

			<div className="w-full">
				<Skeleton className="mb-2 h-6 w-24" />
				<Skeleton className="mb-2 h-[78px] w-full" />
			</div>
		</div>
	)
}
