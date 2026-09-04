"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import Image from "next/image";

const commitments = [
  { num: "01", text: "100% Custom Solutions", image: "/who/custom-solutions.webp" },
  { num: "02", text: "Creative Excellence", image: "/who/creative.webp" },
  { num: "03", text: "Result-Driven Strategy", image: "/who/result.webp" },
  { num: "04", text: "Long-Term Partnership", image: "/who/longterm.webp" },
  { num: "05", text: "Transparent Communication", image: "/who/communication.webp" },
  { num: "06", text: "Continuous Innovation", image: "/who/ci.webp" },
];

const HomeAboutSection = () => {
  const containerRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Split text for cinematic heading reveal
    if (headingRef.current) {
      const split = new SplitType(headingRef.current, { types: "lines,words" });
      gsap.fromTo(
        split.words,
        { y: 60, opacity: 0, rotationX: -45 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
          }
        }
      );
    }

    // Paragraph reveals
    gsap.fromTo(
      ".about-paragraph",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-paragraph",
          start: "top 85%",
        }
      }
    );

    // Number counters
    const counters = gsap.utils.toArray<HTMLElement>(".stat-counter");
    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-target") || "0", 10);
      gsap.fromTo(counter, { innerHTML: "0" }, {
        innerHTML: target.toString(),
        duration: 2,
        ease: "power3.out",
        snap: { innerHTML: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 90%",
        }
      });
    });

    // Commitments list stagger
    gsap.fromTo(
      ".commitment-item",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".commitments-list",
          start: "top 80%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="about"
      className="relative w-full bg-background py-32 md:py-48 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12">
        <div className="grid grid-cols-1 gap-20 lg:grid-cols-12 lg:gap-16 items-start">
          
          {/* Left Area: Massive Typography & Text */}
          <div className="lg:col-span-7 flex flex-col gap-12">
            <h2 
              ref={headingRef} 
              className="font-[family-name:var(--font-chillax)] font-light text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.1] uppercase tracking-tight text-foreground/90"
            >
              Who is <br />
              <span className="text-accent italic font-light">Design Hub</span> <br />
              Solutions?
            </h2>

            <div className="flex flex-col gap-8 max-w-xl">
              <p className="about-paragraph text-lg md:text-xl leading-relaxed text-muted-foreground/80 font-light">
                We strive to provide 100% custom websites, high-performance mobile apps, and robust enterprise software. We are superbly creative and we honestly care for your product or services — which is rare in these times.
              </p>
              <p className="about-paragraph text-lg md:text-xl leading-relaxed text-muted-foreground/80 font-light">
                Our personality is infectious throughout your brand. Our creativity always stands out from the rest in the right way. People will continually talk about your new catchy look.
              </p>
            </div>

            {/* Huge Stats */}
            <div className="grid grid-cols-3 gap-8 pt-12 border-t border-border mt-4">
              <div className="flex flex-col gap-2">
                <div className="text-5xl md:text-7xl font-light text-foreground"><span className="stat-counter" data-target="6">0</span>+</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Years Experience</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-5xl md:text-7xl font-light text-foreground"><span className="stat-counter" data-target="550">0</span>+</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="text-5xl md:text-7xl font-light text-foreground"><span className="stat-counter" data-target="100">0</span>%</div>
                <div className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Client Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Right Area: Sleek Commitments List */}
          <div className="lg:col-span-5 lg:pl-10 lg:mt-32">
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-12 flex items-center gap-4">
              <span className="h-px w-12 bg-accent/50" />
              Our Commitment
            </h3>
            
            <ul className="commitments-list flex flex-col w-full border-t border-border">
              {commitments.map((item, idx) => (
                <li
                  key={idx}
                  className="commitment-item group flex items-center gap-8 border-b border-border py-8 transition-colors hover:border-accent"
                >
                  <span className="text-sm font-medium text-muted-foreground/50 transition-colors group-hover:text-accent shrink-0">
                    {item.num}
                  </span>
                  
                  <div className="flex items-center">
                    <div className="w-0 h-0 opacity-0 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden rounded-xl group-hover:w-[100px] md:group-hover:w-[120px] group-hover:h-[60px] md:group-hover:h-[70px] group-hover:opacity-100 group-hover:mr-6 flex-shrink-0">
                      <Image 
                        src={item.image}
                        alt={item.text}
                        width={120}
                        height={70}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-xl md:text-3xl font-light text-foreground/60 transition-colors group-hover:text-foreground">
                      {item.text}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default HomeAboutSection;