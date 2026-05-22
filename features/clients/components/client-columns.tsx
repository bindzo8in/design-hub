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
import { MoreHorizontal, Edit, Trash2, Globe, Building } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface ClientRow {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
  _count?: {
    projects: number;
  };
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getClientColumns({ onDeleteClick }: ColumnProps): ColumnDef<ClientRow>[] {
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
      header: "Client Name",
      cell: ({ row }) => {
        const client = row.original;
        const initials = client.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#26336F]/30 bg-[#26336F]/20 rounded-xl overflow-hidden">
              {client.logoUrl ? (
                <AvatarImage src={client.logoUrl} alt={client.name} className="object-contain p-1" />
              ) : null}
              <AvatarFallback className="text-white text-xs bg-[#26336F]/40 font-mono font-semibold rounded-xl">
                {initials || <Building className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-white block">{client.name}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "website",
      header: "Website",
      cell: ({ row }) => {
        const website = row.getValue("website") as string | null;
        if (!website) return <span className="text-slate-500 text-xs">-</span>;

        return (
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-[#DF1B25] hover:underline font-mono"
          >
            <Globe className="h-3.5 w-3.5" />
            {website.replace(/^https?:\/\/(www\.)?/, "")}
          </a>
        );
      },
    },
    {
      id: "projectCount",
      header: "Projects",
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
        const client = row.original;

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
                <Link href={`/admin/clients/${client.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Client
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(client.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Remove Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
