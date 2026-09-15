"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { format } from "date-fns";

export interface BlogPostRow {
  id: string;
  title: string;
  slug: string;
  status: "DRAFT" | "PUBLISHED";
  featuredImage: string | null;
  category: { id: string; name: string } | null;
  author: { name: string | null };
  publishedAt: Date | null;
  createdAt: Date;
  isFeatured: boolean;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getBlogColumns({ onDeleteClick }: ColumnProps): ColumnDef<BlogPostRow>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected()}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="border-[#26336F]/50 text-[#DF1B25] focus-visible:ring-[#DF1B25] data-[state=checked]:bg-[#DF1B25] data-[state=checked]:border-[#DF1B25]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="border-[#26336F]/50 text-[#DF1B25] focus-visible:ring-[#DF1B25] data-[state=checked]:bg-[#DF1B25] data-[state=checked]:border-[#DF1B25]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Post",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        const image = row.original.featuredImage;
        const category = row.original.category?.name || "Uncategorized";
        const isFeatured = row.original.isFeatured;
        return (
          <div className="flex items-center gap-4">
            {image ? (
              <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-[#26336F]/30 bg-[#101735]">
                <Image src={image} alt={title} fill className="object-cover" />
              </div>
            ) : (
              <div className="w-12 h-12 rounded-lg bg-[#26336F]/20 border border-[#26336F]/30 flex items-center justify-center">
                <span className="text-slate-500 text-xs">No img</span>
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-semibold text-white max-w-[250px] truncate">{title}</span>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-slate-400">{category}</span>
                {isFeatured && (
                  <Badge className="bg-[#DF1B25]/20 text-[#DF1B25] hover:bg-[#DF1B25]/30 border-none px-1.5 py-0 text-[10px] uppercase">
                    Featured
                  </Badge>
                )}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const isPublished = status === "PUBLISHED";
        return (
          <Badge
            className={`font-mono ${
              isPublished
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                : "bg-amber-500/10 text-amber-400 border-amber-500/20"
            }`}
            variant="outline"
          >
            {status}
          </Badge>
        );
      },
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const authorName = row.original.author?.name || "Unknown";
        return <span className="text-slate-300 text-sm">{authorName}</span>;
      },
    },
    {
      accessorKey: "publishedAt",
      header: "Published Date",
      cell: ({ row }) => {
        const date = row.original.publishedAt;
        if (!date) return <span className="text-slate-500 text-sm">-</span>;
        return <span className="text-slate-300 text-sm">{format(new Date(date), "MMM d, yyyy")}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const post = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-44 bg-[#101735] border border-[#26336F]/30 text-white rounded-xl shadow-xl"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg">
                <Link href={`/admin/blog/${post.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Post
                </Link>
              </DropdownMenuItem>
              {post.status === "PUBLISHED" && (
                <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Eye className="mr-2 h-3.5 w-3.5 text-slate-400" />
                    View Live
                  </Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(post.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
