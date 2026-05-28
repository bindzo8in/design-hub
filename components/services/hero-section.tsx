"use client";
import React from "react";
import { motion } from "motion/react";
import { ArrowRight, MousePointer2 } from "lucide-react";
import HeroScene from "./HeroScene";
import ServiceBadge from "./badge";

const Hero = () => {
  return (
    <section className="relative w-full h-[100vh] min-h-[700px] bg-[#030303] overflow-hidden flex items-center">
      {/* Background Noise & Gradients */}
      <div className="absolute inset-0 opacity-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-50" />
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />

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
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest uppercase text-blue-400 border border-blue-400/30 rounded-full bg-blue-400/5 backdrop-blur-md">
              Next-Gen Creative Agency
            </span>
            <h1 className="text-6xl md:text-8xl font-bold text-white leading-[0.9] tracking-tight mb-8">
              CRAFTING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-100 via-blue-400 to-indigo-500">
                DIGITAL
              </span> <br />
              ARTEFACTS
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed mb-10 max-w-lg">
              We merge futuristic design with high-performance engineering to build brands that define the next decade.
            </p>

            <div className="flex flex-wrap gap-5">
              <button className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden transition-all hover:scale-105 active:scale-95">
                <span className="relative z-10 flex items-center gap-2">
                  Start Project <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-200 to-white opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              
              <button className="px-8 py-4 bg-transparent border border-white/20 text-white font-medium rounded-full backdrop-blur-sm transition-all hover:bg-white/5 hover:border-white/40">
                View Showcase
              </button>
            </div>
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
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 vertical-text font-medium">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent relative overflow-hidden">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/3 bg-white"
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
              <span className="text-white text-2xl font-bold tracking-tighter">{stat.val}</span>
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest uppercase">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;