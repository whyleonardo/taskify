import { enUS, ptBR } from "@clerk/localizations"

export const locales = ["en", "br"]

export const defaultLocale = "en"

export const localePrefix = "never"

export const clerkLocale = (lang: string) => {
	let locale = enUS

	switch (lang) {
		case "en":
			locale = enUS
			break
		case "br":
			locale = ptBR
			break
	}

	return locale
}
