import { Poppins } from "next/font/google"
import localFont from "next/font/local"

import { GeistMono, GeistSans } from "geist/font"

const localCalSans = localFont({
	src: "./cal-sans/CalSans-SemiBold.woff2",
	variable: "--font-cal-sans",
})
const poppins = Poppins({
	weight: ["400", "500", "600"],
	subsets: ["latin"],
	variable: "--font-poppins",
})

export const fontPoppins = poppins.variable
export const fontCalSans = localCalSans.variable
export const fontSans = GeistSans.variable
export const fontMono = GeistMono.variable
