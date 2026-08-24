import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

import ProjectDetailModal from "@/components/portfolio/project-detail-model";

interface PortfolioModalPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PortfolioModalPage({
  params,
}: PortfolioModalPageProps) {
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
    <ProjectDetailModal
      title={project.title}
      images={project.projectImages}
    />
  );
}