"use client"

import { ReactNode } from "react"

interface ListWrapperProps {
	children: ReactNode
}

export const ListWrapper = ({ children }: ListWrapperProps) => {
	return <li className="h-full w-[272px] shrink-0 select-none">{children}</li>
}
