import Link from "next/link"

import { cn } from "@/lib/utils"

interface LogoProps {
	className?: string
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Link
			className={cn("font-black font-mono tracking-tighter", className)}
			href="/"
		>
			Taskify
		</Link>
	)
}
