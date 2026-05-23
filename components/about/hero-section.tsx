"use client";

interface PremiumAboutCardProps {
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  reverse?: boolean;
}

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header reveal
        gsap.fromTo(
          ".hero-title-reveal",
          {
            y: 120,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.12,
            duration: 1,
            ease: "power4.out",
          },
        );

        // Cards animation
        const cards = gsap.utils.toArray<HTMLElement>(".premium-card");

        cards.forEach((card, index) => {
          const image = card.querySelector(".premium-image");
          const content = card.querySelector(".premium-content");

          const direction = index % 2 === 0 ? -80 : 80;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: "top 82%",
            },
          });

          tl.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
            },
            {
              opacity: 1,
              y: 0,
              duration: 1,
              ease: "power3.out",
            },
          )
            .fromTo(
              image,
              {
                opacity: 0,
                scale: 1.08,
                x: direction,
              },
              {
                opacity: 1,
                scale: 1,
                x: 0,
                duration: 1.4,
                ease: "power3.out",
              },
              0,
            )
            .fromTo(
              content,
              {
                opacity: 0,
                y: 30,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                ease: "power2.out",
              },
              0.2,
            );

          // Desktop hover depth
          if (window.innerWidth >= 1024) {
            card.addEventListener("mousemove", (e: any) => {
              const rect = card.getBoundingClientRect();

              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;

              const moveX = (x / rect.width - 0.5) * 18;
              const moveY = (y / rect.height - 0.5) * 18;

              gsap.to(image, {
                x: moveX,
                y: moveY,
                duration: 0.7,
                ease: "power2.out",
              });
            });

            card.addEventListener("mouseleave", () => {
              gsap.to(image, {
                x: 0,
                y: 0,
                duration: 1,
                ease: "power3.out",
              });
            });
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="
        relative
        overflow-hidden
        bg-background

        px-4
        sm:px-6
        lg:px-8

        py-12
        sm:py-16

        landscape:py-8

        lg:py-24
      "
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 h-[350px] w-[350px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-12 sm:mb-16 lg:mb-24">
          <div className="text-center">
            <div className="overflow-hidden">
              <h1
                className="
                  hero-title-reveal

                  font-[family-name:var(--font-bebas-neue)]
                  uppercase
                  tracking-tight
                  leading-[0.9]

                  text-foreground

                  text-[clamp(3rem,12vw,8rem)]

                  landscape:text-[clamp(2.5rem,6vw,4rem)]

                  lg:text-[clamp(5rem,8vw,8rem)]
                "
              >
                About <em className="not-italic text-accent">Us</em>
              </h1>
            </div>

            <p
              className="
                mx-auto
                mt-4
                max-w-2xl

                text-sm
                sm:text-base

                leading-relaxed
                text-muted-foreground
              "
            >
              Crafting immersive digital experiences through design,
              engineering, branding, and strategic storytelling.
            </p>
          </div>
        </header>

        {/* Cards */}
        <div className="space-y-8 sm:space-y-10 lg:space-y-16">
          <PremiumAboutCard
            label="Why Us"
            title="Strategy Meets Creative Execution"
            description="We combine branding, engineering, marketing, and storytelling into one cohesive ecosystem that helps brands scale with clarity and impact."
            image="/about/hero/about_hero_1.webp"
            alt="Creative digital agency"
          />

          <PremiumAboutCard
            reverse
            label="What We Do"
            title="Building Brands That Actually Matter"
            description="From visual identity systems to modern web platforms and immersive digital products, we help brands communicate with confidence."
            image="/about/hero/about_hero_2.webp"
            alt="Branding and design studio"
          />
        </div>
      </div>
    </section>
  );
};

const PremiumAboutCard = ({
  title,
  label,
  description,
  image,
  alt,
  reverse = false,
}: PremiumAboutCardProps) => {
  return (
    <article
      className="
    premium-card
    group
    relative
    overflow-hidden
    
    rounded-[2rem]
    
    border border-border/50
    
    bg-card/70
    backdrop-blur-xl
    
    grid
    grid-cols-1
    md:grid-cols-2
    
    min-h-[520px]
    
    landscape:min-h-[320px]
    
    md:min-h-[520px]
    
    lg:min-h-[680px]
    "
    >
      {/* IMAGE */}
      <figure
        className={`
          relative
          overflow-hidden
          
          flex
          items-end
          justify-center
          
          bg-gradient-to-br
          from-secondary/40
          to-background
          
          h-[320px]
          
          sm:h-[420px]
          
          landscape:h-[220px]
          
          md:h-full
          
          lg:min-h-[680px]
          
          ${reverse ? "order-1 md:order-2" : ""}
          `}
      >
        <div
          className="
          premium-image
          absolute
          inset-0
          
          flex
          items-end
          justify-center
          "
        >
          <Image
            src={image}
            alt={alt}
            fill
            className="
            object-contain
            
            p-4
            sm:p-6
            lg:p-8
            
            scale-100
            lg:scale-[1.02]
            
            transition-transform
            duration-700
            ease-out
            
            group-hover:scale-[1.04]
            "
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
      </figure>

      {/* CONTENT */}
      <div
        className={`
          premium-content
          
          flex
          items-center
          
          p-6
          sm:p-8
          lg:p-14
          
          ${reverse ? "order-2 md:order-1" : ""}
          `}
      >
        <div className="max-w-xl">
          <div
            className="
            inline-flex
            items-center
            gap-3
            
            text-xs
            sm:text-sm
            
            font-semibold
            uppercase
            tracking-[0.25em]
            
            text-accent
            "
          >
            <span className="h-[1px] w-8 bg-accent" />
            {label}
          </div>

          <h2
            className="
            mt-5
            
            font-[family-name:var(--font-bebas-neue)]
            uppercase
            tracking-tight
              leading-[0.95]
              
              text-4xl
              sm:text-5xl
              lg:text-6xl
              "
          >
            {title}
          </h2>

          <p
            className="
            mt-5
            
            text-sm
            sm:text-base
            
            leading-relaxed
            text-muted-foreground
            "
          >
            {description}
          </p>
        </div>
      </div>
    </article>
  );
};

export { PremiumAboutCard };
export default HeroSection;
