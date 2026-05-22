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

export interface ProjectRow {
  id: string;
  title: string;
  description: string | null;
  clientName: string | null;
  budget: number | null;
  status: "PLANNING" | "IN_PROGRESS" | "COMPLETED" | "ON_HOLD";
  startDate: string | null;
  endDate: string | null;
  categoryId?: string | null;
  category?: { name: string; slug: string } | null;
  clientId?: string | null;
  client?: { name: string; logoUrl: string | null } | null;
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

const statusLabelMap: Record<string, string> = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
};

export function getProjectColumns({ onDeleteClick }: ColumnProps): ColumnDef<ProjectRow>[] {
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
      header: "Project Title",
      cell: ({ row }) => {
        const title = row.getValue("title") as string;
        const client = row.original.client?.name || row.original.clientName || "Direct Client";
        return (
          <div>
            <div className="font-semibold text-white">{title}</div>
            <div className="text-xs text-slate-400 font-sans">{client}</div>
          </div>
        );
      },
    },
    {
      id: "category",
      header: "Category",
      cell: ({ row }) => {
        const category = row.original.category;
        if (!category) {
          return <span className="text-slate-500 text-xs">Unassigned</span>;
        }
        return (
          <Badge
            className="bg-[#26336F]/20 border-[#26336F]/30 text-slate-300 font-semibold"
            variant="outline"
          >
            {category.name}
          </Badge>
        );
      },
    },
    {
      accessorKey: "budget",
      header: "Budget",
      cell: ({ row }) => {
        const budget = row.getValue("budget") as number | null;
        if (budget === null || budget === undefined) {
          return <span className="text-slate-500 font-mono">-</span>;
        }
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
          maximumFractionDigits: 0,
        }).format(budget);

        return <span className="font-mono text-sm text-slate-300">{formatted}</span>;
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        const label = statusLabelMap[status] || status;

        let badgeStyles = "bg-slate-500/10 border-slate-500/20 text-slate-400";
        if (status === "PLANNING") {
          badgeStyles = "bg-blue-500/10 border-blue-500/20 text-blue-400";
        } else if (status === "IN_PROGRESS") {
          badgeStyles = "bg-[#26336F]/20 border-[#26336F]/30 text-[#DF1B25]";
        } else if (status === "COMPLETED") {
          badgeStyles = "bg-emerald-500/10 border-emerald-500/20 text-emerald-400";
        } else if (status === "ON_HOLD") {
          badgeStyles = "bg-amber-500/10 border-amber-500/20 text-amber-400";
        }

        return (
          <Badge className={`${badgeStyles} font-semibold`} variant="outline">
            {label}
          </Badge>
        );
      },
    },
    {
      accessorKey: "startDate",
      header: "Timeline",
      cell: ({ row }) => {
        const startStr = row.original.startDate;
        const endStr = row.original.endDate;

        const format = (dStr: string | null) => {
          if (!dStr) return "?";
          return new Date(dStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "2-digit",
          });
        };

        if (!startStr && !endStr) return <span className="text-xs text-slate-500">Not Scheduled</span>;

        return (
          <span className="font-mono text-xs text-slate-400">
            {format(startStr)} – {format(endStr)}
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const project = row.original;

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
                <Link href={`/admin/projects/${project.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Project
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(project.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Project
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
