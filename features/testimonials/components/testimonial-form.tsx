"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { testimonialFormSchema, TestimonialFormValues } from "../schemas/testimonial.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { ImageUploadField } from "@/components/forms/image-upload-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TestimonialFormProps {
  onSubmit: (values: TestimonialFormValues) => void;
  defaultValues?: Partial<TestimonialFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function TestimonialForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: TestimonialFormProps) {
  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialFormSchema),
    defaultValues: defaultValues || {
      author: "",
      role: "",
      text: "",
      avatarUrl: null,
    },
  });

  console.log("Form errors:", form.formState.errors);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="author"
            label="Author / Client Name"
            placeholder="Jane Doe"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="role"
            label="Role & Company"
            placeholder="Director of Design, Acme Inc"
            disabled={loading}
          />
          <div className="md:col-span-2">
            <ReusableFormField
              control={form.control}
              name="text"
              label="Testimonial / Review Quote"
              placeholder="Write the feedback provided by the client..."
              type="textarea"
              disabled={loading}
            />
          </div>
          <div className="md:col-span-2">
            <ImageUploadField
              control={form.control}
              name="avatarUrl"
              label="Client Avatar (Optional)"
              description="Upload a photo of the client for their review card. Reuses Cloudinary uploads."
              disabled={loading}
              folder="design-hub/testimonials"
              previewAlt="Client avatar preview"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/testimonials">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Review" : "Add Review"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
