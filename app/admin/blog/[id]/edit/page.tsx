import React from "react";
import { prisma } from "@/lib/prisma";
import { BlogPostForm } from "@/features/blog/components/blog-post-form";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Blog Post | Admin | Design Hub One",
};

export default async function EditBlogPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { tags: true },
  });

  if (!post) {
    notFound();
  }

  const categories = await prisma.blogCategory.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  const tags = await prisma.blogTag.findMany({
    select: { id: true, name: true },
    orderBy: { name: "asc" },
  });

  return <BlogPostForm initialData={post as any} categories={categories} tags={tags} />;
}
