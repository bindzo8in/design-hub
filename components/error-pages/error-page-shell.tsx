import Link from "next/link";
import { ArrowLeft, Home, RotateCcw, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorPageShellProps {
  badge: string;
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  showRetry?: boolean;
  onRetry?: () => void;
}

export function ErrorPageShell({
  badge,
  title,
  description,
  primaryLabel = "Back Home",
  primaryHref = "/",
  secondaryLabel = "Contact us",
  secondaryHref = "/contact",
  showRetry = false,
  onRetry,
}: ErrorPageShellProps) {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(223,27,37,0.12),_transparent_28%),linear-gradient(180deg,#050711,#0b1228)] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center lg:flex-row lg:text-left">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/70 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-accent">
            <ShieldAlert className="h-3.5 w-3.5" />
            {badge}
          </div>

          <div className="space-y-4">
            <p className="text-sm text-muted-foreground sm:text-base">{description}</p>
            <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl leading-none tracking-[0.2em] text-foreground sm:text-6xl lg:text-7xl">
              {title}
            </h1>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {showRetry && onRetry ? (
              <Button
                type="button"
                onClick={onRetry}
                className="bg-accent text-white hover:bg-accent/90"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Try again
              </Button>
            ) : null}

            <Button asChild variant="outline" className="border-border bg-background/70 text-foreground hover:bg-muted">
              <Link href={primaryHref}>
                <Home className="mr-2 h-4 w-4" />
                {primaryLabel}
              </Link>
            </Button>

            <Button asChild variant="ghost" className="text-muted-foreground hover:text-foreground">
              <Link href={secondaryHref}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                {secondaryLabel}
              </Link>
            </Button>
          </div>
        </div>

        <div className="flex-1">
          <div className="rounded-[2rem] border border-border/60 bg-card/80 p-8 shadow-[0_30px_80px_rgba(5,7,17,0.45)] backdrop-blur-sm sm:p-10">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/60 bg-background/80 p-5 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Status
                </p>
                <p className="mt-3 text-3xl font-semibold text-foreground">{badge}</p>
              </div>
              <div className="rounded-2xl border border-border/60 bg-background/80 p-5 text-left">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  Guidance
                </p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  If this problem keeps happening, contact our team and we’ll help you get back on track.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
