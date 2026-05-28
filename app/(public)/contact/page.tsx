import ContactHeroSection from "@/components/contact/hero-section";
import ContactForm from "@/components/contact/contact-form";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema } from "@/lib/seo/schema";
import ContactMap from "@/components/contact/contact-map";

export const metadata = buildMetadata({
  title: "Contact",
  description:
    "Get in touch with Design Hub in Coimbatore. Let's create responsive websites, e-commerce, custom software, graphics, and digital marketing strategies for your business success.",
  path: "/contact",
  keywords: ["contact design hub", "web development Coimbatore", "digital marketing contact"],
});

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: buildAbsoluteUrl("/") },
  { name: "Contact", url: buildAbsoluteUrl("/contact") },
]);

const ContactPage = () => {
  return (
    <main className="flex flex-col w-full py-4">
      <StructuredData id="contact-breadcrumb-schema" schema={breadcrumbSchema} />
      <ContactHeroSection />
      <ContactForm />
      <ContactMap />
    </main>
  );
};

export default ContactPage;
