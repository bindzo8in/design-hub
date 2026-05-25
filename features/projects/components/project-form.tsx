"use client";

import React from "react";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  projectFormSchema,
  ProjectFormValues,
} from "../schemas/project.schema";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { ReusableFormField } from "@/components/forms/reusable-form-field";
import { SubmitButton } from "@/components/forms/submit-button";
import { ImageUploadField } from "@/components/forms/image-upload-field";

import { useCategoriesQuery } from "@/features/categories/hooks/use-categories-query";
import { useClientsQuery } from "@/features/clients/hooks/use-clients-query";
import { emptyProjectFormValues } from "./utils";

interface ProjectFormProps {
  onSubmit: (values: ProjectFormValues) => void;
  defaultValues?: ProjectFormValues;
  loading: boolean;
  isEdit?: boolean;
}

const EMPTY_SELECT_VALUE = "__none__";

function normalizeProjectValues(values: ProjectFormValues): ProjectFormValues {
  return {
    ...values,
    categoryId: values.categoryId === EMPTY_SELECT_VALUE ? null : values.categoryId,
    clientId: values.clientId === EMPTY_SELECT_VALUE ? null : values.clientId,
  };
}

export function ProjectForm({
  onSubmit,
  defaultValues,
  loading,
  isEdit = false,
}: ProjectFormProps) {
  const { data: categories = [], isLoading: isLoadingCategories } =
    useCategoriesQuery();

  const { data: clients = [], isLoading: isLoadingClients } =
    useClientsQuery();

  const form = useForm<ProjectFormValues, unknown, ProjectFormValues>({
    resolver: zodResolver(projectFormSchema as never) as never,

    defaultValues: defaultValues ?? emptyProjectFormValues,
  });

  useEffect(() => {
    if (defaultValues) {
      form.reset(defaultValues);
    }
  }, [defaultValues, form]);

  const statusOptions = [
    { label: "Planning", value: "PLANNING" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Completed", value: "COMPLETED" },
    { label: "On Hold", value: "ON_HOLD" },
  ];

  const categoryOptions = React.useMemo(() => {
    return [
      { label: "No Category", value: EMPTY_SELECT_VALUE },

      ...categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    ];
  }, [categories]);

  const clientOptions = React.useMemo(() => {
    return [
      { label: "No Assigned Profile", value: EMPTY_SELECT_VALUE },

      ...clients.map((client) => ({
        label: client.name,
        value: client.id,
      })),
    ];
  }, [clients]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(normalizeProjectValues(values)))}
        className="space-y-6"
      >
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
            disabled={loading}
          />

          <ReusableFormField
            control={form.control}
            name="endDate"
            label="End Date"
            type="date"
            disabled={loading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ImageUploadField
            control={form.control}
            name="thumbnail"
            label="Project Thumbnail"
            folder="projects/thumbnails"
          />

          <ImageUploadField
            name="bannerImage"
            control={form.control}
            label="Project Banner"
            folder="projects/banners"
          />
        </div>

        <ReusableFormField
          control={form.control}
          name="description"
          label="Project Description"
          placeholder="Detailed breakdown of client requirements..."
          type="textarea"
          disabled={loading}
        />

        <div className="flex items-center justify-end gap-4 border-t border-[#26336F]/20 pt-6">
          <Button
            asChild
            variant="outline"
            className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
          >
            <Link href="/admin/projects">
              Cancel
            </Link>
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