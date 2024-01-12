import { OrgControl } from "./_components/org-control"

interface OrganizationIdProps {
	children: React.ReactNode
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
