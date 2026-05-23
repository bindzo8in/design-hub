import FAQSection from "@/components/about/faq-section";
import HeroSection from "@/components/about/hero-section";
import AboutFamilySection from "@/components/about/team-members";
import { StructuredData } from "@/components/seo/structured-data";
import { buildAbsoluteUrl } from "@/lib/seo/config";
import { buildMetadata } from "@/lib/seo/metadata";
import { buildBreadcrumbSchema, buildFAQSchema } from "@/lib/seo/schema";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Design Hub helps growing businesses with websites, branding strategies, digital marketing, and end-to-end creative execution in Coimbatore.",
  path: "/about",
  keywords: ["about design hub", "branding agency", "digital marketing agency", "Coimbatore"],
});

const faqSchema = buildFAQSchema([
  {
    question: "What services does Design Hub offer?",
    answer:
      "Design Hub delivers complete digital solutions including Website Development, Mobile App Development, Custom Software & ERP Solutions, UI/UX Design, Graphic Design, SEO, Digital Marketing, and Video Editing Services.",
  },
  {
    question: "Which industries do you support with custom software and CRM solutions?",
    answer:
      "We build CRM, ERP, and tailored software solutions for industries such as retail, education, real estate, healthcare, logistics, hospitality, B2B, e-commerce, service sectors, and startups.",
  },
  {
    question: "What types of websites do you develop?",
    answer:
      "Our team creates business websites, e-commerce stores, portfolio sites, corporate websites, CMS/WordPress platforms, landing pages, and custom UI/UX-based websites with full responsiveness and maintenance support.",
  },
  {
    question: "Do you build both native and cross-platform mobile apps?",
    answer:
      "Yes. We develop Android, iOS, and cross-platform apps using modern frameworks like Flutter, React Native, Kotlin, and Swift—ensuring smooth performance and a seamless user experience.",
  },
  {
    question: "How does your software development process work?",
    answer:
      "We follow a streamlined workflow: Discovery → Requirement Analysis → Wireframing & UI/UX → Agile/Scrum Development → Testing → Deployment → Ongoing Support & Updates.",
  },
  {
    question: "What graphic and branding design services do you offer?",
    answer:
      "Design Hub designs logos, brand identity systems, marketing creatives, brochures, packaging, labels, social media designs, advertisements, UI elements, and promotional materials.",
  },
  {
    question: "What digital marketing and SEO services are provided?",
    answer:
      "Our marketing services include on-page/off-page SEO, technical SEO, content strategies, PPC Ads, lead generation, social media management, performance optimization, and online reputation management.",
  },
  {
    question: "Do you offer video editing or promotional video creation?",
    answer:
      "Yes, we create professional promo videos, reels, ads, explainer videos, motion graphics, product videos, and corporate videos with high-quality editing and color grading.",
  },
  {
    question: "What makes Design Hub unique?",
    answer:
      "We combine creativity, modern technology, and business-focused strategies. With an experienced team, transparent process, fast delivery, customized solutions, and strong client support, we ensure high-quality results for every project.",
  },
  {
    question: "Where is Design Hub located?",
    answer:
      "Design Hub is based in Coimbatore, Tamil Nadu, and provides services to clients across India and internationally through remote and hybrid project collaboration.",
  },
]);

const breadcrumbSchema = buildBreadcrumbSchema([
  { name: "Home", url: buildAbsoluteUrl("/") },
  { name: "About", url: buildAbsoluteUrl("/about") },
]);

const Page = () => {
  return (
    <main className="flex flex-col w-full py-4">
      <StructuredData id="about-breadcrumb-schema" schema={breadcrumbSchema} />
      <StructuredData id="about-faq-schema" schema={faqSchema} />
      <HeroSection />
      <AboutFamilySection />
      <FAQSection />
    </main>
  );
};

export default Page;