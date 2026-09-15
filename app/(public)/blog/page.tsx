import React from "react";
import { prisma } from "@/lib/prisma";
import { PublicBlogClient } from "@/features/blog/components/public-blog-client";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildBlogSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = buildMetadata({
  title: "Blog",
  description: "Insights, thoughts, and technical deep-dives on modern web design, software architecture, and Next.js.",
  path: "/blog",
  keywords: ["blog", "web design", "software architecture", "next.js blog", "design hub one"],
});

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: { publishedAt: "desc" },
      include: {
        category: true,
        author: true,
      },
    }),
    prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", url: buildAbsoluteUrl("/") },
    { name: "Blog", url: buildAbsoluteUrl("/blog") },
  ]);

  const blogSchema = buildBlogSchema(
    buildAbsoluteUrl("/blog"),
    "Insights, thoughts, and technical deep-dives on modern web design, software architecture, and Next.js."
  );

  return (
    <main className="flex-1 w-full pt-32 pb-16 sm:pb-24 bg-background text-foreground">
      <StructuredData id="blog-breadcrumb-schema" schema={breadcrumbSchema} />
      <StructuredData id="blog-schema" schema={blogSchema} />
      
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-12 md:mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-foreground mb-6">
            Insights &amp; <span className="text-[#DF1B25]">Ideas</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Thoughts, technical deep-dives, and perspectives on building the modern web.
          </p>
        </div>

        <PublicBlogClient initialPosts={posts} categories={categories} />
      </div>
    </main>
  );
}
