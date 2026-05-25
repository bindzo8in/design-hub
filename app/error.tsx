"use client";

import { ErrorPageShell } from "@/components/error-pages/error-page-shell";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorPageShell
      badge="Error"
      title="Something went wrong"
      description={
        error.message ||
        "We hit an unexpected issue while loading this page. Please try again or go back to the homepage."
      }
      primaryLabel="Back Home"
      primaryHref="/"
      secondaryLabel="Contact us"
      secondaryHref="/contact"
      showRetry
      onRetry={reset}
    />
  );
}
