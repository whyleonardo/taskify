import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
} from "@/components/ui/sheet"

export const MobileDrawer = () => {
	return (
		<Sheet>
			<SheetTrigger className="md:hidden">
				<Icons.menu className="text-white" />
			</SheetTrigger>
			<SheetContent>
				<SheetHeader className="flex items-start">
					<Logo />
				</SheetHeader>
			</SheetContent>
		</Sheet>
	)
}
