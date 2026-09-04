"use client";

import { useState } from "react";
import { servicesList } from "./utils";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

const ServicesListSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-background py-24 relative">
      <div className="container mx-auto px-6 max-w-[1600px]">
        <header className="mb-20 max-w-3xl">
          <h2 className="font-[family-name:var(--font-heading)] font-light text-4xl md:text-6xl font-bold tracking-tight text-foreground uppercase">
            Our Core <span className="text-accent italic font-light">Expertise</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground font-light leading-relaxed">
            We blend creativity, design, and advanced technology to build outstanding
            products, establish powerful brands, and accelerate growth for our clients.
          </p>
        </header>

        {/* 
          DESKTOP: Sticky Layout with Hover 
          MOBILE: Hidden on small screens
        */}
        <div className="hidden lg:grid grid-cols-12 gap-16 relative items-start">
          
          {/* Left: List of Services */}
          <div className="col-span-6 xl:col-span-5 flex flex-col gap-4 pb-32">
            {servicesList.map((service, idx) => {
              const isActive = activeIndex === idx;
              
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setActiveIndex(idx)}
                  className="group relative"
                >
                  <div 
                    className={cn(
                      "py-8 border-b transition-colors duration-500 cursor-pointer flex flex-col gap-6",
                      isActive ? "border-accent" : "border-border/40 group-hover:border-accent/50"
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-6">
                        <span className={cn(
                          "font-mono text-sm tracking-widest transition-colors duration-500",
                          isActive ? "text-accent" : "text-muted-foreground/50 group-hover:text-accent/50"
                        )}>
                          0{idx + 1}
                        </span>
                        <h3 className={cn(
                          "font-[family-name:var(--font-heading)] font-light text-4xl uppercase tracking-wide transition-all duration-500",
                          isActive ? "text-foreground" : "text-foreground/40 group-hover:text-foreground/70"
                        )}>
                          {service.title}
                        </h3>
                      </div>
                      
                      <Link
                        href={service.href}
                        className={cn(
                          "flex h-12 w-12 shrink-0 items-center justify-center rounded-full border transition-all duration-500",
                          isActive 
                            ? "border-accent bg-accent text-accent-foreground scale-100" 
                            : "border-border/40 bg-transparent text-muted-foreground scale-90 group-hover:border-accent/50 group-hover:text-accent"
                        )}
                        aria-label={`Explore ${service.title}`}
                      >
                        <ArrowUpRight className="h-5 w-5" />
                      </Link>
                    </div>

                    <AnimatePresence>
                      {isActive && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2 pb-4 pl-12 pr-4">
                            <p className="text-lg text-muted-foreground font-light leading-relaxed mb-8">
                              {service.description}
                            </p>
                            <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                              {service.features.map((feature, fIdx) => (
                                <div key={fIdx} className="flex items-center gap-3">
                                  <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                                  <span className="text-sm font-medium text-foreground/80">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Image Reveal */}
          <div className="col-span-6 xl:col-span-7 sticky top-32 h-[calc(100vh-16rem)] min-h-[500px] rounded-[2.5rem] overflow-hidden bg-secondary/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full"
              >
                <Image
                  src={servicesList[activeIndex].illustration}
                  alt={servicesList[activeIndex].title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 50vw, 60vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-60" />
              </motion.div>
            </AnimatePresence>
          </div>
          
        </div>

        {/* 
          MOBILE: Click Accordion 
          Hidden on Desktop
        */}
        <div className="flex flex-col lg:hidden border-t border-border/40">
          {servicesList.map((service, idx) => {
            const isActive = activeIndex === idx;
            
            return (
              <div key={idx} className="border-b border-border/40">
                <button
                  onClick={() => setActiveIndex(isActive ? -1 : idx)}
                  className="w-full py-8 flex flex-col gap-4 text-left"
                >
                  <div className="w-full flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className={cn(
                        "font-mono text-xs tracking-widest transition-colors duration-300",
                        isActive ? "text-accent" : "text-muted-foreground/50"
                      )}>
                        0{idx + 1}
                      </span>
                      <h3 className={cn(
                        "font-[family-name:var(--font-heading)] font-light text-2xl uppercase tracking-wide transition-colors duration-300",
                        isActive ? "text-foreground" : "text-foreground/70"
                      )}>
                        {service.title}
                      </h3>
                    </div>
                    <div className={cn(
                      "flex h-8 w-8 items-center justify-center rounded-full border transition-colors duration-300",
                      isActive ? "border-accent text-accent" : "border-border/40 text-muted-foreground"
                    )}>
                      {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 flex flex-col gap-6">
                        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden">
                          <Image
                            src={service.illustration}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="100vw"
                          />
                        </div>
                        
                        <p className="text-base text-muted-foreground font-light leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex flex-col gap-3">
                          {service.features.map((feature, fIdx) => (
                            <div key={fIdx} className="flex items-center gap-3">
                              <span className="w-1.5 h-1.5 rounded-full bg-accent/70" />
                              <span className="text-sm font-medium text-foreground/80">{feature}</span>
                            </div>
                          ))}
                        </div>

                        <Link
                          href={service.href}
                          className="mt-4 inline-flex items-center justify-between px-6 py-4 rounded-full bg-accent text-white font-bold uppercase tracking-wider text-xs"
                        >
                          Explore Service
                          <ArrowUpRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ServicesListSection;