import { OrganizationProfile } from "@clerk/nextjs"

const SettingsPage = () => {
	return (
		<>
			<div className="w-full overflow-hidden md:hidden">
				<OrganizationProfile
					appearance={{
						elements: {
							rootBox: {
								boxShadow: "none",
								width: "100%",
							},
							card: {
								boxShadow: "none",
								width: "100%",
							},
						},
					}}
				/>
			</div>

			<div className="hidden w-full overflow-hidden md:block">
				<OrganizationProfile
					appearance={{
						elements: {
							rootBox: {
								boxShadow: "none",
								width: "100%",
							},
							card: {
								boxShadow: "none",
								width: "95%",
							},
						},
					}}
				/>
			</div>
		</>
	)
}

export default SettingsPage
