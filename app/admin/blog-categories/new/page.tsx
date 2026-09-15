import React from "react";
import { BlogCategoryForm } from "@/features/blog/components/category-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Blog Category | Admin | Design Hub One",
};

export default function NewBlogCategoryPage() {
  return (
    <div className="w-full">
      <BlogCategoryForm />
    </div>
  );
}
