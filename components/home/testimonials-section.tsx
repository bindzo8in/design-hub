"use client";

import { useEffect, useRef } from "react";
import { Quote } from "lucide-react";
import gsap from "gsap";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const defaultTestimonials = [
  {
    avatar: "A",
    isImage: false,
    text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Design Hub made our vision a reality.",
    author: "Anand Kumar",
    role: "CEO, Tech Startup",
  },
  {
    avatar: "P",
    isImage: false,
    text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Our brand has never looked better.",
    author: "Priya Sharma",
    role: "Marketing Director, Organic Foods Corp",
  },
  {
    avatar: "R",
    isImage: false,
    text: "Working with Design Hub was a game changer. The team's attention to detail and creative solutions elevated our entire digital presence beyond expectations.",
    author: "Rahul Verma",
    role: "Founder, Innovatex",
  },
  {
    avatar: "S",
    isImage: false,
    text: "An absolute pleasure to work with. They took our complex requirements and turned them into a seamless, elegant experience that our users love.",
    author: "Sneha Patel",
    role: "Product Lead, Nexus Solutions",
  },
];

interface Testimonial {
  id: string;
  author: string;
  role: string;
  text: string;
  avatarUrl?: string | null;
}

interface HomeTestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const HomeTestimonialsSection = ({ testimonials: dbTestimonials }: HomeTestimonialsSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const plugin = useRef(
    Autoplay({ delay: 4000, stopOnInteraction: true })
  );

  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials.map((t) => {
        const initials = t.author
          .split(" ")
          .map((n) => n[0])
          .slice(0, 2)
          .join("")
          .toUpperCase();
        return {
          avatar: t.avatarUrl || initials || "C",
          isImage: !!t.avatarUrl,
          text: t.text,
          author: t.author,
          role: t.role,
        };
      })
    : defaultTestimonials;

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        // Header animations
        gsap.fromTo(
          ".testi-reveal",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testi-trigger-header",
              start: "top 85%",
              once: true,
            },
          }
        );

        // Stagger cards reveal
        gsap.fromTo(
          ".testi-card",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testi-trigger-grid",
              start: "top 80%",
              once: true,
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative overflow-hidden bg-white dark:bg-[#101735] py-20 sm:py-28 px-4 sm:px-8 border-t border-b border-slate-200 dark:border-[#26336F]/40 select-none"
    >
      <div className="container mx-auto max-w-7xl">
        
        {/* Section Header */}
        <header className="testimonials-heading-reveal testi-trigger-header text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="testi-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            <span className="w-8 h-[1px] bg-accent" />
            Client Voices
            <span className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="testi-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-7xl lg:text-8xl leading-[0.9] tracking-wider uppercase text-slate-900 dark:text-white">
            What Our <em className="not-italic text-accent">Clients</em> Say
          </h2>
        </header>

        {/* Testimonials Carousel */}
        <div className="testi-trigger-grid max-w-5xl mx-auto cursor-grab active:cursor-grabbing">
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 sm:-ml-8">
              {displayTestimonials.map((item, idx) => (
                <CarouselItem key={idx} className="pl-4 sm:pl-8 flex-[0_0_100%] md:flex-[0_0_50%]">
                  <article
                    className="testi-card h-full group relative rounded-3xl border border-slate-200 dark:border-[#26336F] bg-slate-50 dark:bg-[#18224b] p-6 sm:p-8 flex flex-col justify-between min-h-[240px] shadow-sm transition-all duration-300 hover:border-accent/50 hover:shadow-xl"
                  >
                    <div>
                      {/* Top rating stars & quote icon */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 text-amber-500 text-sm">
                          {"★".repeat(5)}
                          <span className="ml-2 text-xs font-semibold text-accent uppercase tracking-wider">Verified Client</span>
                        </div>
                        <Quote className="h-8 w-8 text-accent opacity-20 group-hover:opacity-40 transition-opacity duration-300 rotate-180" />
                      </div>
                      
                      {/* Quote text */}
                      <p className="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-4 mt-8 pt-6 border-t border-border/40">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent font-[family-name:var(--font-bebas-neue)] text-xl border border-accent/20 overflow-hidden shrink-0">
                        {item.isImage ? (
                          <img src={item.avatar} alt={item.author} className="w-full h-full object-cover" />
                        ) : (
                          item.avatar
                        )}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">
                          {item.author}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {item.role}
                        </p>
                      </div>
                    </div>
                  </article>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonialsSection;