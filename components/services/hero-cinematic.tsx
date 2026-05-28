"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
      <style>{`
        @keyframes ring-cw  { to { transform: rotate(360deg); } }
        @keyframes ring-ccw { to { transform: rotate(-360deg); } }
        @keyframes marquee  { from { transform: translateX(0); } to { transform: translateX(-50%); } }

        .ring-cw  { animation: ring-cw  28s linear infinite; }
        .ring-ccw { animation: ring-ccw 22s linear infinite; }
        .hero-marquee { animation: marquee 28s linear infinite; }

        .hero-btn-primary:hover  { filter: brightness(1.12); }
        .hero-btn-outline:hover  { background: rgba(255,255,255,0.07) !important; }

        /* ── Responsive ─────────────────────────────── */
        @media (max-width: 1023px) {
          .hero-bg-rings  { display: none; }
          .hero-bg-glow   { display: none; }
          .hero-lottie    { width: 340px !important; height: 340px !important; right: -60px !important; opacity: 0.22 !important; }
          .hero-bg-dots   { opacity: 0.18 !important; mask-image: none !important; -webkit-mask-image: none !important; }
        }

        @media (max-width: 639px) {
          .hero-ghost-text  { font-size: clamp(80px, 24vw, 140px) !important; margin-right: -12px !important; }
          .hero-badge       { margin-bottom: 20px !important; }
          .hero-tagline-row { flex-direction: column !important; align-items: flex-start !important; gap: 20px !important; }
          .hero-cta-group   { width: 100%; }
          .hero-cta-group button { width: 100%; justify-content: center; }
          .hero-stats       { gap: 24px !important; flex-wrap: wrap; }
          .hero-lottie      { display: none !important; }
        }

        @media (max-width: 400px) {
          .hero-marquee-item { padding: 0 20px !important; font-size: 10px !important; }
        }
      `}</style>

      <section
      className="min-h-fit"
        style={{
          position: "relative",
          overflow: "hidden",
          background: "#060606",
          // minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
        }}
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
              className="hero-ghost-text"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(80px, 22vw, 320px)",
                color: "transparent",
                WebkitTextStroke: "1px rgba(255,255,255,0.035)",
                letterSpacing: "-0.02em",
                lineHeight: 1,
                userSelect: "none",
                marginRight: "-30px",
              }}
            >
              STUDIO
            </span>
          </div>

          {/* Rings */}
          <div
            className="hero-bg-rings"
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
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
                border: "1px solid rgba(255,255,255,0.05)",
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
                border: "1px solid rgba(232,184,75,0.09)",
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
                border: "1px solid rgba(232,184,75,0.05)",
              }}
            />
          </div>

          {/* Amber glow */}
          <div
            className="hero-bg-glow"
            style={{
              position: "absolute",
              top: "50%",
              right: 0,
              transform: "translateY(-50%)",
              width: 560,
              height: 560,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(232,184,75,0.12) 0%, transparent 70%)",
            }}
          />

          {/* Dot grid */}
          <div
            className="hero-bg-dots"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.18) 1px, transparent 1px)",
              backgroundSize: "38px 38px",
              opacity: 0.35,
              maskImage:
                "radial-gradient(ellipse 50% 80% at 85% 50%, black 20%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 50% 80% at 85% 50%, black 20%, transparent 100%)",
            }}
          />

          {/* ── Lottie — right-side asset, not full-bleed ── */}
          <div
            className="hero-lottie"
            style={{
              position: "absolute",
              top: "50%",
              right: "clamp(24px, 6vw, 80px)",
              transform: "translateY(-50%)",
              width: "clamp(280px, 36vw, 520px)",
              height: "clamp(280px, 36vw, 520px)",
              pointerEvents: "none",
              opacity: 0.72,
              mixBlendMode: "screen",
              /* fade out toward left edge so it doesn't clash with text */
              maskImage:
                "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 80% 80% at 60% 50%, black 40%, transparent 100%)",
            }}
          >
            <DotLottieReact
              src="/lottie/hero-service.lottie"
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
                background: "#E8B84B",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(10px, 1.1vw, 11px)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.38)",
              }}
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
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(40px, 8.5vw, 118px)",
                lineHeight: 0.93,
                letterSpacing: "-0.03em",
                color: "#ffffff",
              }}
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
                  style={{
                    display: "block",
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(40px, 8.5vw, 118px)",
                    lineHeight: 0.93,
                    color: "#E8B84B",
                  }}
                >
                  {cyclingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Tagline + CTAs */}
          <motion.div
            className="hero-tagline-row"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            style={{
              marginTop: "clamp(28px, 3.5vw, 44px)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "24px 48px",
            }}
          >
            <p
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 400,
                fontSize: "clamp(13px, 1.2vw, 17px)",
                lineHeight: 1.75,
                color: "rgba(255,255,255,0.42)",
                maxWidth: 340,
                margin: 0,
              }}
            >
              High-performance websites, marketing systems, and visual content
              for brands that refuse to blend in.
            </p>

            <div
              className="hero-cta-group"
              style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
            >
              <button
                className="hero-btn-primary"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#E8B84B",
                  color: "#060606",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(11px, 1vw, 13px)",
                  padding: "14px 26px",
                  borderRadius: 999,
                  border: "none",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "filter 0.2s",
                }}
              >
                Start a Project
                <ArrowUpRight size={15} />
              </button>

              <button
                className="hero-btn-outline"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  color: "rgba(255,255,255,0.55)",
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 600,
                  fontSize: "clamp(11px, 1vw, 13px)",
                  padding: "14px 26px",
                  borderRadius: 999,
                  border: "1px solid rgba(255,255,255,0.12)",
                  cursor: "pointer",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  transition: "background 0.2s",
                }}
              >
                View Our Work
              </button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="hero-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            style={{
              marginTop: "clamp(32px, 4vw, 56px)",
              display: "flex",
              gap: "clamp(20px, 5vw, 64px)",
              alignItems: "flex-start",
              flexWrap: "wrap",
            }}
          >
            {stats.map(({ num, label }) => (
              <div key={label}>
                <div
                  style={{
                    fontFamily: "'DM Serif Display', serif",
                    fontStyle: "italic",
                    fontSize: "clamp(24px, 3.5vw, 44px)",
                    color: "#ffffff",
                    lineHeight: 1,
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 600,
                    fontSize: "clamp(10px, 0.9vw, 11px)",
                    color: "rgba(255,255,255,0.28)",
                    marginTop: 6,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
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
                  className="hero-marquee-item"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    padding: "0 36px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {s}
                </span>
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "#E8B84B",
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