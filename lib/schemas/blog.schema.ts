import { z } from "zod";

export const blogCategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
});

export type BlogCategoryFormValues = z.infer<typeof blogCategorySchema>;

export const blogTagSchema = z.object({
  name: z.string().min(1, "Name is required"),
  slug: z.string().min(1, "Slug is required"),
});

export type BlogTagFormValues = z.infer<typeof blogTagSchema>;

export const blogPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required"),
  excerpt: z.string().optional(),
  content: z.string().min(1, "Content is required"),
  
  featuredImage: z.object({
    url: z.string().min(1),
    publicId: z.string().optional().or(z.literal(""))
  }).optional().nullable(),
  featuredImageAlt: z.string().optional(),
  
  status: z.enum(["DRAFT", "PUBLISHED"]),
  readingTime: z.coerce.number().int().optional(),
  isFeatured: z.boolean().default(false),
  
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  
  publishedAt: z.coerce.date().optional(),
  
  authorId: z.string().optional(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
});

export type BlogPostFormValues = z.infer<typeof blogPostSchema>;
