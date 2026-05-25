"use client";

import Link from "next/link";
import { ArrowLeft, Home, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[radial-gradient(circle_at_top,_rgba(223,27,37,0.12),_transparent_28%),linear-gradient(180deg,#050711,#0b1228)] text-foreground antialiased">
        <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 rounded-[2rem] border border-border/60 bg-card/80 px-6 py-12 text-center shadow-[0_30px_80px_rgba(5,7,17,0.45)] backdrop-blur sm:px-10">
            <p className="rounded-full border border-border/60 bg-background/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
              Critical Error
            </p>
            <div className="space-y-4">
              <h1 className="font-[family-name:var(--font-bebas-neue)] text-4xl leading-none tracking-[0.2em] text-foreground sm:text-5xl">
                Something went wrong
              </h1>
              <p className="text-sm leading-6 text-muted-foreground sm:text-base">
                {error.message || "A critical error prevented the application from rendering correctly. Please refresh the page or return to the homepage."}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Button onClick={() => reset()} className="bg-accent text-white hover:bg-accent/90">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try again
              </Button>

              <Button asChild variant="outline" className="border-border bg-background/70 text-foreground hover:bg-muted">
                <Link href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Back Home
                </Link>
              </Button>

              <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
                <Link href="/contact">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Contact us
                </Link>
              </Button>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
