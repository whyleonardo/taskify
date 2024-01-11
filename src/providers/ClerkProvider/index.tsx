"use client"

import { useTheme } from "next-themes"

import { ClerkProvider as Provider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"

interface ClerkProviderProps {
	children: React.ReactNode
}

export const ClerkProvider = ({ children }: ClerkProviderProps) => {
	const { theme } = useTheme()

	const isDark = theme === "dark"

	return (
		<Provider
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
