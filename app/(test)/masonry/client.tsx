"use client"

import Image from "next/image"
import { use } from "react"
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

type Photo = {
    id: string
    author: string
    width: number
    height: number
    download_url: string
}

export default function MasonryClient({
    photos,
}: {
    photos: Promise<Photo[]>
}) {
    const data = use(photos)

    return (
        <main className="min-h-screen bg-zinc-950 px-4 py-8 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mx-auto mb-8 max-w-7xl">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium uppercase tracking-widest text-zinc-500">
                            Gallery
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Masonry Gallery
                        </h1>

                        <p className="mt-2 text-sm text-zinc-400">
                            {data.length} beautiful images
                        </p>
                    </div>
                </div>
            </div>

            {/* Masonry */}
            <div className="mx-auto max-w-7xl">
                <ResponsiveMasonry
                    columnsCountBreakPoints={{
                        350: 1,
                        640: 2,
                        900: 3,
                        1200: 4,
                    }}
                >
                    <Masonry gutter="18px">
                        {[...data].reverse().map((photo) => (
                            <div
                                key={photo.id}
                                className="group relative mb-0 overflow-hidden rounded-2xl bg-zinc-900 shadow-lg"
                            >
                                <Image
                                    src={photo.download_url}
                                    alt={`Photo by ${photo.author}`}
                                    width={photo.width}
                                    height={photo.height}
                                    sizes="
                                        (max-width: 640px) 100vw,
                                        (max-width: 900px) 50vw,
                                        (max-width: 1200px) 33vw,
                                        25vw
                                    "
                                    className="h-auto w-full object-cover transition duration-500 ease-out group-hover:scale-105"
                                />

                                {/* Gradient overlay */}
                                <div
                                    className="
                                        absolute inset-0
                                        bg-gradient-to-t
                                        from-black/70
                                        via-black/0
                                        to-transparent
                                        opacity-0
                                        transition-opacity
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                {/* Author */}
                                <div
                                    className="
                                        absolute
                                        bottom-0
                                        left-0
                                        right-0
                                        translate-y-3
                                        p-4
                                        opacity-0
                                        transition-all
                                        duration-300
                                        group-hover:translate-y-0
                                        group-hover:opacity-100
                                    "
                                >
                                    <p className="text-sm font-medium text-white">
                                        {photo.author}
                                    </p>

                                    <p className="mt-1 text-xs text-white/60">
                                        {photo.width} × {photo.height}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </Masonry>
                </ResponsiveMasonry>
            </div>
        </main>
    )
}