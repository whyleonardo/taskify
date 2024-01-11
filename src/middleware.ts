import createMiddleware from "next-intl/middleware"
import { NextResponse } from "next/server"

import { defaultLocale, locales, localePrefix } from "@/constants/locales"
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs"

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
	afterAuth(auth, req) {
		const response = intlMiddleware(req)
		const actualLocale = req.cookies.get("NEXT_LOCALE")?.value

		if (auth.userId && auth.isPublicRoute) {
			let path = `/${actualLocale}/select-org`

			if (auth.orgId) {
				path = `/${actualLocale}/app/organization/${auth.orgId}`
			}

			const orgSelection = new URL(path, req.url)

			response.headers.set("x-middleware-rewrite", orgSelection.toString())

			return response
		}

		if (!auth.userId && !auth.isPublicRoute) {
			return redirectToSignIn({ returnBackUrl: req.url })
		}

		if (
			auth.userId &&
			!auth.orgId &&
			req.nextUrl.pathname !== `${actualLocale}/select-org`
		) {
			const orgSelection = new URL(`${actualLocale}/select-org`, req.url)
			response.headers.set("x-middleware-rewrite", orgSelection.toString())

			return response
		}
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
