"use client";

import React, { useState, useCallback } from "react";
import { DataTable } from "@/components/data-table/data-table";
import { getBlogColumns, BlogPostRow } from "@/features/blog/components/blog-columns";
import { Button } from "@/components/ui/button";
import { PenTool } from "lucide-react";
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
import { deleteBlogPostAction } from "@/lib/actions/blog-actions";
import { toast } from "sonner";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface BlogListingAdminClientProps {
  posts: BlogPostRow[];
  pageCount?: number;
  currentPage?: number;
  pageSize?: number;
  searchValue?: string;
}

export function BlogListingAdminClient({ 
  posts, 
  pageCount, 
  currentPage = 0, 
  pageSize = 10,
  searchValue = ""
}: BlogListingAdminClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const columns = React.useMemo(
    () =>
      getBlogColumns({
        onDeleteClick: (id) => setDeleteId(id),
      }),
    []
  );

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  const handlePaginationChange = (updater: any) => {
    // updater can be a function or a state object
    let newPageIndex = currentPage;
    let newPageSize = pageSize;
    
    if (typeof updater === "function") {
      const newState = updater({ pageIndex: currentPage, pageSize });
      newPageIndex = newState.pageIndex;
      newPageSize = newState.pageSize;
    } else {
      newPageIndex = updater.pageIndex ?? currentPage;
      newPageSize = updater.pageSize ?? pageSize;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", (newPageIndex + 1).toString());
    params.set("pageSize", newPageSize.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", "1");
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteId) return;
    setIsDeleting(true);
    try {
      const res = await deleteBlogPostAction(deleteId);
      if (res.success) {
        toast.success(res.message);
        setDeleteId(null);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-[#101735]/40 border border-[#26336F]/20 p-6 rounded-3xl backdrop-blur-xl">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white font-sans">
            Blog Posts
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Manage your blog articles, drafts, and published content.
          </p>
        </div>
        <Button
          asChild
          className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl flex gap-2 w-full sm:w-auto justify-center cursor-pointer shadow-lg shadow-[#DF1B25]/10"
        >
          <Link href="/admin/blog/new">
            <PenTool className="w-4 h-4" />
            Write Post
          </Link>
        </Button>
      </div>

      <div className="bg-[#101735]/15 border border-[#26336F]/10 p-6 rounded-3xl backdrop-blur-xl">
        <DataTable
          columns={columns}
          data={posts}
          searchKey="title"
          searchPlaceholder="Search articles..."
          manualPagination={true}
          manualFiltering={true}
          pageCount={pageCount}
          paginationState={{ pageIndex: currentPage, pageSize: pageSize }}
          onPaginationChange={handlePaginationChange}
          onSearchChange={handleSearchChange}
          searchValue={searchValue}
        />
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#101735] border border-[#26336F]/30 text-white rounded-2xl max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-lg font-bold">
              Are you absolutely sure?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-400 text-sm">
              This action cannot be undone. This will permanently delete this blog post and its data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="border-t border-[#26336F]/20 pt-4 mt-4">
            <AlertDialogCancel className="bg-[#101735]/40 border-[#26336F]/30 text-slate-300 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              disabled={isDeleting}
              className="bg-[#DF1B25] hover:bg-[#DF1B25]/90 text-white rounded-xl cursor-pointer"
            >
              {isDeleting ? "Deleting..." : "Delete Post"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
