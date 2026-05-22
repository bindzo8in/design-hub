"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    id: 1,
    image: "https://picsum.photos/800/1200?random=1",
  },
  {
    id: 2,
    image: "https://picsum.photos/800/1200?random=2",
  },
  {
    id: 3,
    image: "https://picsum.photos/800/1200?random=3",
  },
  {
    id: 4,
    image: "https://picsum.photos/800/1200?random=4",
  },
  {
    id: 5,
    image: "https://picsum.photos/800/1200?random=5",
  },
];

export default function ProductShowcaseSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray(".product-card");

      // intro animation
      gsap.from(cards, {
        opacity: 0,
        y: 140,
        rotateY: 18,
        stagger: 0.12,
        duration: 1.4,
        ease: "power4.out",
      });

      // horizontal scroll animation
      gsap.to(".showcase-track", {
        xPercent: -42,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // individual card movement
      cards.forEach((card: any, index) => {
        gsap.to(card, {
          y: index % 2 === 0 ? -90 : 70,
          rotate: index % 2 === 0 ? -8 : 8,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

return (
  <>
    {/* ========================================= */}
    {/* DESKTOP VERSION */}
    {/* ========================================= */}

    <section
      ref={sectionRef}
      className="relative hidden h-[320vh] bg-background lg:block"
    >
      {/* sticky viewport */}
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        {/* cinematic background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-accent/20 blur-[140px]" />

          <div className="absolute bottom-[-10%] right-[5%] h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />

          <div className="absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/5 blur-[180px]" />
        </div>

        {/* content */}
        <div className="relative mx-auto flex w-full max-w-[1800px] items-center justify-between gap-20 px-6 md:px-10">
          {/* LEFT CONTENT */}
          <div className="max-w-xl shrink-0">
            <p className="mb-5 text-sm uppercase tracking-[0.4em] text-accent">
              Featured Collection
            </p>

            <h2 className="brand-text-gradient text-7xl font-black leading-[0.9] xl:text-8xl">
              Future
              <br />
              In Motion
            </h2>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
              Cinematic product showcase with immersive GSAP motion,
              layered depth and futuristic interaction.
            </p>

            <button
              className="
                mt-10
                rounded-full
                border
                border-white/10
                bg-white/5
                px-8
                py-4
                text-sm
                font-medium
                tracking-wide
                backdrop-blur-xl
                transition-all
                duration-300
                hover:scale-105
                hover:bg-white/10
              "
            >
              Explore Collection
            </button>
          </div>

          {/* RIGHT SCROLL AREA */}
          <div className="relative flex-1 overflow-visible">
            <div className="showcase-track flex gap-8 pl-[20vw] will-change-transform">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="
                    product-card
                    group
                    relative
                    h-[520px]
                    min-w-[340px]
                    overflow-hidden
                    rounded-[36px]
                    border
                    border-white/10
                    bg-card/50
                    backdrop-blur-2xl
                    brand-glow
                  "
                >
                  <Image
                    src={product.image}
                    alt="Product"
                    fill
                    className="
                      object-cover
                      transition-transform
                      duration-700
                      group-hover:scale-105
                    "
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                  <div
                    className="
                      absolute
                      left-5
                      top-5
                      rounded-full
                      border
                      border-white/10
                      bg-white/10
                      px-4
                      py-2
                      text-[10px]
                      uppercase
                      tracking-[0.25em]
                      text-white
                      backdrop-blur-md
                    "
                  >
                    Premium
                  </div>

                  <div className="absolute bottom-0 left-0 w-full p-7">
                    <h3 className="text-2xl font-bold text-white">
                      Product {index + 1}
                    </h3>

                    <p className="mt-2 text-sm text-white/70">
                      Modern futuristic showcase concept
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* ========================================= */}
    {/* MOBILE + TABLET VERSION */}
    {/* ========================================= */}

    <section className="relative overflow-hidden bg-background px-4 py-24 lg:hidden">
      {/* background glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-20 h-[280px] w-[280px] -translate-x-1/2 rounded-full bg-accent/20 blur-[100px]" />

        <div className="absolute bottom-0 left-0 h-[240px] w-[240px] rounded-full bg-primary/20 blur-[90px]" />
      </div>

      <div className="relative mx-auto max-w-2xl">
        {/* text */}
        <div className="mb-14 text-center">
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-accent">
            Featured Collection
          </p>

          <h2 className="brand-text-gradient text-5xl font-black leading-[0.9] sm:text-6xl">
            Future
            <br />
            In Motion
          </h2>

          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
            Premium cinematic showcase optimized for touch interaction and
            smaller screens.
          </p>
        </div>

        {/* cards */}
        <div className="space-y-6">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="
                group
                relative
                overflow-hidden
                rounded-[28px]
                border
                border-white/10
                bg-card/60
                backdrop-blur-xl
                brand-glow
              "
            >
              {/* image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt="Product"
                  fill
                  className="
                    object-cover
                    transition-transform
                    duration-700
                    group-hover:scale-105
                  "
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>

              {/* content */}
              <div className="absolute bottom-0 left-0 w-full p-5">
                <div
                  className="
                    mb-3
                    inline-flex
                    rounded-full
                    border
                    border-white/10
                    bg-white/10
                    px-3
                    py-1
                    text-[10px]
                    uppercase
                    tracking-[0.25em]
                    text-white
                    backdrop-blur-md
                  "
                >
                  Premium
                </div>

                <h3 className="text-xl font-bold text-white">
                  Product {index + 1}
                </h3>

                <p className="mt-1 text-sm text-white/70">
                  Modern futuristic showcase concept
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* button */}
        <div className="mt-10 flex justify-center">
          <button
            className="
              rounded-full
              border
              border-white/10
              bg-white/5
              px-7
              py-4
              text-sm
              font-medium
              tracking-wide
              backdrop-blur-xl
            "
          >
            Explore Collection
          </button>
        </div>
      </div>
    </section>
  </>
);
}