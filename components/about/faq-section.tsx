"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "What services does Design Hub offer?",
    answer:
      "Design Hub delivers complete digital solutions including Website Development, Mobile App Development, Custom Software & ERP Solutions, UI/UX Design, Graphic Design, SEO, Digital Marketing, and Video Editing Services.",
  },
  {
    question: "Which industries do you support with custom software and CRM solutions?",
    answer:
      "We build CRM, ERP, and tailored software solutions for industries such as retail, education, real estate, healthcare, logistics, hospitality, B2B, e-commerce, service sectors, and startups.",
  },
  {
    question: "What types of websites do you develop?",
    answer:
      "Our team creates business websites, e-commerce stores, portfolio sites, corporate websites, CMS/WordPress platforms, landing pages, and custom UI/UX-based websites with full responsiveness and maintenance support.",
  },
  {
    question: "Do you build both native and cross-platform mobile apps?",
    answer:
      "Yes. We develop Android, iOS, and cross-platform apps using modern frameworks like Flutter, React Native, Kotlin, and Swift—ensuring smooth performance and a seamless user experience.",
  },
  {
    question: "How does your software development process work?",
    answer:
      "We follow a streamlined workflow: Discovery → Requirement Analysis → Wireframing & UI/UX → Agile/Scrum Development → Testing → Deployment → Ongoing Support & Updates.",
  },
  {
    question: "What graphic and branding design services do you offer?",
    answer:
      "Design Hub designs logos, brand identity systems, marketing creatives, brochures, packaging, labels, social media designs, advertisements, UI elements, and promotional materials.",
  },
  {
    question: "What digital marketing and SEO services are provided?",
    answer:
      "Our marketing services include on-page/off-page SEO, technical SEO, content strategies, PPC Ads, lead generation, social media management, performance optimization, and online reputation management.",
  },
  {
    question: "Do you offer video editing or promotional video creation?",
    answer:
      "Yes, we create professional promo videos, reels, ads, explainer videos, motion graphics, product videos, and corporate videos with high-quality editing and color grading.",
  },
  {
    question: "What makes Design Hub unique?",
    answer:
      "We combine creativity, modern technology, and business-focused strategies. With an experienced team, transparent process, fast delivery, customized solutions, and strong client support, we ensure high-quality results for every project.",
  },
  {
    question: "Where is Design Hub located?",
    answer:
      "Design Hub is based in Coimbatore, Tamil Nadu, and provides services to clients across India and internationally through remote and hybrid project collaboration.",
  },
];

/* ─── Accordion Item ─────────────────────────────────────── */
const FAQAccordionItem = ({
  number,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  number: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const answerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = answerRef.current;
    const inner = innerRef.current;
    if (!el || !inner) return;

    if (isOpen) {
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        {
          height: inner.offsetHeight,
          opacity: 1,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            el.style.height = "auto";
          },
        }
      );
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isOpen]);

  return (
    <article
      className={`
        group faq-item-reveal
        relative overflow-hidden
        rounded-2xl border
        transition-all duration-300
        ${isOpen
          ? "border-accent/40 bg-accent/5 dark:bg-accent/5 shadow-[0_0_30px_rgba(223,27,37,0.08)]"
          : "border-slate-200 dark:border-[#26336F]/50 bg-white dark:bg-[#18224b]/40 hover:border-accent/30 dark:hover:border-accent/30"
        }
      `}
    >
      {/* Active left accent bar */}
      <div
        className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 ${
          isOpen ? "bg-accent" : "bg-transparent"
        }`}
      />

      {/* Question row */}
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 p-5 sm:p-6 text-left"
        aria-expanded={isOpen}
      >
        {/* Number badge */}
        <span
          className={`
            flex-shrink-0
            flex items-center justify-center
            h-8 w-8 rounded-full
            text-xs font-bold
            transition-colors duration-300
            ${isOpen
              ? "bg-accent text-white"
              : "bg-slate-100 dark:bg-[#26336F]/40 text-muted-foreground"
            }
          `}
        >
          {String(number).padStart(2, "0")}
        </span>

        {/* Question text */}
        <span
          className={`flex-1 text-sm sm:text-base font-semibold leading-snug transition-colors duration-300 ${
            isOpen ? "text-accent" : "text-foreground"
          }`}
        >
          {question}
        </span>

        {/* Toggle icon */}
        <span
          className={`
            flex-shrink-0
            flex items-center justify-center
            h-8 w-8 rounded-full border
            transition-all duration-300
            ${isOpen
              ? "border-accent/40 bg-accent text-white rotate-0"
              : "border-border text-muted-foreground group-hover:border-accent/40"
            }
          `}
        >
          {isOpen ? (
            <Minus className="h-3.5 w-3.5" />
          ) : (
            <Plus className="h-3.5 w-3.5" />
          )}
        </span>
      </button>

      {/* Answer (animated height) */}
      <div
        ref={answerRef}
        className="overflow-hidden"
        style={{ height: 0, opacity: 0 }}
      >
        <div ref={innerRef} className="px-5 pb-5 sm:px-6 sm:pb-6 pl-[4.5rem]">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {answer}
          </p>
        </div>
      </div>
    </article>
  );
};

/* ─── FAQ Section ────────────────────────────────────────── */
const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleToggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".faq-title-reveal",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power4.out",
            scrollTrigger: {
              trigger: ".faq-title-reveal",
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".faq-item-reveal",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.07,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".faq-grid-trigger",
              start: "top 85%",
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
      className="relative overflow-hidden bg-slate-50 dark:bg-[#101735] py-20 sm:py-24 lg:py-32 border-t border-slate-200 dark:border-[#26336F]/40 select-none"
    >
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/4 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-accent/6 blur-[120px]" />
        <div className="absolute right-0 bottom-0 h-[300px] w-[400px] rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14 lg:mb-16">
          <div className="faq-title-reveal inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-5">
            <span className="w-8 h-[1px] bg-accent" />
            Frequently Asked Questions
          </div>

          <h2 className="faq-title-reveal font-[family-name:var(--font-bebas-neue)] text-5xl sm:text-6xl lg:text-7xl leading-[0.9] tracking-wider uppercase text-foreground">
            Got <em className="not-italic text-accent">Questions?</em>
            <br />
            We Have Answers.
          </h2>

          <p className="faq-title-reveal mt-4 max-w-2xl text-sm sm:text-base text-muted-foreground leading-relaxed">
            Everything you need to know about working with Design Hub — from services and process to timelines and technology.
          </p>
        </div>

        {/* Accordion */}
        <div className="faq-grid-trigger space-y-3">
          {faqs.map((faq, index) => (
            <FAQAccordionItem
              key={faq.question}
              number={index + 1}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;