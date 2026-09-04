"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const defaultTestimonials = [
  {
    text: "They really nailed it. The only way of finding the limits of the possible is by going beyond them into the impossible. Design Hub made our vision a reality.",
    author: "Anand Kumar",
    role: "CEO, Tech Startup",
  },
  {
    text: "Working with Design Hub was a game changer. The team's attention to detail and creative solutions elevated our entire digital presence beyond expectations.",
    author: "Rahul Verma",
    role: "Founder, Innovatex",
  },
  {
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
  const containerRef = useRef<HTMLElement>(null);
  const plugin = useRef(Autoplay({ delay: 5000, stopOnInteraction: true }));

  const displayTestimonials = dbTestimonials && dbTestimonials.length > 0
    ? dbTestimonials
    : defaultTestimonials;

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.fromTo(
      ".testi-content",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="testimonials"
      className="relative w-full bg-background py-32 md:py-48 text-foreground overflow-hidden"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 sm:px-12 testi-content">
        
        <h2 className="font-[family-name:var(--font-heading)] font-light text-xs uppercase tracking-[0.3em] text-accent mb-20 flex items-center gap-4">
          <span className="h-px w-12 bg-accent/50" />
          Client Voices
        </h2>

        <div className="relative mx-auto max-w-5xl cursor-grab active:cursor-grabbing">
          {/* Decorative Massive Quote */}
          <div className="absolute -top-20 -left-10 text-[15rem] leading-none text-foreground/[0.02] font-serif pointer-events-none select-none">
            "
          </div>
          
          <Carousel
            plugins={[plugin.current]}
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
            opts={{ align: "center", loop: true }}
            className="w-full relative z-10"
          >
            <CarouselContent>
              {displayTestimonials.map((item, idx) => (
                <CarouselItem key={idx} className="flex flex-col items-center justify-center text-center pb-8">
                  <h3 className="font-[family-name:var(--font-heading)] font-light text-[clamp(1.5rem,3vw,3rem)] leading-[1.3] text-foreground/90 mb-12">
                    "{item.text}"
                  </h3>
                  
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-sm font-bold uppercase tracking-widest text-foreground">
                      {item.author}
                    </span>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      {item.role}
                    </span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            <div className="flex items-center justify-center gap-4 mt-12">
              <CarouselPrevious className="relative inset-auto translate-x-0 translate-y-0 bg-transparent border-border text-foreground hover:bg-foreground/10 hover:text-foreground" />
              <CarouselNext className="relative inset-auto translate-x-0 translate-y-0 bg-transparent border-border text-foreground hover:bg-foreground/10 hover:text-foreground" />
            </div>
          </Carousel>
        </div>

      </div>
    </section>
  );
};

export default HomeTestimonialsSection;