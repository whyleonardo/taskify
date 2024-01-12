import { DashboardSidebar } from "../_components/sidebar"

interface OrganizationLayoutProps {
	children: React.ReactNode
}

const OrganizationLayout = ({ children }: OrganizationLayoutProps) => {
	return (
		<main className="mx-auto h-full px-4 pt-12 md:pt-14">
			<div className="flex gap-x-7">
				<div className="hidden w-64 shrink-0 md:block">
					<DashboardSidebar />
				</div>
				{children}
			</div>
		</main>
	)
}

export default OrganizationLayout
