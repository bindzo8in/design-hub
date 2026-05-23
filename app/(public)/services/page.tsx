import FAQSection from "@/components/services/faq-section";
import ServicesHeroSection from "@/components/services/hero-section";
import ServicesListSection from "@/components/services/list-section";
import BrandCreationSection from "@/components/services/brand-creation-section";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "Services",
  description:
    "Discover Design Hub services covering web design, digital marketing, branding, packaging, photography, and print solutions.",
  path: "/services",
  keywords: ["web design services", "digital marketing services", "branding agency", "advertising services"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: buildAbsoluteUrl("/") },
  { name: "Services", url: buildAbsoluteUrl("/services") },
]);

const Page = () => {
  return (
    <main className="flex flex-col w-full py-4 gap-16 md:gap-24">
      <StructuredData id="services-breadcrumb-schema" schema={breadcrumbSchema} />
      <ServicesHeroSection />
      <ServicesListSection />
      <BrandCreationSection />
      <FAQSection />
    </main>
  );
};

export default Page;
