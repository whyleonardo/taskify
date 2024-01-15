import React from "react"

import { CreateOrganization } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
	return <CreateOrganization afterCreateOrganizationUrl="/org/:id" />
}
