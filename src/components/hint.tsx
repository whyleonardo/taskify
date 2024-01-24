import {
	Tooltip,
	TooltipProvider,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip"

interface HintProps {
	children: React.ReactNode
	description: string
	side?: "left" | "right" | "top" | "bottom"
	sideOffset?: number
}

export const Hint = ({
	children,
	description,
	side = "bottom",
	sideOffset = 0,
}: HintProps) => {
	return (
		<TooltipProvider>
			<Tooltip delayDuration={0}>
				<TooltipTrigger>{children}</TooltipTrigger>
				<TooltipContent
					side={side}
					sideOffset={sideOffset}
					className="max-w-[220px] break-words text-xs shadow-md"
				>
					{description}
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	)
}
