"use client";

import { navRoutes } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        aria-label="Loading theme"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-muted-foreground"
      />
    );
  }

  const cycleTheme = () => {
    if (theme === "light") setTheme("dark");
    else if (theme === "dark") setTheme("system");
    else setTheme("light");
  };

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label="Toggle theme"
      className={cn(
        "group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full",
        "border border-border bg-secondary text-secondary-foreground",
        "transition-all duration-300 hover:border-accent/50 hover:bg-accent hover:text-accent-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      )}
    >
      {theme === "light" ? (
        <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" />
      ) : theme === "dark" ? (
        <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />
      ) : (
        <Monitor className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
      )}
    </button>
  );
};

const BrandLogo = () => {
  return (
    <Link href="/" className="group flex items-center">
      {/* Light background logo (dark text) for light theme */}
      <Image
        src="/logo/light.png"
        alt="Design Hub"
        width={180}
        height={64}
        priority
        style={{ width: "auto" }}
        className="h-11 object-contain transition-transform duration-300 group-hover:scale-[1.02] lg:h-16 dark:hidden"
      />

      {/* Dark background logo (light text) for dark theme */}
      <Image
        src="/logo/dark.png"
        alt="Design Hub"
        width={180}
        height={64}
        priority
        style={{ width: "auto" }}
        className="hidden h-11 object-contain transition-transform duration-300 group-hover:scale-[1.02] lg:h-16 dark:block"
      />
    </Link>
  );
};

