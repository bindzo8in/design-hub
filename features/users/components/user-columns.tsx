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

// User entity structure matching Prisma schema
export interface UserRow {
  id: string;
  name: string | null;
  email: string | null;
  role: "USER" | "ADMIN";
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getUserColumns({ onDeleteClick }: ColumnProps): ColumnDef<UserRow>[] {
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
      header: "User Details",
      cell: ({ row }) => {
        const name = row.getValue("name") as string || "Anonymous";
        const email = row.original.email || "No email";
        const initials = name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);

        return (
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-[#26336F]/20 border border-[#26336F]/30 text-xs font-bold text-slate-300">
              {initials}
            </div>
            <div>
              <div className="font-semibold text-white">{name}</div>
              <div className="text-xs text-slate-400 font-mono">{email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ row }) => {
        const role = row.getValue("role") as string;
        const isAdmin = role === "ADMIN";

        return (
          <Badge
            className={
              isAdmin
                ? "bg-[#DF1B25]/10 border-[#DF1B25]/30 text-[#DF1B25] hover:bg-[#DF1B25]/15"
                : "bg-[#26336F]/20 border-[#26336F]/40 text-slate-300 hover:bg-[#26336F]/30"
            }
            variant="outline"
          >
            {role}
          </Badge>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Joined",
      cell: ({ row }) => {
        const dateStr = row.getValue("createdAt") as string;
        const formatted = new Date(dateStr).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        });

        return <span className="font-mono text-xs text-slate-400">{formatted}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

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
              className="w-40 bg-[#101735] border border-[#26336F]/30 text-white rounded-xl shadow-xl"
            >
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem asChild className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg">
                <Link href={`/admin/users/${user.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit User
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(user.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Delete Record
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
