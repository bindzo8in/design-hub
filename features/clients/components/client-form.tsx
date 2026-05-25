"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { clientFormSchema, ClientFormValues } from "../schemas/client.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface ClientFormProps {
  onSubmit: (values: ClientFormValues) => void;
  defaultValues?: Partial<ClientFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function ClientForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: ClientFormProps) {
  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientFormSchema),
    defaultValues: defaultValues || {
      name: "",
      logoUrl: null,
      website: "",
    },
  });

  console.log("Form errors:", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="name"
            label="Client/Company Name"
            placeholder="Acme Corp"
            disabled={loading}
          />
          <div className="md:col-span-2">
            <ImageUploadField
              control={form.control}
              name="logoUrl"
              label="Client Logo"
              description="Upload a high-resolution logo for this client profile."
              disabled={loading}
              folder="design-hub/clients"
              previewAlt="Client logo preview"
            />
          </div>
          <ReusableFormField
            control={form.control}
            name="website"
            label="Website URL"
            placeholder="https://acme.com"
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/clients">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Client" : "Add Client"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
