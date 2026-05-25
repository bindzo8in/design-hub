import { z } from "zod";

const cloudinaryImageSchema = z.object({
  url: z.string().trim().min(1, { message: "Image URL is required." }),
  publicId: z.string().trim().optional().or(z.literal("")),
});

export const teamMemberFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role must be at least 2 characters." }),
  imageUrl: cloudinaryImageSchema.nullable().optional(),
  bio: z.string().optional().nullable().or(z.literal("")),
  githubUrl: z.string().optional().nullable().or(z.literal("")),
  linkedinUrl: z.string().optional().nullable().or(z.literal("")),
});

export type TeamMemberFormValues = z.infer<typeof teamMemberFormSchema>;
