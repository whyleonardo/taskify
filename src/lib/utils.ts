import { env } from "@/lib/env.mjs"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function absoluteUrl(path: string) {
	return `${env.NEXT_PUBLIC_SITE_BASE_URL}${path}`
}
