"use client"

import { useEffect, useState } from "react"

import { ListForm } from "./list-form"
import { ListItem } from "./list-item"

import { ListWithCards } from "@/types/list-and-cards"

interface ListContainerProps {
	data: ListWithCards[]
	boardId: string
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	useEffect(() => {
		setOrderedData(data)
	}, [data])
	return (
		<ol className="flex h-full gap-3">
			{orderedData.map((list, index) => (
				<ListItem key={list.id} index={index} data={list} />
			))}
			<ListForm />
			<div className="w-1 shrink-0" />
		</ol>
	)
}
