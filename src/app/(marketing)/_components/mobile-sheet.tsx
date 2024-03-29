import Link from "next/link"

import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet"

export const MobileSheet = async () => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden">
				<Icons.menu className="text-foreground" />
			</SheetTrigger>
			<SheetContent className="md:hidden">
				<SheetHeader className="flex items-start">
					<Logo className="opacity-80" />
				</SheetHeader>

				<div className="mt-8 flex flex-col gap-8">
					<Link
						className="group flex items-center gap-1 text-xl hover:text-foreground/70 hover:underline hover:underline-offset-8"
						href="/sign-in"
					>
						Login
						<Icons.chevronRight className="transition group-hover:translate-x-2" />
					</Link>

					<Link
						className="group flex items-center gap-1 text-xl hover:text-foreground/70 hover:underline hover:underline-offset-8"
						href="/sign-up"
					>
						Create New Account
						<Icons.chevronRight className="transition group-hover:translate-x-2" />
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}
