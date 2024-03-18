"use client"

import { useParams } from "next/navigation"
import { ElementRef, useRef, useState } from "react"

import { FormInput } from "@/components/form/form-input"
import { Skeleton } from "@/components/ui/skeleton"

import { updateCard } from "@/actions/update-card"
import { useAction } from "@/hooks/use-action"
import { CardWithList } from "@/types/list-and-cards"
import { useQueryClient } from "@tanstack/react-query"
import { Layout } from "lucide-react"
import { toast } from "sonner"

interface HeaderProps {
	data: CardWithList
}

export const Header = ({ data }: HeaderProps) => {
	const [title, setTitle] = useState(data.title)
	const inputRef = useRef<ElementRef<"input">>(null)

	const params = useParams()

	const queryClient = useQueryClient()

	const { execute, fieldErrors } = useAction(updateCard, {
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ["card", data.id],
			})

			toast.success(`Renamed to "${data.title}"`)
			setTitle(data.title)
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onBlur = () => {
		inputRef.current?.form?.requestSubmit()
	}

	const onSubmit = (formData: FormData) => {
		const title = formData.get("title") as string
		const boardId = params.boardId as string
		const id = data.id

		if (title === data.title) {
			return
		}

		execute({ title, boardId, id })
	}

	return (
		<div className="mb-6 flex w-full items-start gap-3">
			<Layout className="mt-1 size-5" />

			<div className="w-full">
				<form action={onSubmit}>
					<FormInput
						errors={fieldErrors}
						onBlur={onBlur}
						id="title"
						ref={inputRef}
						defaultValue={title}
						className="relative -left-1.5 mb-0.5 w-[95%] truncate border-transparent bg-transparent px-1 text-xl font-semibold shadow-none focus-visible:border-input"
					/>
				</form>

				<p className="text-sm">
					in list{" "}
					<span className="underline underline-offset-2">
						{data.list.title}
					</span>
				</p>
			</div>
		</div>
	)
}

Header.Skeleton = function HeaderSkeleton() {
	return (
		<div className="mb-6 flex items-center gap-3">
			<Skeleton className="mt-1 size-6" />
			<div>
				<Skeleton className="mb-1 h-6 w-24" />
				<Skeleton className="h-4 w-12" />
			</div>
		</div>
	)
}
