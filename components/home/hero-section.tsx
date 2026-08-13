"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle2, MessageSquare } from "lucide-react";
import gsap from "gsap";

const headlines = [
  { line1: "We Believe In", line2: "Thinking ", highlight: "Different" },
  { line1: "We Believe In", line2: "Being ", highlight: "Unique" },
  { line1: "Discovering", line2: "Design ", highlight: "Hub" },
];

const typingPhrases = [
  "WEB DEVELOPMENT",
  "DIGITAL MARKETING",
  "DESIGN SOLUTIONS",
  "PRINTING",
  "PACKAGING DESIGN",
  "PHOTOGRAPHY",
];

const HomeHeroSection = () => {
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const typingContainerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const floatCard1Ref = useRef<HTMLDivElement>(null);
  const floatCard2Ref = useRef<HTMLDivElement>(null);
  const parallaxWrapperRef = useRef<HTMLDivElement>(null);

  // animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.out" },
      });

      tl.fromTo(
        tagRef.current,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.2,
        }
      )
        .fromTo(
          ".headline-line-inner",
          {
            y: "110%",
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.3"
        )
        .fromTo(
          subRef.current,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
          },
          "-=0.2"
        )
        .fromTo(
          typingContainerRef.current,
          {
            opacity: 0,
            y: 10,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
          },
          "-=0.1"
        );

      if (heroImageRef.current) {
        tl.fromTo(
          heroImageRef.current,
          { opacity: 0, scale: 0.95, y: 30 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, delay: 0.4 },
          "-=0.8"
        );
      }

      if (floatCard1Ref.current) {
        tl.fromTo(
          floatCard1Ref.current,
          { opacity: 0, x: 30, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8 },
          "-=1"
        );
        gsap.to(floatCard1Ref.current, {
          y: -8, duration: 2.8, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.2
        });
      }

      if (floatCard2Ref.current) {
        tl.fromTo(
          floatCard2Ref.current,
          { opacity: 0, x: -30, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8 },
          "-=0.8"
        );
        gsap.to(floatCard2Ref.current, {
          y: 10, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 0.5
        });
      }

      // Optimized 3D mouse parallax using gsap.quickTo
      if (parallaxWrapperRef.current && containerRef.current) {
        const xTo = gsap.quickTo(parallaxWrapperRef.current, "x", { duration: 0.8, ease: "power3" });
        const yTo = gsap.quickTo(parallaxWrapperRef.current, "y", { duration: 0.8, ease: "power3" });
        const rotateXTo = gsap.quickTo(parallaxWrapperRef.current, "rotationX", { duration: 0.8, ease: "power3" });
        const rotateYTo = gsap.quickTo(parallaxWrapperRef.current, "rotationY", { duration: 0.8, ease: "power3" });

        const handleMouseMove = (e: MouseEvent) => {
          const { clientX, clientY } = e;
          const { innerWidth, innerHeight } = window;
          
          const xPos = (clientX / innerWidth - 0.5) * 2;
          const yPos = (clientY / innerHeight - 0.5) * 2;
          
          xTo(xPos * 30);
          yTo(yPos * 30);
          rotateXTo(-yPos * 25);
          rotateYTo(xPos * 25);
        };

        window.addEventListener("mousemove", handleMouseMove);
        
        return () => {
          window.removeEventListener("mousemove", handleMouseMove);
        };
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // headline cycler
  useEffect(() => {
    const interval = setInterval(() => {
      gsap.to(".headline-line-inner", {
        y: -30,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        stagger: 0.05,

        onComplete: () => {
          setHeadlineIdx(
            (prev) => (prev + 1) % headlines.length
          );

          gsap.fromTo(
            ".headline-line-inner",
            {
              y: "110%",
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              ease: "power4.out",
              stagger: 0.08,
            }
          );
        },
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // typewriter
  useEffect(() => {
    const phrase = typingPhrases[phraseIdx];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      timer = setTimeout(() => {
        setTypingText(
          phrase.slice(0, charIdx + 1)
        );

        setCharIdx((prev) => prev + 1);

        if (charIdx === phrase.length) {
          setIsDeleting(true);
        }
      }, 90);
    } else {
      timer = setTimeout(() => {
        setTypingText(
          phrase.slice(0, charIdx - 1)
        );

        setCharIdx((prev) => prev - 1);

        if (charIdx === 0) {
          setIsDeleting(false);

          setPhraseIdx(
            (prev) =>
              (prev + 1) % typingPhrases.length
          );
        }
      }, 50);
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="
        relative
        overflow-hidden
        bg-background

        min-h-auto
        lg:min-h-[78vh]

        flex
        items-center
        justify-center

        px-4
        py-20

        sm:px-6
        sm:py-24

        lg:px-6
        lg:py-10
      "
    >
      {/* background */}
      <div className="hero-bg-radial absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.08)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.12)_0%,transparent_65%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.1)_0%,transparent_60%)]" />

        {/* grid */}
        <div
          className="hero-grid-layer absolute inset-0 opacity-[0.04] dark:opacity-[0.03]"
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

      {/* desktop dots */}
      <div className="hidden xl:flex absolute left-6 top-1/2 -translate-y-1/2 flex-col gap-4 z-10">
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

      <div className="hero-content-parallax relative z-10 mx-auto w-full max-w-[1380px]">
        <div
          className="
            grid
            items-center

            gap-8

            md:gap-10

            lg:grid-cols-12
            lg:gap-4
          "
        >
          {/* ====================================== */}
          {/* LEFT */}
          {/* ====================================== */}

          <div
            className="
              space-y-5

              md:space-y-6

              lg:col-span-7
              lg:order-2
            "
          >
            {/* tagline */}
            <div
              ref={tagRef}
              className="
                inline-flex
                items-center
                gap-2

                rounded-full
                border border-border
                bg-card/40

                px-4 py-1.5

                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                text-muted-foreground

                sm:text-xs
              "
            >
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />

              Digital Excellence
            </div>

            {/* headline */}
            <h1
              className="
                relative
                font-audiowide
                uppercase
                leading-[0.88]
                tracking-tight
                text-foreground

                text-[clamp(3.2rem,12vw,5rem)]

                md:text-[clamp(4rem,9vw,6rem)]

                lg:text-[clamp(4.5rem,7vw,7rem)]
              "
            >
              {/* Invisible spacer with longest text to maintain consistent height */}
              <div className="invisible pointer-events-none select-none" aria-hidden="true">
                <span className="block overflow-hidden py-1">
                  <span className="block">We Believe In</span>
                </span>
                <span className="block overflow-hidden py-1">
                  <span className="block">
                    Thinking <em className="not-italic text-accent">Different</em>
                  </span>
                </span>
              </div>

              {/* Animated text layer */}
              <div className="absolute inset-0 flex flex-col justify-start">
                <span className="block overflow-hidden py-1">
                  <span className="headline-line-inner block">
                    {headlines[headlineIdx].line1}
                  </span>
                </span>

                <span className="block overflow-hidden py-1">
                  <span className="headline-line-inner block">
                    {headlines[headlineIdx].line2}

                    <em className="not-italic text-accent">
                      {headlines[headlineIdx].highlight}
                    </em>
                  </span>
                </span>
              </div>
            </h1>

            {/* ====================================== */}
            {/* TABLET HERO VISUAL */}
            {/* ====================================== */}

            <div className="hidden md:block lg:hidden">
              <div
                className="
                  relative
                  h-[360px]
                  overflow-hidden
                  rounded-[2rem]
                  border border-[#26336F]/20
                  bg-card/10
                  p-5
                  shadow-2xl
                  backdrop-blur-md
                "
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#26336F]/10 via-[#050711]/60 to-[#DF1B25]/5" />

                <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/home/spiderman.webp"
                    alt="Spiderman Hero"
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </div>
              </div>
            </div>

            {/* mobile visual */}
            <div className="md:hidden">
              <div
                className="
                  relative
                  h-[260px]
                  overflow-hidden
                  rounded-[1.75rem]
                  border border-[#26336F]/20
                  bg-card/10
                  p-4
                  shadow-2xl
                  backdrop-blur-md
                "
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-[#26336F]/10 via-[#050711]/60 to-[#DF1B25]/5" />

                <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.25rem]">
                  <img
                    src="/home/spiderman.webp"
                    alt="Spiderman Hero"
                    className="absolute inset-0 w-full h-full object-contain object-center"
                  />
                </div>
              </div>
            </div>

            {/* sub */}
            <div
              ref={subRef}
              className="
                flex flex-col
                gap-5
                pt-2

                sm:flex-row
                sm:items-start
                sm:justify-between
              "
            >
              <div className="space-y-4">
                <p
                  className="
                    max-w-[540px]
                    text-sm
                    leading-relaxed
                    text-muted-foreground

                    sm:text-base
                  "
                >
                  We craft high-converting digital products, brand identities, packaging design, and performance marketing campaigns that help ambitious businesses scale faster.
                </p>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-muted-foreground">
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    ★★★★★ <span className="text-foreground ml-1">4.9/5 Rating</span>
                  </span>
                  <span className="h-3 w-[1px] bg-border" />
                  <span>200+ Projects Delivered</span>
                  <span className="h-3 w-[1px] bg-border" />
                  <span className="text-accent font-medium">100% Custom Solutions</span>
                </div>
              </div>

              {/* buttons */}
              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  gap-3
                  shrink-0
                "
              >
                <Link
                  href="/contact"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-2xl
                    bg-accent

                    px-7 py-4

                    text-sm
                    font-bold
                    text-accent-foreground
                    shadow-lg
                    shadow-accent/25

                    transition-all
                    duration-300

                    hover:scale-[1.03]
                    hover:bg-accent/90
                  "
                >
                  Start Your Project

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/portfolio"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-2xl
                    border border-border
                    bg-secondary/60

                    px-6 py-4

                    text-sm
                    font-bold
                    text-foreground

                    transition-all
                    duration-300

                    hover:border-accent/40
                    hover:bg-secondary
                  "
                >
                  View Work
                </Link>
              </div>
            </div>

            {/* typing */}
            <div
              ref={typingContainerRef}
              className="
                flex flex-col
                gap-3

                border-t border-border/50
                pt-4

                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-muted-foreground/60

                sm:flex-row
                sm:items-center
                sm:gap-4
              "
            >
              <span>We are experts in:</span>

              <div
                className="
                  flex items-center
                  min-h-8 sm:min-h-9
                  min-w-[200px] sm:min-w-[280px]

                  font-(family-name:--font-bebas-neue)

                  text-2xl
                  tracking-wide
                  text-foreground

                  sm:text-3xl
                "
              >
                <span>{typingText || '\u200B'}</span>

                <span className="ml-1 inline-block h-[1.1em] w-[3px] bg-accent animate-[pulse_0.9s_steps(2,start)_infinite]" />
              </div>
            </div>
          </div>

          {/* ====================================== */}
          {/* DESKTOP RIGHT VISUAL */}
          {/* ====================================== */}

          <div
            className="
              hidden
              lg:flex

              lg:col-span-5
              lg:order-1

              relative
              items-center
              justify-center
            "
          >
            <div
              ref={heroImageRef}
              className="relative w-full h-[600px] flex items-center justify-center"
              style={{ perspective: "1000px" }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(38,51,111,0.4)_0%,transparent_70%)]" />
              
              {/* 3D Wrapper */}
              <div 
                ref={parallaxWrapperRef}
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{ transformStyle: "preserve-3d" }}
              >
                <div
                  className="absolute inset-0 w-full h-full z-10 pointer-events-none"
                  style={{ transform: "translateZ(20px)" }}
                >
                  <img
                    src="/home/spiderman.webp"
                    alt="Spiderman Hero"
                    className="w-full h-full object-contain object-center"
                  />
                  {/* Overlay for image */}
                  <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-background via-background/80 to-transparent" />
                </div>

                {/* Float Card 1: 550+ Projects */}
                <div 
                  ref={floatCard1Ref}
                  className="absolute right-[5%] top-[25%] z-20 flex flex-col items-center justify-center gap-1 rounded-2xl border border-white/10 bg-[#0A102A]/80 backdrop-blur-md px-6 py-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{ transform: "translateZ(80px)" }}
                >
                  <div className="absolute -top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-[#0A102A]">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold text-white">550+</span>
                  <span className="text-xs font-medium text-muted-foreground">Project Completed</span>
                </div>

                {/* Float Card 2: Team Members */}
                <div 
                  ref={floatCard2Ref}
                  className="absolute left-[0%] bottom-[20%] z-20 flex flex-col gap-3 rounded-2xl border border-white/10 bg-[#0A102A]/80 backdrop-blur-md p-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
                  style={{ transform: "translateZ(100px)" }}
                >
                  <span className="text-xs font-semibold text-white/90">Team Members</span>
                  <div className="flex -space-x-3">
                    <Image src="/team/balaji.png" alt="Team" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-[#0A102A] object-cover" />
                    <Image src="/team/mani.png" alt="Team" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-[#0A102A] object-cover" />
                    <Image src="/team/ranjani.png" alt="Team" width={32} height={32} className="h-8 w-8 rounded-full border-2 border-[#0A102A] object-cover" />
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0A102A] bg-amber-400 text-xs font-bold text-[#0A102A]">+</div>
                  </div>
                </div>

                {/* Floating Message Icon */}
                <div 
                  className="absolute right-[15%] bottom-[15%] z-10 flex h-12 w-12 items-center justify-center rounded-full bg-transparent text-[#3b82f6] shadow-lg animate-[bounce_3s_infinite]"
                  style={{ transform: "translateZ(60px)" }}
                >
                  <MessageSquare className="h-8 w-8" />
                </div>
                
                {/* Floating megaphone or icon at top left */}
                <div 
                  className="absolute left-[15%] top-[10%] z-10 animate-[bounce_4s_infinite]"
                  style={{ transform: "translateZ(50px)" }}
                >
                   <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeHeroSection;