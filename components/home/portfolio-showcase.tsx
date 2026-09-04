"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Sparkles, TrendingUp, Tag, Briefcase } from "lucide-react";
import gsap from "gsap";

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Client {
  id: string;
  name: string;
  logoUrl: string | null;
  website: string | null;
}

interface Project {
  id: string;
  title: string;
  description: string | null;
  clientName: string | null;
  thumbnail?: string | null;
  bannerImage?: string | null;
  budget: number | null;
  status: string;
  categoryId: string | null;
  clientId: string | null;
  category: Category | null;
  client: Client | null;
}

interface HomePortfolioShowcaseProps {
  initialProjects?: Project[];
  categories?: Category[];
}

export default function HomePortfolioShowcase({
  initialProjects = [],
  categories = [],
}: HomePortfolioShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  const filteredProjects =
    selectedCategory === "all"
      ? initialProjects
      : initialProjects.filter((p) => p.categoryId === selectedCategory);

  useEffect(() => {
    let ctx = gsap.context(() => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        gsap.fromTo(
          ".portfolio-header-reveal",
          { opacity: 0, y: 25 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".portfolio-trigger",
              start: "top 85%",
              once: true,
            },
          }
        );

        gsap.fromTo(
          ".portfolio-card",
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".portfolio-grid",
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
      id="portfolio"
      className="portfolio-trigger relative overflow-hidden bg-slate-100 dark:bg-[#101735] py-20 lg:py-32 border-t border-slate-200 dark:border-[#26336F]/40"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="portfolio-ambient-1 absolute right-0 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/8 blur-[140px]" />
        <div className="portfolio-ambient-2 absolute left-0 bottom-1/4 h-[500px] w-[500px] rounded-full bg-primary/20 blur-[160px]" />
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end mb-12 lg:mb-16">
          <div>
            <div className="portfolio-header-reveal inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-accent mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              Selected Agency Portfolio
            </div>
            <h2 className="portfolio-header-reveal font-[family-name:var(--font-heading)] font-light text-5xl sm:text-7xl lg:text-8xl leading-[0.9] uppercase text-slate-900 dark:text-white tracking-wide">
              Crafted With <span className="text-accent">Precision</span> & <br />
              Digital Excellence
            </h2>
          </div>

          <p className="portfolio-header-reveal max-w-md text-sm text-slate-600 dark:text-slate-300 sm:text-base leading-relaxed">
            Explore a showcase of our recent client success stories, visual systems, bespoke websites, and high-impact packaging solutions.
          </p>
        </div>

        {/* Filter Tabs */}
        {categories.length > 0 && (
          <div className="portfolio-header-reveal mb-10 flex flex-wrap gap-2 sm:gap-3">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-accent text-white shadow-lg shadow-accent/25 scale-105"
                  : "bg-white dark:bg-[#18224b] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#26336F] border border-slate-300 dark:border-[#26336F]"
              }`}
            >
              All Projects
            </button>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`relative rounded-full px-5 py-2.5 text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? "bg-accent text-white shadow-lg shadow-accent/25 scale-105"
                      : "bg-white dark:bg-[#18224b] text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-[#26336F] border border-slate-300 dark:border-[#26336F]"
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>
        )}

        {/* Projects Grid */}
        {filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-slate-300 dark:border-[#26336F] bg-white dark:bg-[#141b3d] p-12 text-center text-slate-500 dark:text-slate-400">
            No projects found for this category.
          </div>
        ) : (
          <div className="portfolio-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project) => {
              const imageSrc = project.thumbnail || project.bannerImage;
              const clientName = project.client?.name || project.clientName || "Direct Partner";
              const categoryName = project.category?.name || "Design Solution";

              return (
                <div
                  key={project.id}
                  className="portfolio-card group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 dark:border-[#26336F]/80 bg-white dark:bg-[#141b3d] shadow-lg transition-all duration-500 hover:-translate-y-2 hover:border-accent/50 hover:shadow-2xl"
                >
                  {/* Image Container */}
                  <div className="relative h-64 w-full overflow-hidden bg-slate-900">
                    {imageSrc ? (
                      <Image
                        src={imageSrc}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-900 via-[#101735] to-slate-950 p-6 text-center">
                        <span className="font-[family-name:var(--font-heading)] font-light text-3xl uppercase tracking-wider text-slate-600">
                          {project.title}
                        </span>
                      </div>
                    )}

                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-60" />

                    {/* Category Tag */}
                    <div className="absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full border border-accent/30 bg-slate-950/80 backdrop-blur-md px-3 py-1 text-[11px] font-bold text-accent">
                      <Tag className="h-3 w-3" />
                      {categoryName}
                    </div>

                    {/* Direct Link Icon */}
                    <Link
                      href="/portfolio"
                      aria-label={`View ${project.title}`}
                      className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-white backdrop-blur-md transition-all duration-300 group-hover:bg-accent group-hover:scale-110"
                    >
                      <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>

                    {/* Client Name Overlay */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                      <Briefcase className="h-3.5 w-3.5 text-accent" />
                      <span>{clientName}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      <h3 className="font-[family-name:var(--font-heading)] font-light text-2xl sm:text-3xl text-white tracking-wide uppercase transition-colors group-hover:text-accent">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                        {project.description ||
                          "Tailored digital solutions engineered for high performance and visual impact."}
                      </p>
                    </div>

                    {/* Project Budget & Status */}
                    <div className="mt-6 flex items-center justify-between border-t border-slate-800/80 pt-4 text-xs font-medium text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400 font-semibold">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {project.status.replace("_", " ")}
                      </span>
                      {project.budget && (
                        <span className="font-bold text-white">
                          ₹{project.budget.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* View All Button */}
        <div className="mt-16 flex justify-center">
          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 rounded-full border border-accent/40 bg-accent/10 px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary backdrop-blur-md transition-all duration-300 hover:bg-accent hover:shadow-[0_0_30px_rgba(223,27,37,0.4)] hover:text-secondary"
          >
            Explore Full Portfolio
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
