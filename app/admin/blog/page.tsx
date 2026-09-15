import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogListingAdminClient } from "@/features/blog/components/blog-listing-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Posts | Admin | Design Hub One",
};

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({
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
  });

  return <BlogListingAdminClient posts={posts} />;
}
