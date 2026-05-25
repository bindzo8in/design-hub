import { z } from "zod";

export const projectStatusEnum = z.enum([
  "PLANNING",
  "IN_PROGRESS",
  "COMPLETED",
  "ON_HOLD",
]);

export const cloudinaryImageSchema = z.object({
  url: z.url(),
  publicId: z.string(),
});

const nullableString = z.preprocess((value) => {
  if (value === "") return null;
  return value;
}, z.string().trim().nullable().optional());

export const projectFormSchema = z.object({
  title: z.string().trim().min(3, {
    message: "Project title must be at least 3 characters.",
  }),

  description: nullableString,

  clientName: nullableString,

  budget: z.preprocess((value) => {
    if (value === "" || value === null) return null;
    return Number(value);
  }, z.number().min(0).nullable().optional()),

  status: projectStatusEnum.default("PLANNING"),

  startDate: nullableString,

  endDate: nullableString,

  categoryId: nullableString,

  clientId: nullableString,

  thumbnail: cloudinaryImageSchema.nullable().optional(),

  bannerImage: cloudinaryImageSchema.nullable().optional(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;