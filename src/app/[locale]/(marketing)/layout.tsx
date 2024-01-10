import { MarketingFooter } from "./_components/footer"
import { MarketingNavbar } from "./_components/navbar"

interface MarketingLayoutProps {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return (
		<div className="h-dvh">
			<MarketingNavbar />

			<main className="h-[calc(100%-7.5rem)] w-full">{children}</main>

			<MarketingFooter />
		</div>
	)
}

export default MarketingLayout
