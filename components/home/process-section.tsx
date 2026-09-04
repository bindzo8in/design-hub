"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
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
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Fade up each step content on scroll
    const stepEls = gsap.utils.toArray<HTMLElement>(".process-step");
    stepEls.forEach((step) => {
      gsap.fromTo(
        step,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 80%",
          }
        }
      );
    });

    // Animate the banner
    gsap.fromTo(
      ".process-banner-content",
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".process-banner",
          start: "top 85%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="process"
      className="relative w-full bg-background py-32 md:py-48 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        
        {/* Sticky Layout */}
        <div className="flex flex-col lg:flex-row gap-20 items-start">
          
          {/* Left: Sticky Header */}
          <div className="lg:w-1/3 lg:sticky lg:top-40 flex flex-col gap-8">
            <h2 className="font-[family-name:var(--font-chillax)] font-light text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] uppercase tracking-tight text-foreground/90">
              Our <span className="text-accent italic font-light">Process</span>
            </h2>
            <p className="text-lg text-foreground/80 font-light max-w-sm leading-relaxed">
              The first step is to discover more about you, your company's vision, and to build a strong relationship.
            </p>
            <div className="w-48 h-48 relative mt-8 opacity-40 mix-blend-screen">
              <div className="absolute inset-0 bg-accent/10 rounded-full blur-[40px]" />
              <DotLottieReact
                src="/lottie/Process in cub.lottie"
                loop
                autoplay
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>

          {/* Right: Scrolling Steps */}
          <div className="lg:w-2/3 flex flex-col gap-24 lg:pt-32">
            {steps.map((step, idx) => (
              <div key={idx} className="process-step flex flex-col md:flex-row gap-8 md:gap-16 border-t border-border pt-12">
                <div className="font-[family-name:var(--font-chillax)] font-light text-[clamp(4rem,8vw,8rem)] leading-none text-muted-foreground/30 font-light w-32">
                  {step.num}
                </div>
                <div className="flex flex-col gap-6 pt-2">
                  <h3 className="font-[family-name:var(--font-chillax)] font-light text-3xl md:text-5xl uppercase tracking-wide text-foreground">
                    {step.title}
                  </h3>
                  <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed max-w-md">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Process Flow Visual Banner */}
        <div className="process-banner w-full mt-40">
          <div className="process-banner-content relative rounded-3xl border border-border bg-foreground/[0.02] overflow-hidden p-12 md:p-24 flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/2 flex flex-col gap-8">
              <h3 className="font-[family-name:var(--font-chillax)] font-light text-4xl md:text-6xl uppercase tracking-wide text-foreground">
                Engineered for <span className="text-accent italic">Performance</span>
              </h3>
              <p className="text-lg text-foreground/70 font-light leading-relaxed max-w-xl">
                Our creative workflows ensure that we don't just design pretty interfaces—we construct robust, secure, and blazing-fast digital assets. Every line of code is structured for scale and clean performance.
              </p>
            </div>
            
            <div className="lg:w-1/2 relative w-full h-[300px] flex items-center justify-center mix-blend-screen">
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-[80px]" />
              <DotLottieReact
                src="/lottie/team.lottie"
                loop
                autoplay
                className="w-full h-full object-contain relative z-10"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeProcessSection;