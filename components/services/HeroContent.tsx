"use client";

import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";

const HeroScene = dynamic(() => import("./HeroScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[300px] sm:h-[420px] lg:h-[700px] rounded-2xl bg-gradient-to-b from-[#060e1e] to-[#03060f] animate-pulse" />
  ),
});

export default function ServicesHeroCinematic() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-[#03060f]">

      {/* ── Background radials ─────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 20% 10%, rgba(24,56,120,0.28) 0%, transparent 65%),
            radial-gradient(ellipse 60% 50% at 80% 80%, rgba(60,20,100,0.22) 0%, transparent 60%),
            radial-gradient(ellipse 100% 100% at 50% 0%, rgba(5,12,32,0.95) 0%, #03060f 100%)
          `,
        }}
      />

      {/* ── Grain ─────────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.032] mix-blend-screen">
        <svg className="w-full h-full" preserveAspectRatio="none">
          <filter id="grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.72" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>
      </div>

      {/* ── Top glow line ─────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute top-0 inset-x-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(100,160,255,0.35) 30%, rgba(140,80,255,0.3) 70%, transparent 100%)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8 pt-10 pb-24 sm:pt-12 lg:pt-0">

        {/*
          Mobile:  single column, scene on top, text below, vertically stacked
          Desktop: two columns side by side, text left, scene right
        */}
        <div className="mx-auto max-w-7xl flex flex-col lg:grid lg:grid-cols-2 lg:gap-4 lg:items-center lg:min-h-screen">

          {/* Scene — top on mobile, right on desktop */}
          <div className="w-full order-1 lg:order-2 relative flex items-center justify-center lg:-mr-8 xl:-mr-16">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl"
              style={{
                background:
                  "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(50,100,220,0.13) 0%, transparent 75%)",
                filter: "blur(32px)",
              }}
            />
            <div className="relative w-full">
              <HeroScene />
            </div>
          </div>

          {/* Text — bottom on mobile, left on desktop */}
          <div className="w-full order-2 lg:order-1 flex flex-col justify-center px-0 lg:py-24">
            <HeroContent />
          </div>

        </div>
      </div>

      {/* ── Scroll hint — hidden on mobile to avoid overlap ───────────── */}
      <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex-col items-center gap-2">
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/25 select-none">
          Scroll
        </span>
        <div
          className="h-10 w-[22px] rounded-full flex items-start justify-center pt-[5px]"
          style={{
            border: "1px solid rgba(120,160,255,0.2)",
            boxShadow: "0 0 12px rgba(80,120,255,0.08), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}
        >
          <div
            className="h-[7px] w-[7px] rounded-full animate-bounce"
            style={{
              background: "radial-gradient(circle, rgba(160,200,255,0.9) 0%, rgba(80,140,255,0.6) 100%)",
              boxShadow: "0 0 6px rgba(100,160,255,0.6)",
              animationDuration: "1.6s",
              animationTimingFunction: "cubic-bezier(0.45, 0, 0.55, 1)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
