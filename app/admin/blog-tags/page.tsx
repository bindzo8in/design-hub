import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogTagsAdminClient } from "@/features/blog/components/blog-tags-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Tags | Admin | Design Hub One",
};

export default async function AdminBlogTagsPage() {
  const tags = await prisma.blogTag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BlogTagsAdminClient tags={tags} />;
}
