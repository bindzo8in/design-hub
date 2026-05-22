import { cn } from "@/lib/utils";

const packagingFeatures = [
  {
    title: "STRATEGIC CONCEPT DEVELOPMENT",
    description:
      "Packaging ideas based on brand positioning and market trends.",
  },
  {
    title: "BRAND-ALIGNED VISUALS",
    description:
      "Consistent use of brand colors, fonts, and identity elements.",
  },
  {
    title: "EYE-CATCHING SHELF APPEAL",
    description:
      "Designs that stand out and attract attention instantly.",
  },
  {
    title: "CLEAR PRODUCT COMMUNICATION",
    description:
      "Easy-to-read information and strong visual hierarchy.",
  },
  {
    title: "DIGITAL-READY PACKAGING",
    description:
      "Designs optimized for e-commerce and digital promotions.",
  },
  {
    title: "PRINT-READY FILES",
    description:
      "High-quality, production-ready packaging artwork.",
  },
];

const PickSection = () => {
  return (
    <section
      className="
        relative
        overflow-hidden
        py-16
        sm:py-20
        lg:py-28
      "
      style={{
        backgroundImage: "url('/service/pick_bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/55" />

      {/* subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

      {/* background glow */}
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-white/5 blur-[140px]" />

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[1400px]
          flex-col
          gap-16
          px-5
          sm:px-6
          md:px-8
          lg:gap-24
          lg:px-10
        "
      >
        {/* TOP */}
        <div
          className="
            flex
            flex-col
            gap-12
            lg:flex-row
            lg:items-start
            lg:justify-between
          "
        >
          {/* LOGO */}
          <div className="shrink-0">
            <img
              src="/service/logo_white.png"
              alt="Pick Logo"
              className="
                w-36
                object-contain
                sm:w-44
                md:w-52
                lg:w-64
              "
            />
          </div>

          {/* HEADING CONTENT */}
          <div className="w-full max-w-[760px]">
            {/* small top label */}
            <div className="mb-5 flex items-center gap-3 sm:gap-4">
              <div
                className="
                  h-10
                  w-10
                  shrink-0
                  bg-contain
                  bg-center
                  bg-no-repeat
                  sm:h-12
                  sm:w-12
                "
                style={{
                  backgroundImage: "url('/service/vector.svg')",
                }}
              />

              <p
                className="
                  text-[10px]
                  uppercase
                  tracking-[0.35em]
                  text-white/70
                  sm:text-xs
                "
              >
                Premium Creative Direction
              </p>
            </div>

            {/* main heading */}
            <h2
              className="
                text-4xl
                font-black
                leading-[0.9]
                tracking-tight
                text-white
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
                xl:text-8xl
              "
            >
              DESIGNED
              <br />
              TO BE PICKED
            </h2>

            {/* bottom vector */}
            <div className="mt-5 flex justify-end sm:mt-6">
              <div
                className="
                  h-10
                  w-10
                  rotate-180
                  bg-contain
                  bg-center
                  bg-no-repeat
                  opacity-80
                  sm:h-12
                  sm:w-12
                "
                style={{
                  backgroundImage: "url('/service/vector.svg')",
                }}
              />
            </div>

            {/* description */}
            <p
              className="
                mt-8
                max-w-2xl
                text-sm
                leading-relaxed
                text-white/70
                sm:text-base
                md:text-lg
              "
            >
              Packaging crafted with cinematic visuals, strategic branding and
              modern product communication designed to stand out both digitally
              and physically.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {packagingFeatures.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  `
                  border-b
                  border-white/10
                  py-6
                  sm:py-7
                  md:px-6
                  lg:px-8
                `,
                  index % 2 !== 0 &&
                    "md:border-l md:border-white/10",
                )}
              >
                <h3
                  className="
                    text-lg
                    font-black
                    uppercase
                    leading-tight
                    tracking-tight
                    text-white
                    sm:text-xl
                    lg:text-2xl
                  "
                >
                  {feature.title}
                </h3>

                <p
                  className="
                    mt-3
                    max-w-[520px]
                    text-sm
                    leading-relaxed
                    text-white/65
                    sm:text-[15px]
                    lg:text-base
                  "
                >
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PickSection;