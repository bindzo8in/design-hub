import { Project } from "@/app/generated/prisma/client";
import { ProjectFormValues } from "../schemas/project.schema";
import { ProjectRow } from "./project-columns";

export const emptyProjectFormValues: ProjectFormValues = {
  title: "",

  description: null,

  clientName: null,

  budget: null,

  status: "PLANNING",

  startDate: null,

  endDate: null,

  categoryId: null,

  clientId: null,

  thumbnail: null,

  bannerImage: null,
};

type ProjectFormSource = ProjectRow &
  Partial<Pick<Project, "thumbnail" | "thumbnailPublicId" | "bannerImage" | "bannerPublicId">>;

export function mapProjectToFormValues(project: ProjectFormSource): ProjectFormValues {
  return {
    title: project.title,

    description: project.description ?? null,

    clientName: project.clientName ?? null,

    budget: project.budget ?? null,

    status: project.status as ProjectFormValues["status"],

    startDate: project.startDate
      ? new Date(project.startDate).toISOString().split("T")[0]
      : null,

    endDate: project.endDate
      ? new Date(project.endDate).toISOString().split("T")[0]
      : null,

    categoryId: project.categoryId ?? null,

    clientId: project.clientId ?? null,

    thumbnail: project.thumbnail
      ? {
          url: project.thumbnail,
          publicId: project.thumbnailPublicId ?? "",
        }
      : null,

    bannerImage: project.bannerImage
      ? {
          url: project.bannerImage,
          publicId: project.bannerPublicId ?? "",
        }
      : null,
  };
}
