"use client";

import { motion } from "motion/react";

export default function HeroCinematic() {
  return (
    <section className="relative w-full min-h-[50vh] md:min-h-[60vh] bg-background flex flex-col items-center justify-center pt-32 pb-20 overflow-hidden border-b border-border/40">
      
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute top-0 left-1/2 w-[80vw] h-[80vh] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(223,27,37,0.08)_0%,transparent_70%)] blur-[80px] rounded-full pointer-events-none" />

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-3"
        >
          <span className="w-8 h-[1px] bg-accent" />
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-accent">
            What We Do
          </span>
          <span className="w-8 h-[1px] bg-accent" />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-[family-name:var(--font-chillax)] font-light text-5xl md:text-7xl lg:text-8xl font-bold uppercase text-foreground leading-[1.1] tracking-tight mb-8"
        >
          Our <br className="md:hidden" />
          <span className="text-accent italic font-light">Services</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed max-w-2xl mx-auto"
        >
          Comprehensive digital solutions engineered for maximum impact. From brand identity to high-performance applications, we deliver excellence across every touchpoint.
        </motion.p>

      </div>
    </section>
  );
}