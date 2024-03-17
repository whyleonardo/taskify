import Link from "next/link"

import { ThemeToggle } from "@/components/buttons/ThemeToggle"

export const MarketingFooter = async () => {
	return (
		<footer className="flex h-16 w-full border-t shadow-lg">
			<div className="container flex items-center justify-between">
				<div className="flex items-center justify-between gap-2 md:w-fit md:justify-normal">
					<span className="text-xs">
						Built &nbsp;
						<Link
							href="https://github.com/whyleonardo"
							className="underline transition-all hover:text-foreground/70"
						>
							whyleonardo
						</Link>
					</span>

					<ThemeToggle />
				</div>
			</div>
		</footer>
	)
}
