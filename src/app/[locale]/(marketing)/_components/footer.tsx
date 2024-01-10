import { getTranslations } from "next-intl/server"

import { LocaleFlagSwitcher } from "@/components/locale-flag-switcher"

import { Link } from "@/lib/navigation"

export const MarketingFooter = async () => {
	const translate = await getTranslations("marketing")

	return (
		<footer className="flex h-16 w-full border-t shadow-lg">
			<div className="container flex items-center justify-between">
				<LocaleFlagSwitcher className="!h-6 !w-6" />

				<nav className="flex justify-between gap-2 md:w-fit md:justify-normal">
					<span className="text-xs">
						{translate("built")}
						&nbsp;
						<Link href="https://github.com/whyleonardo" className="underline">
							whyleonardo
						</Link>
					</span>
				</nav>
			</div>
		</footer>
	)
}
