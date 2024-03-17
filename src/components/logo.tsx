import Link from "next/link"

import { env } from "@/lib/env.mjs"

interface LogoProps {
	className?: string
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Link className={className} href="/">
			{env.NEXT_PUBLIC_APP_NAME}
		</Link>
	)
}
