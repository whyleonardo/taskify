"use client"

interface BoardOptionsProps {
	id: string
}

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
	PopoverClose,
} from "@/components/ui/popover"

import { deleteBoard } from "@/actions/delete-board"
import { useAction } from "@/hooks/use-action"
import { toast } from "sonner"

export const BoardOptions = ({ id }: BoardOptionsProps) => {
	const { execute, isLoading } = useAction(deleteBoard, {
		onError: (error) => {
			toast.error(error)
			return
		},
	})

	const onDelete = () => {
		execute({ id })
	}

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="transparent" className="">
					<Icons.more className="h-5 w-5 text-white" />
				</Button>
			</PopoverTrigger>
			<PopoverContent
				className="relative px-0 py-3 outline-none ring-transparent"
				side="bottom"
				align="end"
			>
				<div className="pb-4 text-center text-sm font-medium text-foreground/50 dark:text-foreground/80">
					Board Actions
				</div>
				<PopoverClose asChild>
					<Button variant="transparent" className="absolute right-2 top-2">
						<Icons.close className="h-4 w-4" />
					</Button>
				</PopoverClose>

				<Button
					className="h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal hover:bg-red-100/60 hover:text-red-400"
					variant="ghost"
					onClick={onDelete}
					disabled={isLoading}
				>
					{isLoading && <Icons.spinner className="mr-2 animate-spin" />}
					Delete this board{" "}
				</Button>
			</PopoverContent>
		</Popover>
	)
}
