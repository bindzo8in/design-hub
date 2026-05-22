"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";

const testimonials = [
  {
    avatar: "A",
    text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Design Hub made our vision a reality.",
    author: "Anand Kumar",
    role: "CEO, Tech Startup",
  },
  {
    avatar: "P",
    text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Our brand has never looked better.",
    author: "Priya Sharma",
    role: "Marketing Director, Organic Foods Corp",
  },
];

const HomeTestimonialsSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header animations
        gsap.fromTo(
          ".testi-reveal",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testi-trigger-header",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Stagger cards reveal
        gsap.fromTo(
          ".testi-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testi-trigger-grid",
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
      id="testimonials"
      className="relative overflow-hidden bg-card/60 py-16 sm:py-24 px-4 sm:px-8 border-b border-border/40 select-none"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <header className="testi-trigger-header text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="testi-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="w-8 h-[1px] bg-accent" />
            Client Voices
            <span className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="testi-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-foreground">
            What Our <em className="not-italic text-accent">Clients</em> Say
          </h2>
        </header>

        {/* Testimonials Grid */}
        <div className="testi-trigger-grid grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {testimonials.map((item, idx) => (
            <article
              key={idx}
              className="testi-card group relative rounded-3xl border border-border/60 bg-background p-6 sm:p-8 flex flex-col justify-between min-h-[220px] transition-all duration-300 hover:border-accent/40"
            >
              <div>
                {/* Large visual quote icon */}
                <Quote className="h-10 w-10 text-accent opacity-20 group-hover:opacity-40 transition-opacity duration-300 rotate-180" />
                
                {/* Quote text */}
                <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground italic">
                  &ldquo;{item.text}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary dark:text-[#7f91ff] font-[family-name:var(--font-bebas-neue)] text-lg border border-border/60">
                  {item.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-foreground">
                    {item.author}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonialsSection;