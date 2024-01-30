import { SignIn } from "@clerk/nextjs"

const ClerkSignInPage = () => {
	return <SignIn afterSignInUrl="/select-org" />
}

export default ClerkSignInPage
