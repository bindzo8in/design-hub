import Image from "next/image";
import React from "react";

const WhyChoose = () => {
  const list = [
    "Strategic location and format planning",
    "High-impact creative designs",
    "Quality printing and installation support",
    "Brand consistency across outdoor formats",
    "End-to-end campaign execution",
  ];

  return (
    <section className="relative overflow-hidden bg-[#050711] py-20">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-14 px-4 sm:px-6 lg:flex-row lg:gap-20 lg:px-8">
        
        {/* Left Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
            <Image
              src="/service/math-circle.gif"
              alt="Why Choose Design Hub"
              width={700}
              height={700}
              className="h-full w-full object-cover"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full lg:w-1/2">
          <span className="mb-4 inline-block rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm uppercase tracking-[0.2em] text-white/70">
            Why Choose Us
          </span>

          <h2 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
            Why Choose <span className="text-white/70">Design Hub</span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-white/60">
            We combine creativity, strategic placement, and flawless execution
            to deliver outdoor advertising campaigns that increase visibility
            and strengthen your brand presence.
          </p>

          <ul className="mt-10 space-y-5">
            {list.map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-black text-sm font-bold">
                  ✓
                </div>

                <p className="text-base leading-7 text-white/80">
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

export default WhyChoose;