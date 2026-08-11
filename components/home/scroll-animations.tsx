"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

gsap.config({ nullTargetWarn: false });

/**
 * HomeScrollAnimations
 * Orchestrates all scroll-triggered parallax & reveal animations
 * for the Design Hub homepage using GSAP + ScrollTrigger.
 * Renders nothing — purely a side-effect component.
 */
const HomeScrollAnimations = () => {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let ctx: gsap.Context;

    import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {

        /* ──────────────────────────────────────────────────────
           HERO — parallax background layers on scroll
        ────────────────────────────────────────────────────── */
        gsap.to(".hero-bg-radial", {
          yPercent: 30,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 1.5,
          },
        });

        gsap.to(".hero-grid-layer", {
          yPercent: 18,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });

        // Hero content drifts up slightly on scroll out
        gsap.to(".hero-content-parallax", {
          yPercent: -15,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: "#hero",
            start: "40% top",
            end: "bottom top",
            scrub: 1,
          },
        });

        /* ──────────────────────────────────────────────────────
           MARQUEE — fade in on enter
        ────────────────────────────────────────────────────── */
        gsap.fromTo(".marquee-section",
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: ".marquee-section",
              start: "top 90%",
              once: true,
            },
          }
        );

        /* ──────────────────────────────────────────────────────
           ABOUT SECTION — cinematic horizontal reveal
        ────────────────────────────────────────────────────── */
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
          gsap.fromTo(".about-badge",
            { opacity: 0, x: -40 },
            {
              opacity: 1, x: 0,
              duration: 0.7,
              ease: "power3.out",
              scrollTrigger: { trigger: "#about", start: "top 82%", once: true },
            }
          );

          gsap.fromTo(".about-heading",
            { opacity: 0, y: 60, skewY: 2 },
            {
              opacity: 1, y: 0, skewY: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: { trigger: "#about", start: "top 78%", once: true },
            }
          );

          gsap.fromTo(".about-para",
            { opacity: 0, x: 30 },
            {
              opacity: 1, x: 0,
              duration: 0.8,
              stagger: 0.18,
              ease: "power3.out",
              scrollTrigger: { trigger: "#about", start: "top 72%", once: true },
            }
          );

          gsap.fromTo(".about-stat",
            { opacity: 0, scale: 0.7, y: 20 },
            {
              opacity: 1, scale: 1, y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "back.out(1.7)",
              scrollTrigger: { trigger: ".about-stats-grid", start: "top 85%", once: true },
            }
          );

          gsap.fromTo(".about-commitment-card",
            { opacity: 0, x: 80, rotateY: -8 },
            {
              opacity: 1, x: 0, rotateY: 0,
              duration: 1.1,
              ease: "power3.out",
              scrollTrigger: { trigger: ".about-commitment-card", start: "top 82%", once: true },
            }
          );
        }

        /* ──────────────────────────────────────────────────────
           SERVICES SECTION — staggered card entrances
        ────────────────────────────────────────────────────── */
        const servicesSection = document.querySelector("#services");
        if (servicesSection) {
          gsap.fromTo(".services-heading-reveal",
            { opacity: 0, y: 50 },
            {
              opacity: 1, y: 0,
              duration: 0.9,
              ease: "power4.out",
              scrollTrigger: { trigger: "#services", start: "top 80%", once: true },
            }
          );

          const cards = gsap.utils.toArray<HTMLElement>(".service-card-anim");
          cards.forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: 70, scale: 0.95 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 0.8,
                delay: i * 0.08,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  once: true,
                },
              }
            );
          });
        }

        /* ──────────────────────────────────────────────────────
           PORTFOLIO SECTION — spotlight reveal
        ────────────────────────────────────────────────────── */
        const portfolioSection = document.querySelector("#portfolio");
        if (portfolioSection) {
          gsap.fromTo(".portfolio-header-bg",
            { opacity: 0, scale: 1.08 },
            {
              opacity: 1, scale: 1,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: "#portfolio", start: "top 80%", once: true },
            }
          );

          const portfolioCards = gsap.utils.toArray<HTMLElement>(".portfolio-card");
          portfolioCards.forEach((card, i) => {
            gsap.fromTo(card,
              { opacity: 0, y: 60, scale: 0.93 },
              {
                opacity: 1, y: 0, scale: 1,
                duration: 0.85,
                delay: i * 0.1,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: card,
                  start: "top 90%",
                  once: true,
                },
              }
            );
          });
        }

        /* ──────────────────────────────────────────────────────
           PROCESS SECTION — timeline draw animation
        ────────────────────────────────────────────────────── */
        const processSection = document.querySelector("#process");
        if (processSection) {
          gsap.fromTo(".process-header-pin",
            { opacity: 0, y: 40 },
            {
              opacity: 1, y: 0,
              duration: 1,
              ease: "power4.out",
              scrollTrigger: { trigger: "#process", start: "top 80%", once: true },
            }
          );

          const steps = gsap.utils.toArray<HTMLElement>(".process-step-anim");
          steps.forEach((step, i) => {
            gsap.fromTo(step,
              { opacity: 0, x: i % 2 === 0 ? -50 : 50, y: 30 },
              {
                opacity: 1, x: 0, y: 0,
                duration: 0.9,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: step,
                  start: "top 87%",
                  once: true,
                },
              }
            );
          });
        }

        /* ──────────────────────────────────────────────────────
           CLIENTS MARQUEE — fade & slide
        ────────────────────────────────────────────────────── */
        gsap.fromTo(".clients-section",
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: ".clients-section", start: "top 85%", once: true },
          }
        );

        /* ──────────────────────────────────────────────────────
           TESTIMONIALS — cinematic slide-in from edges
        ────────────────────────────────────────────────────── */
        gsap.fromTo(".testimonials-heading-reveal",
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 1,
            ease: "power4.out",
            scrollTrigger: { trigger: "#testimonials", start: "top 82%", once: true },
          }
        );

        gsap.fromTo(".testi-card",
          { opacity: 0, y: 50, rotateX: 8 },
          {
            opacity: 1, y: 0, rotateX: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: "#testimonials", start: "top 75%", once: true },
          }
        );

        /* ──────────────────────────────────────────────────────
           CONTACT CTA — immersive scale reveal
        ────────────────────────────────────────────────────── */
        gsap.fromTo(".cta-wrapper",
          { opacity: 0, scale: 0.97, y: 40 },
          {
            opacity: 1, scale: 1, y: 0,
            duration: 1.1,
            ease: "power4.out",
            scrollTrigger: { trigger: ".cta-wrapper", start: "top 85%", once: true },
          }
        );

        /* ──────────────────────────────────────────────────────
           PARALLAX — sections float on scroll
        ────────────────────────────────────────────────────── */
        gsap.to(".services-bg-glow", {
          yPercent: -20,
          ease: "none",
          scrollTrigger: {
            trigger: "#services",
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });

        gsap.to(".portfolio-ambient-1", {
          yPercent: -25,
          xPercent: 5,
          ease: "none",
          scrollTrigger: {
            trigger: "#portfolio",
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        });

        gsap.to(".portfolio-ambient-2", {
          yPercent: 20,
          xPercent: -8,
          ease: "none",
          scrollTrigger: {
            trigger: "#portfolio",
            start: "top bottom",
            end: "bottom top",
            scrub: 3,
          },
        });

        ScrollTrigger.refresh();
      });
    });

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return null;
};

export default HomeScrollAnimations;
