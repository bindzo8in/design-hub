import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogCategoriesAdminClient } from "@/features/blog/components/blog-categories-client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog Categories | Admin | Design Hub One",
};

export default async function AdminBlogCategoriesPage() {
  const categories = await prisma.blogCategory.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return <BlogCategoriesAdminClient categories={categories} />;
}
