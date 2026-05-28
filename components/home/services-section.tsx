"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  BusFront,
  Camera,
  CarFront,
  Globe,
  Megaphone,
  Package,
  Palette,
  ShoppingBag,
  TrendingUp,
} from "lucide-react";
import gsap from "gsap";

const services = [
  {
    icon: TrendingUp,
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    description:
      "Smart strategies and data-led campaigns designed to help businesses grow with measurable results.",
  },
  {
    icon: Globe,
    title: "Web Development",
    href: "/services/web-design",
    description:
      "Creating digital experiences that convert visitors into customers through thoughtful design and strong user journeys.",
  },
  {
    icon: Palette,
    title: "Design Solution",
    href: "/services/design-solution",
    description:
      "Brand-focused visual systems that unify storytelling, audience engagement, and performance across every touchpoint.",
  },
  {
    icon: ShoppingBag,
    title: "Printing",
    href: "/services/printing",
    description:
      "High-quality print materials that turn ideas into memorable, tangible brand experiences.",
  },
  {
    icon: Package,
    title: "Packaging Design",
    href: "/services/packaging-design",
    description:
      "Packaging that communicates purpose, strengthens shelf appeal, and leaves a lasting impression.",
  },
  {
    icon: Camera,
    title: "Photography",
    href: "/services/photography",
    description:
      "Professional visuals that bring your brand story to life with authenticity, detail, and emotion.",
  },
  // {
  //   icon: Megaphone,
  //   title: "Outdoor Advertisement",
  //   href: "/services/outdoor-advertisement",
  //   description:
  //     "Large-format campaigns across high-footfall locations to increase visibility and reinforce brand recall.",
  // },
  // {
  //   icon: BusFront,
  //   title: "Bus Advertisement",
  //   href: "/services/bus-advertisement",
  //   description:
  //     "Transit-first campaigns designed to keep your brand moving across routes, neighborhoods, and busy corridors.",
  // },
  // {
  //   icon: CarFront,
  //   title: "Mobile Van Advertisement",
  //   href: "/services/mobile-van-adverticement",
  //   description:
  //     "Mobile campaign activations that bring your message directly to the audience with high visibility and flexibility.",
  // },
  // {
  //   icon: Building2,
  //   title: "Barricade Advertisement",
  //   href: "/services/barricade-adverticement",
  //   description:
  //     "Premium viewing spaces on barricades and hoardings that support brand presence at events, construction zones, and public activations.",
  // },
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
          },
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
          },
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Handle card mouse shine effect
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
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
      className="relative overflow-hidden bg-gray-800 py-16 sm:py-24 px-4 sm:px-8 border-b border-border/40 select-none"
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
        <div
          className="services-trigger-grid grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2
xl:grid-cols-3 gap-6"
        >
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              onMouseMove={handleMouseMove}
              className="service-grid-card group relative overflow-hidden rounded-3xl border border-border/60 bg-card/40 p-6 sm:p-8 flex flex-col justify-between min-h-[250px] transition-all duration-300 hover:border-accent/40 hover:-translate-y-1 hover:shadow-md"
            >
              {/* Vercel-like hover radial glow effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(
      350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
      rgba(255, 80, 80, 0.12),
      transparent 60%
    )`,
                }}
              />

              <div>
                {/* Icon wrapper */}
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-red-50 text-red-600 group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shadow-sm">
                  <service.icon className="h-5 w-5" />
                </div>

                {/* Title */}
                <h3 className="mt-6 text-base sm:text-lg font-bold text-gray-100 tracking-wide uppercase">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Bottom arrow visual */}
              <div className="flex justify-end pt-4 border-t border-gray-200 mt-6">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white border border-gray-200 text-gray-700 group-hover:bg-red-500 group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeServicesSection;
