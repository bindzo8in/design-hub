"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";

const fullData = [
  { label: "1 Oct", wire: 1200, mobile: 800 },
  { label: "3 Oct", wire: 2000, mobile: 1100 },
  { label: "7 Oct", wire: 1800, mobile: 1500 },
  { label: "10 Oct", wire: 900, mobile: 650 },
  { label: "14 Oct", wire: 3700, mobile: 2800 },
  { label: "20 Oct", wire: 3400, mobile: 3600 },
  { label: "23 Oct", wire: 2700, mobile: 3100 },
  { label: "27 Oct", wire: 3300, mobile: 3600 },
  { label: "30 Oct", wire: 3700, mobile: 1900 },
];

const StatisticsSection = () => {
  const ref = useRef<HTMLDivElement>(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [animatedData, setAnimatedData] = useState(
    fullData.map((item) => ({
      ...item,
      wire: 0,
      mobile: 0,
    })),
  );

  useEffect(() => {
    if (!isInView) return;

    let frame = 0;

    const interval = setInterval(() => {
      frame += 1;

      const progress = Math.min(frame / 30, 1);

      const nextData = fullData.map((item) => ({
        ...item,
        wire: Math.round(item.wire * progress),
        mobile: Math.round(item.mobile * progress),
      }));

      setAnimatedData(nextData);

      if (progress >= 1) {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="
  relative overflow-hidden bg-[#050711]
  px-4 py-12
  sm:px-6 sm:py-16
  lg:px-8 lg:py-20
"
    >
      {/* Background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at bottom, rgba(223,27,37,0.12), transparent 25%), radial-gradient(circle at top, rgba(44,132,221,0.1), transparent 30%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header */}
        <div
          className="
    mb-8
    flex flex-col gap-6
    lg:mb-10
    sm:flex-row sm:items-end sm:justify-between
  "
        >
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-[#DF1B25]">
              Statistics
            </p>

            <h2
              className="
    mt-3
    text-3xl
    font-semibold
    leading-tight
    text-white
    sm:text-4xl
    lg:text-5xl
  "
            >
              Payment Received
            </h2>
          </div>

          <div
            className="
    flex w-full items-center justify-between
    gap-2 overflow-x-auto
    rounded-2xl
    border border-white/10
    bg-white/5
    p-2
    text-xs text-slate-300
    backdrop-blur-xl

    sm:w-fit
    sm:rounded-full
    sm:px-4
    sm:py-3
    sm:text-sm
  "
          >
            <button className="whitespace-nowrap rounded-full bg-[#DF1B25] px-4 py-2 text-white">
              Month
            </button>

            <button className="whitespace-nowrap rounded-full px-4 py-2 text-slate-300/80 hover:text-white">
              Week
            </button>

            <button className="whitespace-nowrap rounded-full px-4 py-2 text-slate-300/80 hover:text-white">
              Year
            </button>
          </div>
        </div>

        {/* Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="
            overflow-hidden rounded-[2rem]
            border border-white/10
            bg-slate-950/90
            p-4 sm:p-6
            shadow-2xl shadow-black/40
            backdrop-blur-xl
          "
        >
          {/* Legend */}
          <div className="mb-8 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#DF1B25]" />
              Wire transfer
            </div>

            <div className="flex items-center gap-2 text-sm text-slate-300">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#4EA7FF]" />
              Mobile payment
            </div>
          </div>

          {/* Chart */}
          <div className="h-[260px] w-full sm:h-[320px] lg:h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={animatedData}>
                <defs>
                  <linearGradient id="wireGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#DF1B25" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#DF1B25" stopOpacity={0} />
                  </linearGradient>

                  <linearGradient
                    id="mobileGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#4EA7FF" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#4EA7FF" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  stroke="rgba(255,255,255,0.06)"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  interval="preserveStartEnd"
                />

                <YAxis
                  stroke="#94A3B8"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fontSize: 10 }}
                  width={30}
                />

                <Tooltip
                  contentStyle={{
                    background: "#020617",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: "16px",
                    color: "#fff",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="wire"
                  stroke="#DF1B25"
                  strokeWidth={3}
                  fill="url(#wireGradient)"
                />

                <Area
                  type="monotone"
                  dataKey="mobile"
                  stroke="#4EA7FF"
                  strokeWidth={2.5}
                  fill="url(#mobileGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StatisticsSection;
