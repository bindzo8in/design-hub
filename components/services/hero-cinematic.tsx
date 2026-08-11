"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import Link from "next/link";

const cyclingWords = [
  "premium.",
  "unforgettable.",
  "iconic.",
  "bold.",
  "sharp.",
];

const services = [
  "Web Design",
  "Digital Marketing",
  "Brand Identity",
  "Photography",
  "Packaging",
  "UI/UX Design",
  "Content Strategy",
  "Motion Design",
];

const stats = [
  { num: "120+", label: "Projects" },
  { num: "8yr", label: "Experience" },
  { num: "98%", label: "Satisfaction" },
];

export default function HeroCinematic() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setWordIndex((i) => (i + 1) % cyclingWords.length),
      2400
    );
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <section
        className="min-h-fit relative overflow-hidden bg-background flex flex-col"
      >
        {/* ── Background layer ── */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>

          {/* Ghost "STUDIO" */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              overflow: "hidden",
            }}
          >
            <span
              className="hero-ghost-text font-[family-name:var(--font-syne,'Syne',sans-serif)] font-extrabold text-[clamp(80px,24vw,140px)] sm:text-[clamp(80px,22vw,320px)] leading-none -mr-3 sm:-mr-8 select-none tracking-tight text-transparent"
              style={{
                WebkitTextStroke: "1px color-mix(in srgb, var(--foreground) 3.5%, transparent)",
              }}
            >
              STUDIO
            </span>
          </div>

          {/* Rings */}
          <div
            className="hero-bg-rings hidden lg:block absolute inset-0 pointer-events-none"
          >
            <div
              className="ring-cw"
              style={{
                position: "absolute",
                top: "50%",
                right: "-220px",
                marginTop: "-320px",
                width: 640,
                height: 640,
                borderRadius: "50%",
                border: "1px solid color-mix(in srgb, var(--foreground) 5%, transparent)",
              }}
            />
            <div
              className="ring-ccw"
              style={{
                position: "absolute",
                top: "50%",
                right: "-130px",
                marginTop: "-230px",
                width: 460,
                height: 460,
                borderRadius: "50%",
                border: "1px solid color-mix(in srgb, var(--accent) 9%, transparent)",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                right: "0px",
                marginTop: "-160px",
                width: 320,
                height: 320,
                borderRadius: "50%",
                border: "1px solid color-mix(in srgb, var(--accent) 5%, transparent)",
              }}
            />
          </div>

          {/* Crimson glow */}
          <div
            className="hero-bg-glow hidden lg:block absolute top-1/2 right-0 -translate-y-1/2 w-[560px] h-[560px] rounded-full"
            style={{
              background:
                "radial-gradient(circle, color-mix(in srgb, var(--accent) 12%, transparent) 0%, transparent 70%)",
            }}
          />

          {/* Dot grid */}
          <div
            className="hero-bg-dots absolute inset-0 opacity-[0.18] lg:opacity-[0.35]"
            style={{
              backgroundImage:
                "radial-gradient(circle, color-mix(in srgb, var(--foreground) 18%, transparent) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
              maskImage:
                "radial-gradient(ellipse 50% 80% at 85% 50%, black 20%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 80% at 85% 50%, black 20%, transparent 100%)",
            }}
          />

          {/* ── Lottie — right-side asset, not full-bleed ── */}
          <div
            className="hero-lottie hidden sm:block absolute top-1/2 -translate-y-1/2 pointer-events-none opacity-[0.22] lg:opacity-[0.72] w-[340px] h-[340px] -right-[60px] lg:w-[clamp(280px,36vw,520px)] lg:h-[clamp(280px,36vw,520px)] lg:right-[clamp(24px,6vw,80px)]"
            style={{
              /* fade out toward left edge so it doesn't clash with text */
              maskImage:
                "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
            }}
          >
            <DotLottieReact
              src="/lottie/software_testing.lottie"
              autoplay
              loop
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </div>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            position: "relative",
            zIndex: 10,
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding:
              "clamp(72px, 10vw, 140px) clamp(20px, 6vw, 96px) clamp(32px, 4vw, 48px)",
          }}
        >
          {/* Badge */}
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              marginBottom: 36,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent)",
                flexShrink: 0,
              }}
            />
            <span
              className="font-[family-name:var(--font-syne,'Syne',sans-serif)] font-bold text-[clamp(10px,1.1vw,11px)] tracking-[0.22em] uppercase text-muted-foreground"
            >
              Creative Digital Studio
            </span>
          </motion.div>

          {/* Headline */}
          <div style={{ maxWidth: "820px" }}>
            <motion.div
              initial={{ opacity: 0, y: 44 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="font-[family-name:var(--font-syne,'Syne',sans-serif)] font-extrabold text-[clamp(40px,8.5vw,118px)] leading-[0.93] tracking-tight text-foreground"
            >
              Building brands
              <br />
              that feel
            </motion.div>

            {/* Cycling word */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.25 }}
              style={{
                height: "clamp(40px, 8.5vw, 118px)",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  initial={{ y: "105%", opacity: 0, skewY: 4 }}
                  animate={{ y: "0%", opacity: 1, skewY: 0 }}
                  exit={{ y: "-105%", opacity: 0, skewY: -4 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="block font-serif italic text-[clamp(40px,8.5vw,118px)] leading-[0.93] text-accent"
                >
                  {cyclingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tagline + CTAs */}
          <motion.div
            className="hero-tagline-row flex flex-col sm:flex-row sm:items-center sm:gap-12 gap-5 mt-[clamp(28px,3.5vw,44px)]"
          >
            <p
              className="font-[family-name:var(--font-syne,'Syne',sans-serif)] font-normal text-[clamp(13px,1.2vw,17px)] leading-relaxed text-muted-foreground max-w-[340px] m-0"
            >
              High-performance websites, marketing systems, and visual content
              for brands that refuse to blend in.
            </p>

            <div
              className="hero-cta-group flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="hero-btn-primary inline-flex items-center justify-center sm:justify-start gap-2 bg-accent text-accent-foreground font-[family-name:var(--font-syne,'Syne',sans-serif)] font-bold text-[clamp(11px,1vw,13px)] px-[26px] py-[14px] rounded-full tracking-[0.08em] uppercase whitespace-nowrap transition-all duration-200"
              >
                Start a Project
                <ArrowUpRight size={15} />
              </Link>

              <Link
                href="/portfolio"
                className="hero-btn-outline inline-flex items-center justify-center sm:justify-start gap-2 bg-transparent text-muted-foreground font-[family-name:var(--font-syne,'Syne',sans-serif)] font-semibold text-[clamp(11px,1vw,13px)] px-[26px] py-[14px] rounded-full border border-border tracking-[0.08em] uppercase whitespace-nowrap transition-colors duration-200"
              >
                View Our Work
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats flex flex-wrap sm:flex-nowrap items-start gap-6 sm:gap-[clamp(20px,5vw,64px)] mt-[clamp(32px,4vw,56px)]"
          >
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div
                  className="font-serif italic text-[clamp(24px,3.5vw,44px)] text-foreground leading-none"
                >
                  {num}
                </div>
                <div
                  className="font-[family-name:var(--font-syne,'Syne',sans-serif)] font-semibold text-[clamp(10px,0.9vw,11px)] text-muted-foreground/70 mt-1.5 tracking-[0.15em] uppercase"
                >
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Marquee Ticker ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.65 }}
          style={{
            position: "relative",
            zIndex: 10,
            borderTop: "1px solid rgba(255,255,255,0.07)",
            overflow: "hidden",
            padding: "16px 0",
          }}
        >
          <div
            className="hero-marquee"
            style={{
              display: "flex",
              width: "max-content",
              alignItems: "center",
            }}
          >
            {[...services, ...services].map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center" }}>
                <span
                  className="hero-marquee-item font-[family-name:var(--font-syne,'Syne',sans-serif)] font-bold text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-muted-foreground px-5 sm:px-9 whitespace-nowrap"
                >
                  {s}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "var(--accent)",
                    opacity: 0.5,
                    flexShrink: 0,
                  }}
                />
              </div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
}