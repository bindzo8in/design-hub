"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const CareersHeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".careers-hero-reveal",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background text-foreground py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 select-none"
    >
      {/* Background glow overlay */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center opacity-30">
        <div className="h-[400px] w-[600px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl text-center space-y-4">
        <div className="careers-hero-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent justify-center">
          <span className="w-8 h-[1px] bg-accent" />
          Careers at Design Hub
          <span className="w-8 h-[1px] bg-accent" />
        </div>
        
        <h1 className="careers-hero-reveal font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-8xl lg:text-9xl leading-[0.9] tracking-wider uppercase text-foreground">
          Join Our <em className="not-italic text-accent">Creative</em> Team
        </h1>
        
        <p className="careers-hero-reveal text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl mx-auto">
          We're looking for passionate individuals who want to build the future of digital experiences. Explore our open positions and start your journey with us.
        </p>
      </div>
    </section>
  );
};

export default CareersHeroSection;
