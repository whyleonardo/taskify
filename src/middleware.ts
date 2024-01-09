import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales } from "@/constants/locales"

export default createMiddleware({
	locales,
	localePrefix: "never",
	localeDetection: true,
	defaultLocale,
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en|br|es)/:path*"],
}
