import { esES, enUS, ptBR } from "@clerk/localizations"

export const locales = ["en", "br", "es"]

export const defaultLocale = "br"

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
		case "es":
			locale = esES
			break
	}

	return locale
}
