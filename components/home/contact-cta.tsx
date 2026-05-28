"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";

const HomeCTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".cta-item",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cta-wrapper",
              start: "top 80%",
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
      className="
        relative
        overflow-hidden
        bg-[#050711]
        py-10
        sm:py-14
        lg:py-20
        lg:min-h-[92vh]
        flex
        items-center
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cta-wrapper relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border/50 bg-card/40 backdrop-blur-xl">

          {/* Gradient border overlay */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/20 pointer-events-none" />

          <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">

            {/* ── LEFT CONTENT ── */}
            <div className="relative z-10 flex flex-col">

              {/* Badge */}
              <div className="cta-item inline-flex self-start items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                Let's Build Something Great
              </div>

              {/* Headline */}
              <h2
                className="
                  cta-item
                  mt-4 sm:mt-5
                  font-[family-name:var(--font-bebas-neue)]
                  text-[2.6rem]
                  leading-[0.9]
                  tracking-wide
                  uppercase
                  sm:text-[3.8rem]
                  md:text-[5rem]
                  lg:text-[5.5rem]
                  xl:text-[7rem]
                "
              >
                Your Vision <br />
                <span className="text-accent">Our Innovation</span>
              </h2>

              {/* Description */}
              <p className="cta-item mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We craft high-performing websites, mobile apps, branding,
                marketing systems, and digital experiences that help businesses
                grow faster and stand out in the market.
              </p>

              {/* Buttons */}
              <div className="cta-item mt-6 sm:mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4">
                <a
                  href="https://wa.me/919994713122"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-accent px-5 py-3.5 sm:px-6 sm:py-4 text-sm font-bold text-accent-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 flex-shrink-0" />
                </a>

                <a
                  href="tel:+919994713122"
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-border bg-background/40 px-5 py-3.5 sm:px-6 sm:py-4 text-sm font-semibold hover:bg-accent/5 transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4 flex-shrink-0" />
                  Schedule a Call
                </a>
              </div>

              {/* Stats */}
              <div className="cta-item mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8">
                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">120+</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Projects Delivered
                  </p>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">6+</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Years Experience
                  </p>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">24/7</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Support System
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT ANIMATION ── */}
            <div className="cta-item relative flex items-center justify-center order-first lg:order-last">
              {/* Glow blob */}
              <div className="absolute h-[260px] w-[260px] sm:h-[380px] sm:w-[380px] lg:h-[500px] lg:w-[500px] rounded-full bg-accent/20 blur-[80px] sm:blur-[100px] pointer-events-none" />

              {/* Animation — scales fluidly via clamp-like Tailwind steps */}
              <div className="relative z-10 w-[220px] xs:w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] xl:w-[640px] 2xl:w-[720px]">
                <DotLottieReact
                  src="/lottie/team.lottie"
                  loop
                  autoplay
                  className="h-full w-full"
                />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;