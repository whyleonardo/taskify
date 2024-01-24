/* eslint-disable no-unused-vars */
import { ActionState } from "@/types/action-state"
import { FieldErrors } from "@/types/field-errors"
import { z } from "zod"

export const createSafeAction = <TInput, TOutput>(
	schema: z.Schema<TInput>,
	handler: (validatedData: TInput) => Promise<ActionState<TInput, TOutput>>,
) => {
	return async (data: TInput): Promise<ActionState<TInput, TOutput>> => {
		const validationResult = schema.safeParse(data)

		if (!validationResult.success) {
			return {
				fieldErrors: validationResult.error.flatten()
					.fieldErrors as FieldErrors<TInput>,
			}
		}

		return handler(validationResult.data)
	}
}
