import { redirect } from "next/navigation"

import { ActivityItem } from "@/components/activity-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs"

export const ActivityList = async () => {
	const { orgId } = auth()

	if (!orgId) {
		redirect("/select-org")
	}

	const auditLogs = await db.auditLog.findMany({
		where: {
			orgId,
		},
		orderBy: {
			createdAt: "desc",
		},
	})

	return (
		<ScrollArea className="mb-2 h-[calc(100dvh-200px)]">
			<ol className="space-y-6">
				<p className="hidden text-center text-xs text-muted-foreground last:block">
					No activity found inside this organization
				</p>

				{auditLogs.map((log) => (
					<ActivityItem key={log.id} data={log} />
				))}
			</ol>
		</ScrollArea>
	)
}

ActivityList.Skeleton = function ActivityListSkeleton() {
	return (
		<div className="mt-4 space-y-4">
			<Skeleton className="h-14 w-[80%]" />
			<Skeleton className="h-14 w-[50%]" />
			<Skeleton className="h-14 w-[70%]" />
			<Skeleton className="h-14 w-[80%]" />
			<Skeleton className="h-14 w-[75%]" />
		</div>
	)
}
