"use client"

import { ElementRef, useRef, useState } from "react"

import { CardForm } from "./card-form"
import { ListHeader } from "./list-header"

import { ListWithCards } from "@/types/list-and-cards"

interface ListItemProps {
	data: ListWithCards
	index: number
}

export const ListItem = ({ data, index }: ListItemProps) => {
	const textareaRef = useRef<ElementRef<"textarea">>(null)
	const [isEditing, setIsEditing] = useState(false)

	const disableEditing = () => {
		setIsEditing(false)
	}

	const enableEditing = () => {
		setIsEditing(true)
		setTimeout(() => {
			textareaRef.current?.focus()
		})
	}

	return (
		<li className="h-fulll w-[272px] shrink-0">
			<div className="w-full rounded-md bg-[#f1f2f4] pb-2 shadow-md dark:bg-muted">
				<ListHeader onAddCard={enableEditing} data={data} />

				<CardForm
					ref={textareaRef}
					listId={data.id}
					isEditing={isEditing}
					disableEditing={disableEditing}
					enableEditing={enableEditing}
				/>
			</div>
		</li>
	)
}
