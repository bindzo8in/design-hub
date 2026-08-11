"use client";

import React from "react";
import { DesktopSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#101735] text-slate-900 dark:text-white">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Viewport Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Dashboard Top Header */}
        <AdminHeader />

        {/* Dynamic Route Pages */}
        <main className="flex-1 p-6 md:p-8 bg-slate-100/70 dark:bg-[#101735] relative overflow-x-hidden">
          {/* Background Blurred Spheres for Luxury Vibe */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#26336F]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[300px] h-[300px] bg-[#DF1B25]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
