import Image from "next/image";
import React from "react";

const services = [
  {
    title: "Product Photography",
    desc: "Clean, detailed images for e-commerce and promotions",
  },
  {
    title: "Brand & Corporate Photography",
    desc: "Visuals that represent your business and culture",
  },
  {
    title: "Lifestyle Photography",
    desc: "Realistic, engaging images that connect with audiences",
  },
  {
    title: "Event Photography",
    desc: "Professional coverage of launches, exhibitions, and events",
  },
  {
    title: "Advertising & Marketing Photography",
    desc: "Campaign-ready visuals for ads and media",
  },
];

const PhotographyServices = () => {
  return (
    <section
      className="
        relative overflow-hidden
        min-h-screen
        bg-black
        py-20
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/service/wavy.gif"
          alt="Background"
          fill
          className="object-cover opacity-40"
        />
      </div>

      {/* Red Glow */}
      <div
        className="
          absolute
          left-[-15%]
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-red-600/30
          blur-[140px]
        "
      />

      {/* Blue Glow */}
      <div
        className="
          absolute
          right-[-15%]
          top-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-600/30
          blur-[140px]
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <h2 className="mb-16 text-4xl font-light uppercase tracking-wide text-white sm:text-5xl">
          SERVICES
        </h2>

        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Left Images */}
          <div className="relative flex min-h-[420px] items-center justify-center">
            {/* Image 1 */}
            <div className="absolute left-0 top-0 overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Photography"
                width={320}
                height={220}
                className="h-[180px] w-[280px] object-cover"
              />
            </div>

            {/* Image 2 */}
            <div className="absolute bottom-0 left-40 overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Fashion"
                width={320}
                height={220}
                className="h-[180px] w-[280px] object-cover"
              />
            </div>

            {/* Image 3 */}
            <div className="absolute right-0 top-10 overflow-hidden rounded-[2rem] border border-white/10">
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Wedding"
                width={320}
                height={220}
                className="h-[180px] w-[280px] object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="space-y-8">
            {services.map((item, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-white">
                  {item.title}
                </h3>

                <p className="mt-2 max-w-xl text-lg leading-8 text-white/70">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyServices;