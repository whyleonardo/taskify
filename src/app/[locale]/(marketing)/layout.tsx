"use client"

import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

import { useAuth } from "@clerk/nextjs"

interface MarketingLayoutProps {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	const { userId } = useAuth()
	const { push } = useRouter()
	const pathname = usePathname()

	if (userId && pathname.match("/")) {
		push("/app")
	}
	return <div className="h-dvh">{children}</div>
}

export default MarketingLayout
