"use client";

import React from "react";
import { useParams } from "next/navigation";
import { CategoryForm } from "@/features/categories/components/category-form";
import { useCategoryQuery, useUpdateCategoryMutation } from "@/features/categories/hooks/use-categories-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditCategoryPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: category, isLoading, error } = useCategoryQuery(id);
  const updateMutation = useUpdateCategoryMutation(id);

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
        >
          <Link href="/admin/categories">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            Edit Category Details
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Modify the name or URL slug of this project tag.
          </p>
        </div>
      </div>

      {/* Form Content Panel */}
      <div className="bg-[#101735]/40 border border-[#26336F]/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-[#26336F]/20" />
                  <Skeleton className="h-9 w-full bg-[#26336F]/10 rounded-xl" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-[#26336F]/20">
              <Skeleton className="h-9 w-24 bg-[#26336F]/10 rounded-xl" />
              <Skeleton className="h-9 w-32 bg-[#26336F]/20 rounded-xl" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-[#DF1B25]">
            <p className="font-semibold text-lg">Error loading category details</p>
            <p className="text-sm text-slate-400 font-mono mt-1">{error.message}</p>
          </div>
        ) : category ? (
          <CategoryForm
            isEdit
            defaultValues={{
              name: category.name,
              slug: category.slug,
            }}
            onSubmit={(values) => updateMutation.mutate(values)}
            loading={updateMutation.isPending}
          />
        ) : (
          <div className="text-center py-8 text-slate-400">
            Category not found.
          </div>
        )}
      </div>
    </div>
  );
}
