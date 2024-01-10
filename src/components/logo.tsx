import { env } from "@/lib/env.mjs"
import { Link } from "@/lib/navigation"

interface LogoProps {
	className?: string
}

export const Logo = ({ className }: LogoProps) => {
	return (
		<Link className={className} href="/">
			{env.APP_NAME}
		</Link>
	)
}
