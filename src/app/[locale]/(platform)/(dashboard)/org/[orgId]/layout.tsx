import { OrgControl } from "./_components/org-control"

import { auth } from "@clerk/nextjs"
import { startCase } from "lodash"

interface OrganizationIdProps {
	children: React.ReactNode
}

export async function generateMetadata({
	params: { locale },
}: {
	params: { locale: string }
}) {
	const { orgSlug } = auth()

	if (locale === "en") {
		return {
			title: startCase(orgSlug || "organization"),
		}
	}

	if (locale === "br") {
		return {
			title: startCase(orgSlug || "organização"),
		}
	}
}

const OrganizationIdLayout = ({ children }: OrganizationIdProps) => {
	return (
		<>
			<OrgControl />
			{children}
		</>
	)
}

export default OrganizationIdLayout
