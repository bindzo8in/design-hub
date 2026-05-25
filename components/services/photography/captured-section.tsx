import React from "react";
import Image from "next/image";

const cards = [
  {
    title: "Product Photography",
    image: "/tmp/card_placeholder.webp",
  },
  {
    title: "Fashion Shoots",
    image: "/tmp/card_placeholder.webp",
  },
  {
    title: "Wedding Moments",
    image: "/tmp/card_placeholder.webp",
  },
];

const CapturedSection = () => {
  return (
    <section
      className="
        relative overflow-hidden
        bg-black

        py-20
        sm:py-24
        lg:min-h-screen
        lg:py-28
      "
    >
      {/* ====================================== */}
      {/* DECORATIONS */}
      {/* ====================================== */}

      {/* top wave */}
      <Image
        src="/service/shape wave.png"
        alt="Wave Shape"
        width={190}
        height={68}
        className="
          absolute
          right-4
          top-4
          opacity-60

          w-24

          sm:w-36

          lg:w-[190px]
        "
      />

      {/* center dawn */}
      <Image
        src="/service/Dawn.png"
        alt="Dawn Center"
        width={200}
        height={200}
        className="
          absolute
          left-1/2
          top-1/2
          z-0

          h-14
          w-14

          -translate-x-1/2
          -translate-y-1/2

          opacity-40

          sm:h-20
          sm:w-20

          lg:h-28
          lg:w-28
        "
      />

      {/* bottom right */}
      <Image
        src="/service/Dawn.png"
        alt="Dawn Glow"
        width={200}
        height={200}
        className="
          absolute
          bottom-6
          right-6
          opacity-40

          h-20
          w-20

          sm:h-28
          sm:w-28

          lg:h-40
          lg:w-40
        "
      />

      {/* spiral */}
      <Image
        src="/service/spiral.png"
        alt="Spiral"
        width={200}
        height={200}
        className="
          absolute
          bottom-4
          left-4
          opacity-50

          h-32
          w-16

          sm:h-44
          sm:w-24

          lg:h-64
          lg:w-32
        "
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* cinematic glow */}
      <div
        className="
          absolute
          left-[-10%]
          top-[20%]

          h-[220px]
          w-[220px]

          rounded-full
          bg-red-500/20
          blur-[120px]

          sm:h-[320px]
          sm:w-[320px]

          lg:h-[500px]
          lg:w-[500px]
        "
      />

      {/* ====================================== */}
      {/* CONTENT */}
      {/* ====================================== */}

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* heading */}
        <div className="mb-14 lg:mb-20">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-white/40">
            Photography Studio
          </p>

          <h2
            className="
              text-4xl
              font-light
              leading-[0.95]
              text-white

              sm:text-6xl

              lg:text-7xl
            "
          >
            Captured
            <br />
            <span className="text-white/60">With Purpose...</span>
          </h2>
        </div>

        {/* ====================================== */}
        {/* CARDS */}
        {/* ====================================== */}

        <div
          className="
            grid
            gap-6

            sm:grid-cols-2

            lg:grid-cols-3
            lg:gap-8
          "
        >
          {cards.map((card, index) => (
            <div
              key={index}
              className={`
                group
                relative
                flex flex-col

                ${index === 0 ? "lg:translate-y-20" : ""}
                ${index === 1 ? "lg:translate-y-10" : ""}
              `}
            >
              {/* image card */}
              <div
                className="
                  relative
                  overflow-hidden
                  rounded-[2rem]
                  border border-white/10
                  bg-white/[0.03]
                  shadow-2xl shadow-black/40
                  backdrop-blur-xl
                "
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  width={700}
                  height={900}
                  className="
                    aspect-[4/5]
                    w-full
                    object-cover

                    transition-transform
                    duration-700

                    group-hover:scale-105
                  "
                />

                {/* gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* text */}
              <div className="mt-5 flex items-center justify-between">
                <h3
                  className="
                    text-lg
                    font-medium
                    text-white/85

                    sm:text-xl
                  "
                >
                  {card.title}
                </h3>

                <div
                  className="
                    flex
                    h-10
                    w-10
                    items-center
                    justify-center
                    rounded-full
                    border border-white/10
                    bg-white/5
                    text-sm
                    text-white/60
                  "
                >
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CapturedSection;