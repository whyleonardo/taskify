import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
	server: {
		CLERK_SECRET_KEY: z.string().min(1),
	},
	client: {
		SITE_BASE_URL: z.string().url().min(1),
		APP_NAME: z.string().min(1),
		CLERK_PUBLISHABLE_KEY: z.string().min(1),
	},
	// If you're using Next.js < 13.4.4, you'll need to specify the runtimeEnv manually
	runtimeEnv: {
		SITE_BASE_URL: process.env.NEXT_PUBLIC_SITE_BASE_URL,
		APP_NAME: process.env.NEXT_PUBLIC_APP_NAME,
		CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
	},
	// For Next.js >= 13.4.4, you only need to destructure client variables:
	// experimental__runtimeEnv: {
	//   NEXT_PUBLIC_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_PUBLISHABLE_KEY,
	// }
})
