"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { teamMemberFormSchema, TeamMemberFormValues } from "../schemas/team.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface TeamFormProps {
  onSubmit: (values: TeamMemberFormValues) => void;
  defaultValues?: Partial<TeamMemberFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function TeamForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: TeamFormProps) {
  const form = useForm<TeamMemberFormValues>({
    resolver: zodResolver(teamMemberFormSchema),
    defaultValues: defaultValues || {
      name: "",
      role: "",
      imageUrl: "",
      bio: "",
      githubUrl: "",
      linkedinUrl: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="name"
            label="Full Name"
            placeholder="John Doe"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="role"
            label="Professional Role"
            placeholder="Senior Product Designer"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="imageUrl"
            label="Avatar Image URL"
            placeholder="https://images.unsplash.com/photo-..."
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="githubUrl"
            label="GitHub Profile URL (Optional)"
            placeholder="https://github.com/..."
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="linkedinUrl"
            label="LinkedIn Profile URL (Optional)"
            placeholder="https://linkedin.com/in/..."
            disabled={loading}
          />
        </div>

        <ReusableFormField
          control={form.control}
          name="bio"
          label="Short Biography"
          placeholder="A brief background about their expertise and focus areas..."
          type="textarea"
          disabled={loading}
        />

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/team">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Member" : "Add Member"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
