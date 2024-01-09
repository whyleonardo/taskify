import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales, localePrefix } from "@/constants/locales"

export default createMiddleware({
	locales,
	localePrefix,
	localeDetection: true,
	defaultLocale,
})

export const config = {
	// Match only internationalized pathnames
	matcher: ["/", "/(en|br|es)/:path*"],
}
