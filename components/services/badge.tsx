"use client";
import { motion } from "motion/react";

interface BadgeProps {
  text: string;
  className: string;
  delay: number;
}

const ServiceBadge = ({ text, className, delay }: BadgeProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20, scale: 0.8 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ 
      duration: 0.8, 
      delay, 
      ease: [0.16, 1, 0.3, 1],
      scale: { type: "spring", damping: 15 } 
    }}
    whileHover={{ y: -5, scale: 1.05 }}
    className={`absolute z-20 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl text-white font-medium text-sm md:text-base flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.05)] cursor-default ${className}`}
  >
    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
    {text}
  </motion.div>
);

export default ServiceBadge;