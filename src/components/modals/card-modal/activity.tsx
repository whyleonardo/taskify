"use client"

import { ActivityItem } from "@/components/activity-item"
import { Skeleton } from "@/components/ui/skeleton"

import { AuditLog } from "@prisma/client"
import { ActivityIcon } from "lucide-react"

interface ActvityProps {
	items: AuditLog[]
}

export const Activity = ({ items }: ActvityProps) => {
	return (
		<div className="flex w-full items-start gap-3">
			<ActivityIcon className="size-5" />

			<div className="w-full">
				<p className="mb-2 font-semibold">Activity</p>

				<ol className="mt-2 space-y-4">
					{items.length > 0 ? (
						items.map((item) => <ActivityItem key={item.id} data={item} />)
					) : (
						<span className="text-sm text-muted-foreground">
							No activity registered yet.
						</span>
					)}
				</ol>
			</div>
		</div>
	)
}

Activity.Skeleton = function ActivitySkeleton() {
	return (
		<div className="flex w-full items-start gap-3">
			<Skeleton className="size-6 " />

			<div className="w-full">
				<Skeleton className="mb-2 h-6 w-24" />
				<Skeleton className="h-10 w-full" />
			</div>
		</div>
	)
}
