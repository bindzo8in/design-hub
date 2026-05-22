import { cn } from "@/lib/utils";
import React from "react";

const DesignWorkSection = () => {
  return (
    <section className="flex justify-center px-4 py-10 overflow-visible">
      <div className="@container w-full max-w-[1400px]">
        <div className="grid grid-cols-[auto_1fr_auto] items-stretch w-full gap-0">
          {/* LEFT TEXTS */}
          <div className="flex gap-2 p-[2cqw] items-center bg-orange-950">
            {[1, 0.6, 0.4, 0.2].map((opacity, i) => (
              <p
                key={i}
                style={{
                  writingMode: "sideways-lr",
                  opacity,
                }}
               className={cn(`
              text-[3cqw]
              tracking-wide
              whitespace-nowrap
              font-orbitron
              font-light
            `, i!==0 && "text-glow-white")}
              >
                DESIGN IS HOW IT WORKS
              </p>
            ))}
          </div>


<div className="relative w-full h-full min-w-0">
  <img
    src="/service/product.webp"
    alt="Product"
    className="w-full h-full object-cover"
  />
</div>

          {/* RIGHT TEXTS */}
          <div className="bg-orange-950 flex gap-2 p-[2cqw] items-center">
            {[0.2, 0.4, 0.6, 1].map((opacity, i) => (
              <p
                key={i}
                style={{
                  writingMode: "vertical-rl",
                  opacity,
                }}
                className={cn(`
              text-[3cqw]
              tracking-wide
              whitespace-nowrap
              font-orbitron
              font-light
            `, i!==3 && "text-glow-white")}
              >
                AND WE MAKE IT WORK
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DesignWorkSection;
