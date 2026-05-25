import { z } from "zod";

const cloudinaryImageSchema = z.object({
  url: z.string().trim().min(1, { message: "Avatar URL is required." }),
  publicId: z.string().trim().optional().or(z.literal("")),
});

export const testimonialFormSchema = z.object({
  author: z.string().min(2, { message: "Author name must be at least 2 characters." }),
  role: z.string().min(2, { message: "Role/Company must be at least 2 characters." }),
  text: z.string().min(10, { message: "Testimonial text must be at least 10 characters." }),
  avatarUrl: cloudinaryImageSchema.nullable().optional(),
});

export type TestimonialFormValues = z.infer<typeof testimonialFormSchema>;
