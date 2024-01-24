import React from "react"

import { OrganizationList } from "@clerk/nextjs"

export default function SelectOrganizationPage() {
	return (
		<OrganizationList
			afterSelectOrganizationUrl="/org/:id"
			hidePersonal
			skipInvitationScreen
		/>
	)
}
