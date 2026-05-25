import HomeHeroSection from "@/components/home/hero-section";
import HomeMarquee from "@/components/home/marquee";
import HomeAboutSection from "@/components/home/about-section";
import HomeProcessSection from "@/components/home/process-section";
import HomeServicesSection from "@/components/home/services-section";
import HomeTestimonialsSection from "@/components/home/testimonials-section";
import HomeClientsMarquee from "@/components/home/clients-marquee";
import HomeContactCTA from "@/components/home/contact-cta";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const testimonials = await prisma.testimonial.findMany({
    orderBy: { createdAt: "desc" },
  });

  const clients = await prisma.client.findMany({
    orderBy: { name: "asc" },
    select: {
      name: true,
      logoUrl: true,
    },
  });

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

        {/* Infinite client marquee */}
        <HomeClientsMarquee clients={clients} />

        {/* Client Reviews */}
        <HomeTestimonialsSection testimonials={testimonials} />

        {/* Contact/Quote Request Form */}
        <HomeContactCTA />
      </main>
    </div>
  );
}