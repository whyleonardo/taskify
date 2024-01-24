"use client"

import { useLocale } from "next-intl"
import ReactCountryFlag from "react-country-flag"

import { locales } from "@/constants/locales"
import { Link, usePathname } from "@/lib/navigation"
import { cn } from "@/lib/utils"

interface LocaleSwitcherProps {
	className?: string
}

export const LocaleFlagSwitcher = ({ className }: LocaleSwitcherProps) => {
	const actualLocale = useLocale()
	const p = usePathname()
	return (
		<>
			<div className="flex items-center gap-2">
				{locales.map((locale) => (
					<Link href={p} locale={locale} key={locale}>
						<ReactCountryFlag
							countryCode={locale === "en" ? "us" : locale}
							lang={locale}
							svg
							aria-label={`Switch to ${locale} locale`}
							className={cn(
								"!h-8 !w-8 rounded-sm",
								locale !== actualLocale && "grayscale",
								className,
							)}
						/>
					</Link>
				))}
			</div>
		</>
	)
}
