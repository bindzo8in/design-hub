import React from "react";
import { BlogCategoryForm } from "@/features/blog/components/category-form";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Blog Category | Admin | Design Hub One",
};

export default async function EditBlogCategoryPage({ params }: { params: { id: string } }) {
  const category = await prisma.blogCategory.findUnique({
    where: { id: params.id },
  });

  if (!category) {
    notFound();
  }

  return (
    <div className="w-full">
      <BlogCategoryForm initialData={category} />
    </div>
  );
}
