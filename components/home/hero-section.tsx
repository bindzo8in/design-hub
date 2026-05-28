"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
          {
            opacity: 0,
            scale: 0.95,
            y: 30,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            delay: 0.4,
          },
          "-=0.8"
        );

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
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.08)_0%,transparent_65%)] dark:bg-[radial-gradient(ellipse_80%_60%_at_60%_40%,rgba(223,27,37,0.12)_0%,transparent_65%)]" />

        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.06)_0%,transparent_60%)] dark:bg-[radial-gradient(ellipse_50%_70%_at_10%_80%,rgba(38,51,111,0.1)_0%,transparent_60%)]" />

        {/* grid */}
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

      <div className="relative z-10 mx-auto w-full max-w-[1380px]">
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
              order-2

              space-y-5

              md:space-y-6

              lg:col-span-7
              lg:order-1
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
                font-cormorant
                uppercase
                leading-[0.88]
                tracking-tight
                text-foreground

                text-[clamp(3.2rem,12vw,5rem)]

                md:text-[clamp(4rem,9vw,6rem)]

                lg:text-[clamp(4.5rem,7vw,7rem)]
              "
            >
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
                  <DotLottieReact
                    src="/lottie/Live chatbot.lottie"
                    loop
                    autoplay
                    className="h-full w-full object-contain"
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
                  <DotLottieReact
                    src="/lottie/Live chatbot.lottie"
                    loop
                    autoplay
                    className="h-full w-full object-contain"
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
              <p
                className="
                  max-w-[520px]
                  text-sm
                  leading-relaxed
                  text-muted-foreground

                  sm:text-base
                "
              >
                We design and build modern digital
                experiences that combine creativity,
                branding, and technology to help
                businesses grow with impact.
              </p>

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
                  href="/about"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-2xl
                    bg-accent

                    px-6 py-3.5

                    text-sm
                    font-bold
                    text-accent-foreground

                    transition-all
                    duration-300

                    hover:scale-[1.02]
                    hover:bg-accent/90
                  "
                >
                  Discover Us

                  <ArrowRight className="h-4 w-4" />
                </Link>

                <Link
                  href="/services"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    text-sm
                    font-bold
                    text-muted-foreground

                    transition-colors
                    duration-300

                    hover:text-foreground
                  "
                >
                  Our Services

                  <ArrowRight className="h-4 w-4" />
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

                  font-(family-name:--font-bebas-neue)

                  text-2xl
                  tracking-wide
                  text-foreground

                  sm:text-3xl
                "
              >
                <span>{typingText}</span>

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

              relative
              justify-center
            "
          >
            <div
              ref={heroImageRef}
              className="
                relative

                w-[92%]
                overflow-hidden

                rounded-[2rem]
                border border-[#26336F]/20
                bg-card/10

                p-4

                shadow-2xl
                backdrop-blur-md

                h-[420px]
              "
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-[#26336F]/10 via-[#050711]/60 to-[#DF1B25]/5 z-0" />

              <div className="relative flex h-full items-center justify-center overflow-hidden rounded-[1.5rem]">
                <DotLottieReact
                  src="/lottie/Live chatbot.lottie"
                  loop
                  autoplay
                  className="h-full w-full object-contain"
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