"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  FolderGit2,
  Tags,
  MessageSquareQuote,
  Users2,
  Handshake,
  Settings,
  Shield,
  Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export interface SidebarItem {
  title: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const sidebarItems: SidebarItem[] = [
  { title: "Overview", href: "/admin", icon: LayoutDashboard },
  { title: "Users", href: "/admin/users", icon: Users },
  { title: "Projects", href: "/admin/projects", icon: FolderGit2 },
  { title: "Categories", href: "/admin/categories", icon: Tags },
  { title: "Testimonials", href: "/admin/testimonials", icon: MessageSquareQuote },
  { title: "Team Members", href: "/admin/team", icon: Users2 },
  { title: "Clients", href: "/admin/clients", icon: Handshake },
  { title: "Settings", href: "/admin/settings", icon: Settings },
];

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-background border-r border-border/40 text-foreground">
      {/* Brand Header */}
      <div className="flex h-16 items-center px-6 border-b border-border/40">
        <Link href="/admin" className="flex items-center gap-2.5 group">
          <div className="bg-[#DF1B25]/10 border border-[#DF1B25]/30 p-1.5 rounded-lg text-[#DF1B25] group-hover:scale-105 transition-transform duration-300">
            <Shield className="w-5 h-5" />
          </div>
          <span className="font-sans font-bold tracking-tight text-lg">
            DESIGN<span className="text-[#DF1B25]">HUB</span> <span className="text-xs uppercase px-1.5 py-0.5 rounded bg-[#26336F] text-white font-mono tracking-widest ml-1 border border-[#26336F]">Admin</span>
          </span>
        </Link>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group relative overflow-hidden",
                isActive
                  ? "bg-card text-foreground border border-border shadow-md"
                  : "text-muted-foreground hover:text-foreground hover:bg-card/60 border border-transparent"
              )}
            >
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#DF1B25] rounded-r-md" />
              )}
              <item.icon
                className={cn(
                  "w-4 h-4 transition-transform duration-300 group-hover:scale-110",
                  isActive ? "text-[#DF1B25]" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {item.title}
            </Link>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-border/40 bg-secondary/20 text-center">
        <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
          Secured session
        </p>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden text-foreground hover:bg-accent/10">
          <Menu className="w-5 h-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-72 bg-background border-r border-border/40 text-foreground">
        <SheetTitle className="sr-only">Admin navigation</SheetTitle>
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}

export function DesktopSidebar() {
  return (
    <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-30">
      <SidebarContent />
    </aside>
  );
}
