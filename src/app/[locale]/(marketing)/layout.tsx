interface MarketingLayoutProps {
	children: React.ReactNode
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return <div className="h-dvh">{children}</div>
}

export default MarketingLayout
