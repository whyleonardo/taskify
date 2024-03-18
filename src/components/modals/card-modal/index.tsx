"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"

import { Actions } from "./actions"
import { Description } from "./description"
import { Header } from "./header"

import { useCardModal } from "@/hooks/use-card-modal"
import { fetcher } from "@/lib/fetcher"
import { CardWithList } from "@/types/list-and-cards"
import { useQuery } from "@tanstack/react-query"

export const CardModal = () => {
	const id = useCardModal((state) => state.id)
	const isOpen = useCardModal((state) => state.isOpen)
	const onClose = useCardModal((state) => state.onClose)

	const {
		data: cardData,
		isFetching: isCardDataFetching,
		isLoading: isCardDataLoading,
	} = useQuery<CardWithList>({
		queryKey: ["card", id],
		queryFn: () => fetcher(`/api/cards/${id}`),
	})

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				{isCardDataFetching || isCardDataLoading || !cardData ? (
					<Header.Skeleton />
				) : (
					<Header data={cardData} />
				)}

				<div className="grid grid-cols-1 md:grid-cols-4 md:gap-4">
					<div className="col-span-3">
						<div className="w-full space-y-6">
							{isCardDataFetching || isCardDataLoading || !cardData ? (
								<Description.Skeleton />
							) : (
								<Description data={cardData} />
							)}
						</div>
					</div>

					{isCardDataFetching || isCardDataLoading || !cardData ? (
						<Actions.Skeleton />
					) : (
						<Actions data={cardData} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	)
}
