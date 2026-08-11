import HomeHeroSection from "@/components/home/hero-section";
import HomeMarquee from "@/components/home/marquee";
import HomeAboutSection from "@/components/home/about-section";
import HomeProcessSection from "@/components/home/process-section";
import HomeServicesSection from "@/components/home/services-section";
import HomeTestimonialsSection from "@/components/home/testimonials-section";
import HomeClientsMarquee from "@/components/home/clients-marquee";
import HomeContactCTA from "@/components/home/contact-cta";
import HomeScrollAnimations from "@/components/home/scroll-animations";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Home() {
  const [testimonials, clients, projects, categories] = await Promise.all([
    prisma.testimonial.findMany({
      orderBy: { createdAt: "desc" },
    }),
    prisma.client.findMany({
      orderBy: { name: "asc" },
      select: {
        name: true,
        logoUrl: true,
      },
    }),
    prisma.project.findMany({
      orderBy: { createdAt: "desc" },
      take: 6,
      include: {
        category: true,
        client: true,
      },
    }),
    prisma.category.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return (
    <div className="flex flex-col flex-1 w-full font-sans">
      <main className="w-full">
        {/* Scroll-triggered parallax & reveal animations orchestrator */}
        <HomeScrollAnimations />

        {/* Homepage Hero with grid lines and typing effect */}
        <HomeHeroSection />

        {/* Branding scrolling marquee */}
        <HomeMarquee />

        {/* About section with stats count-up */}
        <HomeAboutSection />

        {/* 8-card Services grid with shine highlights */}
        <HomeServicesSection />

        {/* Process timelines */}
        <HomeProcessSection />

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