"use client"
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";

const features = [
  "High-quality materials and finishes",
  "Accurate color matching and sharp output",
  "Print-ready and production support",
  "Reliable timelines and consistent quality",
  "Solutions tailored to your budget and scale",
];

const images = [
  "/tmp/card_placeholder.webp",
  "/tmp/project_placeholder.webp",
  "/tmp/card_placeholder.webp",
];

const PrintingWhySection = () => {
  const [current, setCurrent] = useState(0);
    const [next, setNext] = useState(1);
    const [progress, setProgress] = useState(0);
  
    const size = 420;
    const radius = size / 2;
  
    useEffect(() => {
      let frame: number;
      let start: number | null = null;
      const duration = 3000;
  
      const animate = (time: number) => {
        if (!start) start = time;
  
        const elapsed = time - start;
        const percent = Math.min(elapsed / duration, 1);
  
        setProgress(percent * 100);
  
        if (percent < 1) {
          frame = requestAnimationFrame(animate);
        } else {
          setCurrent(next);
          setNext((next + 1) % images.length);
          setProgress(0);
        }
      };
  
      frame = requestAnimationFrame(animate);
  
      return () => cancelAnimationFrame(frame);
    }, [next]);
  
    // Convert progress to conic angle
    const angle = (progress / 100) * 360;

  return (
    <section className="min-h-screen bg-black text-white px-6 md:px-12 lg:px-20 py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE */}
        <div className="flex justify-center lg:justify-start">
          <div
            className="relative overflow-hidden rounded-full border border-white/10 shadow-[0_0_80px_rgba(255,255,255,0.08)]"
            style={{
              width: size,
              height: size,
            }}
          >
            {/* Current image */}
            <img
              src={images[current]}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Next image reveal */}
            <div
              className="absolute inset-0"
              style={{
                maskImage: `conic-gradient(
                  white 0deg,
                  white ${angle}deg,
                  transparent ${angle}deg
                )`,
                WebkitMaskImage: `conic-gradient(
                  white 0deg,
                  white ${angle}deg,
                  transparent ${angle}deg
                )`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={images[next]}
                  src={images[next]}
                  alt=""
                  className="w-full h-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* Circular loader */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              <circle
                cx={radius}
                cy={radius}
                r={radius - 6}
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="4"
              />

              <motion.circle
                cx={radius}
                cy={radius}
                r={radius - 6}
                fill="none"
                stroke="white"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * (radius - 6)}
                animate={{
                  strokeDashoffset:
                    2 *
                    Math.PI *
                    (radius - 6) *
                    (1 - progress / 100),
                }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </svg>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-8">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-white/50 mb-4">
              Why Choose Us
            </p>

            <h2 className="text-4xl md:text-5xl font-semibold leading-tight">
              Exceptional Print Quality & Service
            </h2>
          </div>

          <ul className="space-y-5">
            {features.map((item, index) => (
              <motion.li
                key={item}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.1,
                  duration: 0.5,
                }}
                className="flex items-center gap-4 border-b border-white/10 pb-5"
              >
                <div className="w-3 h-3 rounded-full bg-white" />

                <span className="text-lg text-white/80">{item}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default PrintingWhySection;