const PublicHeader = () => {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);
  const rightActionsRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tl = gsap.timeline();
    
    // Load animation: delayed slightly so hero goes first
    tl.from(logoRef.current, { y: -20, opacity: 0, duration: 0.6, ease: "power2.out", delay: 0.2 })
      .from(
        navLinksRef.current?.children ? Array.from(navLinksRef.current.children) : [], 
        { y: -20, opacity: 0, duration: 0.5, stagger: 0.08, ease: "power2.out" },
        "-=0.4"
      )
      .from(rightActionsRef.current, { y: -20, opacity: 0, duration: 0.6, ease: "power2.out" }, "-=0.4");

    // Scroll animation: shrink header
    gsap.to(navRef.current, {
      height: "4.5rem", // Shrink from h-24 to a smaller height
      scrollTrigger: {
        trigger: document.body,
        start: "top -50",
        end: "top -150",
        scrub: true,
      }
    });

    // Shrink logo slightly
    gsap.to(logoRef.current, {
      scale: 0.85,
      transformOrigin: "left center",
      scrollTrigger: {
        trigger: document.body,
        start: "top -50",
        end: "top -150",
        scrub: true,
      }
    });
  }, { scope: navRef });

  const isActiveRoute = (href: string) => {
    if (!pathname) return false;
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Desktop navigation bar */}
      <header className="hidden lg:block">
        <nav ref={navRef} className="nav-glass fixed left-0 top-0 z-100 h-24 w-full">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 xl:px-0">
            {/* Logo */}
            <div ref={logoRef}>
              <BrandLogo />
            </div>

            {/* Navigation links */}
            <div ref={navLinksRef} className="flex items-center gap-1 rounded-full border border-[#26336F]/60 dark:border-[#26336F] bg-secondary/70 dark:bg-[#18224b]/80 p-1.5 shadow-sm backdrop-blur-xl">
              {navRoutes.map((route) => {
                const active = isActiveRoute(route.href);
                const isServices = route.href === "/services";

                return (
                  <div key={route.href} className="relative group/nav">
                    <Link
                      href={route.href}
                      className={cn(
                        "group relative flex items-center gap-2 overflow-hidden rounded-full px-5 py-3",
                        "text-sm font-semibold text-muted-foreground transition-all duration-300",
                        "hover:bg-background hover:text-foreground",
                        active &&
                        "bg-primary text-primary-foreground shadow-md hover:bg-primary hover:text-primary-foreground"
                      )}
                    >
                      {active && (
                        <span className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.22),transparent_55%)]" />
                      )}

                      <route.icon
                        className={cn(
                          "relative z-10 h-4 w-4 transition-transform duration-300",
                          "group-hover:scale-110",
                          active && "text-current"
                        )}
                      />

                      <span className="relative z-10">{route.title}</span>
                    </Link>

                    {/* Services Mega-Menu Popover */}
                    {isServices && (
                      <div className="absolute left-1/2 top-full pt-2.5 -translate-x-1/2 w-80 opacity-0 pointer-events-none group-hover/nav:opacity-100 group-hover/nav:pointer-events-auto transition-all duration-200 z-50 before:absolute before:-top-4 before:left-0 before:right-0 before:h-6 before:content-['']">
                        <div className="rounded-2xl border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-2xl">
                          <div className="text-[10px] font-bold uppercase tracking-widest text-accent px-3 py-1.5 border-b border-border/50 mb-1">
                            Core Capabilities
                          </div>
                          <div className="grid gap-1">
                            {[
                              { title: "Web Development", href: "/services/web-design", desc: "Next.js, High-Speed Apps" },
                              { title: "Digital Marketing", href: "/services/digital-marketing", desc: "SEO, PPC & Growth" },
                              { title: "Design Solution", href: "/services/design-solution", desc: "Brand Identity Systems" },
                              { title: "Packaging Design", href: "/services/packaging-design", desc: "Structural Print & Box" },
                              { title: "Printing", href: "/services/printing", desc: "High-Quality Materials" },
                              { title: "Photography", href: "/services/photography", desc: "Editorial & Product Shoot" },
                            ].map((s, idx) => (
                              <Link
                                key={idx}
                                href={s.href}
                                className="group/item flex flex-col rounded-xl px-3 py-2 text-xs transition-colors hover:bg-accent/10"
                              >
                                <span className="font-bold text-foreground group-hover/item:text-accent">
                                  {s.title}
                                </span>
                                <span className="text-[11px] text-muted-foreground">
                                  {s.desc}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right actions */}
            <div ref={rightActionsRef} className="flex items-center gap-3">
              <ThemeToggle />

              <Link
                href="/contact"
                className={cn(
                  "brand-glow rounded-full bg-accent px-6 py-3 text-sm font-bold text-accent-foreground",
                  "transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent/90",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                )}
              >
                Start Project
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Space for fixed desktop navbar */}
      <div className="pt-0 lg:pt-24" />

      {/* Mobile top brand bar */}
      <header className="nav-glass fixed left-0 top-0 z-50 h-16 w-full lg:hidden">
        <div className="flex h-full items-center justify-between px-4">
          <BrandLogo />
          <ThemeToggle />
        </div>
      </header>

      {/* Space for fixed mobile top bar */}
      <div className="h-16 lg:hidden" />

      {/* Mobile bottom menu bar */}
      <nav className="fixed bottom-0 left-0 z-50 w-full border-t border-border dark:border-[#26336F]/50 bg-background/92 dark:bg-[#101735]/95 pb-[env(safe-area-inset-bottom)] shadow-[0_-18px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex h-20 max-w-md items-center justify-around px-2">
          {navRoutes.map((route) => {
            const active = isActiveRoute(route.href);

            return (
              <Link
                href={route.href}
                key={route.href}
                aria-label={route.title}
                className={cn(
                  "relative flex h-16 min-w-0 flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl",
                  "text-muted-foreground transition-all duration-300 active:scale-95",
                  "hover:text-foreground",
                  active && "text-accent"
                )}
              >
                {active && (
                  <>
                    <span className="absolute inset-x-2 top-1 h-14 rounded-2xl bg-accent/10" />
                    <span className="absolute top-1.5 h-1 w-6 rounded-full bg-accent" />
                  </>
                )}

                <route.icon
                  className={cn(
                    "relative z-10 h-5 w-5 transition-all duration-300",
                    active && "scale-110"
                  )}
                />

                <span
                  className={cn(
                    "relative z-10 max-w-full truncate px-1 text-[11px] font-bold leading-none transition-all duration-300",
                    active
                      ? "translate-y-0 opacity-100"
                      : "translate-y-1 opacity-70"
                  )}
                >
                  {route.title}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
};

export default PublicHeader;
