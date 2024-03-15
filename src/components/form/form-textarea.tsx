"use client"

import { KeyboardEventHandler, forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

import { FormErrors } from "./form-errors"

import { cn } from "@/lib/utils"

interface FormTextareaProps {
	id: string
	label?: string
	placeholder?: string
	name?: string
	required?: boolean
	spellCheck?: boolean
	disabled?: boolean
	errors?: Record<string, string[] | undefined>
	className?: string
	onBlur?: () => void
	onClick?: () => void
	onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement | undefined>
	defaultValue?: string
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
	(
		{
			id,
			className,
			defaultValue,
			disabled,
			errors,
			label,
			onBlur,
			onClick,
			onKeyDown,
			spellCheck,
			placeholder,
			name,
			required,
		},
		ref,
	) => {
		const { pending } = useFormStatus()

		return (
			<div className="w-full space-y-2">
				<div className="w-full space-y-1">
					{label && (
						<Label htmlFor={id} className="text-xs font-semibold">
							{label}
						</Label>
					)}

					<Textarea
						ref={ref}
						name={name}
						onKeyDown={onKeyDown}
						onClick={onClick}
						required={required}
						spellCheck={spellCheck}
						placeholder={placeholder}
						className={cn(
							"resize-none focus-visible:ring-0 focus-visible:ring-offset-0 reing-0 focus-ring-0 outline none shadow-sm",
							className,
						)}
						defaultValue={defaultValue}
						disabled={pending || disabled}
						onBlur={onBlur}
						aria-describedby={`${id}-error`}
					/>

					<FormErrors id={id} errors={errors} />
				</div>
			</div>
		)
	},
)

FormTextarea.displayName = "FormTextarea"
