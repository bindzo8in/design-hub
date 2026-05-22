"use client";

import React, { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  updateSystemSettingsAction,
} from "@/lib/actions/admin-actions";
import { settingsSchema, SettingsFormValues } from "@/lib/schemas/settings.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { toast } from "sonner";

export default function AdminSettingsPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      siteName: "Design Hub",
      contactEmail: "admin@designhub.com",
      maintenanceMode: false,
    },
  });

  const onSubmit = (values: SettingsFormValues) => {
    startTransition(async () => {
      try {
        const response = await updateSystemSettingsAction(values);
        if (response.success) {
          toast.success(response.message);
        } else {
          toast.error(response.message || "Failed to update configurations");
          if (response.errors) {
            Object.entries(response.errors).forEach(([field, messages]) => {
              form.setError(field as any, {
                type: "server",
                message: messages[0],
              });
            });
          }
        }
      } catch (err: any) {
        toast.error("A network communication error occurred.");
      }
    });
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Header Info */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
          Global Configurations
        </h2>
        <p className="text-slate-400 text-sm mt-1">
          Adjust website titles, support emails, maintenance schedules, and server status.
        </p>
      </div>

      {/* Settings Form Card */}
      <div className="bg-[#101735]/40 border border-[#26336F]/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
            <div className="space-y-6">
              <ReusableFormField
                control={form.control}
                name="siteName"
                label="Application Name"
                placeholder="Design Hub"
                disabled={isPending}
              />
              <ReusableFormField
                control={form.control}
                name="contactEmail"
                label="Support/Contact Email"
                placeholder="admin@designhub.com"
                type="email"
                disabled={isPending}
              />
              <ReusableFormField
                control={form.control}
                name="maintenanceMode"
                label="Enable Maintenance Mode"
                type="switch"
                description="When toggled, public facing site pages redirect users to a static warning card."
                disabled={isPending}
              />
            </div>

            <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
              <SubmitButton
                loading={isPending}
                className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
              >
                Save Configurations
              </SubmitButton>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
