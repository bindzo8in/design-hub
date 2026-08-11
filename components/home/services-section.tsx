"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import Image from "next/image";
import gsap from "gsap";

const services = [
  {
    num: "01",
    image: "/services/digital-marketing.jpg",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    description:
      "Data-driven marketing strategies, high-ROAS ad campaigns, and search optimization designed to scale revenue.",
    capabilities: ["SEO & Content Strategy", "PPC & Paid Campaigns", "Conversion Optimization"],
    accentGradient: "from-red-500 via-accent to-red-600",
  },
  {
    num: "02",
    image: "/services/web-design.jpg",
    title: "Web Development",
    href: "/services/web-design",
    description:
      "Sub-second Next.js web applications, headless e-commerce stores, and conversion-engineered digital platforms.",
    capabilities: ["Next.js & React Apps", "E-Commerce Systems", "Custom UI Architecture"],
    accentGradient: "from-blue-500 via-indigo-600 to-blue-700",
  },
  {
    num: "03",
    image: "/services/design-solution.jpg",
    title: "Design Solution",
    href: "/services/design-solution",
    description:
      "Cohesive visual identities, design systems, and logo architecture that elevate brand positioning.",
    capabilities: ["Brand Identity Systems", "Logo Design Architecture", "Visual Guidelines"],
    accentGradient: "from-purple-500 via-accent to-indigo-600",
  },
  {
    num: "04",
    image: "/services/packaging-design.jpg",
    title: "Packaging Design",
    href: "/services/packaging-design",
    description:
      "Tactile packaging, unboxing experiences, and structural box designs engineered for maximum retail shelf presence.",
    capabilities: ["3D Box Mockups", "Structural Packaging", "Foil & Die-Cut Finishes"],
    accentGradient: "from-emerald-500 via-teal-600 to-emerald-700",
  },
  {
    num: "05",
    image: "/services/printing.jpg",
    title: "Print Production",
    href: "/services/printing",
    description:
      "Ultra-high resolution print collateral, corporate stationery, brochures, and promotional merchandise crafted to impress.",
    capabilities: ["Corporate Stationery", "Large Format Printing", "Luxury Paper Stocks"],
    accentGradient: "from-amber-500 via-orange-600 to-amber-700",
  },
  {
    num: "06",
    image: "/services/photography.jpg",
    title: "Commercial Photography",
    href: "/services/photography",
    description:
      "Professional product photography, editorial shoots, and commercial visual production that brings brand stories to life.",
    capabilities: ["Studio Product Shoots", "Editorial & Lifestyle", "High-End Retouching"],
    accentGradient: "from-pink-500 via-rose-600 to-accent",
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
            stagger: 0.1,
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
      className="relative overflow-hidden bg-background text-foreground py-20 lg:py-32 px-4 sm:px-6 lg:px-8 border-t border-b border-border/50 select-none"
    >
      {/* Soft Background Ambient Spotlights */}
      <div className="services-bg-glow pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[450px] w-[600px] -translate-x-1/2 rounded-full bg-accent/10 blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="services-trigger-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-20">
          <div className="max-w-2xl space-y-4">
            <div className="services-reveal inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-3.5 w-3.5" />
              Core Capabilities
            </div>
            <h2 className="services-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.88] tracking-wider uppercase text-foreground">
              Engineered For <br />
              <em className="not-italic text-accent">Maximum Impact</em>
            </h2>
            <p className="services-reveal text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              We combine strategy, design systems, and web technology to build complete digital ecosystems that scale your business.
            </p>
          </div>

          <div className="services-reveal">
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-bold uppercase tracking-wider text-foreground shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white hover:shadow-md"
            >
              Explore All Services
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-trigger-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              onMouseMove={handleMouseMove}
              className="service-card-anim service-grid-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-8 shadow-xl transition-all duration-500 hover:-translate-y-2 hover:border-accent/60 hover:shadow-[0_20px_50px_rgba(223,27,37,0.18)]"
            >
              {/* Top Accent Gradient Border on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${service.accentGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Cursor Shine Radial Overlay */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(
                    380px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
                    rgba(223, 27, 37, 0.12),
                    transparent 70%
                  )`,
                }}
              />

              <div>
                {/* Header Row: Icon & Watermark Number */}
                <div className="flex items-center justify-between mb-8">
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-border bg-muted shadow-sm transition-transform duration-300 group-hover:scale-110">
                    <Image src={service.image} alt={service.title} fill className="object-cover" />
                  </div>

                  <span className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-muted-foreground/40 group-hover:text-accent/30 transition-colors duration-300 leading-none">
                    {service.num}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-foreground tracking-wide uppercase transition-colors group-hover:text-accent">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>

                {/* Capabilities Feature Tags */}
                <div className="mt-6 space-y-2 border-t border-border/60 pt-5">
                  {service.capabilities.map((cap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs font-semibold text-foreground/80">
                      <CheckCircle2 className="h-3.5 w-3.5 text-accent shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom CTA Row */}
              <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-4">
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground group-hover:text-accent transition-colors">
                  Learn More
                </span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-secondary text-foreground group-hover:bg-accent group-hover:border-accent group-hover:text-white transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
