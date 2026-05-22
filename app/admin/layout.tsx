import React from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin Dashboard | Design Hub",
  description: "Enterprise content & client management dashboard.",
};

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  // Protect route at server layer
  const session = await auth();
  
  if (!session) {
    redirect("/login");
  }

  if ((session.user as any)?.role !== "ADMIN") {
    redirect("/login?error=AccessDenied");
  }

  return <AdminShell>{children}</AdminShell>;
}
