import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/features/blog/components/blog-post-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Blog Post | Admin | Design Hub One",
};

export default async function NewBlogPage() {
  const categories = await prisma.blogCategory.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const tags = await prisma.blogTag.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return <BlogPostForm categories={categories} tags={tags} />;
}
