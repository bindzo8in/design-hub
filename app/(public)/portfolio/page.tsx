import React from "react";
import { prisma } from "@/lib/prisma";
import PortfolioClient from "@/components/portfolio/portfolio-client";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = buildMetadata({
  title: "Portfolio",
  description:
    "Explore our selected works, bespoke software solutions, high-performance web systems, and creative designs.",
  path: "/portfolio",
  keywords: ["portfolio", "web design portfolio", "branding portfolio", "design projects"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: buildAbsoluteUrl("/") },
  { name: "Portfolio", url: buildAbsoluteUrl("/portfolio") },
]);

export default async function PortfolioPage() {
  const [projects, categories] = await Promise.all([
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        category: true,
        client: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <main className="flex-1 w-full py-16 sm:py-24 bg-background text-foreground">
      <StructuredData id="portfolio-breadcrumb-schema" schema={breadcrumbSchema} />
      <div className="container mx-auto px-4">
        <PortfolioClient initialProjects={projects as any[]} categories={categories} />
      </div>
    </main>
  );
}
