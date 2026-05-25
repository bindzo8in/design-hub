import { ErrorPageShell } from "@/components/error-pages/error-page-shell";

export const metadata = {
  title: "Page not found | Design Hub",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <ErrorPageShell
      badge="404"
      title="Page not found"
      description="The page you requested is unavailable or has been moved. Check the URL and try again, or return to the homepage to continue exploring."
      primaryLabel="Back Home"
      primaryHref="/"
      secondaryLabel="Contact us"
      secondaryHref="/contact"
    />
  );
}
