"use client"

import { useLocale } from "next-intl"
import { useTheme } from "next-themes"

import { clerkLocale } from "@/constants/locales"
import { ClerkProvider as Provider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

interface ClerkProviderProps {
	children: React.ReactNode
}

export const ClerkProvider = ({ children }: ClerkProviderProps) => {
	const { theme } = useTheme()
	const locale = useLocale()

	const isDark = theme === "dark"

	return (
		<Provider
			localization={clerkLocale(locale)}
			appearance={{
				baseTheme: isDark ? dark : undefined,
				variables: {
					colorPrimary: "hsl(335 78% 42%)",
				},
			}}
		>
			{children}
		</Provider>
	)
}
