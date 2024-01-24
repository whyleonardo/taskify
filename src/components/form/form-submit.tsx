"use client"
import { useFormStatus } from "react-dom"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"

interface FormSubmitProps {
	className?: string
	children?: React.ReactNode
	disabled?: boolean
	variant?:
		| "secondary"
		| "destructive"
		| "default"
		| "outline"
		| "secondary-outline"
		| "ghost"
		| "ghost-secondary"
		| "link"
		| "icon"
		| "icon-secondary"
		| null
		| undefined
}

export const FormSubmit = ({
	children,
	className,
	disabled,
	variant,
}: FormSubmitProps) => {
	const { pending } = useFormStatus()
	return (
		<Button
			disabled={pending || disabled}
			className={cn(className)}
			variant={variant}
		>
			{pending ? <Icons.spinner className="animate-spin" /> : children}
		</Button>
	)
}

FormSubmit.displayName = "FormSubmit"
