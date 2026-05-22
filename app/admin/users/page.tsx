"use client";

import React, { useState } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getUserColumns } from "@/features/users/components/user-columns";
import { useUsersQuery, useDeleteUserMutation } from "@/features/users/hooks/use-users-query";
import { Button } from "@/components/ui/button";
import { Plus, UserPlus } from "lucide-react";
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

export default function UsersAdminPage() {
  const { data: users = [], isLoading, error } = useUsersQuery();
  const deleteMutation = useDeleteUserMutation();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // Setup column definitions
  const columns = React.useMemo(
    () =>
      getUserColumns({
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
            User Accounts
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage administrative privileges, credentials, and access roles for the system.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl flex gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-lg shadow-[#DF1B25]/10"
        >
          <Link href="/admin/users/new">
            <UserPlus className="w-4 h-4" />
            Add Account
          </Link>
        </Button>
      </div>

      {/* Main Listing Grid */}
      <div className="bg-[#101735]/15 border border-[#26336F]/10 p-6 rounded-3xl backdrop-blur-xl">
        <DataTable
          columns={columns}
          data={users}
          searchKey="name"
          searchPlaceholder="Search by name or email..."
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
              This action cannot be undone. This will permanently delete the user's account records from the database.
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
              Delete Account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
