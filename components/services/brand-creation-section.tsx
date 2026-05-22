"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const BrandCreationSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".brand-spotlight-reveal",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Subtle background glow overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-40">
        <div className="h-[400px] w-[500px] rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-5xl">
        <div className="brand-spotlight-reveal relative overflow-hidden rounded-[2rem] border border-border/60 bg-card/30 p-8 sm:p-12 md:p-16 backdrop-blur-md">
          {/* Glass Accent Borders */}
          <div className="absolute top-0 left-0 w-[4px] h-full bg-gradient-to-b from-accent via-accent/50 to-transparent" />
          
          <div className="max-w-3xl space-y-6">
            {/* Top Label */}
            <div className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-8 h-[1px] bg-accent" />
              Empowering Vision
            </div>

            {/* Display Heading */}
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-6xl md:text-7xl uppercase leading-none tracking-wider text-foreground">
              We Create <em className="not-italic text-accent">Brands</em> <br className="hidden sm:inline" />
              That Create Success
            </h2>

            {/* Description Text */}
            <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground font-medium">
              Design Hub is a leading Tech and Digital Marketing company in Coimbatore with over five years of proven expertise. We specialize in crafting responsive websites, e-commerce platforms, mobile apps, custom software, creative logos, brochures, product packaging, and more—everything your brand needs to shine.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandCreationSection;
