"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent } from "@/components/ui/dialog"

import { stripeRedirect } from "@/actions/stripe-redirect"
import { useAction } from "@/hooks/use-action"
import { useProModal } from "@/hooks/use-pro-modal"
import { Loader2 } from "lucide-react"
import { toast } from "sonner"

export const ProModal = () => {
	const proModal = useProModal()

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => {
			window.location.href = data
		},
		onError: (error) => {
			toast.error(error)
		},
	})

	const onClick = () => {
		execute({})
	}

	return (
		<Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
			<DialogContent className="max-w-md overflow-hidden p-0">
				<div className="relative flex aspect-video items-center justify-center overflow-hidden bg-muted-foreground/10">
					<Image
						src="/pro-modal-hero.svg"
						fill
						alt="Hero"
						className="object-fit mt-2 hidden dark:block"
					/>

					<Image
						src="/pro-modal-hero2.svg"
						fill
						alt="Hero"
						className="object-fit mt-2 dark:hidden"
					/>
				</div>

				<div className="mx-auto space-y-6 p-6">
					<h2 className="text-xl font-semibold">
						Upgrade to Taskify Pro Today!
					</h2>

					<p className="text-xs font-semibold">Explore the best of Taskify</p>

					<div className="pl-3">
						<ul className="list-disc text-sm">
							<li>Unlimited boards</li>
							<li>Advanced checklists</li>
							<li>Admin and security</li>
							<li>And more...</li>
						</ul>
					</div>

					<Button
						onClick={onClick}
						disabled={isLoading}
						variant="transparent"
						className="w-full border-none bg-foreground text-sm text-background transition hover:bg-foreground/90 focus-visible:ring-sky-500"
					>
						{isLoading ? (
							<Loader2 className="size-5 animate-spin" />
						) : (
							"Upgrade"
						)}
					</Button>
				</div>
			</DialogContent>
		</Dialog>
	)
}
