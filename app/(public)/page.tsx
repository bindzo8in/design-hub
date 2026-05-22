import HomeHeroSection from "@/components/home/hero-section";
import HomeMarquee from "@/components/home/marquee";
import HomeAboutSection from "@/components/home/about-section";
import HomeProcessSection from "@/components/home/process-section";
import HomeServicesSection from "@/components/home/services-section";
import HomeTestimonialsSection from "@/components/home/testimonials-section";
import HomeContactCTA from "@/components/home/contact-cta";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 w-full font-sans">
      <main className="w-full">
        {/* Homepage Hero with grid lines and typing effect */}
        <HomeHeroSection />

        {/* Branding scrolling marquee */}
        <HomeMarquee />

        {/* About section with stats count-up */}
        <HomeAboutSection />

        {/* Process timelines */}
        <HomeProcessSection />

        {/* 8-card Services grid with shine highlights */}
        <HomeServicesSection />

        {/* Client Reviews */}
        <HomeTestimonialsSection />

        {/* Contact/Quote Request Form */}
        <HomeContactCTA />
      </main>
    </div>
  );
}