import { db } from "@/lib/db"
import { auth, currentUser } from "@clerk/nextjs"
import { ACTION, ENTITY_TYPE } from "@prisma/client"

interface Props {
	entityId: string
	entityType: ENTITY_TYPE
	entityTitle: string
	action: ACTION
}

export const createAuditLog = async (props: Props) => {
	try {
		const { orgId } = auth()

		const user = await currentUser()
		if (!orgId || !user) {
			return
		}

		const { action, entityId, entityTitle, entityType } = props

		await db.auditLog.create({
			data: {
				orgId,
				action,
				entityId,
				entityType,
				entityTitle,
				userId: user.id,
				userImage: user.imageUrl,
				userName: user.firstName + " " + user.lastName,
			},
		})
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error("[AUDIT_LOG_ERROR]", error)
	}
}
