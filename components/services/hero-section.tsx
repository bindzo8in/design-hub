"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import HeroScene from "./HeroScene";
import ServiceBadge from "./badge";

const Hero = () => {
  return (
    <section className="relative w-full h-[100vh] min-h-[700px] bg-background overflow-hidden flex items-center">
      {/* Background Noise & Gradients */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-1/2 left-1/2 w-[60vw] h-[60vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(223,27,37,0.1)_0%,transparent_60%)] blur-[80px] rounded-full pointer-events-none mix-blend-screen" />

      {/* 3D Scene Layer */}
      <HeroScene />

      {/* Main Content Layout */}
      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center pointer-events-none">

        {/* Left Side: Content */}
        <div className="max-w-2xl pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-bold tracking-[0.3em] uppercase text-accent border border-accent/30 rounded-full bg-accent/5 backdrop-blur-md">
              What We Do
            </span>
            <h1 className="font-[family-name:var(--font-heading)] font-light text-[clamp(3.5rem,8vw,7rem)] font-bold text-foreground leading-[0.9] tracking-tight mb-8 uppercase">
              OUR <br />
              <span className="text-accent italic font-light">
                SERVICES
              </span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-lg">
              Comprehensive digital solutions tailored to elevate your brand. From identity to high-performance applications, we deliver excellence across every touchpoint.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Visual Space (Badges positioned here) */}
        <div className="relative h-[500px] pointer-events-none">
          <ServiceBadge
            text="Web Design"
            className="top-[10%] right-[10%] md:right-[20%]"
            delay={0.4}
          />
          <ServiceBadge
            text="Brand Identity"
            className="top-[40%] right-[-5%] md:right-[5%]"
            delay={0.6}
          />
          <ServiceBadge
            text="3D Photography"
            className="bottom-[20%] right-[15%] md:right-[30%]"
            delay={0.8}
          />
          <ServiceBadge
            text="Digital Marketing"
            className="bottom-[45%] left-[0%]"
            delay={1.0}
          />
        </div>
      </div>

      {/* Bottom Interface Elements */}
      <div className="absolute bottom-10 left-0 w-full px-10 flex justify-between items-end pointer-events-none">
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="flex flex-col items-center gap-3"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground vertical-text font-medium" style={{ writingMode: 'vertical-rl' }}>Scroll</span>
          <div className="w-[1px] h-12 bg-border relative overflow-hidden">
            <motion.div
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/3 bg-accent"
            />
          </div>
        </motion.div>

        {/* Stats / Proof */}
        <div className="hidden md:flex gap-12 pointer-events-auto">
          {[
            { label: "Global Projects", val: "120+" },
            { label: "Industry Awards", val: "18" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-foreground text-2xl font-bold tracking-tighter">{stat.val}</span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;