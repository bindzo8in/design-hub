import { z } from "zod";

export const userFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  role: z.enum(["USER", "ADMIN"]),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .optional()
    .or(z.literal("")),
});

export type UserFormValues = z.infer<typeof userFormSchema>;
