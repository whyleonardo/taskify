import { Draggable } from "@hello-pangea/dnd"
import { Card } from "@prisma/client"

interface CardItemProps {
	index: number
	data: Card
}

export const CardItem = ({ index, data }: CardItemProps) => {
	return (
		<Draggable draggableId={data.id} index={index}>
			{(provided) => (
				<div
					{...provided.draggableProps}
					{...provided.dragHandleProps}
					ref={provided.innerRef}
					role="button"
					className="truncate rounded border border-transparent bg-muted-foreground/5 px-3 py-2 text-sm hover:border-muted-foreground/5"
				>
					<p> {data.title}</p>
				</div>
			)}
		</Draggable>
	)
}
