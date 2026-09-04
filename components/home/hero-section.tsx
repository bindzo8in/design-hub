"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import gsap from "gsap";
import Image from "next/image";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const headlines = [
  { line1: "Thinking", highlight: "Different." },
  { line1: "Being", highlight: "Unique." },
  { line1: "Design", highlight: "Hub." },
];

const HomeHeroSection = () => {
  const [isNavigating, setIsNavigating] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomGridRef = useRef<HTMLDivElement>(null);
  const bgOrbRef = useRef<HTMLDivElement>(null);
  const leftFloatRef = useRef<HTMLDivElement>(null);
  const rightFloatRef = useRef<HTMLDivElement>(null);

  // Background slow orb movement and floating visuals
  useGSAP(() => {
    if (bgOrbRef.current) {
      gsap.to(bgOrbRef.current, {
        x: "15vw",
        y: "10vh",
        duration: 10,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (leftFloatRef.current) {
      gsap.to(leftFloatRef.current, {
        y: "-3vh",
        rotation: 2,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }

    if (rightFloatRef.current) {
      gsap.to(rightFloatRef.current, {
        y: "3vh",
        rotation: -2,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, { scope: containerRef });

  // Load Animation
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set([topTextRef.current, bottomGridRef.current], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    // Initial fade in for peripheral elements
    tl.fromTo(topTextRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 1, delay: 0.5 })
      .fromTo(bottomGridRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1 }, "-=0.8");
      
    // Stat counters
    const statNumbers = containerRef.current?.querySelectorAll(".stat-number");
    if (statNumbers) {
      statNumbers.forEach((stat) => {
        const target = stat.getAttribute("data-target");
        if (target) {
          gsap.fromTo(stat, { innerHTML: "0" }, {
            innerHTML: target,
            duration: 2,
            ease: "power3.out",
            snap: { innerHTML: 1 },
            delay: 1
          });
        }
      });
    }

  }, { scope: containerRef });

  // Headline Animation (Cycler)
  useGSAP(() => {
    if (!headlineRef.current) return;
    
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(headlineRef.current, { opacity: 1 });
      return;
    }

    let currentIdx = 0;
    let split: SplitType;
    let isActive = true;

    const playCycle = () => {
      if (!isActive || !headlineRef.current) return;

      // Update DOM text directly to bypass React renders
      const data = headlines[currentIdx];
      headlineRef.current.innerHTML = `${data.line1} <br /> <span class="text-accent italic">${data.highlight}</span>`;
      
      // Split new text
      split = new SplitType(headlineRef.current, { types: "chars,words" });

      const tl = gsap.timeline({
        onComplete: () => {
          if (!isActive) return;
          currentIdx = (currentIdx + 1) % headlines.length;
          if (split) split.revert(); // clean up DOM
          playCycle(); // Loop
        }
      });

      // Animate IN
      tl.fromTo(
        split.chars,
        { y: 100, opacity: 0, rotationX: -90 },
        { 
          y: 0, 
          opacity: 1, 
          rotationX: 0, 
          duration: 1.2, 
          stagger: 0.04, 
          ease: "expo.out",
          delay: 0.2
        }
      )
      // Wait for reading
      .to({}, { duration: 3.5 })
      // Animate OUT
      .to(
        split.chars,
        {
          y: -100,
          opacity: 0,
          rotationX: 90,
          duration: 0.6,
          stagger: 0.02,
          ease: "power3.in"
        }
      );
    };

    // Start
    playCycle();

    return () => {
      isActive = false;
      if (split) split.revert();
    };
  }, { scope: containerRef });

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-[calc(100svh-4rem)] lg:min-h-[calc(100svh-6rem)] w-full flex-col items-center justify-between overflow-hidden bg-background px-6 pt-12 pb-6 sm:px-12 md:pt-16 md:pb-8"
    >
      {/* Abstract Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft radial glow */}
        <div 
          ref={bgOrbRef}
          className="absolute left-1/2 top-1/2 h-[80vh] w-[80vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(223,27,37,0.15)_0%,transparent_60%)] mix-blend-screen blur-[80px]"
        />
        {/* Film grain noise overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')" }} />
        
        {/* Left Floating Visual (Desktop Only) */}
        <div ref={leftFloatRef} className="hidden lg:block absolute top-[25%] left-[2%] xl:left-[8%] w-64 xl:w-72 aspect-square -rotate-6 transform-gpu opacity-90 dark:opacity-80">
          <DotLottieReact
            src="/lottie/graphic_design.lottie"
            autoplay
            loop
            className="w-full h-full object-contain"
          />
        </div>

        {/* Right Floating Visual (Desktop Only) */}
        <div ref={rightFloatRef} className="hidden lg:block absolute top-[15%] right-[2%] xl:right-[8%] w-64 xl:w-72 aspect-square rotate-6 transform-gpu opacity-90 dark:opacity-80">
          <DotLottieReact
            src="/lottie/developer.lottie"
            autoplay
            loop
            className="w-full h-full object-contain scale-175"
          />
        </div>
      </div>

      {/* Top Header/Tagline area */}
      <div ref={topTextRef} className="relative z-10 flex w-full max-w-[1600px] flex-col items-center justify-between gap-6 md:flex-row md:items-start pt-4">
        <div className="flex items-center gap-3 rounded-full border border-border bg-foreground/5 px-5 py-2 backdrop-blur-md">
          <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="text-xs font-medium tracking-[0.2em] text-foreground/70 uppercase">Digital Excellence</span>
        </div>
        
        <p className="max-w-md text-center md:text-right text-sm leading-relaxed text-muted-foreground font-medium">
          We craft high-converting digital products, brand identities, and packaging design that help ambitious businesses scale.
        </p>
      </div>

      {/* Center Massive Typography */}
      <div className="relative z-10 flex w-full flex-1 flex-col items-center justify-center py-6 md:py-8 text-center">
        <div className="text-muted-foreground text-sm md:text-xl font-medium tracking-[0.3em] uppercase mb-4 md:mb-6 block overflow-hidden">
          <span>We Believe In</span>
        </div>
        
        <h1 
          ref={headlineRef}
          className="font-[family-name:var(--font-chillax)] w-full max-w-[1600px] text-[clamp(3rem,12vw,12rem)] uppercase font-light leading-[0.8] tracking-[0.01em] text-foreground dark:text-white dark:mix-blend-difference"
        >
          {/* Initial content to prevent flash before JS runs */}
          {headlines[0].line1} <br />
          <span className="text-accent italic">{headlines[0].highlight}</span>
        </h1>
      </div>

      {/* Bottom Data Grid */}
      <div ref={bottomGridRef} className="relative z-10 grid w-full max-w-[1600px] grid-cols-1 gap-6 border-t border-border pt-6 md:grid-cols-3 lg:grid-cols-4 pb-2">
        
        {/* Metric 1 */}
        <div className="flex flex-col gap-2">
          <div className="text-4xl font-light text-foreground"><span className="stat-number" data-target="550">0</span>+</div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Projects Delivered</div>
        </div>

        {/* Metric 2 */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-2xl text-amber-500">
            ★★★★★
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground"><span className="text-foreground">4.9/5</span> Client Rating</div>
        </div>

        {/* Team Avatars */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Expert Team</div>
          <div className="flex -space-x-3">
            <Image src="/team/balaji.png" alt="Team" width={40} height={40} className="bg-background/90 h-10 w-10 rounded-full border border-background object-cover grayscale transition-all hover:grayscale-0" />
            <Image src="/team/mani.png" alt="Team" width={40} height={40} className="bg-background/90 h-10 w-10 rounded-full border border-background object-cover grayscale transition-all hover:grayscale-0" />
            <Image src="/team/ranjani.png" alt="Team" width={40} height={40} className="bg-background/90 h-10 w-10 rounded-full border border-background object-cover grayscale transition-all hover:grayscale-0" />
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-background bg-foreground text-xs font-bold text-background">+</div>
          </div>
        </div>

        {/* CTA */}
        <div className="flex items-center md:justify-end lg:col-span-1">
          <Link
            href="/contact"
            onClick={() => {
              setIsNavigating(true);
              setTimeout(() => setIsNavigating(false), 2000);
            }}
            className={`group flex h-20 w-full items-center justify-between md:gap-4 rounded-full px-8 transition-all duration-500 md:w-auto relative overflow-hidden ${
              isNavigating 
                ? "bg-foreground text-background scale-95 shadow-inner" 
                : "bg-accent text-white hover:bg-foreground hover:text-background"
            }`}
          >
            <span className="text-sm font-bold uppercase tracking-wider relative z-10">Start Project</span>
            <div className={`flex h-10 w-10 items-center justify-center rounded-full bg-foreground/20 transition-all duration-500 z-10 ${
              isNavigating ? "translate-x-12 opacity-0" : "group-hover:scale-110 group-hover:bg-background/10"
            }`}>
              <ArrowRight className="h-5 w-5" />
            </div>

            {/* Click ripple effect */}
            {isNavigating && (
              <div className="absolute inset-0 z-0 flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-background/20 animate-[ping_1s_cubic-bezier(0,0,0.2,1)_infinite]" />
              </div>
            )}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;