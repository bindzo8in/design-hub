// components/common/WhyChooseSection.tsx

import Image from "next/image";
import React from "react";
import { Check } from "lucide-react";

interface WhyChooseSectionProps {
  badge?: string;
  title: string;
  highlightText?: string;
  description: string;
  image: string;
  imageAlt?: string;
  points: string[];
  reverse?: boolean;
}

const WhyChooseSection = ({
  badge = "Why Choose Us",
  title,
  highlightText,
  description,
  image,
  imageAlt = "Why Choose Section",
  points,
  reverse = false,
}: WhyChooseSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-background px-4 py-20 sm:px-6 lg:px-8">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

      <div
        className={`
          relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14
          lg:gap-20 lg:flex-row
          ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}
        `}
      >
        {/* Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card backdrop-blur-sm">
            <Image
              src={image}
              alt={imageAlt}
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </div>

        {/* Content */}
        <div className="w-full lg:w-1/2">
          {/* Badge */}
          <span className="mb-4 inline-block rounded-full border border-border bg-card px-4 py-2 text-sm uppercase tracking-[0.2em] text-muted-foreground">
            {badge}
          </span>

          {/* Title */}
          <h2 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {title}{" "}
            {highlightText && (
              <span className="text-accent">{highlightText}</span>
            )}
          </h2>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground">
            {description}
          </p>

          {/* Points */}
          <ul className="mt-10 space-y-5">
            {points.map((item, index) => (
              <li
                key={index}
                className="
                  flex items-start gap-4 rounded-2xl border border-border
                  bg-card p-5 backdrop-blur-sm transition-all
                  duration-300 hover:border-accent/50
                "
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10">
                  <Check className="h-6 w-6 text-accent" />
                </div>

                <p className="text-base leading-7 text-foreground">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;