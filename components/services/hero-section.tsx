import Image from "next/image";

const ServicesHeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-background text-foreground">
      <style
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-12px); }
            }

            .animate-float {
              animation: float 6s ease-in-out infinite;
            }
          `,
        }}
      />

      <div className="container relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-8 text-center sm:px-6 sm:py-12 lg:min-h-[calc(100svh-80px)] lg:px-8 lg:py-16">
        <header className="relative z-20 space-y-1 sm:space-y-2">
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-accent sm:text-xs lg:text-sm">
            Enter a world of
          </p>

          <h1 className="font-extrabold uppercase leading-none tracking-wide">
            <span className="block text-[2.45rem] text-glow-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Creativity and
            </span>

            <span className="block text-2xl tracking-[0.18em] text-primary dark:text-[#7f91ff] sm:text-4xl lg:text-5xl xl:text-6xl">
              Innovation
            </span>
          </h1>
        </header>

        {/* Hero Visual */}
        <div className="relative z-10 -mt-2 flex w-full justify-center sm:-mt-4 lg:-mt-8">
          <div className="relative aspect-[16/9] w-full max-w-[480px] sm:max-w-[680px] lg:max-w-[900px] xl:max-w-[980px]">
            {/* GIF / particle overlay */}
            <Image
              src="/services/hero.gif"
              alt="Creative digital particles"
              fill
              unoptimized
              priority
              className="pointer-events-none absolute inset-0 z-0 object-contain opacity-80 mix-blend-screen"
            />

            {/* Character PNG */}
            <div className="absolute inset-0 z-10 animate-float">
              <Image
                src="/services/hero.png"
                alt="Enter a world of creativity and innovation"
                fill
                priority
                sizes="(max-width: 640px) 480px, (max-width: 1024px) 680px, 980px"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesHeroSection;