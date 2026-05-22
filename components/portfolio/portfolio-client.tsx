"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Calendar, Landmark, Briefcase, Tag } from "lucide-react";
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
  budget: number | null;
  status: string;
  startDate: string | null;
  endDate: string | null;
  categoryId: string | null;
  clientId: string | null;
  createdAt: string;
  category: Category | null;
  client: Client | null;
}

interface PortfolioClientProps {
  initialProjects: Project[];
  categories: Category[];
}

const statusColorMap: Record<string, { bg: string; text: string; dot: string }> = {
  PLANNING: {
    bg: "bg-[#26336F]/10 border-[#26336F]/30",
    text: "text-slate-400",
    dot: "bg-slate-400",
  },
  IN_PROGRESS: {
    bg: "bg-amber-500/10 border-amber-500/20",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
  COMPLETED: {
    bg: "bg-emerald-500/10 border-emerald-500/20",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  ON_HOLD: {
    bg: "bg-[#DF1B25]/10 border-[#DF1B25]/20",
    text: "text-[#DF1B25]",
    dot: "bg-[#DF1B25]",
  },
};

const statusLabelMap: Record<string, string> = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
};

export default function PortfolioClient({ initialProjects, categories }: PortfolioClientProps) {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const gridRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Stagger reveal on grid mount and changes
  useEffect(() => {
    if (!gridRef.current) return;
    
    // Clear initial state
    gsap.set(".portfolio-card", { opacity: 0, y: 20, scale: 0.98 });
    
    gsap.to(".portfolio-card", {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.7,
      stagger: 0.08,
      ease: "power3.out",
      overwrite: "auto",
    });
  }, [selectedCategoryId, searchQuery]);

  // Entrance animation for header elements
  useEffect(() => {
    if (!headerRef.current) return;
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
    tl.fromTo(
      ".anim-header-item",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );
  }, []);

  // Filter projects based on selected Category and search query
  const filteredProjects = initialProjects.filter((project) => {
    const matchesCategory =
      selectedCategoryId === "all" || project.categoryId === selectedCategoryId;

    const matchesSearch =
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (project.description &&
        project.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.clientName &&
        project.clientName.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (project.client?.name &&
        project.client.name.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  // Format budget currency helper
  const formatCurrency = (value: number | null) => {
    if (value === null || value === undefined) return "Undisclosed";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // Format date helper
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Ongoing";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  // Metrics
  const totalProjects = initialProjects.length;
  const completedProjects = initialProjects.filter(p => p.status === "COMPLETED").length;
  const activeProjects = initialProjects.filter(p => p.status === "IN_PROGRESS").length;

  return (
    <div className="space-y-12">
      {/* Page Header Area */}
      <div ref={headerRef} className="text-center max-w-4xl mx-auto space-y-4 px-4">
        <div className="anim-header-item inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[#DF1B25] mb-2">
          <span className="w-8 h-[1px] bg-[#DF1B25]" />
          Our Achievements
          <span className="w-8 h-[1px] bg-[#DF1B25]" />
        </div>
        <h1 className="anim-header-item font-[family-name:var(--font-bebas-neue)] text-6xl sm:text-8xl leading-none uppercase tracking-wider text-foreground">
          Selected <em className="not-italic text-[#DF1B25]">Works</em>
        </h1>
        <p className="anim-header-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Explore our collection of custom web systems, high-performance applications, and immersive digital platforms engineered for luxury-tech businesses.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-4 select-none">
        <div className="bg-[#101735]/30 border border-[#26336F]/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <div className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-5xl text-white">
            {totalProjects}
          </div>
          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">
            Total Projects
          </div>
        </div>
        <div className="bg-[#101735]/30 border border-[#26336F]/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <div className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-5xl text-[#DF1B25]">
            {activeProjects}
          </div>
          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">
            Active Now
          </div>
        </div>
        <div className="bg-[#101735]/30 border border-[#26336F]/10 rounded-2xl p-4 text-center backdrop-blur-sm">
          <div className="font-[family-name:var(--font-bebas-neue)] text-3xl sm:text-5xl text-emerald-400">
            {completedProjects}
          </div>
          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-slate-400 uppercase mt-1">
            Success Rate
          </div>
        </div>
      </div>

      {/* Search and Category Filter Section */}
      <div className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[#26336F]/20">
          
          {/* Categories Tab list */}
          <div className="flex flex-wrap items-center gap-2 select-none">
            <button
              onClick={() => setSelectedCategoryId("all")}
              className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                selectedCategoryId === "all"
                  ? "bg-[#DF1B25] border-[#DF1B25] text-white"
                  : "bg-[#101735]/40 border-[#26336F]/30 text-slate-400 hover:border-[#DF1B25]/50 hover:text-white"
              }`}
            >
              All Projects
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategoryId(category.id)}
                className={`rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer border ${
                  selectedCategoryId === category.id
                    ? "bg-[#DF1B25] border-[#DF1B25] text-white"
                    : "bg-[#101735]/40 border-[#26336F]/30 text-slate-400 hover:border-[#DF1B25]/50 hover:text-white"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Search bar input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input
              type="text"
              placeholder="Search selected works..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#101735]/40 border border-[#26336F]/30 rounded-full pl-11 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#DF1B25]/50 focus:ring-1 focus:ring-[#DF1B25]/50 transition-all font-sans"
            />
          </div>

        </div>

        {/* Projects Grid Display */}
        {filteredProjects.length > 0 ? (
          <div
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4"
          >
            {filteredProjects.map((project) => {
              const statusColors = statusColorMap[project.status] || statusColorMap.PLANNING;
              return (
                <div
                  key={project.id}
                  className="portfolio-card group relative bg-[#101735]/40 border border-[#26336F]/20 rounded-3xl p-6 backdrop-blur-md hover:border-[#DF1B25]/45 hover:shadow-[0_0_30px_rgba(223,27,37,0.05)] transition-all duration-500 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Category and Status */}
                    <div className="flex items-center justify-between">
                      <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#DF1B25]">
                        <Tag className="h-3 w-3" />
                        {project.category?.name || "Direct Work"}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${statusColors.bg} ${statusColors.text}`}
                      >
                        <span className={`h-1.5 w-1.5 rounded-full ${statusColors.dot}`} />
                        {statusLabelMap[project.status] || project.status}
                      </span>
                    </div>

                    {/* Title */}
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-wide uppercase line-clamp-1 group-hover:text-[#DF1B25] transition-colors duration-300">
                        {project.title}
                      </h3>
                      <p className="text-xs text-slate-400 font-sans mt-1 flex items-center gap-1.5">
                        <Briefcase className="h-3 w-3 text-slate-500" />
                        <span>Client:</span>
                        <strong className="text-slate-300 font-medium">
                          {project.client?.name || project.clientName || "Direct Partner"}
                        </strong>
                      </p>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-3 font-sans">
                      {project.description || "No project description provided. Explore our customized solutions by initiating contact."}
                    </p>
                  </div>

                  {/* Bottom Panel Card Info */}
                  <div className="mt-6 pt-4 border-t border-[#26336F]/25 flex flex-col gap-3 font-sans">
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Landmark className="h-3.5 w-3.5 text-slate-500" />
                        <span>Valuation:</span>
                      </span>
                      <span className="font-bold text-white tracking-wider">
                        {formatCurrency(project.budget)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5 text-slate-500" />
                        <span>Timeline:</span>
                      </span>
                      <span className="font-medium text-slate-300">
                        {formatDate(project.startDate)} &mdash; {formatDate(project.endDate)}
                      </span>
                    </div>
                  </div>

                  {/* Left accent lines hover effect */}
                  <div className="absolute top-0 bottom-0 left-0 w-[3px] bg-[#DF1B25] rounded-l-3xl transform scale-y-0 group-hover:scale-y-100 transition-transform duration-500 origin-center" />
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty Search/Filter State */
          <div className="text-center py-20 bg-[#101735]/15 border border-[#26336F]/10 rounded-3xl max-w-4xl mx-auto">
            <p className="text-slate-400 font-sans text-sm">
              No selected works matched your search or category filter. Try clearing the filter tabs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
