"use client"

import { ListHeader } from "./list-header"

import { ListWithCards } from "@/types/list-and-cards"

interface ListItemProps {
	data: ListWithCards
	index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
	return (
		<li className="h-fulll w-[272px] shrink-0">
			<div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md dark:bg-muted">
				<ListHeader data={data} />
			</div>
		</li>
	)
}
