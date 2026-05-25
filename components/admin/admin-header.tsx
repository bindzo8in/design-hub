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
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-[#26336F]/20 bg-[#050711]/80 px-6 backdrop-blur-md text-white">
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
            className="w-full bg-[#101735]/40 border-[#26336F]/30 pl-9 pr-4 text-sm text-white placeholder-slate-400 focus:border-[#DF1B25]/50 focus:ring-1 focus:ring-[#DF1B25]/20 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl"
          />
        </div>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        {/* System Notifications */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-300 hover:text-white hover:bg-white/5 rounded-xl"
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
              className="relative h-9 w-9 rounded-xl border border-[#26336F]/30 bg-[#101735] p-0 overflow-hidden cursor-pointer"
            >
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || "Admin profile"}
                  fill
                  className="object-cover"
                />
              ) : (
                <User className="h-4 w-4 text-slate-300" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#101735] border border-[#26336F]/30 text-white rounded-xl shadow-xl"
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
            <DropdownMenuSeparator className="bg-[#26336F]/20" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg py-2">
              <User className="mr-2 h-4 w-4 text-slate-400" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-white cursor-pointer rounded-lg py-2">
              <Settings className="mr-2 h-4 w-4 text-slate-400" />
              Global Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-[#26336F]/20" />
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
