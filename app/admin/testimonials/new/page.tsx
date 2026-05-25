"use client";

import React from "react";
import { TestimonialForm } from "@/features/testimonials/components/testimonial-form";
import { useCreateTestimonialMutation } from "@/features/testimonials/hooks/use-testimonials-query";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NewTestimonialPage() {
  const createMutation = useCreateTestimonialMutation();

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
          <Link href="/admin/testimonials">
            <ChevronLeft className="w-4 h-4" />
            <span className="sr-only">Back</span>
          </Link>
        </Button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white font-sans">
            Add Client Testimonial
          </h2>
          <p className="text-slate-400 text-xs mt-0.5">
            Add a client quote card to the homepage testimonials section.
          </p>
        </div>
      </div>

      {/* Form Content Panel */}
      <div className="bg-[#101735]/40 border border-[#26336F]/20 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
        <TestimonialForm
          onSubmit={(values) => createMutation.mutate(values)}
          loading={createMutation.isPending}
        />
      </div>
    </div>
  );
}
