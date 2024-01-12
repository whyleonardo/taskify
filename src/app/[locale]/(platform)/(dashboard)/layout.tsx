import { DashboardNavbar } from "./_components/navbar"

interface DashboardLayoutProps {
	children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
	return (
		<div className="h-full">
			<DashboardNavbar />

			{children}
		</div>
	)
}

export default DashboardLayout
