import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogListingAdminClient } from "@/features/blog/components/blog-listing-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts | Admin | Design Hub One",
};

export default async function AdminBlogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const page = typeof params.page === "string" ? parseInt(params.page) : 1;
  const pageSize = typeof params.pageSize === "string" ? parseInt(params.pageSize) : 10;
  const search = typeof params.search === "string" ? params.search : "";

  const skip = (page - 1) * pageSize;
  const take = pageSize;

  const where = search
    ? {
        title: {
          contains: search,
          mode: "insensitive" as const,
        },
      }
    : {};

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        featuredImage: true,
        publishedAt: true,
        createdAt: true,
        isFeatured: true,
        category: {
          select: {
            id: true,
            name: true,
          },
        },
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      skip,
      take,
    }),
    prisma.blogPost.count({ where }),
  ]);

  const pageCount = Math.ceil(total / pageSize);

  return (
    <BlogListingAdminClient 
      posts={posts} 
      pageCount={pageCount} 
      currentPage={page - 1} // zero-indexed for tanstack table
      pageSize={pageSize}
      searchValue={search}
    />
  );
}
