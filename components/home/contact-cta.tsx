"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import Link from "next/link";

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
        bg-background
        text-foreground
        py-12
        sm:py-16
        lg:py-24
        flex
        items-center
      "
    >
      {/* Ambient Cinematic Glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <div className="absolute h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,rgba(223,27,37,0.08)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="cta-wrapper relative z-10 mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center py-20 lg:py-32">
          
          {/* Subtle Accent Line */}
          <div className="cta-item h-16 w-px bg-gradient-to-b from-transparent via-accent/50 to-transparent mb-8" />

          {/* Premium Headline */}
          <h2
            className="
              cta-item
              font-[family-name:var(--font-heading)]
              text-[2.5rem]
              font-light
              leading-[1.1]
              tracking-tight
              text-foreground
              sm:text-[4rem]
              md:text-[5.5rem]
              lg:text-[6.5rem]
            "
          >
            Ready to <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent/60 italic font-medium">Elevate</span> <br />
            Your Brand?
          </h2>

          {/* Description */}
          <p className="cta-item mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground/80 font-light tracking-wide">
            Partner with us to create digital experiences that transcend the ordinary. 
            From visionary design to flawless execution, we bring your ideas to life.
          </p>

          {/* Premium Buttons */}
          <div className="cta-item mt-12 flex flex-col sm:flex-row items-center gap-6">
            <Link
              href="/contact"
              className="group relative overflow-hidden rounded-full bg-foreground px-10 py-4 text-sm font-semibold tracking-widest text-background uppercase transition-all duration-500 hover:scale-[1.02]"
            >
              <span className="relative z-10 flex items-center gap-3">
                Start a Conversation
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -z-10 bg-gradient-to-r from-accent to-accent/80 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </Link>

            <a
              href="tel:+919994713122"
              className="group flex items-center gap-3 px-6 py-4 text-sm font-medium tracking-widest uppercase text-muted-foreground transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-accent/50 transition-colors group-hover:text-accent" />
              +91 99947 13122
            </a>
          </div>

          {/* Elegant Stats */}
          <div className="cta-item mt-24 grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-24 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground/60">Delivered</span>
              <span className="font-[family-name:var(--font-heading)] font-light text-4xl sm:text-5xl font-light text-foreground">120+</span>
            </div>
            
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground/60">Experience</span>
              <span className="font-[family-name:var(--font-heading)] font-light text-4xl sm:text-5xl font-light text-foreground">6<span className="text-accent/60">Yrs</span></span>
            </div>

            <div className="flex flex-col items-center gap-2">
              <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground/60">Support</span>
              <span className="font-[family-name:var(--font-heading)] font-light text-4xl sm:text-5xl font-light text-foreground">24/7</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;