"use client";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Bell, Search, Sun, Moon, LogOut, User, Settings, ShieldAlert } from "lucide-react";
import { useTheme } from "next-themes";
import { MobileSidebar } from "./admin-sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";

export function AdminHeader() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  // Generate page title based on active path
  const getPageTitle = () => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length <= 1) return "Dashboard Overview";
    const section = segments[1];
    return section.charAt(0).toUpperCase() + section.slice(1);
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#050711]/80 px-6 backdrop-blur-xl text-slate-200">
      {/* Mobile Toggle & Title */}
      <div className="flex items-center gap-4">
        <MobileSidebar />
        <div className="hidden sm:block">
          <h1 className="text-lg font-bold tracking-tight text-white font-sans">
            {getPageTitle()}
          </h1>
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex items-center gap-4">
        {/* Global Search Bar */}
        <div className="relative hidden md:block w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <Input
            placeholder="Search records..."
            className="w-full bg-[#101735]/50 border-white/5 pl-9 pr-4 text-sm text-slate-200 placeholder-slate-500 focus:border-[#DF1B25]/50 focus:ring-1 focus:ring-[#DF1B25]/20 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl"
          />
        </div>

        {/* System Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-400 hover:text-white hover:bg-white/5 rounded-xl"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 rounded-full bg-[#DF1B25]" />
          <span className="sr-only">Notifications</span>
        </Button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="relative h-9 w-9 rounded-xl border border-white/10 bg-[#101735] p-0 overflow-hidden cursor-pointer"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Admin profile"}
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-slate-400" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#101735] border border-white/10 text-slate-200 rounded-xl shadow-2xl"
          >
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-bold leading-none text-white">
                  {session?.user?.name || "System Admin"}
                </p>
                <p className="text-xs leading-none text-slate-400 font-mono">
                  {session?.user?.email || "admin@designhub.com"}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg py-2">
              <User className="mr-2 h-4 w-4 text-slate-400" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg py-2">
              <Settings className="mr-2 h-4 w-4 text-slate-400" />
              Global Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem
              onClick={() => signOut({ callbackUrl: "/" })}
              className="focus:bg-[#DF1B25]/20 focus:text-[#DF1B25] text-[#DF1B25] cursor-pointer rounded-lg py-2"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
