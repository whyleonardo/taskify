"use client"

import { useRouter } from "next/navigation"
import { ElementRef, useRef } from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverClose,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover"

import { FormInput } from "./form-input"
import { FormPicker } from "./form-picker"
import { FormSubmit } from "./form-submit"

import { createBoard } from "@/actions/create-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

interface FormPopoverProps {
	children: React.ReactNode
	side?: "left" | "right" | "top" | "bottom"
	align?: "start" | "center" | "end"
	sideOffset?: number
}

export const FormPopover = ({
	children,
	align,
	side = "bottom",
	sideOffset,
}: FormPopoverProps) => {
	const closeRef = useRef<ElementRef<"button">>(null)
	const router = useRouter()

	const { fieldErrors, execute } = useAction(createBoard, {
		onComplete: () => {},
		onError: (error) => {
			toast.error(error, {
				duration: 1500,
			})
		},
		onSuccess: (data) => {
			const { title, id } = data
			toast.success(`The board ${title} was created`, {
				duration: 1500,
			})

			closeRef.current?.click()
			router.push(`/board/${id}`)
		},
	})

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string
		const image = formData.get("image") as string

		execute({ title, image })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>{children}</PopoverTrigger>
			<PopoverContent
				side={side}
				align={align}
				sideOffset={sideOffset}
				className="w-80 pt-3 dark:bg-foreground/5"
			>
				<div className="pb-4 text-center text-sm font-medium">Create Board</div>

				<PopoverClose ref={closeRef} className="border-none" asChild>
					<Button
						variant="icon"
						className="absolute right-0 top-4 h-auto w-auto focus:!ring-0"
					>
						<Icons.close className="h-4 w-4" />
					</Button>
				</PopoverClose>

				<form action={onSubmit} className="space-y-4">
					<div className="space-y-4">
						<FormPicker id="image" errors={fieldErrors} />
						<FormInput
							id="title"
							label="Title"
							type="text"
							errors={fieldErrors}
						/>{" "}
					</div>

					<FormSubmit className="w-full">Create</FormSubmit>
				</form>
			</PopoverContent>
		</Popover>
	)
}
