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
import { FaGithub, FaLinkedin } from "react-icons/fa";

export interface TeamMemberRow {
  id: string;
  name: string;
  role: string;
  imageUrl: string | null;
  imagePublicId?: string | null;
  bio: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  createdAt: string;
}

interface ColumnProps {
  onDeleteClick: (id: string) => void;
}

export function getTeamMemberColumns({ onDeleteClick }: ColumnProps): ColumnDef<TeamMemberRow>[] {
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
      header: "Member Name",
      cell: ({ row }) => {
        const member = row.original;
        const initials = member.name
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();

        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9 border border-[#26336F]/30 bg-[#26336F]/20">
              {member.imageUrl ? (
                <AvatarImage src={member.imageUrl} alt={member.name} className="object-cover" />
              ) : null}
              <AvatarFallback className="text-white text-xs bg-[#26336F]/40 font-mono font-semibold">
                {initials || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <span className="font-semibold text-white block">{member.name}</span>
              <span className="text-xs text-slate-400 font-sans block">{member.role}</span>
            </div>
          </div>
        );
      },
    },
    {
      id: "socials",
      header: "Social Profiles",
      cell: ({ row }) => {
        const member = row.original;

        return (
          <div className="flex items-center gap-2">
            {member.githubUrl ? (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
              >
                <a href={member.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {member.linkedinUrl ? (
              <Button
                asChild
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg"
              >
                <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <FaLinkedin className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {!member.githubUrl && !member.linkedinUrl ? (
              <span className="text-slate-500 text-xs">-</span>
            ) : null}
          </div>
        );
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const member = row.original;

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
                <Link href={`/admin/team/${member.id}/edit`}>
                  <Edit className="mr-2 h-3.5 w-3.5 text-slate-400" />
                  Edit Member
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[#26336F]/20" />
              <DropdownMenuItem
                onClick={() => onDeleteClick(member.id)}
                className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg"
              >
                <Trash2 className="mr-2 h-3.5 w-3.5" />
                Remove Member
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}
