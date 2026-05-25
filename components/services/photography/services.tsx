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
        bg-black

        py-16
        sm:py-20
        lg:min-h-screen
        lg:py-24
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/service/wavy.gif"
          alt="Background"
          fill
          className="object-cover opacity-30"
        />
      </div>

      {/* Cinematic Glow */}
      <div
        className="
          absolute
          left-[-20%]
          top-[10%]

          h-[260px]
          w-[260px]

          sm:h-[380px]
          sm:w-[380px]

          lg:h-[520px]
          lg:w-[520px]

          rounded-full
          bg-red-600/20
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          bottom-[5%]
          right-[-20%]

          h-[260px]
          w-[260px]

          sm:h-[380px]
          sm:w-[380px]

          lg:h-[520px]
          lg:w-[520px]

          rounded-full
          bg-blue-600/20
          blur-[140px]
        "
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-14 lg:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/50">
            Creative Studio
          </p>

          <h2
            className="
              text-4xl
              font-light
              uppercase
              tracking-wide
              text-white

              sm:text-5xl

              lg:text-6xl
            "
          >
            Photography
            <span className="text-white/40"> Services</span>
          </h2>
        </div>

        {/* Main Grid */}
        <div
          className="
            grid
            items-center
            gap-14

            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-20
          "
        >
          {/* ====================================== */}
          {/* LEFT VISUAL COMPOSITION */}
          {/* ====================================== */}

          <div
            className="
              relative
              mx-auto
              flex
              w-full
              max-w-[760px]
              items-center
              justify-center

              min-h-[420px]

              sm:min-h-[560px]

              lg:min-h-[680px]
            "
          >
            {/* center image */}
            <div
              className="
                relative z-20
                overflow-hidden
                rounded-[2rem]
                border border-white/10
                shadow-2xl shadow-black/40

                w-[72%]

                sm:w-[56%]

                lg:w-[52%]
              "
            >
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Photography"
                width={1000}
                height={1400}
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                "
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* top left */}
            <div
              className="
                absolute
                left-0
                top-0
                z-10
                overflow-hidden
                rounded-[1.75rem]
                border border-white/10
                shadow-xl shadow-black/30

                w-[38%]

                sm:w-[30%]

                lg:w-[28%]
              "
            >
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Lifestyle"
                width={600}
                height={800}
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                "
              />
            </div>

            {/* bottom right */}
            <div
              className="
                absolute
                bottom-0
                right-0
                z-10
                overflow-hidden
                rounded-[1.75rem]
                border border-white/10
                shadow-xl shadow-black/30

                w-[40%]

                sm:w-[32%]

                lg:w-[30%]
              "
            >
              <Image
                src="/tmp/card_placeholder.webp"
                alt="Creative"
                width={600}
                height={800}
                className="
                  aspect-[4/5]
                  w-full
                  object-cover
                "
              />
            </div>

            {/* glow */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                z-0

                h-[220px]
                w-[220px]

                sm:h-[340px]
                sm:w-[340px]

                lg:h-[460px]
                lg:w-[460px]

                -translate-x-1/2
                -translate-y-1/2

                rounded-full
                bg-white/10
                blur-[140px]
              "
            />
          </div>

          {/* ====================================== */}
          {/* RIGHT CONTENT */}
          {/* ====================================== */}

          <div className="space-y-5 sm:space-y-6">
            {services.map((item, index) => (
              <div
                key={index}
                className="
                  group
                  rounded-[1.75rem]
                  border border-white/10
                  bg-white/[0.03]
                  p-5
                  backdrop-blur-xl
                  transition-all
                  duration-300

                  hover:border-white/20
                  hover:bg-white/[0.05]

                  sm:p-6
                "
              >
                <div className="flex items-start gap-4">
                  {/* number */}
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      border border-white/10
                      bg-white/5
                      text-sm
                      font-medium
                      text-white/70
                    "
                  >
                    0{index + 1}
                  </div>

                  {/* content */}
                  <div>
                    <h3
                      className="
                        text-lg
                        font-semibold
                        text-white

                        sm:text-xl

                        lg:text-2xl
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-sm
                        leading-7
                        text-white/65

                        sm:text-base
                        sm:leading-8
                      "
                    >
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PhotographyServices;
