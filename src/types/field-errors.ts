/* eslint-disable no-unused-vars */

export type FieldErrors<T> = {
	[K in keyof T]?: string[]
}
