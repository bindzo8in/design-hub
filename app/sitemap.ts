import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { seoConfig, buildAbsoluteUrl } from "@/lib/seo/config";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const latestProject = await prisma.project.findFirst({
    orderBy: { updatedAt: "desc" },
    select: { updatedAt: true },
  });

  const baseDate = latestProject?.updatedAt ?? new Date();

  return seoConfig.routes.map((route) => ({
    url: buildAbsoluteUrl(route.href),
    lastModified: route.href === "/portfolio" ? baseDate : new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
