"use client";

import {
  useState,
  useEffect,
  useRef,
  useMemo,
} from "react";
import Image from "next/image";
import {
  Search,
  Briefcase,
  Tag,
  Loader2,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import gsap from "gsap";

import Masonry, {
  ResponsiveMasonry,
} from "react-responsive-masonry";

import { useRouter } from "next/navigation";

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

const PAGE_SIZE = 12;

const statusColorMap: Record<
  string,
  {
    text: string;
    dot: string;
  }
> = {
  PLANNING: {
    text: "text-slate-300",
    dot: "bg-slate-300",
  },

  IN_PROGRESS: {
    text: "text-amber-300",
    dot: "bg-amber-300",
  },

  COMPLETED: {
    text: "text-emerald-300",
    dot: "bg-emerald-300",
  },

  ON_HOLD: {
    text: "text-accent",
    dot: "bg-accent",
  },
};

const statusLabelMap: Record<string, string> = {
  PLANNING: "Planning",
  IN_PROGRESS: "In Progress",
  COMPLETED: "Completed",
  ON_HOLD: "On Hold",
};

export default function PortfolioClient({
  initialProjects,
  categories,
}: PortfolioClientProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const [selectedCategoryId, setSelectedCategoryId] =
    useState("all");

  const [searchQuery, setSearchQuery] =
    useState("");

  /*
   * Mobile:
   * Clicking an image shows the overlay.
   */


  const [visibleCount, setVisibleCount] =
    useState(PAGE_SIZE);

  const [isLoadingMore, setIsLoadingMore] =
    useState(false);

  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  /*
   * ---------------------------------------------------------
   * FILTER
   * ---------------------------------------------------------
   */

  const filteredProjects = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return initialProjects.filter((project) => {
      const matchesCategory =
        selectedCategoryId === "all" ||
        project.categoryId === selectedCategoryId;

      if (!query) {
        return matchesCategory;
      }

      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(query) ||
        project.description
          ?.toLowerCase()
          .includes(query) ||
        project.clientName
          ?.toLowerCase()
          .includes(query) ||
        project.client?.name
          ?.toLowerCase()
          .includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [
    initialProjects,
    selectedCategoryId,
    searchQuery,
  ]);

  /*
   * ---------------------------------------------------------
   * VISIBLE PROJECTS
   * ---------------------------------------------------------
   */

  const visibleProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore =
    visibleCount < filteredProjects.length;

  /*
   * ---------------------------------------------------------
   * RESET PAGINATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [selectedCategoryId, searchQuery]);

  /*
   * ---------------------------------------------------------
   * INFINITE SCROLL
   * ---------------------------------------------------------
   */

  useEffect(() => {
    const target = loadMoreRef.current;

    if (!target || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      async (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        if (isLoadingMore) {
          return;
        }

        setIsLoadingMore(true);

        await new Promise((resolve) =>
          setTimeout(resolve, 100)
        );

        setVisibleCount((current) =>
          Math.min(
            current + PAGE_SIZE,
            filteredProjects.length
          )
        );

        setIsLoadingMore(false);
      },
      {
        rootMargin: "800px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [
    filteredProjects.length,
    hasMore,
    isLoadingMore,
  ]);

  /*
   * ---------------------------------------------------------
   * HEADER ANIMATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!headerRef.current) return;

    const tl = gsap.timeline({
      defaults: {
        ease: "power4.out",
      },
    });

    tl.fromTo(
      ".anim-header-item",
      {
        opacity: 0,
        y: 15,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
      }
    );

    return () => {
      tl.kill();
    };
  }, []);

  /*
   * ---------------------------------------------------------
   * IMAGE ANIMATION
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!gridRef.current) return;

    const images =
      gridRef.current.querySelectorAll(
        ".portfolio-item"
      );

    if (!images.length) return;

    gsap.fromTo(
      images,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "power3.out",
        overwrite: "auto",
      }
    );
  }, [
    isMounted,
    visibleCount,
    selectedCategoryId,
    searchQuery,
  ]);

  /*
   * ---------------------------------------------------------
   * FORMATTERS
   * ---------------------------------------------------------
   */

  const formatCurrency = (
    value: number | null
  ) => {
    if (value === null || value === undefined) {
      return "Undisclosed";
    }

    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (
    dateString: string | null
  ) => {
    if (!dateString) return "Ongoing";

    return new Date(
      dateString
    ).toLocaleDateString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  /*
   * ---------------------------------------------------------
   * METRICS
   * ---------------------------------------------------------
   */

  const totalProjects =
    initialProjects.length;

  const completedProjects =
    initialProjects.filter(
      (project) =>
        project.status === "COMPLETED"
    ).length;

  const activeProjects =
    initialProjects.filter(
      (project) =>
        project.status === "IN_PROGRESS"
    ).length;

  /*
   * ---------------------------------------------------------
   * RENDER
   * ---------------------------------------------------------
   */

  const router = useRouter();

  return (
    <div className="space-y-12">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div
        ref={headerRef}
        className="text-center max-w-4xl mx-auto space-y-4 px-4"
      >
        <div className="anim-header-item inline-flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-accent mb-2">
          <span className="w-8 h-[1px] bg-accent" />

          Our Achievements

          <span className="w-8 h-[1px] bg-accent" />
        </div>

        <h1 className="anim-header-item font-[family-name:var(--font-heading)] font-light text-6xl sm:text-8xl leading-none uppercase tracking-wider text-foreground">
          Selected{" "}
          <em className="not-italic text-accent">
            Works
          </em>
        </h1>

        <p className="anim-header-item text-slate-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          Explore our collection of custom web systems,
          high-performance applications, and immersive
          digital platforms engineered for luxury-tech
          businesses.
        </p>
      </div>

      {/* =====================================================
          METRICS
      ====================================================== */}

      <div className="grid grid-cols-3 gap-4 max-w-4xl mx-auto px-4">
        <div className="text-center">
          <div className="font-[family-name:var(--font-heading)] font-light text-3xl sm:text-5xl text-foreground">
            {totalProjects}
          </div>

          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Total Projects
          </div>
        </div>

        <div className="text-center">
          <div className="font-[family-name:var(--font-heading)] font-light text-3xl sm:text-5xl text-accent">
            {activeProjects}
          </div>

          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Active Now
          </div>
        </div>

        <div className="text-center">
          <div className="font-[family-name:var(--font-heading)] font-light text-3xl sm:text-5xl text-emerald-500">
            {completedProjects}
          </div>

          <div className="text-[9px] sm:text-xs font-semibold tracking-wider text-muted-foreground uppercase">
            Completed
          </div>
        </div>
      </div>

      {/* =====================================================
          FILTERS
      ====================================================== */}

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-primary/20">
          {/* Categories */}

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground whitespace-nowrap">
              Category
            </span>

            <Select
              value={selectedCategoryId}
              onValueChange={(value) =>
                setSelectedCategoryId(value)
              }
            >
              <SelectTrigger className="w-[200px] h-10 rounded-full bg-muted/40 border-primary/30 text-xs font-semibold uppercase tracking-wider focus:ring-accent/50">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="all">
                  All Projects
                </SelectItem>

                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                  >
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Search */}

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search selected works..."
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              className="w-full bg-muted/40 border border-primary/30 rounded-full pl-11 pr-4 py-2.5 text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all"
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          MASONRY GALLERY
      ====================================================== */}

      <div className="max-w-[1600px] mx-auto px-4">
        {filteredProjects.length > 0 ? (
          <>
            <div ref={gridRef}>
              {!isMounted ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                  {visibleProjects.map(
                    (project) => {
                      const status =
                        statusColorMap[
                        project.status
                        ] ||
                        statusColorMap.PLANNING;

                      return (
                        <div
                          key={project.id}
                          className="portfolio-item relative group overflow-hidden rounded-xl cursor-pointer"
                          onClick={() => {
                            router.push(`/portfolio/${project.id}`);
                          }}
                        >
                          {project.thumbnail ? (
                            <Image
                              src={
                                project.thumbnail
                              }
                              alt={
                                project.title
                              }
                              width={
                                1600
                              }
                              height={
                                1200
                              }
                              loading="lazy"
                              className="block w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 900px) 50vw,
                                (max-width: 1200px) 33vw,
                                25vw
                              "
                            />
                          ) : (
                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No image
                              </span>
                            </div>
                          )}

                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 pointer-events-none opacity-0 group-hover:opacity-100" />

                          <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-white transition-all duration-500 translate-y-5 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                            <div className="flex items-center gap-2 mb-2">
                              <Tag className="w-3 h-3 text-accent" />
                              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-accent">
                                {project.category?.name || "Direct Work"}
                              </span>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide leading-tight">
                              {project.title}
                            </h3>
                            <p className="mt-2 text-xs text-white/60 flex items-center gap-1.5">
                              <Briefcase className="w-3 h-3" />
                              {project.client?.name || project.clientName || "Direct Partner"}
                            </p>
                            <div className="mt-4 flex items-center justify-between gap-4">
                              <span className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${status.text}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
                                {statusLabelMap[project.status] || project.status}
                              </span>
                              <span className="text-[10px] text-white/50">View project →</span>
                            </div>
                          </div>

                          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider font-semibold text-white/80 transition-all duration-300 group-hover:opacity-0">
                            {project.category?.name || "Project"}
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              ) : (
              <ResponsiveMasonry
                columnsCountBreakPoints={{
                  350: 1,
                  640: 2,
                  900: 3,
                  1200: 4,
                }}
              >
                <Masonry gutter="16px">
                  {visibleProjects.map(
                    (project) => {
                      const status =
                        statusColorMap[
                        project.status
                        ] ||
                        statusColorMap.PLANNING;

                      return (
                        <div
                          key={project.id}
                          className="portfolio-item relative group overflow-hidden rounded-xl cursor-pointer"
                          onClick={() => {
                            router.push(`/portfolio/${project.id}`);
                          }}
                        >
                          {/* =================================================
                              IMAGE
                          ================================================== */}

                          {project.thumbnail ? (
                            <Image
                              src={
                                project.thumbnail
                              }
                              alt={
                                project.title
                              }
                              width={
                                1600
                              }
                              height={
                                1200
                              }
                              loading="lazy"
                              className="block w-full h-auto object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                              sizes="
                                (max-width: 640px) 100vw,
                                (max-width: 900px) 50vw,
                                (max-width: 1200px) 33vw,
                                25vw
                              "
                            />
                          ) : (
                            <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                No image
                              </span>
                            </div>
                          )}

                          {/* =================================================
                              DARK GRADIENT
                          ================================================== */}

                          <div
                            className={`
                              absolute inset-0
                              bg-gradient-to-t
                              from-black/90
                              via-black/20
                              to-transparent
                              transition-opacity
                              duration-500
                              pointer-events-none

                              opacity-0
                              group-hover:opacity-100
                            `}
                          />

                          {/* =================================================
                              HOVER / TAP CONTENT
                          ================================================== */}

                          <div
                            className={`
                              absolute
                              inset-x-0
                              bottom-0
                              p-5
                              sm:p-6
                              text-white

                              transition-all
                              duration-500

                              translate-y-5
                              opacity-0

                              group-hover:translate-y-0
                              group-hover:opacity-100
                            `}
                          >
                            {/* Category */}

                            <div className="flex items-center gap-2 mb-2">
                              <Tag className="w-3 h-3 text-accent" />

                              <span className="text-[10px] uppercase tracking-[0.18em] font-bold text-accent">
                                {project.category
                                  ?.name ||
                                  "Direct Work"}
                              </span>
                            </div>

                            {/* Title */}

                            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide leading-tight">
                              {project.title}
                            </h3>

                            {/* Client */}

                            <p className="mt-2 text-xs text-white/60 flex items-center gap-1.5">
                              <Briefcase className="w-3 h-3" />

                              {project.client
                                ?.name ||
                                project.clientName ||
                                "Direct Partner"}
                            </p>

                            {/* Status */}

                            <div className="mt-4 flex items-center justify-between gap-4">
                              <span
                                className={`flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider ${status.text}`}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full ${status.dot}`}
                                />

                                {statusLabelMap[
                                  project
                                    .status
                                ] ||
                                  project.status}
                              </span>

                              <span className="text-[10px] text-white/50">
                                View project →
                              </span>
                            </div>
                          </div>

                          {/* =================================================
                              TOP RIGHT CATEGORY
                          ================================================== */}

                          <div
                            className={`
                              absolute
                              top-4
                              right-4

                              px-3
                              py-1.5
                              rounded-full

                              bg-black/40
                              backdrop-blur-md

                              border
                              border-white/10

                              text-[9px]
                              uppercase
                              tracking-wider
                              font-semibold
                              text-white/80

                              transition-all
                              duration-300

                              group-hover:opacity-0

                            
                            `}
                          >
                            {project.category
                              ?.name ||
                              "Project"}
                          </div>
                        </div>
                      );
                    }
                  )}
                </Masonry>
              </ResponsiveMasonry>
              )}
            </div>

            {/* =====================================================
                LOAD MORE
            ====================================================== */}

            <div
              ref={loadMoreRef}
              className="h-32 flex items-center justify-center"
            >
              {hasMore ? (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Loader2 className="w-4 h-4 animate-spin" />

                  <span>
                    Loading more projects...
                  </span>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">
                  You&apos;ve reached the end.
                </p>
              )}
            </div>
          </>
        ) : (
          /* =====================================================
             EMPTY STATE
          ====================================================== */

          <div className="text-center py-20">
            <p className="text-muted-foreground text-sm">
              No selected works matched your search
              or category filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}