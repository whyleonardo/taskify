"use client"

import { useEffect, useState } from "react"

import { ListForm } from "./list-form"
import { ListItem } from "./list-item"

import { updateCardOrder } from "@/actions/update-card-order"
import { updateListOrder } from "@/actions/update-list-order"
import { useAction } from "@/hooks/use-action"
import { ListWithCards } from "@/types/list-and-cards"
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd"
import { toast } from "sonner"

interface ListContainerProps {
	data: ListWithCards[]
	boardId: string
}

function reorder<T>(list: T[], startIndex: number, endIndex: number) {
	const result = Array.from(list)
	const [removed] = result.splice(startIndex, 1)

	result.splice(endIndex, 0, removed)

	return result
}

export const ListContainer = ({ boardId, data }: ListContainerProps) => {
	const [orderedData, setOrderedData] = useState(data)

	const { execute: executeUpdateListOrder } = useAction(updateListOrder, {
		onSuccess: () => {
			toast.success("List reordered")
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const { execute: executeUpdateCardOrder } = useAction(updateCardOrder, {
		onSuccess: () => {
			toast.success("Card reordered")
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onDragEnd = (result: DropResult) => {
		const { destination, source, type } = result

		if (!destination) {
			return
		}

		// if dropped in the same position
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		) {
			return
		}

		// User moves a list
		if (type === "list") {
			const items = reorder(orderedData, source.index, destination.index).map(
				(item, index) => ({ ...item, order: index }),
			)

			setOrderedData(items)
			executeUpdateListOrder({ items, boardId })
		}

		// User moves a card
		if (type === "card") {
			let newOrderedData = [...orderedData]

			const sourceList = newOrderedData.find(
				(list) => list.id === source.droppableId,
			)

			const destinationList = newOrderedData.find(
				(list) => list.id === destination.droppableId,
			)

			if (!destinationList || !sourceList) {
				return
			}

			if (!sourceList.cards) {
				sourceList.cards = []
			}

			if (!destinationList.cards) {
				destinationList.cards = []
			}

			// User moves a card to another list
			if (source.droppableId === destination.droppableId) {
				const reorderedCards = reorder(
					sourceList.cards,
					source.index,
					destination.index,
				)

				reorderedCards.forEach((card, index) => {
					card.order = index
				})

				sourceList.cards = reorderedCards

				setOrderedData(newOrderedData)

				executeUpdateCardOrder({ boardId, items: reorderedCards })
			} else {
				const [movedCard] = sourceList.cards.splice(source.index, 1)

				movedCard.listId = destination.droppableId

				destinationList.cards.splice(destination.index, 0, movedCard)

				sourceList.cards.forEach((card, index) => {
					card.order = index
				})

				destinationList.cards.forEach((card, index) => {
					card.order = index
				})

				setOrderedData(newOrderedData)

				executeUpdateCardOrder({ boardId, items: destinationList.cards })
			}
		}
	}

	useEffect(() => {
		setOrderedData(data)
	}, [data])

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<Droppable droppableId="lists" type="list" direction="horizontal">
				{(provided) => (
					<ol
						{...provided.droppableProps}
						ref={provided.innerRef}
						className="flex h-full gap-3"
					>
						{orderedData.map((list, index) => (
							<ListItem key={list.id} index={index} data={list} />
						))}

						{provided.placeholder}

						<ListForm />
						<div className="w-1 shrink-0" />
					</ol>
				)}
			</Droppable>
		</DragDropContext>
	)
}
