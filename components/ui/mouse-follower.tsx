"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePathname } from "next/navigation";

export default function MouseFollower() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const cursorDot = cursorDotRef.current;
    const cursorRing = cursorRingRef.current;
    if (!cursorDot || !cursorRing) return;

    // Disable custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) {
      gsap.set([cursorDot, cursorRing], { display: "none" });
      return;
    }

    // Initial state
    gsap.set([cursorDot, cursorRing], { xPercent: -50, yPercent: -50, autoAlpha: 0 });

    const dotXSetter = gsap.quickSetter(cursorDot, "x", "px");
    const dotYSetter = gsap.quickSetter(cursorDot, "y", "px");
    const ringXSetter = gsap.quickSetter(cursorRing, "x", "px");
    const ringYSetter = gsap.quickSetter(cursorRing, "y", "px");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Instant update for the dot
      dotXSetter(mouseX);
      dotYSetter(mouseY);

      if (gsap.getProperty(cursorDot, "autoAlpha") === 0) {
        gsap.to([cursorDot, cursorRing], { autoAlpha: 1, duration: 0.3 });
      }
    };

    // Smooth follow for the ring
    const smoothFollow = () => {
      const currentRingX = parseFloat(gsap.getProperty(cursorRing, "x") as string) || mouseX;
      const currentRingY = parseFloat(gsap.getProperty(cursorRing, "y") as string) || mouseY;
      
      const dx = mouseX - currentRingX;
      const dy = mouseY - currentRingY;
      
      // Delay factor (0.15 for smooth drag)
      ringXSetter(currentRingX + dx * 0.15);
      ringYSetter(currentRingY + dy * 0.15);
    };

    gsap.ticker.add(smoothFollow);
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Hover effects for different interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Links & Buttons
      if (target.closest("a") || target.closest("button") || target.closest("[role='button']")) {
        gsap.to(cursorRing, { 
          scale: 1.8,
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "transparent",
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      } 
      // Headings
      else if (target.closest("h1") || target.closest("h2") || target.closest("h3")) {
        gsap.to(cursorRing, { 
          scale: 3, 
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderColor: "transparent",
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(cursorDot, {
          scale: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest("a") || target.closest("button") || target.closest("[role='button']") ||
        target.closest("h1") || target.closest("h2") || target.closest("h3")
      ) {
        gsap.to(cursorRing, { 
          scale: 1, 
          backgroundColor: "transparent",
          borderColor: "rgba(255, 255, 255, 0.4)",
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(cursorDot, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(smoothFollow);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [pathname]);

  return (
    <>
      <div
        ref={cursorDotRef}
        className="pointer-events-none fixed top-0 left-0 z-[10000] h-2 w-2 rounded-full bg-white mix-blend-difference hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
      <div
        ref={cursorRingRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-8 w-8 rounded-full border-[1.5px] border-white/40 mix-blend-difference transition-colors hidden md:block"
        style={{ transform: "translate(-50%, -50%)" }}
      />
    </>
  );
}