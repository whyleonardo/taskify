import { unstable_setRequestLocale } from "next-intl/server"

interface MarketingLayoutProps {
	children: React.ReactNode
	params: {
		locale: string
	}
}

const MarketingLayout = ({
	children,
	params: { locale },
}: MarketingLayoutProps) => {
	unstable_setRequestLocale(locale)
	return <div className="h-dvh">{children}</div>
}

export default MarketingLayout
