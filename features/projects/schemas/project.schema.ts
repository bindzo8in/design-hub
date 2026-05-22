import { z } from "zod";

export const projectStatusEnum = z.enum(["PLANNING", "IN_PROGRESS", "COMPLETED", "ON_HOLD"]);

export const projectFormSchema = z.object({
  title: z.string().min(3, { message: "Project title must be at least 3 characters." }),
  description: z.string().optional().nullable(),
  clientName: z.string().optional().nullable(),
  budget: z.coerce.number().min(0, { message: "Budget must be a positive number." }).optional().nullable(),
  status: projectStatusEnum.default("PLANNING"),
  startDate: z.string().optional().nullable().or(z.date()),
  endDate: z.string().optional().nullable().or(z.date()),
  categoryId: z.string().optional().nullable(),
  clientId: z.string().optional().nullable(),
});

export type ProjectFormValues = z.infer<typeof projectFormSchema>;
