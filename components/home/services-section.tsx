"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const services = [
  {
    num: "01",
    title: "Digital Marketing",
    href: "/services/digital-marketing",
    image: "/services/digital-marketing.jpg",
    description:
      "Data-driven marketing strategies, high-ROAS ad campaigns, and search optimization designed to scale revenue.",
    capabilities: ["SEO & Content", "PPC Campaigns", "Conversion Opt."],
  },
  {
    num: "02",
    title: "Web Development",
    href: "/services/web-design",
    image: "/services/web-design.jpg",
    description:
      "Sub-second Next.js web applications, headless e-commerce stores, and conversion-engineered digital platforms.",
    capabilities: ["Next.js & React", "E-Commerce", "UI Architecture"],
  },
  {
    num: "03",
    title: "Design Solution",
    href: "/services/design-solution",
    image: "/services/design-solution.jpg",
    description:
      "Cohesive visual identities, design systems, and logo architecture that elevate brand positioning.",
    capabilities: ["Brand Identity", "Logo Design", "Visual Guidelines"],
  },
  {
    num: "04",
    title: "Packaging Design",
    href: "/services/packaging-design",
    image: "/services/packaging-design.jpg",
    description:
      "Tactile packaging, unboxing experiences, and structural box designs engineered for maximum retail shelf presence.",
    capabilities: ["3D Box Mockups", "Structural Packaging", "Foil & Finishes"],
  },
  {
    num: "05",
    title: "Print Production",
    href: "/services/printing",
    image: "/services/printing.jpg",
    description:
      "Ultra-high resolution print collateral, corporate stationery, brochures, and promotional merchandise crafted to impress.",
    capabilities: ["Stationery", "Large Format", "Luxury Stocks"],
  },
  {
    num: "06",
    title: "Commercial Photography",
    href: "/services/photography",
    image: "/services/photography.jpg",
    description:
      "Professional product photography, editorial shoots, and commercial visual production that brings brand stories to life.",
    capabilities: ["Product Shoots", "Editorial", "High-End Retouch"],
  },
];

const HomeServicesSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Track GSAP quickTo functions
  const xTo = useRef<any>(null);
  const yTo = useRef<any>(null);

  useGSAP(() => {
    // Setup quickTo for image follower
    if (imageRef.current) {
      gsap.set(imageRef.current, { xPercent: -50, yPercent: -50, scale: 0.8, autoAlpha: 0 });
      xTo.current = gsap.quickTo(imageRef.current, "x", { duration: 0.5, ease: "power3" });
      yTo.current = gsap.quickTo(imageRef.current, "y", { duration: 0.5, ease: "power3" });
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Header reveal
    if (headerRef.current) {
      const els = headerRef.current.children;
      gsap.fromTo(
        els,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 80%",
          }
        }
      );
    }

    // Grid reveal
    gsap.fromTo(
      ".service-row",
      { opacity: 0, rotateX: -10, y: 30 },
      {
        opacity: 1,
        rotateX: 0,
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
  };

  const handleMouseEnter = (image: string, e: React.MouseEvent) => {
    setActiveImage(image);
    
    // Immediately set position so it doesn't fly in from corner on first hover
    if (xTo.current && yTo.current) {
      xTo.current(e.clientX);
      yTo.current(e.clientY);
    }
    
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        autoAlpha: 1,
        scale: 1,
        duration: 0.4,
        ease: "power3.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        autoAlpha: 0,
        scale: 0.8,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  };

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative w-full bg-background py-32 md:py-48 text-foreground overflow-hidden"
    >
      {/* Cursor Follower Image Preview */}
      <div 
        ref={imageRef} 
        className="fixed top-0 left-0 w-[350px] h-[250px] pointer-events-none z-50 hidden md:block overflow-hidden rounded-2xl border border-border bg-background/50 backdrop-blur-sm"
      >
        {activeImage && (
          <Image 
            src={activeImage}
            alt="Service preview"
            fill
            sizes="350px"
            className="object-cover"
          />
        )}
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        
        {/* Section Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-20 lg:mb-32">
          <div className="max-w-2xl space-y-8">
            <h2 className="font-[family-name:var(--font-heading)] font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] uppercase tracking-tight text-foreground/90">
              Our <span className="text-accent italic font-light">Expertise</span>
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-foreground/80 font-light max-w-lg">
              We combine strategy, design systems, and web technology to build complete digital ecosystems that scale your business.
            </p>
          </div>

          <div className="pb-4">
            <Link
              href="/services"
              className="group inline-flex items-center gap-4 text-xs font-bold uppercase tracking-[0.2em] text-foreground transition-colors hover:text-accent"
            >
              <span className="relative">
                Explore All Services
                <span className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-100 bg-foreground/20 transition-transform duration-300 group-hover:scale-x-0" />
                <span className="absolute -bottom-2 left-0 h-px w-full origin-right scale-x-0 bg-accent transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Services Fine-Line Grid */}
        <div 
          className="services-grid w-full border-t border-border flex flex-col relative"
          onMouseMove={handleMouseMove}
        >
          {services.map((service, idx) => (
            <Link
              key={service.href}
              href={service.href}
              className="service-row group relative flex flex-col lg:flex-row lg:items-center justify-between gap-8 border-b border-border py-12 transition-colors hover:bg-foreground/[0.02]"
              onMouseEnter={(e) => handleMouseEnter(service.image, e)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Overlay highlight line */}
              <div className="absolute left-0 top-0 h-full w-[3px] scale-y-0 bg-accent opacity-0 transition-all duration-300 group-hover:scale-y-100 group-hover:opacity-100" />
              
              <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-16 w-full lg:w-2/3 pl-0 lg:pl-8">
                <span className="text-sm font-medium text-muted-foreground/50 group-hover:text-accent transition-colors relative z-10">
                  {service.num}
                </span>
                
                <h3 className="font-[family-name:var(--font-heading)] font-light text-3xl md:text-5xl uppercase tracking-wide text-foreground/90 group-hover:text-foreground transition-colors relative z-10">
                  {service.title}
                </h3>
              </div>

              <div className="flex flex-col gap-6 w-full lg:w-1/3 relative z-10">
                <p className="text-sm md:text-base text-foreground/70 font-light leading-relaxed group-hover:text-foreground/90 transition-colors">
                  {service.description}
                </p>
                
                <div className="flex flex-wrap gap-4">
                  {service.capabilities.map((cap, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground/80 transition-colors">
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeServicesSection;
