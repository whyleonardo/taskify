"use client"

import { useTheme } from "next-themes"
import * as React from "react"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

export const ThemeToggle = () => {
	const { setTheme, theme } = useTheme()

	return (
		<Button
			variant="icon"
			size="icon"
			onClick={() => setTheme(theme === "light" ? "dark" : "light")}
		>
			<Icons.sun className="rotate-0 scale-[.8] transition-all dark:-rotate-90 dark:scale-0" />
			<Icons.moon className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-[.8]" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	)
}
