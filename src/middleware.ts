import createMiddleware from "next-intl/middleware"

import { defaultLocale, locales, localePrefix } from "@/constants/locales"
import { authMiddleware } from "@clerk/nextjs"

const intlMiddleware = createMiddleware({
	locales,
	localePrefix,
	localeDetection: true,
	defaultLocale,
})

export default authMiddleware({
	beforeAuth(request) {
		return intlMiddleware(request)
	},

	publicRoutes: ["/", "/sign-in", "/sign-up"],
})

export const config = {
	// Match only internationalized pathnames
	matcher: [
		"/",
		// "/(en|br|es)/:path*",
		"/((?!.+\\.[\\w]+$|_next).*)",
		"/(api|trpc)(.*)",
	],
}
