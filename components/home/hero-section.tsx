"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const headlines = [
  { line1: "We Believe In", line2: "Thinking ", highlight: "Different" },
  { line1: "We Believe In", line2: "Being ", highlight: "Unique" },
  { line1: "Discovering", line2: "Design ", highlight: "Hub" },
];

const typingPhrases = [
  "WEB DESIGN",
  "ECOMMERCE DEVELOPMENT",
  "MOBILE APPS",
  "SEO & GROWTH",
  "BRAND STRATEGY",
];

const HomeHeroSection = () => {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const typingContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, delay: 0.2 },
      )
        .fromTo(
          ".headline-line-inner",
          { y: "110%", opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15 },
          "-=0.3",
        )
        .fromTo(
          subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.2",
        )
        .fromTo(
          typingContainerRef.current,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.1",
        );

      if (heroImageRef.current) {
        tl.fromTo(
          heroImageRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.4 },
          "-=0.8",
        );

        // Smooth floating motion
        gsap.to(heroImageRef.current, {
          y: -12,
          duration: 3.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Headline Cycler
  useEffect(() => {
    const interval = setInterval(() => {
      // Fade out
      gsap.to(".headline-line-inner", {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,
        onComplete: () => {
          setHeadlineIdx((prev) => (prev + 1) % headlines.length);
          // Set back position and fade in
          gsap.fromTo(
            ".headline-line-inner",
            { y: "110%", opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power4.out",
              stagger: 0.08,
            },
          );
        },
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Typewriter loop
  useEffect(() => {
    const phrase = typingPhrases[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypingText(phrase.slice(0, charIdx + 1));
        setCharIdx((prev) => prev + 1);
        if (charIdx === phrase.length) {
          setIsDeleting(true);
          // Pause at completion
          timer = setTimeout(() => {}, 2000);
        }
      }, 90);
    } else {
      timer = setTimeout(() => {
        setTypingText(phrase.slice(0, charIdx - 1));
        setCharIdx((prev) => prev - 1);
        if (charIdx === 0) {
          setIsDeleting(false);
          setPhraseIdx((prev) => (prev + 1) % typingPhrases.length);
        }
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <section
      ref={containerRef}
      className="
    relative
    min-h-auto lg:min-h-[92vh]
    flex flex-col justify-center lg:justify-end
    px-4 sm:px-6 lg:px-8
    sm:py-20 lg:pb-20 lg:pt-24
    overflow-hidden
    bg-background
  "
    >
      {/* Background glow and grids */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.08)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.12)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.1)_0%,transparent_60%)]" />

        {/* Tech Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(var(--foreground) 1px, transparent 1px),
              linear-gradient(90deg, var(--foreground) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 70% 70% at 50% 50%, black 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Side scroll indicators */}
      <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2 rotate-90 text-[10px] tracking-[0.25em] text-muted-foreground/60 select-none z-10 font-medium">
        SCROLL TO EXPLORE &darr;
      </div>

      {/* Side counter indicators */}
      <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
        {headlines.map((_, idx) => (
          <div
            key={idx}
            className={`w-2.5 h-2.5 rounded-full border border-border/80 transition-all duration-300 ${
              idx === headlineIdx
                ? "bg-accent scale-125 border-accent"
                : "bg-muted-foreground/30"
            }`}
          />
        ))}
      </div>

      <div className="container mx-auto max-w-7xl relative z-10 w-full">
        <div
          className="
    grid
    grid-cols-1
    md:grid-cols-2
    lg:grid-cols-12
    gap-8
    lg:gap-8
    items-center
  "
        >
          {/* Left Column: Text Content */}
          <div
            className="
    order-2
    md:order-1
    lg:col-span-7
    space-y-6 sm:space-y-8
  "
          >
            {/* Top Tagline */}
            <div
              ref={tagRef}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              Digital Excellence &bull; Custom Solutions
            </div>

            {/* Bebas Neue Headline */}
            <h1
              ref={headlineRef}
              className="
  font-(family-name:--font-bebas-neue)
  uppercase
  tracking-tight
  leading-[0.9]
  text-foreground
  select-none

  text-[clamp(3rem,11vw,5.5rem)]

  landscape:text-[clamp(2rem,5vw,3.5rem)]
  landscape:leading-[0.85]

  md:text-[clamp(4rem,8vw,6rem)]
  lg:text-[clamp(5rem,8vw,8rem)]
"
            >
              <span className="block overflow-hidden h-[1.3em] py-1 relative">
                <span className="headline-line-inner block">
                  {headlines[headlineIdx].line1}
                </span>
              </span>
              <span className="block overflow-hidden h-[1.3em] py-1 relative">
                <span className="headline-line-inner block">
                  {headlines[headlineIdx].line2}
                  <em className="not-italic text-accent font-extrabold">
                    {headlines[headlineIdx].highlight}
                  </em>
                </span>
              </span>
            </h1>

            {/* Subtext and CTAs */}
            <div
              ref={subRef}
              className="
    flex
    flex-col
    sm:flex-row
    sm:items-start
    landscape:flex-col
    gap-6
    pt-4
  "
            >
              <p className="md:col-span-7 text-sm sm:text-base text-muted-foreground leading-relaxed max-w-[320px] md:max-w-[420px]">
                We design and engineer bespoke web platforms and digital
                systems. We blend creative boldness with technical precision to
                build products that make an impact.
              </p>
              <div
                className="
    flex
    sm:flex-col
    gap-3
    flex-row
    landscape:flex-row
    landscape:items-center
    landscape:gap-4
      items-center
      justify-center
    shrink-0
  "
              >
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 rounded-2xl bg-accent px-6 py-3.5 text-sm font-bold text-accent-foreground shadow-sm transition-all hover:bg-accent/90 hover:scale-[1.02]"
                >
                  Discover Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground transition-all hover:text-foreground"
                >
                  Our Services
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            {/* Typing Line */}
            <div
              ref={typingContainerRef}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 pt-6 border-t border-border/50 text-xs sm:text-sm font-semibold tracking-wider text-muted-foreground/60 select-none uppercase"
            >
              <span>We are experts in:</span>
              <div className="flex items-center text-foreground font-[family-name:var(--font-bebas-neue)] text-2xl sm:text-3xl tracking-wide">
                <span>{typingText}</span>
                <span className="inline-block w-[3px] h-[1.1em] bg-accent ml-1 animate-[pulse_0.9s_steps(2,start)_infinite]" />
              </div>
            </div>
          </div>

          {/* Right Column: Floating Visual */}
          <div
            className="
    order-1
    md:order-2
    lg:col-span-5
    relative
    flex
    justify-center
  "
          >
            <div
              ref={heroImageRef}
              className="  relative
  w-full
  h-[260px]
  sm:h-[340px]
  md:h-[420px]
  lg:h-[480px] rounded-3xl border border-[#26336F]/20 bg-card/10 backdrop-blur-md shadow-2xl p-4 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#26336F]/10 via-[#050711]/60 to-[#DF1B25]/5 z-0" />
              <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center">
                <DotLottieReact
                  src="/lottie/Live chatbot.lottie"
                  loop
                  autoplay
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;
