"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header entrance animation
        gsap.fromTo(
          ".about-hero-header",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", delay: 0.2 }
        );

        // Cards fade-up reveal on scroll
        const cards = gsap.utils.toArray(".about-card-reveal");
        cards.forEach((card: any) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                once: true,
              },
            }
          );
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="container mx-auto max-w-7xl bg-background px-4 sm:px-6 lg:px-8 select-none">
      <header className="about-hero-header py-8 sm:py-12">
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-center text-5xl sm:text-7xl lg:text-8xl tracking-wider uppercase text-foreground">
          About <em className="not-italic text-accent">Us</em>
        </h1>
      </header>

      <article className="grid grid-cols-1 gap-8 lg:gap-12 pb-12 sm:pb-16">
        
        {/* Why Us */}
        <div className="about-card-reveal grid overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm sm:grid-cols-2">
          <figure className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/30 sm:aspect-auto sm:min-h-[360px]">
            <Image
              src="/about/hero/about_hero_1.webp"
              alt="About Design Hub team and creative work"
              fill
              priority
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>

          <div className="flex items-center p-6 sm:p-8 md:p-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="w-6 h-[1px] bg-accent" />
                Why Us?
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                We have over 6 years of experience in graphic design, web design
                and development, e-commerce development, digital marketing,
                mobile applications, and more in Coimbatore and across the
                world.
              </p>
            </div>
          </div>
        </div>

        {/* What We Do */}
        <div className="about-card-reveal grid overflow-hidden rounded-3xl border border-border/60 bg-card shadow-sm sm:grid-cols-2">
          <figure className="relative aspect-[4/3] w-full overflow-hidden bg-secondary/30 sm:order-2 sm:aspect-auto sm:min-h-[360px]">
            <Image
              src="/about/hero/about_hero_2.webp"
              alt="Branding and graphic design studio work"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
            />
          </figure>

          <div className="flex items-center p-6 sm:p-8 md:p-12">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="w-6 h-[1px] bg-accent" />
                What We Do?
              </div>

              <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                We are a branding and graphic design studio focused on bringing
                brands to life through compelling visual identity. Our team
                blends artistic creativity with strategic thinking to create
                logos, branding systems, marketing materials, and digital assets
                that elevate businesses.
              </p>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;