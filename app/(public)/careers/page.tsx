import CareersHeroSection from "@/components/careers/hero-section";
import CareersForm from "@/components/careers/careers-form";
import WhatsAppButton from "@/components/ui/whatsapp-button";

export const metadata = {
  title: "Careers | Design Hub - Build the Future of Digital Experiences",
  description:
    "Explore open job openings at Design Hub. We are hiring UI/UX Designers, Web Developers, Mobile App Developers, Digital Marketers, and Graphic Designers in Coimbatore.",
};

const CareersPage = () => {
  return (
    <main className="flex flex-col w-full py-4">
      {/* Careers page hero */}
      <CareersHeroSection />

      {/* Dual column: form & positions */}
      <CareersForm />

      {/* WhatsApp Button Widget */}
      <WhatsAppButton />
    </main>
  );
};

export default CareersPage;
