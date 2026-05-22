"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const steps = [
  {
    num: "01",
    title: "Discover",
    description: "Learn about you, your company's vision, and build a strong relationship.",
  },
  {
    num: "02",
    title: "Outline",
    description: "Define your requirements for website, e-commerce, mobile app, or lead generation.",
  },
  {
    num: "03",
    title: "Create",
    description: "Visual concepts are crafted and revised until they align with your goals.",
  },
  {
    num: "04",
    title: "Review",
    description: "Quality review and testing to ensure your project meets the highest standards.",
  },
  {
    num: "05",
    title: "Launch",
    description: "Project is presented, approved, launched, and promoted. Watch the momentum!",
  },
];

const HomeProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header animations
        gsap.fromTo(
          ".process-reveal",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: ".process-trigger-header",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Steps cards stagger animations
        gsap.fromTo(
          ".process-step-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".process-steps-grid",
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
      id="process"
      className="relative overflow-hidden bg-card/60 py-16 sm:py-24 px-4 sm:px-8 border-t border-b border-border/40 select-none"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="process-trigger-header flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="space-y-4">
            <div className="process-reveal flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-8 h-[1px] bg-accent" />
              Our Process
            </div>
            <h2 className="process-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-foreground max-w-2xl">
              We're All In. <br />
              <em className="not-italic text-accent">Every Step</em> Of The Way.
            </h2>
          </div>
          <div className="process-reveal flex flex-col items-start md:items-end gap-4 max-w-sm">
            <div className="w-56 h-56 sm:w-72 sm:h-72 border border-[#26336F]/10 rounded-3xl overflow-hidden bg-[#050711]/25 flex items-center justify-center">
              <DotLottieReact
                src="/lottie/Process in cub.lottie"
                loop
                autoplay
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed md:text-right">
              The first step is to discover more about you, your company's vision, and to build a strong relationship.
            </p>
          </div>
        </div>

        {/* Steps Grid */}
        <div className="process-steps-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 border border-border/60 rounded-3xl overflow-hidden bg-background">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="process-step-card group relative p-6 sm:p-8 flex flex-col justify-between border-b sm:border-b-0 sm:border-r border-border/60 last:border-r-0 last:border-b-0 hover:bg-card/40 transition-colors duration-300 min-h-[220px]"
            >
              <div>
                {/* Number */}
                <div className="font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-7xl text-muted-foreground/20 group-hover:text-accent/30 transition-colors duration-300 leading-none">
                  {step.num}
                </div>

                {/* Title */}
                <h3 className="mt-4 text-base sm:text-lg font-bold text-foreground tracking-wide uppercase">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>

              {/* Bottom expanding accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100" />
            </div>
          ))}
        </div>

        {/* Process Flow Visual Banner */}
        <div className="process-reveal mt-12 relative rounded-3xl border border-[#26336F]/20 bg-card/10 overflow-hidden backdrop-blur-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-accent">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                Continuous Delivery
              </div>
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl tracking-wider text-white">
                Engineered for Performance
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                Our creative workflows ensure that we don't just design pretty interfaces—we construct robust, secure, and blazing-fast digital assets. Every line of code is structured for scale and clean performance, helping your brand stand out with dynamic impact.
              </p>
            </div>
            <div className="lg:col-span-7 relative w-full h-[250px] sm:h-[350px] rounded-2xl overflow-hidden border border-[#26336F]/20 bg-[#050711]/60 flex items-center justify-center">
              <DotLottieReact
                src="/lottie/Dashboard.lottie"
                loop
                autoplay
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeProcessSection;