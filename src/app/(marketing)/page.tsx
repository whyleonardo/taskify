import Link from "next/link"

import { MarketingFooter } from "./_components/footer"
import { MarketingNavbar } from "./_components/navbar"
import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

const MarketingPage = () => {
	return (
		<>
			<MarketingNavbar />

			<main className="relative flex h-[calc(100%-7.5rem)] items-center justify-center bg-neutral-200/50 bg-grid-black/5 dark:bg-background dark:bg-grid-white/5">
				<div className="absolute inset-0 h-full w-full bg-radial-gradient from-transparent from-55% to-neutral-100 to-90% md:from-45% md:to-70% dark:to-background" />

				<div className="container flex w-fit flex-col items-center">
					<span className="mb-2 flex w-fit items-center gap-2 rounded-full bg-accent p-2 text-center font-poppins text-sm font-semibold uppercase tracking-tighter text-accent-foreground shadow-lg md:p-4 md:text-lg dark:bg-muted dark:text-amber-200">
						<Icons.medal /> The Best to Manage Your Tasks
					</span>

					<div className="my-4 flex flex-col items-center space-y-4 font-calSans ">
						<h1 className="text text-balance text-center text-4xl md:text-6xl">
							Taskify helps team
						</h1>

						<span className="group relative z-50 rounded-md bg-gradient-to-r from-fuchsia-600 to-pink-600 px-4 pb-4 pt-2 text-4xl text-white md:text-6xl">
							work forward
						</span>
					</div>

					<p className="mx-auto mt-2 max-w-md text-balance text-center text-sm text-foreground/50 md:max-w-2xl md:text-xl">
						Collaborate, manage projects, and reach new productivity peaks. From
						high rises to the home office, the way your team works is unique -
						accomplish it all with Taskify.
					</p>

					<Button
						size="lg"
						className="relative z-50 mt-6 bg-foreground text-background hover:bg-foreground/90"
					>
						<Link href="/sign-up">Start Now</Link>
					</Button>
				</div>
			</main>

			<MarketingFooter />
		</>
	)
}

export default MarketingPage
