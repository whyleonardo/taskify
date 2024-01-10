import { getTranslations } from "next-intl/server"

import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { buttonVariants } from "@/components/ui/button"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet"

import { Link } from "@/lib/navigation"

export const MobileSheet = async () => {
	const translate = await getTranslations("marketing")
	return (
		<Sheet>
			<SheetTrigger className="md:hidden">
				<Icons.menu className="text-foreground" />
			</SheetTrigger>
			<SheetContent className="md:hidden">
				<SheetHeader className="flex items-start">
					<Logo className="opacity-30" />
				</SheetHeader>

				<div className="mt-8 flex flex-col gap-8">
					<Link
						className="group flex items-center gap-1 text-xl hover:text-foreground/70 hover:underline"
						href="/sign-in"
					>
						{translate("login-button")}
						<Icons.chevronRight className="transition group-hover:translate-x-2" />
					</Link>

					<Link
						className="group flex items-center gap-1 text-xl hover:text-foreground/70 hover:underline"
						href="/sign-up"
					>
						{translate("sign-up-button")}
						<Icons.chevronRight className="transition group-hover:translate-x-2" />
					</Link>
				</div>
			</SheetContent>
		</Sheet>
	)
}
