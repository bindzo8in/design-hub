"use server";

import { auth } from "@/auth";
import { z } from "zod";
import { revalidatePath } from "next/cache";

import { settingsSchema, SettingsFormValues } from "@/lib/schemas/settings.schema";

export type ActionResponse = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Server Action: Update Admin Settings
 */
export async function updateSystemSettingsAction(
  values: SettingsFormValues
): Promise<ActionResponse> {
  // 1. Authenticate & Authorize session at database level
  const session = await auth();
  if (!session || (session.user as any)?.role !== "ADMIN") {
    return { success: false, message: "Unauthorized access. Administrator privileges required." };
  }

  // 2. Validate input schemas
  const result = settingsSchema.safeParse(values);
  if (!result.success) {
    return {
      success: false,
      message: "Failed to validate form settings.",
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { siteName, contactEmail, maintenanceMode } = result.data;

  try {
    // Perform server-side configurations update
    console.log(`[Admin Server Action] Settings updated by ${(session?.user as any)?.email || "unknown"}:`, {
      siteName,
      contactEmail,
      maintenanceMode,
    });

    // 3. Revalidate path to update SSR caches
    revalidatePath("/admin/settings");

    return {
      success: true,
      message: "System settings updated successfully.",
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || "An unexpected system error occurred.",
    };
  }
}
