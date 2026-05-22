import Image from "next/image";
import React from "react";

type ChartDatum = {
  label: string;
  desktop: number;
  mobile: number;
};

const stats = [
  {
    title: "TARGETED REACH",
    description:
      "Digital marketing connects your brand with the right audience at the right time through precise targeting across online platforms.",
  },
  {
    title: "MEASURABLE RESULTS",
    description:
      "Every campaign can be tracked and analyzed, allowing continuous improvement and better return on investment.",
  },
  {
    title: "SCALABLE GROWTH",
    description:
      "Digital strategies can be adjusted and expanded easily to match your business growth and marketing goals.",
  },
];

const serviceCards = [
  {
    title: "Social Media Marketing",
    description:
      "We build strong brand presence across social platforms through creative content, consistent posting, and active audience engagement.",
  },
  {
    title: "Search Engine Optimization (SEO)",
    description:
      "Our SEO strategies improve your website's visibility on search engines, helping you attract relevant users and generate steady organic traffic over time.",
  },
  {
    title: "Paid Advertising (Google & Meta Ads)",
    description:
      "We create and manage targeted ad campaigns that reach the right audience quickly, driving traffic, leads, and conversions.",
  },
  {
    title: "Content Marketing",
    description:
      "We develop meaningful and engaging content that communicates your brand message clearly while educating audiences and encouraging action.",
  },
  {
    title: "Lead Generation Campaigns",
    description:
      "Our campaigns are designed to capture high-quality leads through optimized funnels, creatives, and targeting.",
  },
  {
    title: "Analytics & Reporting",
    description:
      "We monitor campaign performance closely, analyze data insights, and continuously optimize strategies to improve results.",
  },
];

const chartData: ChartDatum[] = [
  { label: "1 Oct", desktop: 1200, mobile: 800 },
  { label: "3 Oct", desktop: 2000, mobile: 1100 },
  { label: "7 Oct", desktop: 1800, mobile: 1500 },
  { label: "10 Oct", desktop: 900, mobile: 650 },
  { label: "14 Oct", desktop: 3700, mobile: 2800 },
  { label: "20 Oct", desktop: 3400, mobile: 3600 },
  { label: "23 Oct", desktop: 2700, mobile: 3100 },
  { label: "27 Oct", desktop: 3300, mobile: 3600 },
  { label: "30 Oct", desktop: 3700, mobile: 1900 },
];

const MAX_VALUE = Math.max(
  ...chartData.flatMap((item) => [item.desktop, item.mobile]),
);
const CHART_HEIGHT = 260;
const CHART_WIDTH = 760;
const VERTICAL_PADDING = 24;

