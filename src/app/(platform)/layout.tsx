import { ModalProvider } from "@/components/modals/card-modal/modal-provider"

import { ClerkProvider } from "@/providers/clerk-provider"
import { QueryProvider } from "@/providers/query-provider"

interface PlatformLayoutProps {
	children: React.ReactNode
}

const PlatformLayout = ({ children }: PlatformLayoutProps) => {
	return (
		<ClerkProvider>
			<QueryProvider>
				<ModalProvider />
				{children}
			</QueryProvider>
		</ClerkProvider>
	)
}

export default PlatformLayout
