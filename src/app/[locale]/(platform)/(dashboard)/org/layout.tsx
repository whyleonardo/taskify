import { DashboardSidebar } from "../_components/sidebar"
import { ScrollArea } from "@/components/ui/scroll-area"

interface OrganizationLayoutProps {
	children: React.ReactNode
}

const OrganizationLayout = ({ children }: OrganizationLayoutProps) => {
	return (
		<main className="mx-auto h-[calc(100dvh-3.5rem)] overflow-hidden px-4 pt-12 md:pt-14">
			<div className="flex gap-x-7">
				<ScrollArea className="hidden h-[calc(100vh-7.5rem)] w-72 shrink-0 px-4 md:block">
					<DashboardSidebar />
				</ScrollArea>
				{children}
			</div>
		</main>
	)
}

export default OrganizationLayout
