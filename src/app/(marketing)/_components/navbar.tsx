import Link from "next/link"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import { MobileSheet } from "./mobile-sheet"

export const MarketingNavbar = async () => {
	return (
		<header className="flex h-14 w-full border py-2 shadow-lg dark:border-none">
			<div className="container flex items-center justify-between">
				<Logo />

				<nav className="hidden gap-2 md:flex">
					<Button size="sm" className="font-semibold">
						<Link href="/sign-in">Login</Link>
					</Button>

					<Button
						size="sm"
						className="bg-foreground font-semibold text-background hover:bg-foreground/90"
					>
						<Link href="/sign-up">Create Free Account</Link>
					</Button>
				</nav>

				<MobileSheet />
			</div>
		</header>
	)
}
