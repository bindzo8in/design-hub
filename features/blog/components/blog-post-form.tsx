"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { blogPostSchema, type BlogPostFormValues } from "@/lib/schemas/blog.schema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createBlogPostAction, updateBlogPostAction } from "@/lib/actions/blog-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import { TiptapEditor } from "./tiptap-editor";
import { CreatableCombobox } from "@/components/ui/creatable-combobox";
import { MultiCreatableCombobox } from "@/components/ui/multi-creatable-combobox";
import { createBlogCategoryAction, createBlogTagAction } from "@/lib/actions/blog-actions";
import { useSession } from "next-auth/react";

interface BlogPostFormProps {
  initialData?: (Partial<BlogPostFormValues> & { id: string }) | null;
  categories: { id: string; name: string }[];
  tags: { id: string; name: string }[];
}

export function BlogPostForm({ initialData, categories, tags }: BlogPostFormProps) {
  const { data:session } = useSession();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultFormValues: BlogPostFormValues = {
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
    featuredImage: initialData?.featuredImage ? { 
      url: initialData.featuredImage as unknown as string, 
      publicId: (initialData as any).featuredImagePublicId || "" 
    } : null,
    categoryId: initialData?.categoryId || "",
    status: initialData?.status || "DRAFT",
    isFeatured: initialData?.isFeatured || false,
    metaTitle: initialData?.metaTitle || "",
    metaDescription: initialData?.metaDescription || "",
    authorId: initialData?.authorId || session?.user?.id || "unknown",
    tags: initialData?.tags?.map((t: any) => t.id) || [],
  };

  const form = useForm<BlogPostFormValues>({
    resolver: zodResolver(blogPostSchema) as any,
    defaultValues: defaultFormValues,
  });

  console.log(form.formState.errors)
  console.log('author id', session?.user?.id)

  const onSubmit = async (data: BlogPostFormValues) => {
    setIsSubmitting(true);
    try {
      const res = initialData
        ? await updateBlogPostAction(initialData.id, data)
        : await createBlogPostAction(data);
        console.log(res)

      if (res.success) {
        toast.success(res.message);
        router.push("/admin/blog");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlug = () => {
    const title = form.getValues("title");
    if (title) {
      const slug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      form.setValue("slug", slug, { shouldValidate: true });
    }
  };

  const handleCreateCategory = async (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const res = await createBlogCategoryAction({ name, slug, description: "" });
    if (res.success && res.data) {
      return { id: res.data.id, name: res.data.name };
    }
    toast.error(res.message);
    return null;
  };

  const handleCreateTag = async (name: string) => {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const res = await createBlogTagAction({ name, slug });
    if (res.success && res.data) {
      return { id: res.data.id, name: res.data.name };
    }
    toast.error(res.message);
    return null;
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Button
            asChild
            variant="ghost"
            className="w-10 h-10 p-0 rounded-full hover:bg-white/10 text-slate-300"
          >
            <Link href="/admin/blog">
              <ArrowLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
              {initialData ? "Edit Blog Post" : "New Blog Post"}
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              {initialData ? "Make changes to your article." : "Draft a new article for your blog."}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("status", "DRAFT", { shouldValidate: true, shouldDirty: true });
              form.handleSubmit(onSubmit)();
            }}
            disabled={isSubmitting}
            className="border-[#26336F]/50 text-slate-300 hover:text-white bg-[#101735]/40 hover:bg-white/5 rounded-xl h-10 px-6"
          >
            Save Draft
          </Button>
          <Button
            type="button"
            onClick={() => {
              form.setValue("status", "PUBLISHED", { shouldValidate: true, shouldDirty: true });
              form.handleSubmit(onSubmit)();
            }}
            disabled={isSubmitting}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl h-10 px-6 shadow-lg shadow-[#DF1B25]/10"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                Saving...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Save className="w-4 h-4" />
                {initialData?.status === "PUBLISHED" ? "Update Post" : "Publish Post"}
              </span>
            )}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl space-y-6">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. The Future of Web Design in 2025"
                          {...field}
                          className="bg-[#101735] border-[#26336F]/50 text-white placeholder:text-slate-500 focus-visible:ring-[#DF1B25] rounded-xl"
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
                      <FormLabel className="text-slate-300">Slug</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input
                            placeholder="e.g. the-future-of-web-design"
                            {...field}
                            className="bg-[#101735] border-[#26336F]/50 text-white placeholder:text-slate-500 focus-visible:ring-[#DF1B25] rounded-xl flex-1"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={generateSlug}
                          className="border-[#26336F]/50 text-slate-300 hover:text-white bg-[#101735]/40 hover:bg-white/5 rounded-xl px-4"
                        >
                          Generate
                        </Button>
                      </div>
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="excerpt"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Excerpt</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Brief summary of the article..."
                          {...field}
                          value={field.value || ""}
                          className="bg-[#101735] border-[#26336F]/50 text-white placeholder:text-slate-500 focus-visible:ring-[#DF1B25] rounded-xl min-h-[100px] resize-y"
                        />
                      </FormControl>
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">Content</FormLabel>
                      <FormControl>
                        <TiptapEditor value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
                <FormField
                  control={form.control}
                  name="metaTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">SEO Title (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Optimized title for search engines"
                          {...field}
                          value={field.value || ""}
                          className="bg-[#101735] border-[#26336F]/50 text-white placeholder:text-slate-500 focus-visible:ring-[#DF1B25] rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="metaDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-slate-300">SEO Description (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Meta description for search results"
                          {...field}
                          value={field.value || ""}
                          className="bg-[#101735] border-[#26336F]/50 text-white placeholder:text-slate-500 focus-visible:ring-[#DF1B25] rounded-xl"
                        />
                      </FormControl>
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">Publishing</h3>

                <FormField
                  control={form.control}
                  name="isFeatured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-xl border border-[#26336F]/30 bg-[#101735]/60 p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-slate-200">Featured Post</FormLabel>
                        <FormDescription className="text-slate-500 text-xs">
                          Highlight this post on the blog index.
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-[#DF1B25] data-[state=unchecked]:bg-slate-700"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">Organization</h3>
                
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-300">Category</FormLabel>
                      <CreatableCombobox
                        options={categories}
                        value={field.value || undefined}
                        onChange={field.onChange}
                        onCreate={handleCreateCategory}
                        placeholder="Select category..."
                        emptyText="No category found."
                      />
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="text-slate-300">Tags</FormLabel>
                      <MultiCreatableCombobox
                        options={tags}
                        value={field.value}
                        onChange={field.onChange}
                        onCreate={handleCreateTag}
                        placeholder="Select tags..."
                        emptyText="No tag found."
                      />
                      <FormMessage className="text-[#DF1B25]" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl space-y-6">
                <h3 className="text-lg font-bold text-white mb-4">Media</h3>
                
                <ImageUploadField
                  control={form.control}
                  name="featuredImage"
                  label="Featured Image"
                  description="Main image displayed at the top of the blog post and on blog cards"
                  folder="design-hub/blog/featured"
                />
              </div>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
}
