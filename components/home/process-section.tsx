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

        // Header Animations
        gsap.fromTo(
          ".process-reveal",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: ".process-trigger-header",
              start: "top 80%",
              once: true,
            },
          }
        );

        // Timeline progress line scrub
        gsap.to(".process-progress-line", {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-container",
            start: "top 50%",
            end: "bottom 85%",
            scrub: 1,
          },
        });

        // Step cards animations with scrub
        const stepContainers = gsap.utils.toArray<HTMLElement>(".process-step-container");
        
        stepContainers.forEach((step, i) => {
          const content = step.querySelector(".process-step-content");
          const node = step.querySelector(".process-node");
          const dot = step.querySelector(".process-node-dot");
          const num = step.querySelector(".process-step-num");
          
          const isLeft = i % 2 !== 0;

          // Node glow and dot scale
          gsap.to(node, {
            borderColor: "rgba(223, 27, 37, 1)", // accent color
            boxShadow: "0 0 20px rgba(223, 27, 37, 0.4)",
            scrollTrigger: {
              trigger: step,
              start: "top 50%",
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
            }
          });

          gsap.to(dot, {
            scale: 1,
            scrollTrigger: {
              trigger: step,
              start: "top 50%",
              end: "bottom 50%",
              toggleActions: "play reverse play reverse",
            }
          });

          // Content reveal - dramatic slide and tilt
          if (content) {
            gsap.fromTo(
              content,
              { 
                opacity: 0, 
                x: isLeft ? -50 : 50, 
                y: 50,
                rotateY: isLeft ? -10 : 10,
                rotateX: 10,
              },
              {
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
                rotateX: 0,
                duration: 1,
                ease: "expo.out",
                scrollTrigger: {
                  trigger: step,
                  start: "top 90%",
                  end: "top 40%",
                  scrub: 1, 
                }
              }
            );
          }

          // Number parallax
          if (num) {
            gsap.fromTo(
              num,
              { y: -30 },
              {
                y: 30,
                ease: "none",
                scrollTrigger: {
                  trigger: step,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 1,
                }
              }
            );
          }
        });

        // Banner parallax
        gsap.fromTo(
          ".process-banner-bg",
          { y: -50 },
          {
            y: 50,
            ease: "none",
            scrollTrigger: {
              trigger: ".process-banner",
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            }
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
      className="relative overflow-hidden bg-background text-foreground py-24 sm:py-32 px-4 sm:px-8 border-t border-b border-border/50 select-none"
      style={{ perspective: "1000px" }}
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <div className="process-trigger-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-24 relative z-10">
          <div className="space-y-6">
            <div className="process-reveal flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-12 h-[2px] bg-accent" />
              Our Process
            </div>
            <h2 className="process-reveal font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-8xl lg:text-[10rem] leading-[0.85] tracking-wider uppercase text-foreground max-w-3xl drop-shadow-2xl">
              We're All In. <br />
              <em className="not-italic text-accent relative inline-block">
                Every Step
                {/* Decorative underline */}
                <span className="absolute -bottom-2 left-0 w-full h-2 bg-accent/20 rounded-full blur-sm" />
              </em> Of The Way.
            </h2>
          </div>
          <div className="process-reveal flex flex-col items-start md:items-end gap-6 max-w-sm">
            <div className="w-64 h-64 sm:w-80 sm:h-80 relative">
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-3xl" />
              <DotLottieReact
                src="/lottie/Process in cub.lottie"
                loop
                autoplay
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed md:text-right font-light">
              The first step is to discover more about you, your company's vision, and to build a strong relationship.
            </p>
          </div>
        </div>

        {/* Timeline Layout */}
        <div className="timeline-container relative max-w-6xl mx-auto mt-20 sm:mt-32 pb-20">
          {/* Central Background Line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border/40 transform md:-translate-x-1/2" />
          
          {/* Animated Scrub Line */}
          <div className="process-progress-line absolute left-6 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-accent via-accent to-accent/10 transform md:-translate-x-1/2 origin-top scale-y-0 z-0 drop-shadow-[0_0_10px_rgba(223,27,37,0.8)]" />

          <div className="space-y-16 md:space-y-32">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className="process-step-container relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group"
              >
                {/* Node on Timeline */}
                <div className="absolute left-6 md:left-1/2 top-10 md:top-1/2 transform -translate-x-1/2 md:-translate-y-1/2 w-12 h-12 md:w-16 md:h-16 rounded-full border border-border/50 bg-background/80 backdrop-blur-md flex items-center justify-center z-10 process-node shadow-lg">
                  <span className="w-4 h-4 md:w-6 md:h-6 rounded-full bg-accent process-node-dot scale-0 shadow-[0_0_15px_rgba(223,27,37,0.8)]" />
                </div>

                {/* Content Card */}
                <div className="w-full md:w-[42%] pl-20 md:pl-0 process-step-content" style={{ transformStyle: 'preserve-3d' }}>
                  <div className="relative p-8 md:p-12 rounded-[2rem] bg-card/40 border border-border/30 backdrop-blur-xl overflow-hidden hover:border-accent/50 transition-colors duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(223,27,37,0.1)]">
                    
                    {/* Background number watermark */}
                    <div className="process-step-num font-[family-name:var(--font-bebas-neue)] text-[10rem] md:text-[14rem] text-foreground/[0.03] absolute -top-10 -right-10 md:group-odd:-left-10 md:group-odd:right-auto pointer-events-none transition-colors duration-500 leading-none blur-[2px]">
                      {step.num}
                    </div>

                    {/* Gradient Overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent dark:from-white/5 dark:to-transparent pointer-events-none" />

                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-2 mb-4">
                        <span className="text-accent font-bold text-sm sm:text-base tracking-[0.2em] uppercase bg-accent/10 px-3 py-1 rounded-full border border-accent/20">
                          Step {step.num}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-bebas-neue)] text-4xl md:text-6xl text-foreground tracking-wide uppercase mb-4 drop-shadow-md">
                        {step.title}
                      </h3>
                      <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Spacer for alternating flex */}
                <div className="hidden md:block w-[42%]" />
              </div>
            ))}
          </div>
        </div>

        {/* Process Flow Visual Banner */}
        <div className="process-banner relative mt-24 sm:mt-40 rounded-[2.5rem] border border-border/20 bg-card/5 overflow-hidden backdrop-blur-2xl shadow-2xl">
          {/* Animated Background */}
          <div className="process-banner-bg absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/20 via-background to-background" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 p-10 sm:p-16 lg:p-20 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                Continuous Delivery
              </div>
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-5xl md:text-7xl tracking-wider text-foreground leading-[0.9]">
                Engineered for <span className="text-accent">Performance</span>
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-light max-w-xl">
                Our creative workflows ensure that we don't just design pretty interfaces—we construct robust, secure, and blazing-fast digital assets. Every line of code is structured for scale and clean performance, helping your brand stand out with dynamic impact.
              </p>
            </div>
            <div className="lg:col-span-6 relative w-full h-[300px] sm:h-[450px] flex items-center justify-center">
              <div className="absolute inset-0 bg-accent/5 rounded-full blur-[100px]" />
              <DotLottieReact
                src="/lottie/team.lottie"
                loop
                autoplay
                className="w-full h-full object-contain relative z-10 drop-shadow-2xl"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeProcessSection;