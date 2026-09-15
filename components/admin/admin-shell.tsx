"use client";

import React from "react";
import { DesktopSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";

interface AdminShellProps {
  children: React.ReactNode;
}

export function AdminShell({ children }: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#050711] text-slate-200">
      {/* Desktop Sidebar */}
      <DesktopSidebar />

      {/* Main Viewport Container */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Dashboard Top Header */}
        <AdminHeader />

        {/* Dynamic Route Pages */}
        <main className="flex-1 p-6 md:p-8 bg-[#050711] relative overflow-x-hidden">
          {/* Background Blurred Spheres for Luxury Vibe */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#26336F]/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#DF1B25]/5 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-7xl mx-auto space-y-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
