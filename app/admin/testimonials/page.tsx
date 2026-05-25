"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getTestimonialColumns } from "@/features/testimonials/components/testimonial-columns";
import { useTestimonialsQuery, useDeleteTestimonialMutation } from "@/features/testimonials/hooks/use-testimonials-query";
import { Button } from "@/components/ui/button";
import { MessageSquareQuote } from "lucide-react";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function TestimonialsAdminPage() {
  const { data: testimonials = [], isLoading, error } = useTestimonialsQuery();
  const deleteMutation = useDeleteTestimonialMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns = React.useMemo(
    () =>
      getTestimonialColumns({
        onDeleteClick: (id) => setDeleteId(id),
      }),
    []
  );

  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            Client Testimonials
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage feedback quotes, author names, professional roles, and custom avatars displayed on the homepage.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl flex gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-lg shadow-[#DF1B25]/10"
        >
          <Link href="/admin/testimonials/new">
            <MessageSquareQuote className="w-4 h-4" />
            Add Review
          </Link>
        </Button>
      </div>

      {/* Main Listing Grid */}
      <div className="bg-[#101735]/15 border border-[#26336F]/10 p-6 rounded-3xl backdrop-blur-xl">
        <DataTable
          columns={columns}
          data={testimonials}
          searchKey="author"
          searchPlaceholder="Search by author name..."
          loading={isLoading}
          error={error}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#101735] border border-[#26336F]/30 text-white rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-lg font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-sm">
              This action cannot be undone. Deleting this client testimonial will permanently remove it from the home page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t border-[#26336F]/20 pt-4 mt-4">
            <AlertDialogCancel className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer"
            >
              Remove Review
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
