"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useFormStatus } from "react-dom"

import { Icons } from "@/components/icons"

import { FormErrors } from "./form-errors"

import { defaultImages } from "@/constants/images"
import { unsplash } from "@/lib/unsplash"
import { cn } from "@/lib/utils"
import { UnsplashImage } from "@/types/unsplash-image"
import { Icon } from "@radix-ui/react-select"
import { toast } from "sonner"
import { UrlObject } from "url"

interface FormPickerProps {
	id: string
	errors?: Record<string, string[] | undefined>
}

export const FormPicker = ({ id, errors }: FormPickerProps) => {
	const { pending } = useFormStatus()
	const [images, setImages] = useState<UnsplashImage[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [selectedImageId, setSelectedImageId] = useState<string | null>(null)

	useEffect(() => {
		const fetchImages = async () => {
			try {
				const result = await unsplash.photos.getRandom({
					collectionIds: ["317099"],
					count: 9,
				})

				if (result && result.response) {
					const newImages = result.response as UnsplashImage[]
					setImages(newImages)
				} else {
					toast.error("Failed to get images from unsplash")
				}
			} catch (error) {
				toast.error("Failed to get images from unsplash")
				setImages(defaultImages)
			} finally {
				setIsLoading(false)
			}
		}

		fetchImages()
	}, [])

	if (isLoading) {
		return (
			<div className="flex items-center justify-center">
				<Icons.spinner className="h-6 w-6 animate-spin" />
			</div>
		)
	}
	return (
		<div className="relative">
			<div className="mb-2 grid grid-cols-3 gap-2">
				{images.map((image) => (
					<div
						key={image.id}
						className={cn(
							"aspect-video relative cursor-pointer group hover:opacity-75 bg-muted transition rounded-sm overflow-hidden",
							pending && "opacity-50 hover:opacity-50 cursor-auto ",
						)}
						onClick={() => {
							if (pending) return
							setSelectedImageId(image.id)
						}}
					>
						<input
							type="radio"
							className="hidden"
							id={id}
							name={id}
							checked={selectedImageId === image.id}
							disabled={pending}
							value={`${image.id}|${image.urls.thumb}|${image.urls.full}|${image.links.html}|${image.user.name}`}
						/>

						<Image
							src={image.urls.thumb}
							fill
							className="rounded-sm object-cover"
							alt="Unsplash Image"
						/>

						{selectedImageId === image.id && (
							<div className="absolute inset-y-0 flex h-full w-full items-center justify-center rounded-sm bg-black/30">
								<Icons.selected className="h-4 w-4 text-white" />
							</div>
						)}

						<Link
							href={new URL(image.links.html)}
							target="_blank"
							className="absolute bottom-0 w-full truncate rounded-b-sm bg-black/50 p-1 text-[8px] text-white opacity-0 hover:underline group-hover:opacity-100"
						>
							{image.user.name} on Unsplash
						</Link>
					</div>
				))}
			</div>
			<FormErrors id="image" errors={errors} />
		</div>
	)
}
