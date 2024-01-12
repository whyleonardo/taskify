import { Icons } from "@/components/icons"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

import { MobileSidebar } from "./mobile-sidebar"

import { OrganizationSwitcher, UserButton, currentUser } from "@clerk/nextjs"

export const DashboardNavbar = async () => {
	const user = await currentUser()

	return (
		<header className="sticky top-0 z-50 flex h-14 w-full items-center bg-muted px-4 shadow">
			<div className="flex w-full items-center gap-x-2">
				<Logo className="mr-2 hidden md:flex" />

				<MobileSidebar />

				<Button className="hidden items-center gap-x-2 md:flex">
					Create
					<Icons.plus />
				</Button>

				<Button className="flex items-center gap-x-2 md:hidden">
					<Icons.plus />
				</Button>

				<div className="ml-auto hidden items-center gap-x-2 md:flex">
					<OrganizationSwitcher
						afterSelectOrganizationUrl="/org/:id"
						afterCreateOrganizationUrl="/org/:id"
						afterLeaveOrganizationUrl={`/${user?.username}`}
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
					<UserButton
						afterSignOutUrl="/"
						appearance={{
							elements: {
								avatarBox: {
									height: 30,
									width: 30,
								},
							},
						}}
					/>
				</div>
			</div>
		</header>
	)
}
