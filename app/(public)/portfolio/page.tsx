import React from "react";
import { prisma } from "@/lib/prisma";
import PortfolioClient from "@/components/portfolio/portfolio-client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Portfolio - Design Hub Solutions",
  description: "Explore our selected works, bespoke software solutions, high-performance web systems, and creative designs.",
};

export default async function PortfolioPage() {
  // Query all active categories and projects with relations
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
      <div className="container mx-auto px-4">
        <PortfolioClient initialProjects={projects as any[]} categories={categories} />
      </div>
    </main>
  );
}
