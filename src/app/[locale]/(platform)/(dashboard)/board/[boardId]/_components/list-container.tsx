"use client"

import { ListForm } from "./list-form"

import { ListWithCards } from "@/types/list-and-cards"

interface ListContainerProps {
	data: ListWithCards[]
	boardId: string
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
	return (
		<ol>
			<ListForm />
			<div className="w-1 shrink-0" />
		</ol>
	)
}
