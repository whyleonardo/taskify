"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

import { cn } from "@/lib/utils"

export type Organization = {
	id: string
	slug: string
	imageUrl: string
	name: string
}

interface NavItemProps {
	isExpanded: boolean
	isActive: boolean
	organization: Organization
	// eslint-disable-next-line no-unused-vars
	onExpand: (id: string) => void
}

export const NavItem = ({
	isExpanded,
	isActive,
	organization,
	onExpand,
}: NavItemProps) => {
	const routes = [
		{
			label: "Boards",
			icon: <Icons.layout />,
			href: `/org/${organization.id}`,
		},
		{
			label: "Activity",
			icon: <Icons.activity />,
			href: `/org/${organization.id}/activity`,
		},
		{
			label: "Settings",
			icon: <Icons.settings />,
			href: `/org/${organization.id}/settings`,
		},
		{
			label: "Billing",
			icon: <Icons.creditCard />,
			href: `/org/${organization.id}/billing`,
		},
	]

	const pathname = usePathname()

	return (
		<AccordionItem value={organization.id} className="border-none">
			<AccordionTrigger
				onClick={() => onExpand(organization.id)}
				className={cn(
					"flex items-center gap-x-2 p-1.5 text-foreground/70 hover:bg-neutral-500/10 transition text-start no-underline rounded hover:no-underline",
					isActive && !isExpanded && "bg-sky-500/10 !text-sky-700",
				)}
			>
				<div className="flex items-center gap-x-2">
					<div className="relative h-7 w-7">
						<Image
							src={organization.imageUrl}
							alt="Organization"
							className="rounded-sm object-cover"
							fill
						/>
					</div>

					<span className="text-sm font-medium">{organization.name}</span>
				</div>
			</AccordionTrigger>

			<AccordionContent className="pt-1">
				{routes.map((route) => (
					<Button
						asChild
						key={route.href}
						variant="ghost"
						size="default"
						className={cn(
							"w-full font-normal justify-start gap-x-2 pl-10 mb-1 rounded",
							pathname === route.href && "bg-sky-500/10 text-sky-700",
						)}
					>
						<Link href={route.href}>
							{route.icon}
							{route.label}
						</Link>
					</Button>
				))}
			</AccordionContent>
		</AccordionItem>
	)
}

NavItem.Skeleton = function SkeletonNavItem() {
	return (
		<div className="flex items-center gap-x-2">
			<div className="relative h-10 w-10 shrink-0">
				<Skeleton className="absolute h-full w-full" />
			</div>

			<Skeleton className="h-10 w-full" />
		</div>
	)
}
