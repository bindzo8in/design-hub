"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt?: string;
};

type FamilySectionProps = {
  title?: string;
  description?: string;
  members: TeamMember[];
  bottomContent?: string;
};

const FamilySection = ({
  title = "Design Hub Family",
  description = "Design Hub is fortunate to be guided by some of the most skilled minds in the creative and technology space, supported by a team with decades of combined industry experience.",
  members,
  bottomContent,
}: FamilySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Heading & description reveal
        gsap.fromTo(
          ".family-header-reveal",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".family-header-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Team members stagger reveal
        gsap.fromTo(
          ".team-card-reveal",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".team-grid-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Bottom paragraph reveal
        if (bottomContent) {
          gsap.fromTo(
            ".family-bottom-reveal",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: ".family-bottom-reveal",
                start: "top 85%",
                once: true,
              },
            }
          );
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bottomContent]);

  return (
    <section ref={containerRef} className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-24 border-t border-border/40 select-none">
      {/* decorative shape */}
      <div className="pointer-events-none absolute -top-20 left-20 h-40 w-80 rounded-b-full bg-accent/5 blur-sm" />

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* heading */}
        <div className="family-header-trigger mx-auto max-w-4xl text-center space-y-4">
          <div className="family-header-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent justify-center">
            <span className="w-8 h-[1px] bg-accent" />
            Our Creative Minds
            <span className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="family-header-reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-6xl lg:text-7xl leading-none tracking-wider uppercase text-foreground">
            {title}
          </h2>

          <p className="family-header-reveal mt-4 text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        {/* team grid */}
        <div className="team-grid-trigger mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {members.map((member) => (
            <article key={member.name} className="team-card-reveal group relative rounded-3xl border border-border/60 bg-card p-4 overflow-hidden shadow-sm hover:border-accent/40 transition-colors duration-300
            ">
              <figure className="relative aspect-[1/1] overflow-hidden rounded-2xl bg-secondary/35">
                <Image
                  src={member.image}
                  alt={member.alt ?? member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover grayscale transition duration-500 group-hover:scale-103 group-hover:grayscale-0
                  group-hover:bg-white bg-black group-hover:shadow-lg group-hover:shadow-accent/20
                  "
                />
              </figure>

              <div className="pt-6 pb-2 text-center">
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>

                <p className="mt-1 text-xs sm:text-sm text-muted-foreground uppercase tracking-wider font-semibold">{member.role}</p>
              </div>
            </article>
          ))}
        </div>

        {/* bottom paragraph */}
        {bottomContent && (
          <p className="family-bottom-reveal mx-auto mt-16 sm:mt-20 max-w-5xl text-center text-sm sm:text-base leading-relaxed text-muted-foreground italic bg-card/40 border border-border/60 rounded-3xl p-6 sm:p-10 backdrop-blur-md">
            &ldquo;{bottomContent}&rdquo;
          </p>
        )}
      </div>
    </section>
  );
};

export default FamilySection;