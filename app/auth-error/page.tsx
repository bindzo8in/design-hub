"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AlertTriangle, ShieldX, Settings2 } from "lucide-react";

const errorMessages = {
  AccessDenied: {
    title: "Access Denied",
    description:
      "You are not allowed to access this admin panel.",
    icon: ShieldX,
  },

  Configuration: {
    title: "Server Configuration Error",
    description:
      "Authentication is misconfigured. Contact the administrator.",
    icon: Settings2,
  },

  Verification: {
    title: "Verification Failed",
    description:
      "Your login link is invalid or expired.",
    icon: AlertTriangle,
  },

  Default: {
    title: "Authentication Error",
    description:
      "Something went wrong while signing in.",
    icon: AlertTriangle,
  },
} as const;

export default function AuthErrorPage() {
  const searchParams = useSearchParams();

  const error =
    (searchParams.get("error") as keyof typeof errorMessages) ||
    "Default";

  const errorData =
    errorMessages[error] || errorMessages.Default;

  const Icon = errorData.icon;

  return (
    <main className="flex min-h-screen items-center justify-center bg-black px-4 text-white">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-red-500/10 p-4">
            <Icon className="h-10 w-10 text-red-500" />
          </div>
        </div>

        <h1 className="mb-3 text-center text-3xl font-bold">
          {errorData.title}
        </h1>

        <p className="mb-6 text-center text-sm text-zinc-400">
          {errorData.description}
        </p>

        <div className="rounded-lg bg-black/40 p-3 text-center text-xs text-zinc-500">
          Error code: {error}
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/login"
            className="flex-1 rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black transition hover:opacity-90"
          >
            Try Again
          </Link>

          <Link
            href="/"
            className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-center text-sm font-medium transition hover:bg-white/5"
          >
            Home
          </Link>
        </div>
      </div>
    </main>
  );
}