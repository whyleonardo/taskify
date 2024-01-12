"use client"

import { useParams, usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

import {
	useOrganizationList,
	useUser,
	useAuth,
	useOrganization,
} from "@clerk/nextjs"

type Params = {
	orgId: string
}

export const OrgControl = () => {
	const { setActive } = useOrganizationList()
	const params: Params = useParams()
	const pathname = usePathname()
	const router = useRouter()

	const { orgId } = useAuth()

	const { user } = useUser()
	const { isLoaded } = useOrganization()

	const userIsOnPersonalProfile = !orgId

	useEffect(() => {
		if (userIsOnPersonalProfile && pathname.includes("/org") && isLoaded) {
			router.push(`/${user?.username}`)
		}
	}, [userIsOnPersonalProfile, pathname, isLoaded, user?.username, router])

	useEffect(() => {
		if (!setActive) return

		setActive({
			organization: params.orgId,
		})
	}, [params.orgId, setActive])

	return null
}
