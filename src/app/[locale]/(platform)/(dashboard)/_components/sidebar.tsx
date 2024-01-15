"use client"

import { Icons } from "@/components/icons"
import { Accordion } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

import { NavItem, type Organization } from "./nav-item"

import { Link } from "@/lib/navigation"
import { useOrganization, useOrganizationList } from "@clerk/nextjs"
import { useLocalStorage } from "usehooks-ts"

interface DashboardSidebarProps {
	storageKey?: string
}

export const DashboardSidebar = ({
	storageKey = "t-sidebar-state",
}: DashboardSidebarProps) => {
	const [expanded, setExpanded] = useLocalStorage<Record<string, any>>(
		storageKey,
		{},
	)

	const { organization: activeOrganization, isLoaded: isLoadedOrg } =
		useOrganization()

	const { userMemberships, isLoaded: isLoadedOrgList } = useOrganizationList({
		userMemberships: {
			infinite: true,
		},
	})

	const defaultAccordionValue: string[] = Object.keys(expanded).reduce(
		(acc: string[], key: string) => {
			if (expanded[key]) {
				acc.push(key)
			}

			return acc
		},
		[],
	)

	const onExpand = (id: string) => {
		setExpanded((curr) => ({
			...curr,
			[id]: !expanded[id],
		}))
	}

	if (!isLoadedOrg || !isLoadedOrg || userMemberships.isLoading) {
		return (
			<>
				<Skeleton className="h-4 w-full bg-red-500" />
			</>
		)
	}
	return (
		<>
			<div className="mb-2 flex items-center text-xs font-medium">
				<span className="pl-4">Workspaces</span>

				<Button asChild type="button" variant="ghost" className="ml-auto">
					<Link href="/create-org">
						<Icons.plus />
					</Link>
				</Button>
			</div>

			<Accordion
				type="multiple"
				defaultValue={defaultAccordionValue}
				className="space-y-2"
			>
				{userMemberships.data &&
					userMemberships.data.map(({ organization }) => (
						<NavItem
							key={organization.id}
							isExpanded={expanded[organization.id]}
							organization={organization as Organization}
							onExpand={onExpand}
							isActive={activeOrganization?.id === organization.id}
						/>
					))}
			</Accordion>
		</>
	)
}
