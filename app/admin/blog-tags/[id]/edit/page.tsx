import React from "react";
import { BlogTagForm } from "@/features/blog/components/tag-form";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Edit Blog Tag | Admin | Design Hub One",
};

export default async function EditBlogTagPage({ params }: { params: { id: string } }) {
  const tag = await prisma.blogTag.findUnique({
    where: { id: params.id },
  });

  if (!tag) {
    notFound();
  }

  return (
    <div className="w-full">
      <BlogTagForm initialData={tag} />
    </div>
  );
}
