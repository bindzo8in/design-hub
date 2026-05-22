"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectFormSchema, ProjectFormValues } from "../schemas/project.schema";
import { Form } from "@/components/ui/form";
import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { useCategoriesQuery } from "@/features/categories/hooks/use-categories-query";
import { useClientsQuery } from "@/features/clients/hooks/use-clients-query";

interface ProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  defaultValues?: Partial<ProjectFormValues>;
  loading: boolean;
  isEdit?: boolean;
}

export function ProjectForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: ProjectFormProps) {
  const { data: categories = [], isLoading: isLoadingCategories } = useCategoriesQuery();
  const { data: clients = [], isLoading: isLoadingClients } = useClientsQuery();

  const form = useForm({
    resolver: zodResolver(projectFormSchema),
    defaultValues: (defaultValues || {
      title: "",
      description: "",
      clientName: "",
      budget: 0,
      status: "PLANNING",
      startDate: "",
      endDate: "",
      categoryId: "none",
      clientId: "none",
    }) as any,
  });

  const statusOptions = [
    { label: "Planning", value: "PLANNING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "On Hold", value: "ON_HOLD" },
  ];

  const categoryOptions = React.useMemo(() => {
    const list = categories.map((cat) => ({
      label: cat.name,
      value: cat.id,
    }));
    return [{ label: "No Category", value: "none" }, ...list];
  }, [categories]);

  const clientOptions = React.useMemo(() => {
    const list = clients.map((cl) => ({
      label: cl.name,
      value: cl.id,
    }));
    return [{ label: "No Assigned Profile", value: "none" }, ...list];
  }, [clients]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit as any)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ReusableFormField
            control={form.control}
            name="title"
            label="Project Title"
            placeholder="Enterprise Web App Design"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="clientId"
            label="Linked Client Profile"
            type="select"
            options={clientOptions}
            disabled={loading || isLoadingClients}
          />
          <ReusableFormField
            control={form.control}
            name="clientName"
            label="Client Manual Text (Fallback)"
            placeholder="Acme Corp"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="budget"
            label="Budget ($)"
            placeholder="15000"
            type="number"
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="status"
            label="Project Status"
            type="select"
            options={statusOptions}
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="categoryId"
            label="Project Category"
            type="select"
            options={categoryOptions}
            disabled={loading || isLoadingCategories}
          />
          <ReusableFormField
            control={form.control}
            name="startDate"
            label="Start Date"
            type="date"
            placeholder=""
            disabled={loading}
          />
          <ReusableFormField
            control={form.control}
            name="endDate"
            label="End Date"
            type="date"
            placeholder=""
            disabled={loading}
          />
        </div>

        <ReusableFormField
          control={form.control}
          name="description"
          label="Project Description"
          placeholder="Detailed breakdown of client design requirements, deliverables, and targets..."
          type="textarea"
          disabled={loading}
        />

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/projects">Cancel</Link>
          </Button>
          <SubmitButton
            loading={loading}
            className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer px-6"
          >
            {isEdit ? "Save Project" : "Create Project"}
          </SubmitButton>
        </div>
      </form>
    </Form>
  );
}
