import { cn } from "@/lib/utils";

const marqueeItems = [
  "Web Development",
  "E-Commerce Development",
  "Mobile Apps",
  "SEO Optimization",
  "Lead Generation",
  "Social Media",
  "Graphic Design",
  "Google Ads",
  "ERP Software",
];

const HomeMarquee = () => {
  return (
    <section className="relative h-48 overflow-hidden">
      <div className="absolute left-1/2 top-1/2 w-[110%] -translate-x-1/2 -translate-y-1/2 rotate-3">
        <Marquee />
      </div>

      <div className="absolute left-1/2 top-1/2 w-[110%] -translate-x-1/2 -translate-y-1/2 -rotate-3">
        <Marquee className="bg-red-600" reverse />
      </div>
    </section>
  );
};

const Marquee = ({ className, reverse = false }: { className?: string, reverse?: boolean }) => {
  return (
    <div className={cn("marquee-section relative border-t border-b border-primary/10 py-2 overflow-hidden bg-[#314085] shadow-lg select-none z-10", className)}>
      <style
        dangerouslySetInnerHTML={{
          __html: `
      @keyframes marquee {
        from {
          transform: translateX(0);
        }

        to {
          transform: translateX(-50%);
        }
      }

      .animate-marquee-loop {
        animation: marquee 25s linear infinite;
      }

      .animate-marquee-loop-reverse {
        animation: marquee 25s linear infinite reverse;
      }
    `,
        }}
      />

      <div
        className={cn(
          "flex w-[200%] whitespace-nowrap gap-12 sm:gap-16",
          reverse
            ? "animate-marquee-loop-reverse"
            : "animate-marquee-loop"
        )}
      >
        <div className="flex w-max items-center gap-12 sm:gap-16">
          {[...marqueeItems, ...marqueeItems, ...marqueeItems].map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-3 font-[family-name:var(--font-bebas-neue)] text-xl tracking-widest text-white uppercase drop-shadow-sm sm:text-2xl lg:text-3xl"
            >
              <span>{item}</span>

              <span className="relative top-[1px] inline-block text-sm text-white/70 select-none sm:text-base">
                &#10022;
              </span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMarquee;