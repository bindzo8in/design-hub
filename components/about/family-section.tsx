"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ArrowRight, Users } from "lucide-react";

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

/* ─── Team Member Card ───────────────────────────────────── */
const TeamCard = ({ member }: { member: TeamMember }) => {
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.innerWidth < 1024) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(card, {
        rotateY: x * 10,
        rotateX: -y * 10,
        transformPerspective: 800,
        ease: "power2.out",
        duration: 0.6,
      });
    };

    const handleLeave = () => {
      gsap.to(card, {
        rotateY: 0,
        rotateX: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    };

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);

    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="
        team-card-reveal
        group
        relative
        overflow-hidden
        rounded-3xl
        border border-border/50
        bg-card/60
        backdrop-blur-sm
        cursor-pointer
        will-change-transform
        transition-shadow duration-300
        hover:shadow-[0_20px_60px_rgba(223,27,37,0.15)]
        hover:border-accent/40
      "
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Image */}
      <figure className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={member.image}
          alt={member.alt ?? member.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="
            object-cover
            grayscale
            transition-all duration-700
            group-hover:grayscale-0
            group-hover:scale-105
          "
        />

        {/* Gradient overlay — always visible at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#101735] via-[#101735]/30 to-transparent" />

        {/* Glowing ring on hover */}
        <div className="absolute inset-0 rounded-3xl ring-0 ring-accent/0 group-hover:ring-2 group-hover:ring-accent/30 transition-all duration-500" />

        {/* Name / Role — floating over image */}
        <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
          <h3 className="text-lg font-bold text-white leading-tight">
            {member.name}
          </h3>
          <p className="mt-1 text-xs font-semibold uppercase tracking-widest text-accent">
            {member.role}
          </p>
        </div>
      </figure>
    </article>
  );
};

/* ─── Family Section ─────────────────────────────────────── */
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

        // Header reveal
        gsap.fromTo(
          ".family-header-reveal",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".family-header-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Cards stagger with perspective
        gsap.fromTo(
          ".team-card-reveal",
          { opacity: 0, y: 60, rotateX: 6 },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            duration: 0.9,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".team-grid-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Mission panel
        gsap.fromTo(
          ".mission-panel",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".mission-panel",
              start: "top 85%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [bottomContent]);

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-background text-foreground py-20 sm:py-24 lg:py-32 border-t border-border/50 select-none"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 left-1/4 h-[400px] w-[500px] rounded-full bg-accent/8 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[350px] w-[400px] rounded-full bg-[#26336F]/30 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="family-header-trigger mb-14 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="family-header-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              <span className="w-8 h-[1px] bg-accent" />
              Our Creative Minds
            </div>
            <h2 className="family-header-reveal font-[family-name:var(--font-chillax)] font-light text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-wider uppercase text-foreground">
              {title}
            </h2>
            <p className="family-header-reveal text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl">
              {description}
            </p>
          </div>

          {/* Team count badge */}
          <div className="family-header-reveal flex-shrink-0 flex items-center gap-3 rounded-2xl border border-border bg-card/60 px-5 py-4">
            <Users className="h-5 w-5 text-accent" />
            <div>
              <div className="font-[family-name:var(--font-chillax)] font-light text-3xl text-foreground leading-none">
                {members.length}+
              </div>
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                Team Members
              </div>
            </div>
          </div>
        </div>

        {/* Team grid */}
        {members.length > 0 ? (
          <div
            className="team-grid-trigger grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {members.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        ) : (
          <div className="team-grid-trigger flex items-center justify-center py-20">
            <p className="text-muted-foreground text-sm">Team members coming soon.</p>
          </div>
        )}

        {/* Mission statement panel */}
        {bottomContent && (
          <div className="mission-panel mt-20 sm:mt-24 relative rounded-3xl overflow-hidden border border-border/50 bg-card/40 backdrop-blur-md">
            {/* Left accent bar */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-accent via-accent/50 to-transparent rounded-l-3xl" />

            <div className="p-8 sm:p-10 lg:p-14 flex flex-col lg:flex-row lg:items-center gap-8">
              <div className="flex-1 space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-accent">
                  <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
                  Our Mission
                </div>
                <p className="text-base sm:text-lg lg:text-xl leading-relaxed text-foreground/90 max-w-3xl">
                  &ldquo;{bottomContent}&rdquo;
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link
                  href="/contact"
                  className="
                    inline-flex items-center gap-2
                    rounded-2xl bg-accent
                    px-6 py-3.5
                    text-sm font-bold text-white
                    shadow-lg shadow-accent/25
                    transition-all duration-300
                    hover:bg-accent/90 hover:scale-[1.03]
                  "
                >
                  Work With Us
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FamilySection;