"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categoryFormSchema, CategoryFormValues } from "../schemas/category.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  defaultValues?: Partial<CategoryFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function CategoryForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: defaultValues || {
      name: "",
      slug: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="name"
            label="Category Name"
            placeholder="Graphic Design"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="slug"
            label="URL Slug (Optional)"
            placeholder="graphic-design"
            description="If left blank, a slug will be auto-generated from the name."
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/categories">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Category" : "Create Category"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
