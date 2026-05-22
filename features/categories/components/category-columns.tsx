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
import { MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import React from "react";

export interface CategoryRow {
  id: string;
  name: string;
  slug: string;
  _count?: {
    projects: number;
  };
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getCategoryColumns({ onDeleteClick }: ColumnProps): ColumnDef<CategoryRow>[] {
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
      accessorKey: "name",
      header: "Category Name",
      cell: ({ row }) => {
        const name = row.getValue("name") as string;
        return <span className="font-semibold text-white">{name}</span>;
      },
    },
    {
      accessorKey: "slug",
      header: "URL Slug",
      cell: ({ row }) => {
        const slug = row.getValue("slug") as string;
        return <span className="font-mono text-xs text-slate-400">/{slug}</span>;
      },
    },
    {
      id: "projectCount",
      header: "Associated Projects",
      cell: ({ row }) => {
        const count = row.original._count?.projects ?? 0;
        return (
          <Badge
            className="bg-[#26336F]/20 border-[#26336F]/40 text-slate-300 font-mono"
            variant="outline"
          >
            {count} {count === 1 ? "project" : "projects"}
          </Badge>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const category = row.original;

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
                <Link href={`/admin/categories/${category.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Category
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(category.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Category
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
