"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema, UserFormValues } from "../schemas/user.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface UserFormProps {
  onSubmit: (values: UserFormValues) => void;
  defaultValues?: Partial<UserFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function UserForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: UserFormProps) {
  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues: defaultValues || {
      name: "",
      email: "",
      role: "USER",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="name"
            label="Name"
            placeholder="John Doe"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="john.doe@example.com"
            type="email"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="role"
            label="System Role"
            type="select"
            placeholder="Select a role"
            options={[
              { label: "Standard User", value: "USER" },
              { label: "Administrator", value: "ADMIN" },
            ]}
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="password"
            label={isEdit ? "Change Password (Optional)" : "Password"}
            placeholder={isEdit ? "••••••••" : "Min 6 characters"}
            type="password"
            disabled={loading}
          />
        </div>

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/users">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Changes" : "Create User"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
