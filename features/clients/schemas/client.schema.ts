import { z } from "zod";

export const clientFormSchema = z.object({
  name: z.string().min(2, { message: "Client name must be at least 2 characters." }),
  logoUrl: z.string().optional().nullable().or(z.literal("")),
  website: z.string().optional().nullable().or(z.literal("")),
});

export type ClientFormValues = z.infer<typeof clientFormSchema>;
