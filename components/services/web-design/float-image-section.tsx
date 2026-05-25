import React from "react";
import Image from "next/image";

const images = [
  "/designs/1.webp",
  "/designs/2.webp",
  "/designs/3.webp",
  "/designs/4.jpeg",
  "/designs/5.jpeg",
  "/designs/6.jpeg",
  "/designs/7.jpeg",
];

const FloatImageSection = () => {
  return (
    <section
      className="
        relative overflow-hidden

        min-h-[620px]

        sm:min-h-[760px]

        lg:min-h-screen

        bg-cover
        bg-center
        bg-no-repeat
      "
      style={{
        backgroundImage: "url('/service/float-bg.png')",
      }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* cinematic glow */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2

          h-[240px]
          w-[240px]

          sm:h-[420px]
          sm:w-[420px]

          lg:h-[620px]
          lg:w-[620px]

          rounded-full
          bg-cyan-500/10
          blur-[140px]
        "
      />

      {/* content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-16 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">
            Creative Showcase
          </p>

          <h2
            className="
              text-4xl
              font-light
              leading-tight
              text-white

              sm:text-5xl

              lg:text-6xl
            "
          >
            Floating Visual
            <span className="text-white/50"> Gallery</span>
          </h2>
        </div>

        {/* floating composition */}
        <div
          className="
            relative
            mx-auto

            h-[420px]

            sm:h-[560px]

            lg:h-[720px]

            w-full
            max-w-6xl
          "
        >
          {images.map((src, index) => {
            const positions = [
              "left-[2%] top-[10%]",
              "left-[35%] top-[0%]",
              "right-[4%] top-[12%]",
              "left-[10%] bottom-[12%]",
              "left-[42%] bottom-[0%]",
              "right-[10%] bottom-[16%]",
              "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            ];

            const sizes = [
              "w-24 sm:w-32 lg:w-40",
              "w-28 sm:w-36 lg:w-44",
              "w-24 sm:w-32 lg:w-40",
              "w-28 sm:w-36 lg:w-44",
              "w-32 sm:w-44 lg:w-52",
              "w-24 sm:w-32 lg:w-40",
              "w-40 sm:w-52 lg:w-64",
            ];

            return (
              <div
                key={index}
                className={`
                  absolute
                  ${positions[index]}
                  ${index % 2 === 0 ? "animate-float" : "animate-float-reverse"}
                `}
                style={{
                  animationDelay: `${index * 0.4}s`,
                }}
              >
                <div
                  className="
                    group
                    overflow-hidden
                    rounded-[1.5rem]
                    border border-white/10
                    bg-white/[0.03]
                    p-2
                    shadow-2xl shadow-black/40
                    backdrop-blur-xl
                  "
                >
                  <Image
                    src={src}
                    alt={`Design ${index + 1}`}
                    width={500}
                    height={400}
                    className={`
                      ${sizes[index]}
                      aspect-[4/3]
                      rounded-[1rem]
                      object-cover

                      transition-transform
                      duration-700

                      group-hover:scale-105
                    `}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FloatImageSection;