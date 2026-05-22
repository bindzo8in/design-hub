"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const commitments = [
  { num: "01", text: "100% Custom Solutions" },
  { num: "02", text: "Creative Excellence" },
  { num: "03", text: "Result-Driven Strategy" },
  { num: "04", text: "Long-Term Partnership" },
  { num: "05", text: "Transparent Communication" },
  { num: "06", text: "Continuous Innovation" },
];

const HomeAboutSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stat1Ref = useRef<HTMLSpanElement>(null);
  const stat2Ref = useRef<HTMLSpanElement>(null);
  const stat3Ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Load ScrollTrigger dynamically on client
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Stats count-up animation
        const stats = [
          { ref: stat1Ref, target: 6 },
          { ref: stat2Ref, target: 200 },
          { ref: stat3Ref, target: 100 },
        ];

        stats.forEach((item) => {
          if (!item.ref.current) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: item.target,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: item.ref.current,
              start: "top 90%",
              once: true,
            },
            onUpdate: () => {
              if (item.ref.current) {
                item.ref.current.textContent = Math.floor(obj.val).toString();
              }
            },
          });
        });

        // Entrance fade-in reveals for elements with .reveal class
        const reveals = gsap.utils.toArray(".reveal-item");
        reveals.forEach((el: any) => {
          gsap.fromTo(
            el,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: el,
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
    <section
      ref={containerRef}
      id="about"
      className="relative overflow-hidden bg-background py-16 sm:py-24 px-4 sm:px-8 border-t border-border/40"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Top small label */}
        <div className="reveal-item flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-8">
          <span className="w-8 h-[1px] bg-accent" />
          Discovering Design Hub Solutions
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Heading and description */}
          <div className="space-y-6 sm:space-y-8">
            <h2 className="reveal-item font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-foreground">
              Who Is <br />
              <em className="not-italic text-accent">Design Hub</em> <br />
              Solutions?
            </h2>

            <p className="reveal-item text-sm sm:text-base text-muted-foreground leading-relaxed">
              We strive to provide 100% custom websites, high-performance mobile apps, and robust enterprise software. We are superbly creative and we honestly care for your product or services â€” which is rare in these times.
            </p>

            <p className="reveal-item text-sm sm:text-base text-muted-foreground leading-relaxed">
              Our personality is infectious throughout your brand. Our creativity always stands out from the rest in the right way. People will continually talk about your new catchy look.
            </p>

            {/* Stats list */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/40 select-none">
              <div className="reveal-item">
                <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-foreground">
                  <span ref={stat1Ref}>0</span>
                  <span className="text-accent">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground/60 uppercase mt-1">
                  Years Experience
                </div>
              </div>

              <div className="reveal-item">
                <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-foreground">
                  <span ref={stat2Ref}>0</span>
                  <span className="text-accent">+</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground/60 uppercase mt-1">
                  Projects Delivered
                </div>
              </div>

              <div className="reveal-item">
                <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-foreground">
                  <span ref={stat3Ref}>0</span>
                  <span className="text-accent">%</span>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold tracking-wider text-muted-foreground/60 uppercase mt-1">
                  Client Satisfaction
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Commitments visual card */}
          <div className="reveal-item relative">
            {/* Visual Glassmorphic Card */}
            <div className="relative rounded-3xl border border-border bg-card/40 p-6 sm:p-8 overflow-hidden backdrop-blur-md">
              {/* Left Accent Glow line */}
              <div className="absolute top-0 left-0 w-[3px] h-full bg-gradient-to-b from-accent to-transparent" />
              
              <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl tracking-wider text-foreground mb-6">
                Our Commitment
              </h3>

              <ul className="flex flex-col divide-y divide-border/40 select-none">
                {commitments.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-4 py-3.5 text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    <span className="font-[family-name:var(--font-bebas-neue)] text-sm sm:text-base text-accent tracking-wide w-6 flex-shrink-0">
                      {item.num}
                    </span>
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;