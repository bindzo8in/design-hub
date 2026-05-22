import { z } from "zod";

export const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  slug: z.string().optional().or(z.literal("")),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
