"use client"

import { ElementRef, useRef, useState } from "react"

import { CardForm } from "./card-form"
import { CardItem } from "./card-item"
import { ListHeader } from "./list-header"

import { cn } from "@/lib/utils"
import { ListWithCards } from "@/types/list-and-cards"
import { Draggable, Droppable } from "@hello-pangea/dnd"

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
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<li
					{...provided.draggableProps}
					ref={provided.innerRef}
					className="h-full w-[272px] shrink-0"
				>
					<div
						{...provided.dragHandleProps}
						className="w-full rounded-md bg-[#f1f2f4] p-2  shadow-md dark:bg-muted"
					>
						<ListHeader onAddCard={enableEditing} data={data} />

						<Droppable droppableId={data.id} type="card">
							{(provided) => (
								<ol
									{...provided.droppableProps}
									ref={provided.innerRef}
									className={cn(
										"mx-1 px-1 py-0.5 flex flex-col gap-2 mt-0",
										data.cards.length > 0 && "mt-2",
									)}
								>
									{data.cards.map((card, index) => (
										<CardItem index={index} key={card.id} data={card} />
									))}
									{provided.placeholder}
								</ol>
							)}
						</Droppable>

						<CardForm
							ref={textareaRef}
							listId={data.id}
							isEditing={isEditing}
							disableEditing={disableEditing}
							enableEditing={enableEditing}
						/>
					</div>
				</li>
			)}
		</Draggable>
	)
}
