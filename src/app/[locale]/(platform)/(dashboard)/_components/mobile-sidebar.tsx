"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

import { ThemeToggle } from "@/components/buttons/ThemeToggle"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"

import { DashboardSidebar } from "./sidebar"

import { useMobileSidebar } from "@/hooks/use-mobile-sidebar"
import { Link } from "@/lib/navigation"

export const MobileSidebar = () => {
	const pathname = usePathname()
	const [isMounted, setIsMounted] = useState(false)

	const onOpen = useMobileSidebar((state) => state.onOpen)
	const onClose = useMobileSidebar((state) => state.onClose)
	const isOpen = useMobileSidebar((state) => state.isOpen)

	useEffect(() => {
		setIsMounted(true)
	}, [])

	useEffect(() => {
		onClose()
	}, [pathname, onClose])

	if (!isMounted) return null

	return (
		<>
			<Button variant="icon" className="mr-2 md:hidden" onClick={onOpen}>
				<Icons.menu />
			</Button>

			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent side="left" className="px-4 pt-16 md:hidden">
					<div className="absolute left-4 top-1.5 p-0">
						<ThemeToggle />
					</div>

					<DashboardSidebar storageKey="t-sidebar-mobile-state" />
				</SheetContent>
			</Sheet>
		</>
	)
}
