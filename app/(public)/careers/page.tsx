import CareersHeroSection from "@/components/careers/hero-section";
import CareersForm from "@/components/careers/careers-form";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Careers",
  description:
    "Explore open job openings at Design Hub. We are hiring UI/UX Designers, Web Developers, Mobile App Developers, Digital Marketers, and Graphic Designers in Coimbatore.",
  path: "/careers",
  keywords: ["careers", "design hub careers", "UI designer jobs", "Coimbatore jobs"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: buildAbsoluteUrl("/") },
  { name: "Careers", url: buildAbsoluteUrl("/careers") },
]);

const CareersPage = () => {
  return (
    <main className="flex flex-col w-full py-4">
      <StructuredData id="careers-breadcrumb-schema" schema={breadcrumbSchema} />
      <CareersHeroSection />
      <CareersForm />
    </main>
  );
};

export default CareersPage;
