"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  blogCategorySchema,
  BlogCategoryFormValues,
  blogTagSchema,
  BlogTagFormValues,
  blogPostSchema,
  BlogPostFormValues,
} from "@/lib/schemas/blog.schema";
import { ActionResponse } from "./admin-actions";

// --- Categories ---

export async function createBlogCategoryAction(values: BlogCategoryFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogCategorySchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    const record = await prisma.blogCategory.create({ data: parsed.data });
    revalidatePath("/admin/blog-categories");
    return { success: true, message: "Category created successfully", data: record };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function updateBlogCategoryAction(id: string, values: BlogCategoryFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogCategorySchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    await prisma.blogCategory.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/blog-categories");
    return { success: true, message: "Category updated successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function deleteBlogCategoryAction(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  try {
    await prisma.blogCategory.delete({ where: { id } });
    revalidatePath("/admin/blog-categories");
    return { success: true, message: "Category deleted successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

// --- Tags ---

export async function createBlogTagAction(values: BlogTagFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogTagSchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    const record = await prisma.blogTag.create({ data: parsed.data });
    revalidatePath("/admin/blog-tags");
    return { success: true, message: "Tag created successfully", data: record };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function updateBlogTagAction(id: string, values: BlogTagFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogTagSchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    await prisma.blogTag.update({ where: { id }, data: parsed.data });
    revalidatePath("/admin/blog-tags");
    return { success: true, message: "Tag updated successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function deleteBlogTagAction(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  try {
    await prisma.blogTag.delete({ where: { id } });
    revalidatePath("/admin/blog-tags");
    return { success: true, message: "Tag deleted successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

// --- Posts ---

export async function createBlogPostAction(values: BlogPostFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogPostSchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    const { tags, categoryId, featuredImage, ...data } = parsed.data;
    
    // Auto-set publishedAt if status is PUBLISHED and publishedAt is empty
    let publishedAt = data.publishedAt;
    if (data.status === "PUBLISHED" && !publishedAt) {
      publishedAt = new Date();
    }

    const authorId = data.authorId && data.authorId !== "unknown" 
      ? data.authorId 
      : (session.user as any).id;
      
    if (!authorId) {
      return { success: false, message: "Author ID is missing from session. Please log out and log back in." };
    }

    // Verify author exists to prevent foreign key constraint errors with stale JWTs
    const authorExists = await prisma.user.findUnique({ where: { id: authorId } });
    if (!authorExists) {
      return { success: false, message: "Your user account does not exist in the database. Please log out and log back in." };
    }

    await prisma.blogPost.create({
      data: {
        ...data,
        publishedAt,
        authorId,
        categoryId: categoryId || null,
        featuredImage: featuredImage?.url || null,
        featuredImagePublicId: featuredImage?.publicId || null,
        tags: {
          connect: tags.map((id) => ({ id })),
        },
      },
    });
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    return { success: true, message: "Blog post created successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function updateBlogPostAction(id: string, values: BlogPostFormValues): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  const parsed = blogPostSchema.safeParse(values);
  if (!parsed.success) return { success: false, message: "Validation failed", errors: parsed.error.flatten().fieldErrors };

  try {
    const { tags, categoryId, featuredImage, ...data } = parsed.data;
    
    let publishedAt = data.publishedAt;
    if (data.status === "PUBLISHED" && !publishedAt) {
      publishedAt = new Date();
    }

    // Clean up authorId if it's not a valid ID
    if (!data.authorId || data.authorId === "unknown") {
      delete data.authorId;
    }
    
    if (data.authorId) {
      // Verify author exists to prevent foreign key constraint errors
      const authorExists = await prisma.user.findUnique({ where: { id: data.authorId } });
      if (!authorExists) {
        return { success: false, message: "The provided author ID does not exist in the database." };
      }
    }

    await prisma.blogPost.update({
      where: { id },
      data: {
        ...data,
        publishedAt,
        categoryId: categoryId || null,
        featuredImage: featuredImage?.url || null,
        featuredImagePublicId: featuredImage?.publicId || null,
        tags: {
          set: tags.map((tId) => ({ id: tId })),
        },
      },
    });
    
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${data.slug}`);
    
    return { success: true, message: "Blog post updated successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      if (err.code === "P2002") return { success: false, message: "A record with this slug already exists." };
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}

export async function deleteBlogPostAction(id: string): Promise<ActionResponse> {
  const session = await auth();
  if (!session || (session.user as { role?: string, email?: string })?.role !== "ADMIN") return { success: false, message: "Unauthorized" };

  try {
    const post = await prisma.blogPost.delete({ where: { id } });
    revalidatePath("/admin/blog");
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    return { success: true, message: "Blog post deleted successfully" };
  } catch (error: unknown) {
    if (error && typeof error === "object") {
      const err = error as Record<string, unknown>;
      return { success: false, message: (err.message as string) || "Failed" };
    }
    return { success: false, message: "An unknown error occurred" };
  }
}
