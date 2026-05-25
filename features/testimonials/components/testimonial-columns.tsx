"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Edit, Trash2, User } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export interface TestimonialRow {
  id: string;
  author: string;
  role: string;
  text: string;
  avatarUrl: string | null;
  avatarPublicId?: string | null;
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getTestimonialColumns({ onDeleteClick }: ColumnProps): ColumnDef<TestimonialRow>[] {
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
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => {
        const testimonial = row.original;
        const initials = testimonial.author
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#26336F]/30 bg-[#26336F]/20 rounded-xl overflow-hidden">
              {testimonial.avatarUrl ? (
                <AvatarImage src={testimonial.avatarUrl} alt={testimonial.author} className="object-cover" />
              ) : null}
              <AvatarFallback className="text-white text-xs bg-[#26336F]/40 font-mono font-semibold rounded-xl">
                {initials || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <span className="font-semibold text-white block">{testimonial.author}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "role",
      header: "Role / Company",
      cell: ({ row }) => {
        return <span className="text-slate-300">{row.getValue("role")}</span>;
      },
    },
    {
      accessorKey: "text",
      header: "Testimonial Text",
      cell: ({ row }) => {
        const text = row.getValue("text") as string;
        const truncated = text.length > 80 ? `${text.slice(0, 80)}...` : text;
        return (
          <span className="text-slate-400 text-xs italic block max-w-md whitespace-normal">
            &ldquo;{truncated}&rdquo;
          </span>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const testimonial = row.original;

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
                <Link href={`/admin/testimonials/${testimonial.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Review
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(testimonial.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Remove Review
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
