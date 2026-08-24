import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProjectDetail from "@/components/portfolio/project-detail";

interface PortfolioDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PortfolioDetailPage({
  params,
}: PortfolioDetailPageProps) {
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: {
      id,
    },
    select: {
      title: true,

      projectImages: {
        orderBy: {
          url: "asc",
        },
        select: {
          id: true,
          url: true,
          publicId: true,
        },
      },
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <ProjectDetail
      title={project.title}
      images={project.projectImages}
    />
  );
}