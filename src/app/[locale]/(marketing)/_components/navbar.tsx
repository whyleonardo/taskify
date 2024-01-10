import { getTranslations } from "next-intl/server"

import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import { MobileSheet } from "./mobile-sheet"

import { Link } from "@/lib/navigation"

export const MarketingNavbar = async () => {
	const translate = await getTranslations("marketing")

	return (
		<header className="flex h-14 w-full py-2 shadow">
			<div className="container flex items-center justify-between">
				<Logo />

				<nav className="hidden gap-2 md:flex">
					<Button size="sm" className="font-semibold">
						<Link href="/sign-in">{translate("login-button")}</Link>
					</Button>

					<Button
						size="sm"
						className="bg-foreground font-semibold text-background hover:bg-foreground/90"
					>
						<Link href="/sign-up">{translate("sign-up-button")}</Link>
					</Button>
				</nav>

				<MobileSheet />
			</div>
		</header>
	)
}
