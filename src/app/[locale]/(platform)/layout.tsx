import { ClerkProvider } from "@/providers/ClerkProvider"

interface PlatformLayoutProps {
	children: React.ReactNode
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
	return <ClerkProvider>{children}</ClerkProvider>
}

export default PlatformLayout
