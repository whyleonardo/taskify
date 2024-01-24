import { useTranslations } from "next-intl"

import { Icons } from "@/components/icons"

interface FormErrorsProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

export const FormErrors = ({ id, errors }: FormErrorsProps) => {
	const t = useTranslations("form")

	if (!errors) {
		return null
	}

	return (
		<div
			id={`${id}-error`}
			aria-live="polite"
			className="mt-2 text-xs text-destructive"
		>
			{errors?.[id]?.map((error) => (
				<div
					key={id}
					className="flex items-center gap-x-1 rounded-sm border border-destructive/30 bg-destructive/10 p-1.5 font-medium"
				>
					{error}
					<Icons.xCircle className="h-3.5 w-3.5" />
				</div>
			))}
		</div>
	)
}
