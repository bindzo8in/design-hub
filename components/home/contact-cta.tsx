"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";
import Link from "next/link";

const HomeCTASection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".cta-item",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".cta-wrapper",
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
      className="
        relative
        overflow-hidden
        bg-background
        text-foreground
        py-12
        sm:py-16
        lg:py-24
        flex
        items-center
      "
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] sm:h-[500px] sm:w-[500px] -translate-x-1/2 rounded-full bg-accent/15 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="cta-wrapper relative overflow-hidden rounded-2xl sm:rounded-[2rem] border border-border bg-card/80 backdrop-blur-xl shadow-2xl">

          {/* Gradient border overlay */}
          <div className="absolute inset-0 rounded-2xl sm:rounded-[2rem] bg-gradient-to-br from-accent/20 via-transparent to-primary/20 pointer-events-none" />

          <div className="grid items-center gap-8 p-5 sm:p-8 lg:grid-cols-2 lg:gap-12 lg:p-14">

            {/* ── LEFT CONTENT ── */}
            <div className="relative z-10 flex flex-col">

              {/* Badge */}
              <div className="cta-item inline-flex self-start items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 sm:px-4 sm:py-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-accent">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                Let's Build Something Great
              </div>

              {/* Headline */}
              <h2
                className="
                  cta-item
                  mt-4 sm:mt-5
                  font-[family-name:var(--font-bebas-neue)]
                  text-[2.6rem]
                  leading-[0.9]
                  tracking-wide
                  uppercase
                  sm:text-[3.8rem]
                  md:text-[5rem]
                  lg:text-[5.5rem]
                  xl:text-[7rem]
                "
              >
                Your Vision <br />
                <span className="text-accent">Our Innovation</span>
              </h2>

              {/* Description */}
              <p className="cta-item mt-4 sm:mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                We craft high-performing websites, mobile apps, branding,
                marketing systems, and digital experiences that help businesses
                grow faster and stand out in the market.
              </p>

              {/* Buttons */}
              <div className="cta-item mt-6 sm:mt-8 flex flex-col xs:flex-row gap-3 sm:gap-4">
                <Link
                  href={"/contact"}
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl bg-accent px-5 py-3.5 sm:px-6 sm:py-4 text-sm font-bold text-accent-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Start Your Project
                  <ArrowRight className="ml-2 h-4 w-4 shrink-0" />
                </Link>

                <a
                  href="tel:+919994713122"
                  className="inline-flex items-center justify-center rounded-xl sm:rounded-2xl border border-border bg-background/40 px-5 py-3.5 sm:px-6 sm:py-4 text-sm font-semibold hover:bg-accent/5 transition-colors"
                >
                  <Phone className="mr-2 h-4 w-4 shrink-0" />
                  Call Now
                </a>
              </div>

              {/* Stats */}
              <div className="cta-item mt-8 sm:mt-10 grid grid-cols-3 gap-4 sm:flex sm:flex-wrap sm:gap-8">
                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">120+</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Projects Delivered
                  </p>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">6+</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Years Experience
                  </p>
                </div>

                <div className="flex flex-col">
                  <h4 className="text-2xl sm:text-3xl font-bold">24/7</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                    Support System
                  </p>
                </div>
              </div>
            </div>

            {/* ── RIGHT INLINE LEAD CAPTURE FORM ── */}
            <div className="cta-item relative z-10 w-full rounded-2xl sm:rounded-3xl border border-border bg-secondary/80 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="mb-6">
                <h3 className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-4xl text-foreground uppercase tracking-wide">
                  Request A <span className="text-accent">Free Quote</span>
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Tell us about your project & get a response within 24 hours.
                </p>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); alert("Thank you! Your quote request has been received. Our team will contact you shortly."); }} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    What service do you need?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {["Web Development", "Branding", "Packaging", "Photography", "Digital Marketing", "Printing"].map((svc, i) => (
                      <label key={i} className="flex items-center gap-2 rounded-xl border border-border bg-background/60 p-2.5 text-xs text-muted-foreground hover:border-accent/40 cursor-pointer transition-colors">
                        <input type="checkbox" className="accent-red-600 rounded" defaultChecked={i === 0} />
                        <span className="truncate">{svc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground mb-1">Phone / WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 99947 13122"
                      className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="john@company.com"
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-muted-foreground mb-1">Project Details</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your project goals, budget, or timeline..."
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder-muted-foreground focus:border-accent focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-accent py-4 text-sm font-bold text-white shadow-lg shadow-accent/25 hover:bg-accent/90 transition-all hover:scale-[1.01]"
                >
                  Submit Proposal Request
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCTASection;