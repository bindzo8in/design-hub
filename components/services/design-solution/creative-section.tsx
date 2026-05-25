import Image from "next/image";

const CreativeSection = () => {
  return (
    <section className="relative overflow-hidden bg-black py-20 min-h-fit">
      {/* Red Glow */}
      <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_center,rgba(255,0,0,0.45),transparent_60%)]" />
      {/* top left pattern */}
      <div
        className="
    pointer-events-none
    absolute
    left-0
    top-0
    z-[2]
    h-[120px]
    w-[120px]
    sm:h-[160px]
    sm:w-[160px]
    lg:h-[220px]
    lg:w-[220px]
    opacity-100
    bg-contain
    bg-no-repeat
  "
        style={{
          backgroundImage: "url('/service/grid-pattern.png')",
          backgroundPosition: "top left",
        }}
      />

      {/* bottom right pattern */}
      <div
        className="
    pointer-events-none
    absolute
    bottom-0
    right-0
    z-[2]
    h-[120px]
    w-[120px]
    sm:h-[160px]
    sm:w-[160px]
    lg:h-[220px]
    lg:w-[220px]
    opacity-100
    bg-contain
    bg-no-repeat
  "
        style={{
          backgroundImage: "url('/service/grid-pattern.png')",
          backgroundPosition: "bottom right",
        }}
      />

      {/* ─────────────────────────────────────────
                MOBILE LAYOUT  (visible only on < lg)
            ───────────────────────────────────────── */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-5 lg:hidden">
        {/* Label */}
        <p className="text-[10px] uppercase tracking-[0.35em] text-white/60">
          Product Overview
        </p>

        {/* CREATIVE title */}
        <h2 className="text-5xl sm:text-6xl font-stick-no-bills uppercase tracking-wide text-center leading-none">
          Creative
        </h2>

        {/* Horizontal scrolling carousel */}
        <div className="w-full overflow-hidden">
          {/* Two rows for tablet, one row for mobile */}
          <div className="flex flex-col gap-3">
            {/* Row 1 — scrolls left */}
            <div className="overflow-hidden">
              <div className="flex gap-3 animate-marquee-x w-max">
                {[...Array(8)].map((_, idx) => (
                  <img
                    key={idx}
                    src="/tmp/project_placeholder.webp"
                    alt=""
                    className="w-[140px] sm:w-[180px] aspect-[265/288] rounded-sm object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
            {/* Row 2 — scrolls right (tablet only) */}
            <div className="hidden sm:block overflow-hidden">
              <div className="flex gap-3 animate-marquee-x-reverse w-max">
                {[...Array(8)].map((_, idx) => (
                  <img
                    key={idx}
                    src="/tmp/project_placeholder.webp"
                    alt=""
                    className="w-[180px] aspect-[265/288] rounded-sm object-cover flex-shrink-0"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DESIGNS title */}
        <h2 className="text-5xl sm:text-6xl font-stick-no-bills uppercase tracking-wide text-center leading-none">
          Designs
        </h2>
      </div>

      {/* ─────────────────────────────────────────
                DESKTOP LAYOUT  (visible only on lg+)
                ← your original code, completely untouched →
            ───────────────────────────────────────── */}
      <div className="relative z-10 justify-center hidden lg:flex">
        <div className="relative mx-auto flex w-fit items-center justify-center -rotate-12">
          {/* left title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl tracking-wide text-center uppercase font-stick-no-bills"
            style={{ writingMode: "sideways-lr" }}
          >
            creative
          </h2>

          {/* images section */}
          <div className="grid grid-cols-3 gap-3">
            {/* column 1 */}
            <div className="h-[620px] overflow-hidden">
              <div className="animate-marquee flex flex-col gap-3">
                {[...Array(6)].map((_, idx) => (
                  <img
                    key={idx}
                    src="/tmp/project_placeholder.webp"
                    alt=""
                    className="block w-[220px] aspect-[265/288] rounded-sm object-cover"
                  />
                ))}
              </div>
            </div>

            {/* column 2 */}
            <div className="flex h-[620px] flex-col">
              <div className="flex h-14 items-center justify-center">
                <p className="text-xs uppercase tracking-[0.35em] text-white">
                  Product Overview
                </p>
              </div>
              <div className="flex-1 overflow-hidden">
                <div className="animate-marquee-reverse flex flex-col gap-3">
                  {[...Array(6)].map((_, idx) => (
                    <img
                      key={idx}
                      src="/tmp/project_placeholder.webp"
                      alt=""
                      className="block w-[220px] aspect-[265/288] rounded-sm object-cover"
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* column 3 */}
            <div className="h-[620px] overflow-hidden pt-8">
              <div className="animate-marquee flex flex-col gap-3">
                {[...Array(6)].map((_, idx) => (
                  <img
                    key={idx}
                    src="/tmp/project_placeholder.webp"
                    alt=""
                    className="block w-[220px] aspect-[265/288] rounded-sm object-cover"
                  />
                ))}
              </div>
            </div>
          </div>

          {/* right title */}
          <h2
            className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl tracking-wide text-center uppercase font-stick-no-bills"
            style={{ writingMode: "vertical-rl" }}
          >
            designs
          </h2>
        </div>
      </div>
    </section>
  );
};

export default CreativeSection;
