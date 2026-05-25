import { z } from "zod";

const cloudinaryImageSchema = z.object({
  url: z.string().trim().min(1, { message: "Logo URL is required." }),
  publicId: z.string().trim().optional().or(z.literal("")),
});

export const clientFormSchema = z.object({
  name: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  logoUrl: cloudinaryImageSchema.nullable().optional(),
  website: z.string().optional().nullable().or(z.literal("")),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
