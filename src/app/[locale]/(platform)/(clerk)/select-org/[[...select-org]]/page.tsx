import { OrganizationList } from "@clerk/nextjs"

export default function CreateOrganizationPage() {
	return (
		<OrganizationList
			hidePersonal
			afterSelectOrganizationUrl="/org/:id"
			afterCreateOrganizationUrl="/org/:id"
		/>
	)
}
