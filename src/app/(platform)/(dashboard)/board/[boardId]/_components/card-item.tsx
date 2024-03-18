import { useCardModal } from "@/hooks/use-card-modal"
import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"

interface CardItemProps {
	index: number
	data: Card
}

export const CardItem = ({ index, data }: CardItemProps) => {
	const cardModal = useCardModal()

	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					onClick={() => cardModal.onOpen(data.id)}
					className="truncate rounded border-transparent bg-muted-foreground/10 px-3 py-2 text-sm transition hover:bg-muted-foreground/15"
				>
					<p> {data.title}</p>
				</div>
			)}
		</Draggable>
	)
}
