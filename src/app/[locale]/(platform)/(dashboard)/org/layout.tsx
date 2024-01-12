interface OrganizationLayoutProps {
	children: React.ReactNode
}

const OrganizationLayout = ({ children }: OrganizationLayoutProps) => {
	return (
		<main className="mx-auto h-full max-w-6xl border px-4 pt-12 md:pt-14 2xl:max-w-screen-xl">
			<div className="flex gap-x-7">
				<div className="hidden w-64 shrink-0 bg-red-500 md:block">
					{children}
				</div>
			</div>
		</main>
	)
}

export default OrganizationLayout
