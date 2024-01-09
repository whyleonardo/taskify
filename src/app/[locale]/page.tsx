import { getTranslations } from "next-intl/server"

import { SocialLinks } from "@/components/buttons/SocialLinks"
import { ThemeToggle } from "@/components/buttons/ThemeToggle"

export default async function IndexPage() {
	const t = await getTranslations("Index")
	return (
		<div className="h-screen">
			<header className="container flex h-14 items-center justify-end pt-2">
				<div className="flex items-center gap-2 ">
					<SocialLinks.Github />
					<SocialLinks.Linkedin />
					<ThemeToggle />
				</div>
			</header>

			<div className="flex h-[calc(100%-3.5rem)] items-center justify-center font-black">
				<span className="flex flex-wrap items-center justify-center gap-1 px-4 font-calSans text-3xl tracking-tight sm:text-5xl xl:text-8xl">
					{t("title")}
				</span>
			</div>
		</div>
	)
}