const buildPath = (dataset: number[]) => {
  return dataset
    .map((value, index) => {
      const x = 40 + (index * (CHART_WIDTH - 80)) / (chartData.length - 1);
      const y =
        CHART_HEIGHT -
        VERTICAL_PADDING -
        (value / MAX_VALUE) * (CHART_HEIGHT - VERTICAL_PADDING * 2);
      return `${index === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ");
};

const DigitalMarketingDetails = () => {
  return (
    <div className="space-y-20">
      <section className="relative overflow-hidden bg-[#050711] px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            backgroundImage:
              "radial-gradient(circle at top left, rgba(255,255,255,0.08), transparent 20%), radial-gradient(circle at bottom right, rgba(223,27,37,0.12), transparent 25%)",
          }}
        />
        <div
          className="relative mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          style={{ maxWidth: "1200px" }}
        >
          <div className="space-y-8 text-white">
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.24)]"
              >
                <h3 className="text-sm uppercase tracking-[0.35em] text-[#DF1B25]">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-slate-200">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

<div className="grid h-[600px] gap-6 overflow-hidden lg:grid-cols-2">
  
  {/* LEFT COLUMN */}
  <div className="relative overflow-hidden">
    <div className="animate-marquee flex flex-col gap-6">
      
      {[...Array(2)].map((_, duplicateIndex) => (
        <React.Fragment key={duplicateIndex}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`${duplicateIndex}-${index}`}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                border border-white/10
                bg-slate-950/85
                p-5
                shadow-2xl shadow-black/40
              "
            >
              <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-[#DF1B25]/10 blur-3xl opacity-80" />

              <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-slate-900">
                <Image
                  src={
                    index % 2 === 0
                      ? "/services/hero.png"
                      : "/service/robot.png"
                  }
                  alt="Marketing preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative mt-4 space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Campaign imagery
                </p>

                <p className="text-base font-semibold text-white">
                  Campaign mockup set {index + 1}
                </p>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>

  {/* RIGHT COLUMN */}
  <div className="relative overflow-hidden">
    <div className="animate-marquee-reverse flex flex-col gap-6">
      
      {[...Array(2)].map((_, duplicateIndex) => (
        <React.Fragment key={duplicateIndex}>
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={`${duplicateIndex}-${index}`}
              className="
                group relative overflow-hidden
                rounded-[2rem]
                border border-white/10
                bg-slate-950/85
                p-5
                shadow-2xl shadow-black/40
              "
            >
              <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl opacity-80" />

              <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-slate-900">
                <Image
                  src={
                    index % 2 === 0
                      ? "/service/robot.png"
                      : "/services/hero.png"
                  }
                  alt="Creative preview"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative mt-4 space-y-3">
                <p className="text-sm uppercase tracking-[0.2em] text-slate-400">
                  Creative visuals
                </p>

                <p className="text-base font-semibold text-white">
                  Creative showcase {index + 1}
                </p>
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  </div>
</div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#050711] px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at top, rgba(255,255,255,0.06), transparent 40%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 text-white">
            <p className="text-sm uppercase tracking-[0.35em] text-[#DF1B25]">
              Services
            </p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              Campaign services designed for measurable brand growth.
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {serviceCards.map((card) => (
              <div
                key={card.title}
                className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-[#DF1B25]/30"
              >
                <h3 className="text-lg font-semibold text-white">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

            {/* <section className="relative overflow-hidden bg-[#050711] px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at bottom, rgba(223,27,37,0.12), transparent 25%), radial-gradient(circle at top, rgba(44,132,221,0.1), transparent 30%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-[#DF1B25]">
                Statistics
              </p>
              <h2 className="mt-3 text-4xl font-semibold text-white sm:text-5xl">
                Payment Received
              </h2>
            </div>
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-300">
              <button className="rounded-full bg-[#DF1B25] px-4 py-2 text-white">
                Month
              </button>
              <button className="rounded-full px-4 py-2 text-slate-300/80 hover:text-white">
                Week
              </button>
              <button className="rounded-full px-4 py-2 text-slate-300/80 hover:text-white">
                Year
              </button>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/90 p-6 shadow-2xl shadow-black/40 backdrop-blur-xl">
            <div className="mb-8 flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-sm text-white">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#DF1B25]" />
                Wire transfer
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#26336F]" />
                Mobile payment
              </div>
            </div>

            <div className="overflow-x-auto pb-2">
              <svg
                width="100%"
                height="320"
                viewBox="0 0 780 320"
                style={{ minWidth: "780px" }}
              >
                <defs>
                  <linearGradient
                    id="lineGradientDesktop"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#DF1B25" />
                    <stop offset="100%" stopColor="#DF1B25" stopOpacity="0.3" />
                  </linearGradient>
                  <linearGradient
                    id="lineGradientMobile"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#4EA7FF" />
                    <stop
                      offset="100%"
                      stopColor="#4EA7FF"
                      stopOpacity="0.25"
                    />
                  </linearGradient>
                </defs>
                <rect x="0" y="0" width="780" height="320" fill="transparent" />
                {Array.from({ length: 5 }).map((_, index) => (
                  <line
                    key={index}
                    x1="40"
                    x2="740"
                    y1={40 + index * 56}
                    y2={40 + index * 56}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                ))}
                {chartData.map((item, index) => {
                  const x = 40 + (index * 700) / (chartData.length - 1);
                  return (
                    <g key={item.label}>
                      <line
                        x1={x}
                        x2={x}
                        y1="40"
                        y2="280"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                      <text
                        x={x}
                        y="303"
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="12"
                      >
                        {item.label}
                      </text>
                    </g>
                  );
                })}
                <path
                  d={buildPath(chartData.map((item) => item.desktop))}
                  fill="none"
                  stroke="#DF1B25"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <path
                  d={buildPath(chartData.map((item) => item.mobile))}
                  fill="none"
                  stroke="#4EA7FF"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.9"
                />
                {chartData.map((item, index) => {
                  const x = 40 + (index * 700) / (chartData.length - 1);
                  const yDesktop =
                    CHART_HEIGHT -
                    VERTICAL_PADDING -
                    (item.desktop / MAX_VALUE) *
                      (CHART_HEIGHT - VERTICAL_PADDING * 2);
                  const yMobile =
                    CHART_HEIGHT -
                    VERTICAL_PADDING -
                    (item.mobile / MAX_VALUE) *
                      (CHART_HEIGHT - VERTICAL_PADDING * 2);
                  return (
                    <g key={`dot-${item.label}`}>
                      <circle cx={x} cy={yDesktop} r="5" fill="#DF1B25" />
                      <circle cx={x} cy={yMobile} r="5" fill="#4EA7FF" />
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

export default DigitalMarketingDetails;
