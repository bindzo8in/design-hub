"use client";
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
        {/* LEFT SIDE */}
        <div
          className="
    relative
    flex
    items-center
    justify-center

    min-h-[320px]

    sm:min-h-[420px]

    lg:min-h-[540px]
  "
        >
          {/* ambient glow */}
          <div
            className="
      absolute
      left-1/2
      top-1/2
      -z-10

      h-[220px]
      w-[220px]

      sm:h-[320px]
      sm:w-[320px]

      lg:h-[520px]
      lg:w-[520px]

      -translate-x-1/2
      -translate-y-1/2

      rounded-full
      bg-white/10
      blur-[120px]
    "
          />

          {/* decorative side image */}
          <div
            className="
      absolute
      left-0
      top-8
      hidden

      w-[22%]

      overflow-hidden
      rounded-[1.5rem]
      border border-white/10
      shadow-xl shadow-black/30

      sm:block
    "
          >
            <Image
              src="/tmp/project_placeholder.webp"
              alt=""
              width={300}
              height={400}
              className="
        aspect-[4/5]
        w-full
        object-cover
      "
            />
          </div>

          {/* main circle */}
          <div
            className="
      relative
      overflow-hidden
      rounded-full
      border border-white/10
      shadow-[0_0_80px_rgba(255,255,255,0.08)]

      h-[240px]
      w-[240px]

      sm:h-[340px]
      sm:w-[340px]

      lg:h-[420px]
      lg:w-[420px]
    "
          >
            {/* Current image */}
            <img
              src={images[current]}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
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
                  className="h-full w-full object-cover"
                  initial={{ scale: 1.15 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 3,
                    ease: "easeOut",
                  }}
                />
              </AnimatePresence>
            </div>

            {/* overlay */}
            <div className="absolute inset-0 bg-black/10" />

            {/* Circular loader */}
            <svg
              className="absolute inset-0 h-full w-full -rotate-90"
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
                    2 * Math.PI * (radius - 6) * (1 - progress / 100),
                }}
                transition={{
                  duration: 0.1,
                  ease: "linear",
                }}
              />
            </svg>
          </div>

          {/* floating bottom card */}
          <div
            className="
      absolute
      bottom-0
      right-0

      hidden

      w-[26%]

      overflow-hidden
      rounded-[1.5rem]
      border border-white/10
      bg-white/[0.03]
      p-2
      backdrop-blur-xl
      shadow-xl shadow-black/30

      sm:block
    "
          >
            <Image
              src="/tmp/card_placeholder.webp"
              alt=""
              width={300}
              height={300}
              className="
        aspect-square
        w-full
        rounded-[1rem]
        object-cover
      "
            />
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
