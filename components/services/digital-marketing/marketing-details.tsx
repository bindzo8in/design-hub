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
      <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-80 dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(223,27,37,0.12),transparent_25%)] bg-[radial-gradient(circle_at_top_left,rgba(0,0,0,0.04),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(223,27,37,0.12),transparent_25%)]"
        />
        <div
          className="relative mx-auto grid gap-12 lg:grid-cols-[0.9fr_1.1fr]"
          style={{ maxWidth: "1200px" }}
        >
          <div className="space-y-8 text-foreground">
            {stats.map((item) => (
              <div
                key={item.title}
                className="rounded-[2rem] border border-border/10 bg-foreground/5 p-8 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.24)]"
              >
                <h3 className="text-sm uppercase tracking-[0.35em] text-accent">
                  {item.title}
                </h3>
                <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* ========================= */}
          {/* MOBILE & TABLET */}
          {/* ========================= */}
          <div className="relative w-full overflow-hidden lg:hidden h-[240px] mt-8">
            {/* Fade edges */}
            <div className="absolute left-0 top-0 z-10 h-full w-12 bg-gradient-to-r from-background to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 z-10 h-full w-12 bg-gradient-to-l from-background to-transparent pointer-events-none" />
            
            <div className="flex w-max animate-marquee-x gap-4">
              {[...Array(2)].map((_, duplicateIndex) => (
                <React.Fragment key={duplicateIndex}>
                  {Array.from({ length: 9 }).map((_, index) => (
                    <div
                      key={`${duplicateIndex}-${index}`}
                      className="
                        group relative overflow-hidden shrink-0
                        rounded-[1.5rem]
                        border border-border/10
                        bg-card/85
                        p-3
                        shadow-2xl shadow-foreground/40
                      "
                    >
                      <div className="absolute top-4 h-20 w-20 rounded-full bg-accent/20 blur-2xl opacity-70 -left-6" />

                      <div className="relative h-44 w-44 shrink-0 overflow-hidden rounded-[1rem] bg-background">
                        <Image
                          src={`/design-images/${(index % 10) + 1}.png`}
                          alt="Marketing preview"
                          fill
                          className="object-cover"
                        
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
                      </div>
                    </div>
                  ))}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* ========================= */}
          {/* DESKTOP */}
          {/* ========================= */}
          <div className="hidden h-[600px] gap-6 overflow-hidden lg:grid lg:grid-cols-2">
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
                          border border-border/10
                          bg-card/85
                          p-5
                          shadow-2xl shadow-foreground/40
                        "
                      >
                        <div className="absolute -left-10 top-8 h-28 w-28 rounded-full bg-accent/10 blur-3xl opacity-80" />

                        <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-background">
                          <Image
                            src={`/design-images/${(index % 10) + 1}.png`}
                            alt="Marketing preview"
                            fill
                            className="object-cover"
                          
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
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
                    {Array.from({ length: 9 }).map((_, index) => (
                      <div
                        key={`${duplicateIndex}-${index}`}
                        className="
                          group relative overflow-hidden
                          rounded-[2rem]
                          border border-border/10
                          bg-card/85
                          p-5
                          shadow-2xl shadow-foreground/40
                        "
                      >
                        <div className="absolute -right-10 top-8 h-28 w-28 rounded-full bg-blue-500/10 blur-3xl opacity-80" />

                        <div className="relative h-64 overflow-hidden rounded-[1.75rem] bg-background">
                          <Image
                            src={`/design-images/${index + 1}.png`}
                            alt="Creative preview"
                            fill
                            className="object-cover"
                          
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"/>
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

      <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
        <div
          className="pointer-events-none absolute inset-0 dark:bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_40%)] bg-[radial-gradient(circle_at_top,rgba(0,0,0,0.04),transparent_40%)]"
        />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-12 text-foreground">
            <p className="text-sm uppercase tracking-[0.35em] text-accent">
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
                className="rounded-[2rem] border border-border/10 bg-foreground/5 p-8 shadow-2xl shadow-foreground/30 backdrop-blur-xl transition hover:-translate-y-1 hover:border-accent/30"
              >
                <h3 className="text-lg font-semibold text-foreground">
                  {card.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {card.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default DigitalMarketingDetails;
