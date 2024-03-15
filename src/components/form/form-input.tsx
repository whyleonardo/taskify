"use client"

import { forwardRef } from "react"
import { useFormStatus } from "react-dom"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { FormErrors } from "./form-errors"

import { cn } from "@/lib/utils"

interface FormInputProps {
	id: string
	label?: string
	type?: string
	placeholder?: string
	required?: boolean
	disabled?: boolean
	errors?: Record<string, string[] | undefined>
	className?: string
	defaultValue?: string
	onBlur?: () => void
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
	(
		{
			id,
			className,
			defaultValue,
			disabled,
			errors,
			label,
			onBlur,
			placeholder,
			required,
			type,
		},
		ref,
	) => {
		const { pending } = useFormStatus()

		return (
			<div className="space-y-2">
				<div className="space-y-1">
					{label ? (
						<Label className="text-xs font-semibold" htmlFor={id}>
							{label}
						</Label>
					) : null}
					<Input
						spellCheck={false}
						onBlur={onBlur}
						defaultValue={defaultValue}
						ref={ref}
						id={id}
						name={id}
						type={type}
						disabled={disabled || pending}
						placeholder={placeholder}
						required={required}
						className={cn("text-sm px-2 py-1 h-7", className)}
						aria-describedby={`${id}-error`}
					/>
				</div>

				<FormErrors id={id} errors={errors} />
			</div>
		)
	},
)

FormInput.displayName = "FormInput"
