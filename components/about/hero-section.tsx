"use client";

interface PremiumAboutCardProps {
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Lightbulb, Palette, Rocket, Handshake } from "lucide-react";

const values = [
  { icon: Lightbulb, label: "Strategy" },
  { icon: Palette, label: "Creativity" },
  { icon: Rocket, label: "Delivery" },
  { icon: Handshake, label: "Partnership" },
];

const stats = [
  { value: 6, suffix: "+", label: "Years Experience" },
  { value: 200, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const statRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Cinematic heading reveal — line by line
        gsap.fromTo(
          ".about-hero-line",
          { y: "110%", opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.12,
            ease: "power4.out",
            delay: 0.1,
          }
        );

        // Sub text
        gsap.fromTo(
          ".about-hero-sub",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: "power3.out" }
        );

        // Stats count-up
        stats.forEach((stat, i) => {
          const el = statRefs.current[i];
          if (!el) return;
          const obj = { val: 0 };
          gsap.to(obj, {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            delay: 0.4 + i * 0.15,
            onUpdate: () => {
              el.textContent = Math.floor(obj.val).toString();
            },
          });
        });

        // Stats strip entrance
        gsap.fromTo(
          ".about-stat-item",
          { opacity: 0, y: 30, scale: 0.9 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: "back.out(1.4)",
            delay: 0.3,
          }
        );

        // Values strip
        gsap.fromTo(
          ".about-value-pill",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".about-values-strip",
              start: "top 88%",
              once: true,
            },
          }
        );

        // Cards animation
        const cards = gsap.utils.toArray<HTMLElement>(".premium-card");
        cards.forEach((card, index) => {
          const image = card.querySelector(".premium-image");
          const content = card.querySelector(".premium-content");
          const direction = index % 2 === 0 ? -80 : 80;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          });

          tl.fromTo(
            card,
            { opacity: 0, y: 80 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
          )
            .fromTo(
              image,
              { opacity: 0, scale: 1.08, x: direction },
              { opacity: 1, scale: 1, x: 0, duration: 1.4, ease: "power3.out" },
              0
            )
            .fromTo(
              content,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.9, ease: "power2.out" },
              0.2
            );

          // Desktop hover parallax
          if (window.innerWidth >= 1024) {
            card.addEventListener("mousemove", (e: MouseEvent) => {
              const rect = card.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              const moveX = (x / rect.width - 0.5) * 18;
              const moveY = (y / rect.height - 0.5) * 18;
              gsap.to(image, { x: moveX, y: moveY, duration: 0.7, ease: "power2.out" });
            });
            card.addEventListener("mouseleave", () => {
              gsap.to(image, { x: 0, y: 0, duration: 1, ease: "power3.out" });
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative overflow-hidden
        bg-slate-50 dark:bg-[#101735]
        px-4 sm:px-6 lg:px-8
        py-16 sm:py-20 lg:py-28
      "
    >
      {/* Ambient background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[400px] w-[500px] rounded-full bg-accent/8 blur-[130px]" />
        <div className="absolute bottom-1/3 right-0 h-[350px] w-[400px] rounded-full bg-[#26336F]/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">

        {/* ── Cinematic Header ─────────────────────── */}
        <header className="mb-16 lg:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

            {/* Left — headline */}
            <div className="lg:col-span-7 space-y-6">
              {/* Label */}
              <div className="about-hero-sub inline-flex items-center gap-2.5 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                Who We Are
              </div>

              {/* Big headline — clipped for line reveal */}
              <h1 className="font-[family-name:var(--font-bebas-neue)] uppercase leading-[0.88] tracking-tight text-foreground text-[clamp(3.5rem,10vw,8rem)]">
                <span className="block overflow-hidden">
                  <span className="about-hero-line block">Crafting</span>
                </span>
                <span className="block overflow-hidden">
                  <span className="about-hero-line block">
                    <em className="not-italic text-accent">Experiences</em>
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="about-hero-line block">That Matter</span>
                </span>
              </h1>

              <p className="about-hero-sub max-w-lg text-sm sm:text-base leading-relaxed text-muted-foreground">
                We combine branding, engineering, marketing, and storytelling into one cohesive ecosystem — helping ambitious brands scale with clarity and confidence.
              </p>
            </div>

            {/* Right — stats */}
            <div className="lg:col-span-5">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="about-stat-item flex flex-col items-center text-center rounded-2xl border border-slate-200 dark:border-[#26336F]/60 bg-white dark:bg-[#18224b]/50 py-6 px-3 shadow-sm"
                  >
                    <div className="font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-5xl text-foreground leading-none">
                      <span
                        ref={(el) => { statRefs.current[i] = el; }}
                      >
                        0
                      </span>
                      <span className="text-accent">{stat.suffix}</span>
                    </div>
                    <div className="mt-2 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* ── Brand Values Strip ───────────────────── */}
        <div className="about-values-strip mb-16 lg:mb-20 flex flex-wrap items-center gap-3">
          {values.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="about-value-pill inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-[#26336F]/60 bg-white dark:bg-[#18224b]/50 px-4 py-2 text-xs font-semibold text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors duration-300"
            >
              <Icon className="h-3.5 w-3.5 text-accent" />
              {label}
            </div>
          ))}
          <div className="about-value-pill flex-1 h-[1px] bg-border min-w-[40px] hidden sm:block" />
          <div className="about-value-pill text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/50 hidden sm:block">
            Design Hub, Coimbatore
          </div>
        </div>

        {/* ── Cards ───────────────────────────────── */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-16">
          <PremiumAboutCard
            label="Why Us"
            title="Strategy Meets Creative Execution"
            description="We combine branding, engineering, marketing, and storytelling into one cohesive ecosystem that helps brands scale with clarity and impact."
            image="/about/hero/about_hero_1.webp"
            alt="Creative digital agency"
          />

          <PremiumAboutCard
            reverse
            label="What We Do"
            title="Building Brands That Actually Matter"
            description="From visual identity systems to modern web platforms and immersive digital products, we help brands communicate with confidence."
            image="/about/hero/about_hero_2.webp"
            alt="Branding and design studio"
          />
        </div>
      </div>
    </section>
  );
};

/* ─── Premium About Card ─────────────────────────────────── */
const PremiumAboutCard = ({
  title,
  label,
  description,
  image,
  alt,
  reverse = false,
}: PremiumAboutCardProps) => {
  return (
    <article
      className="
        premium-card
        group
        relative
        overflow-hidden
        rounded-[2rem]
        border border-slate-200 dark:border-[#26336F]/50
        bg-white dark:bg-[#18224b]/50
        backdrop-blur-xl
        grid grid-cols-1 md:grid-cols-2
        min-h-[480px] md:min-h-[520px] lg:min-h-[620px]
        shadow-sm
        hover:shadow-xl hover:shadow-accent/10
        transition-shadow duration-500
      "
    >
      {/* IMAGE */}
      <figure
        className={`
          relative overflow-hidden
          flex items-end justify-center
          bg-gradient-to-br from-slate-100 dark:from-[#26336F]/20 to-transparent
          h-[300px] sm:h-[380px] md:h-full lg:min-h-[620px]
          ${reverse ? "order-1 md:order-2" : ""}
        `}
      >
        <div className="premium-image absolute inset-0 flex items-end justify-center">
          <Image
            src={image}
            alt={alt}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="
              object-contain
              p-4 sm:p-6 lg:p-8
              scale-100 lg:scale-[1.02]
              transition-transform duration-700 ease-out
              group-hover:scale-[1.05]
            "
          />
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-transparent" />

        {/* Label badge floating on image */}
        <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
          {label}
        </div>
      </figure>

      {/* CONTENT */}
      <div
        className={`
          premium-content
          flex items-center
          p-6 sm:p-10 lg:p-14
          ${reverse ? "order-2 md:order-1" : ""}
        `}
      >
        <div className="max-w-xl space-y-5">
          {/* Accent line */}
          <div className="flex items-center gap-3">
            <span className="h-[2px] w-10 bg-accent rounded-full" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {label}
            </span>
          </div>

          <h2 className="
            font-[family-name:var(--font-bebas-neue)]
            uppercase tracking-tight leading-[0.95]
            text-4xl sm:text-5xl lg:text-6xl
            text-foreground
          ">
            {title}
          </h2>

          <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
            {description}
          </p>

          {/* Divider with brand mark */}
          <div className="pt-2 flex items-center gap-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground/50">
            <span className="h-[1px] w-6 bg-border" />
            Design Hub Solutions
          </div>
        </div>
      </div>
    </article>
  );
};

export { PremiumAboutCard };
export default HeroSection;
