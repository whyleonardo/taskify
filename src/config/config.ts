import { env } from "@/lib/env.mjs"

export const siteConfig = {
	name: "Taskify",
	authors: [
		{
			name: "whyleonardo",
			url: "https://github.com/whyleonardo",
		},
	],
	url: env.NEXT_PUBLIC_SITE_BASE_URL,
	ogImage: "",
	description:
		"✨ Collaborate, manage projects, and reach new productivity peaks. From high rises to the home office, the way your team works is unique - accomplish it all with Taskify ✨",
	links: {
		github: env.NEXT_PUBLIC_SITE_BASE_URL,
		twitter: "",
		linkedin: "https://linkedin.com/in/christianlsb",
	},
}

export type SiteConfig = typeof siteConfig
