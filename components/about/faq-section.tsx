"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

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

const FAQSection = () => {
    const leftFaqs = faqs.slice(0, 5);
    const rightFaqs = faqs.slice(5);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
                gsap.registerPlugin(ScrollTrigger);

                // Title reveal
                gsap.fromTo(
                    ".faq-title-reveal",
                    { opacity: 0, y: 25 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: ".faq-title-reveal",
                            start: "top 85%",
                            once: true,
                        },
                    }
                );

                // Stagger FAQ item reveal
                gsap.fromTo(
                    ".faq-item-reveal",
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        stagger: 0.08,
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
        <section ref={containerRef} className="relative overflow-hidden bg-background py-16 text-foreground sm:py-20 lg:py-24 border-t border-border/40 select-none">
            {/* Center glow / line background */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-40">
                <div className="h-[420px] w-[420px] rounded-full border border-primary/20 blur-[1px] sm:h-[520px] sm:w-[520px] lg:h-[620px] lg:w-[620px]" />
            </div>

            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border-t border-primary/20 blur-sm lg:block" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[320px] w-[620px] -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full border-t border-accent/15 blur-sm lg:block" />

            <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                
                <div className="faq-title-reveal flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-6">
                    <span className="w-8 h-[1px] bg-accent" />
                    FAQ
                </div>

                <h2 className="faq-title-reveal font-[family-name:var(--font-bebas-neue)] text-4xl sm:text-6xl lg:text-7xl leading-none tracking-wider uppercase text-foreground mb-12">
                    Frequently Asked Questions:
                </h2>

                <div className="faq-grid-trigger grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-24">
                    <div className="space-y-8 sm:space-y-10">
                        {leftFaqs.map((faq, index) => (
                            <div key={faq.question} className="faq-item-reveal">
                                <FAQItem
                                    number={index + 1}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="space-y-8 sm:space-y-10">
                        {rightFaqs.map((faq, index) => (
                            <div key={faq.question} className="faq-item-reveal">
                                <FAQItem
                                    number={index + 6}
                                    question={faq.question}
                                    answer={faq.answer}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

type FAQItemProps = {
    number: number;
    question: string;
    answer: string;
};

const FAQItem = ({ number, question, answer }: FAQItemProps) => {
    return (
        <article className="space-y-3">
            <h3 className="text-base sm:text-lg font-bold leading-snug text-foreground">
                {number}. {question}
            </h3>

            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {answer}
            </p>
        </article>
    );
};

export default FAQSection;