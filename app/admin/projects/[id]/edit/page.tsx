"use client";

import React from "react";
import { useParams } from "next/navigation";
import { ProjectForm } from "@/features/projects/components/project-form";
import { useProjectQuery, useUpdateProjectMutation } from "@/features/projects/hooks/use-projects-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function EditProjectPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: project, isLoading, error } = useProjectQuery(id);
  const updateMutation = useUpdateProjectMutation(id);

  // Helper to format ISO Date string into YYYY-MM-DD for HTML5 date inputs
  const formatDateForInput = (dStr: string | null | undefined) => {
    if (!dStr) return "";
    try {
      return new Date(dStr).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Button
          asChild
          variant="outline"
          size="icon"
          className="h-9 w-9 bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer"
        >
          <Link href="/admin/projects">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            Edit Project Details
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Modify client expectations, budgets, statuses, and timeline deadlines.
          </p>
        </div>
      </div>

      {/* Form Content Panel */}
      <div className="bg-[#101735]/40 border border-[#26336F]/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        {isLoading ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-4 w-20 bg-[#26336F]/20" />
                  <Skeleton className="h-9 w-full bg-[#26336F]/10 rounded-xl" />
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-4 pt-6 border-t border-[#26336F]/20">
              <Skeleton className="h-9 w-24 bg-[#26336F]/10 rounded-xl" />
              <Skeleton className="h-9 w-32 bg-[#26336F]/20 rounded-xl" />
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-[#DF1B25]">
            <p className="font-semibold text-lg">Error loading project details</p>
            <p className="text-sm text-slate-400 font-mono mt-1">{error.message}</p>
          </div>
        ) : project ? (
          <ProjectForm
            isEdit
            defaultValues={{
              title: project.title,
              description: project.description || "",
              clientName: project.clientName || "",
              budget: project.budget || 0,
              status: project.status as any,
              startDate: formatDateForInput(project.startDate),
              endDate: formatDateForInput(project.endDate),
              categoryId: (project as any).categoryId || "none",
              clientId: (project as any).clientId || "none",
            }}
            onSubmit={(values) => updateMutation.mutate(values)}
            loading={updateMutation.isPending}
          />
        ) : (
          <div className="text-center py-8 text-slate-400">
            Project not found.
          </div>
        )}
      </div>
    </div>
  );
}
