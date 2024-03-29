import { Metadata, type Viewport } from "next"

import { ScreenSizeIndicator } from "@/components/screen-size-indicator"
import { Toaster } from "@/components/ui/sonner"

import { siteConfig } from "@/config/config"
import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/providers/theme-provider"
import { fontCalSans, fontMono, fontPoppins, fontSans } from "@/styles/fonts"

import "@/styles/global.css"
import "@/styles/base.css"

export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "white" },
		{ media: "(prefers-color-scheme: dark)", color: "black" },
	],
}

export const metadata: Metadata = {
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: ["Trello", "Productivity", "Management", "Tasks", "Workflow"],
	authors: siteConfig.authors,
	creator: "whyleonardo",
	metadataBase: new URL(siteConfig.url),
	openGraph: {
		type: "website",
		locale: "en_US",
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
		images: [
			{
				url: siteConfig.ogImage,
				width: 1200,
				height: 630,
				alt: siteConfig.name,
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: siteConfig.name,
		description: siteConfig.description,
		images: [siteConfig.ogImage],
		creator: "@christianlsb0",
	},
	icons: {
		icon: "/favicon.png",
	},
}

interface RootLayoutProps {
	children: React.ReactNode
	params: {
		locale: string
	}
}

const RootLayout = ({ children, params: { locale } }: RootLayoutProps) => {
	return (
		<html lang={locale} suppressHydrationWarning>
			<head />
			<body
				className={cn(
					"bg-background min-h-dvh font-sans antialiased",
					fontSans,
					fontMono,
					fontCalSans,
					fontPoppins,
				)}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
					{children}
					<Toaster />
				</ThemeProvider>
				<ScreenSizeIndicator />
			</body>
		</html>
	)
}

export default RootLayout
