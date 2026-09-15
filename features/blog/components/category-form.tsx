"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { BlogCategoryFormValues, blogCategorySchema } from "@/lib/schemas/blog.schema";
import { createBlogCategoryAction, updateBlogCategoryAction } from "@/lib/actions/blog-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { BlogCategory } from "@/app/generated/prisma/client";

interface BlogCategoryFormProps {
  initialData?: BlogCategory | null;
}

export function BlogCategoryForm({ initialData }: BlogCategoryFormProps) {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const form = useForm<BlogCategoryFormValues>({
    resolver: zodResolver(blogCategorySchema),
    defaultValues: {
      name: initialData?.name || "",
      slug: initialData?.slug || "",
      description: initialData?.description || "",
    },
  });

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    form.setValue("name", name);
    // Only auto-generate slug if it's a new category and slug hasn't been manually edited
    if (!initialData && !form.formState.dirtyFields.slug) {
      form.setValue("slug", generateSlug(name), { shouldValidate: true });
    }
  };

  async function onSubmit(values: BlogCategoryFormValues) {
    setIsPending(true);
    try {
      const response = initialData
        ? await updateBlogCategoryAction(initialData.id, values)
        : await createBlogCategoryAction(values);

      if (response.success) {
        toast.success(response.message);
        router.push("/admin/blog-categories");
      } else {
        toast.error(response.message);
        if (response.errors) {
          Object.entries(response.errors).forEach(([key, messages]) => {
            form.setError(key as keyof BlogCategoryFormValues, {
              type: "server",
              message: messages[0],
            });
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl">
        <Button
          variant="ghost"
          size="icon"
          asChild
          className="rounded-xl hover:bg-white/5 text-slate-400 hover:text-white"
        >
          <Link href="/admin/blog-categories">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            {initialData ? "Edit Category" : "New Category"}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {initialData ? "Update existing blog category details" : "Create a new category for your blog posts"}
          </p>
        </div>
      </div>

      <div className="bg-[#101735]/15 border border-[#26336F]/10 p-6 rounded-3xl backdrop-blur-xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Category Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Website Development"
                      className="bg-[#101735]/50 border-[#26336F]/30 text-white rounded-xl focus-visible:ring-[#DF1B25]/50"
                      {...field}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                  <FormMessage className="text-[#DF1B25]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">URL Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. website-development"
                      className="bg-[#101735]/50 border-[#26336F]/30 text-white rounded-xl focus-visible:ring-[#DF1B25]/50 font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-slate-500">
                    This is the URL-friendly version of the name. It must be unique.
                  </FormDescription>
                  <FormMessage className="text-[#DF1B25]" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-300">Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief description of this category..."
                      className="bg-[#101735]/50 border-[#26336F]/30 text-white rounded-xl focus-visible:ring-[#DF1B25]/50 min-h-[100px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[#DF1B25]" />
                </FormItem>
              )}
            />

            <div className="flex justify-end pt-4">
              <Button
                type="submit"
                disabled={isPending}
                className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl flex gap-2 cursor-pointer shadow-lg shadow-[#DF1B25]/10 px-8"
              >
                {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                {initialData ? "Save Changes" : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
