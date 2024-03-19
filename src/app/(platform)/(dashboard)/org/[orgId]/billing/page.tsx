import { checkSubscription } from "@/lib/subscription"
import { Info } from "../_components/info"
import { Separator } from "@/components/ui/separator"
import { SubscriptionButton } from "./_components/subscription-button"
import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"
import { format } from "date-fns"

const BillingPage = async () => {
	const isPro = await checkSubscription()

	const { orgId } = auth()

	if (!orgId) {
		return
	}

	const subscriptionInfo = await db.orgSubscription.findUnique({
		where: {
			orgId,
		},
		select: {
			stripeCurrentPeriodEnd: true,
		},
	})

	return (
		<div className="w-full">
			<Info isPro={isPro} />
			<Separator className="my-2" />

			<div className="w-full p-5 rounded space-y-8 mt-4">
				<div>
					<h2 className="text-lg font-bold">Subscription Plan</h2>
					<p className="text-sm text-neutral-500 dark:text-muted-foreground">
						This org are currently on the{" "}
						<strong>{isPro ? "Pro" : "Free"}</strong> plan.
					</p>
				</div>

				<div className="flex w-full justify-between">
					<SubscriptionButton isPro={isPro} />

					{isPro && (
						<p className="text-xs text-muted-foreground tracking-tight">
							Your plan renews in:{" "}
							{format(
								subscriptionInfo?.stripeCurrentPeriodEnd as Date,
								"MMM d, yyyy",
							)}
						</p>
					)}
				</div>
			</div>

			{/* {isPro ? (
				<p className="font-medium tracking-tighter mb-2">
					Your plan expires in:{" "}
					<span>
						{format(
							subscriptionInfo?.stripeCurrentPeriodEnd as Date,
							"MMM d, yyyy 'at' h:mm a",
						)}
					</span>
				</p>
			) : (
				<p className="mb-2">
					This organization don't have a <strong>Pro</strong> subscription
				</p>
			)}

			*/}
		</div>
	)
}

export default BillingPage
