import { z } from "zod";

export const settingsSchema = z.object({
  siteName: z.string().min(2, { message: "Site name must be at least 2 characters." }),
  contactEmail: z.string().email({ message: "Invalid email address." }),
  maintenanceMode: z.boolean().default(false),
});

export type SettingsFormValues = z.infer<typeof settingsSchema>;
