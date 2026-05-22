import React from "react";

const CapturedSection = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Wavy Image */}
      <img
        src="/service/shape wave.png"
        alt="Wave Shape"
        width={190}
        height={68}
        className="absolute top-4 right-4 object-cover opacity-70"
      />
      {/* Dawn center */}
      <img
        src="/service/Dawn.png"
        alt="Dawn Center"
        width={200}
        height={200}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover opacity-70 w-16 h-16"
      />

      {/* Dawn bottom right */}
      <img
        src="/service/Dawn.png"
        alt="Dawn Center"
        width={200}
        height={200}
        className="absolute bottom-8 right-8 object-cover opacity-70 w-32 h-32"
      />

      {/* Spin bottom left */}
      <img
        src="/service/spiral.png"
        alt="Dawn Center"
        width={200}
        height={200}
        className="absolute bottom-4 left-4 object-cover opacity-70 w-32 h-64"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex min-h-screen px-4">
        <h5 className="text-start text-5xl font-light leading-tight text-white sm:text-7xl">
          Captured <br />
          With Purpose...
        </h5>

       <div className="mx-auto flex w-full max-w-7xl items-start justify-center gap-10 py-20">
  
  {/* Card 1 */}
  <div className="mt-40  flex flex-col items-center">
    <img
      src="/tmp/card_placeholder.webp"
      alt=""
      className="
        h-[380px]
        w-[280px]
        rounded-[2rem]
        border border-white/10
        object-cover
        shadow-2xl
      "
    />

    <p className="mt-5 text-center text-lg font-medium text-white/80">
      Product Photography
    </p>
  </div>

  {/* Card 2 */}
  <div className="mt-20 flex flex-col items-center">
    <img
      src="/tmp/card_placeholder.webp"
      alt=""
      className="
        h-[380px]
        w-[280px]
        rounded-[2rem]
        border border-white/10
        object-cover
        shadow-2xl
      "
    />

    <p className="mt-5 text-center text-lg font-medium text-white/80">
      Fashion Shoots
    </p>
  </div>

  {/* Card 3 */}
  <div className="flex flex-col items-center">
    <img
      src="/tmp/card_placeholder.webp"
      alt=""
      className="
        h-[380px]
        w-[280px]
        rounded-[2rem]
        border border-white/10
        object-cover
        shadow-2xl
      "
    />

    <p className="mt-5 text-center text-lg font-medium text-white/80">
      Wedding Moments
    </p>
  </div>
</div>
      </div>
    </section>
  );
};

export default CapturedSection;
