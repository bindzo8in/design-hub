"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  Globe,
  TrendingUp,
  Palette,
  ShoppingBag,
  Package,
  Camera,
  ArrowUpRight,
} from "lucide-react";
import gsap from "gsap";

const services = [
  {
    icon: Globe,
    title: "Web Design",
    description:
      "Creating digital experiences that convert visitors into customers through thoughtful design and strong user journeys.",
  },

  {
    icon: TrendingUp,
    title: "Digital Marketing",
    description:
      "Smart strategies and data-led campaigns designed to help businesses grow with measurable results.",
  },

  {
    icon: Palette,
    title: "Design Solution",
    description:
      "Brand-focused visual systems that unify storytelling, audience engagement, and performance across every touchpoint.",
  },

  {
    icon: ShoppingBag,
    title: "Printing",
    description:
      "High-quality print materials that turn ideas into memorable, tangible brand experiences.",
  },

  {
    icon: Package,
    title: "Packaging Design",
    description:
      "Packaging that communicates purpose, strengthens shelf appeal, and leaves a lasting impression.",
  },

  {
    icon: Camera,
    title: "Photography",
    description:
      "Professional visuals that bring your brand story to life with authenticity, detail, and emotion.",
  },
];

const HomeServicesSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header reveals
        gsap.fromTo(
          ".services-reveal",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-trigger-header",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Grid cards stagger entrance
        gsap.fromTo(
          ".service-grid-card",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-trigger-grid",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle card mouse shine effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative overflow-hidden bg-background py-16 sm:py-24 px-4 sm:px-8 border-b border-border/40 select-none"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="services-trigger-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 lg:mb-16">
          <div className="space-y-4">
            <div className="services-reveal flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-8 h-[1px] bg-accent" />
              What We Do
            </div>
            <h2 className="services-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-foreground">
              Our <em className="not-italic text-accent">Services</em>
            </h2>
          </div>
          
          <div className="services-reveal">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-accent transition-colors hover:text-accent/80 hover:underline underline-offset-4"
            >
              All Services
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-trigger-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2
xl:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div
              key={idx}
              onMouseMove={handleMouseMove}
              className="service-grid-card group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8 flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Vercel-like hover radial glow effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(223, 27, 37, 0.05), transparent 60%)`
                }}
              />

              <div>
                {/* Icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary dark:text-[#7f91ff] group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300 shadow-sm">
                  <service.icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-base sm:text-lg font-bold text-foreground tracking-wide uppercase">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom arrow visual */}
              <div className="flex justify-end pt-4 border-t border-border/40 mt-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-border group-hover:bg-accent group-hover:text-accent-foreground transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeServicesSection;