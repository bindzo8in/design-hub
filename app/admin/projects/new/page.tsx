"use client";

import React from "react";
import { ProjectForm } from "@/features/projects/components/project-form";
import { useCreateProjectMutation } from "@/features/projects/hooks/use-projects-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewProjectPage() {
  const createMutation = useCreateProjectMutation();

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
            Add New Project
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Register a new client engagement, milestones, and deliverables timeline.
          </p>
        </div>
      </div>

      {/* Form Content Panel */}
      <div className="bg-[#101735]/40 border border-[#26336F]/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <ProjectForm
          onSubmit={(values) => createMutation.mutate(values)}
          loading={createMutation.isPending}
        />
      </div>
    </div>
  );
}
