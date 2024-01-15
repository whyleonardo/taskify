import { PrismaClient } from "@prisma/client/edge"

declare global {
	// eslint-disable-next-line no-unused-vars
	var prisma: PrismaClient | undefined
}

export const db = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== "production") globalThis.prisma = db
