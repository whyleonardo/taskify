import { SignUp } from "@clerk/nextjs"

const ClerkSignUpPage = () => {
	return <SignUp afterSignUpUrl="/select-org" />
}

export default ClerkSignUpPage
