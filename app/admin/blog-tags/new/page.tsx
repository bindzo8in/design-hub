import React from "react";
import { BlogTagForm } from "@/features/blog/components/tag-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Blog Tag | Admin | Design Hub One",
};

export default function NewBlogTagPage() {
  return (
    <div className="w-full">
      <BlogTagForm />
    </div>
  );
}
