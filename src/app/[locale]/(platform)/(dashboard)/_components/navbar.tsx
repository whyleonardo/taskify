import { ThemeToggle } from "@/components/buttons/ThemeToggle"
import { FormPopover } from "@/components/form/form-popover"
import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import { MobileSidebar } from "./mobile-sidebar"

import { OrganizationSwitcher, UserButton } from "@clerk/nextjs"

export const DashboardNavbar = async () => {
	return (
		<header className="sticky top-0 z-50 flex h-14 w-full items-center bg-muted px-4 shadow">
			<div className="flex w-full items-center gap-x-2">
				<Logo className="mr-2 hidden md:flex" />
				<MobileSidebar />
				<FormPopover side="bottom" sideOffset={8} align="start">
					<Button className="hidden items-center gap-x-2 md:flex">
						Create
						<Icons.plus />
					</Button>
				</FormPopover>

				<FormPopover side="bottom" sideOffset={8} align="start">
					<Button className="flex items-center gap-x-2 md:hidden">
						<Icons.plus />
					</Button>
				</FormPopover>

				<div className="ml-auto flex items-center gap-2">
					<div className="ml-auto hidden items-center gap-x-2 md:flex">
						<ThemeToggle />
						<OrganizationSwitcher
							afterSelectOrganizationUrl="/org/:id"
							afterCreateOrganizationUrl="/org/:id"
							hidePersonal
							afterLeaveOrganizationUrl="/select-org"
							appearance={{
								elements: {
									avatarBox: {
										borderRadius: "50%",
									},
									rootBox: {
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
									},
								},
							}}
						/>
					</div>

					<div className="ml-auto">
						<UserButton afterSignOutUrl="/" />
					</div>
				</div>
			</div>
		</header>
	)
}
