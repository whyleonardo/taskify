interface MarketingLayoutProps {
	children: React.ReactNode
	params: {
		locale: string
	}
}

const MarketingLayout = ({ children }: MarketingLayoutProps) => {
	return <div className="h-dvh">{children}</div>
}

export default MarketingLayout
