import { Avatar, AvatarImage } from "@/components/ui/avatar"

import { generateLogMessage } from "@/lib/generate-log-message"
import { AuditLog } from "@prisma/client"
import { format } from "date-fns"

interface ActivityItemProps {
	data: AuditLog
}

export const ActivityItem = ({ data }: ActivityItemProps) => {
	return (
		<li className="group flex items-center gap-2">
			<div className="relative">
				<Avatar className="relative z-50 size-8">
					<AvatarImage src={data.userImage} />
				</Avatar>

				<div className="absolute inset-x-[50%] -bottom-8 z-0 h-10 w-px bg-muted-foreground/15 group-last:hidden" />
			</div>

			<div className="flex flex-col space-y-0.5">
				<p className="text-sm text-muted-foreground">
					<span className="font-semibold text-foreground">
						{data.userName}&nbsp;
					</span>
					{generateLogMessage(data)}
				</p>
				<p className="text-xs text-muted-foreground">
					{format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
				</p>
			</div>
		</li>
	)
}
