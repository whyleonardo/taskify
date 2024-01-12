interface OrganizationIdPageProps {
	params: {
		orgId: string
	}
}

const OrganizationIdPage = ({ params }: OrganizationIdPageProps) => {
	return <div>{params.orgId}</div>
}

export default OrganizationIdPage
