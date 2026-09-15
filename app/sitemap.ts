import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { seoConfig, buildAbsoluteUrl } from "@/lib/seo/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latestProject = await prisma.project.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  const blogPosts = await prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    select: { slug: true, updatedAt: true },
  });

  const baseDate = latestProject?.updatedAt ?? new Date();

  const staticRoutes = seoConfig.routes.map((route) => ({
    url: buildAbsoluteUrl(route.href),
    lastModified: route.href === "/portfolio" ? baseDate : new Date(),
    changeFrequency: route.changeFrequency as "daily" | "monthly" | "weekly" | "always" | "hourly" | "yearly" | "never" | undefined,
    priority: route.priority,
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: buildAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: post.updatedAt,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...blogRoutes];
}
