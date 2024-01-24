import { FieldErrors } from "./field-errors"

export type ActionState<TInput, TOutput> = {
	fieldErrors?: FieldErrors<TInput>
	error?: string | null
	data?: TOutput
}
