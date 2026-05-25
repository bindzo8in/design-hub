"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type PathType = {
  topLeft: string;
  topRight: string;
  bottomLeft: string;
  bottomRight: string;
};

export default function PrintingSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const centerRef = useRef<HTMLDivElement>(null);

  const topLeftRef = useRef<HTMLDivElement>(null);
  const topRightRef = useRef<HTMLDivElement>(null);

  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);

  const [paths, setPaths] = useState<PathType>({
    topLeft: "",
    topRight: "",
    bottomLeft: "",
    bottomRight: "",
  });

  const createCurve = (
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) => {
    const offset = 120;

    return `
      M ${startX} ${startY}
      C ${startX + offset} ${startY},
        ${endX - offset} ${endY},
        ${endX} ${endY}
    `;
  };

  useEffect(() => {
    const updatePaths = () => {
      if (
        !containerRef.current ||
        !centerRef.current ||
        !topLeftRef.current ||
        !topRightRef.current ||
        !bottomLeftRef.current ||
        !bottomRightRef.current
      ) {
        return;
      }

      const container =
        containerRef.current.getBoundingClientRect();

      const center =
        centerRef.current.getBoundingClientRect();

      const topLeft =
        topLeftRef.current.getBoundingClientRect();

      const topRight =
        topRightRef.current.getBoundingClientRect();

      const bottomLeft =
        bottomLeftRef.current.getBoundingClientRect();

      const bottomRight =
        bottomRightRef.current.getBoundingClientRect();

      const centerX =
        center.left -
        container.left +
        center.width / 2;

      const centerY =
        center.top -
        container.top +
        center.height / 2;

      setPaths({
        topLeft: createCurve(
          topLeft.right - container.left,
          topLeft.top -
            container.top +
            topLeft.height / 2,
          centerX,
          centerY
        ),

        topRight: createCurve(
          centerX,
          centerY,
          topRight.left - container.left,
          topRight.top -
            container.top +
            topRight.height / 2
        ),

        bottomLeft: createCurve(
          bottomLeft.right - container.left,
          bottomLeft.top -
            container.top +
            bottomLeft.height / 2,
          centerX,
          centerY
        ),

        bottomRight: createCurve(
          centerX,
          centerY,
          bottomRight.left - container.left,
          bottomRight.top -
            container.top +
            bottomRight.height / 2
        ),
      });
    };

    updatePaths();

    window.addEventListener("resize", updatePaths);

    return () => {
      window.removeEventListener(
        "resize",
        updatePaths
      );
    };
  }, []);

  return (
    <section className="relative overflow-hidden bg-black py-32">
      {/* background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at center, #3b82f6 0%, transparent 20%),
              repeating-radial-gradient(
                circle at center,
                transparent 0,
                transparent 12px,
                rgba(255,255,255,0.06) 13px
              )
            `,
          }}
        />
      </div>

<div
  ref={containerRef}
  className="
    relative
    mx-auto
    max-w-7xl

    px-4
    sm:px-6
    lg:px-6
  "
>
  {/* ===================================== */}
  {/* MOBILE + TABLET */}
  {/* ===================================== */}

  <div className="space-y-8 lg:hidden">
    {/* hero image */}
    <div className="relative mx-auto w-fit">
      <Glow />

      <div
        className="
          relative overflow-hidden
          rounded-[2rem]
          border border-white/10
          bg-white/5
          p-3
          backdrop-blur-xl
        "
      >
        <Image
          src="/tmp/project_placeholder.webp"
          alt=""
          width={700}
          height={500}
          className="
            aspect-[4/3]
            w-full
            max-w-[520px]
            rounded-[1.5rem]
            object-cover
          "
        />
      </div>
    </div>

    {/* content cards */}
    <div className="grid gap-5 sm:grid-cols-2">
      {/* card 1 */}
      <div className="relative">
        <Glow />

        <GlassCard>
          <p>
            <strong>
              Branding & Marketing Prints:
            </strong>{" "}
            Brochures, flyers, catalogs.
          </p>

          <p className="mt-4">
            <strong>
              Corporate Printing:
            </strong>{" "}
            Business cards, letterheads,
            envelopes.
          </p>

          <p className="mt-4">
            <strong>
              Packaging Printing:
            </strong>{" "}
            Labels, stickers, cartons.
          </p>
        </GlassCard>
      </div>

      {/* card 2 */}
      <div className="relative">
        <Glow />

        <GlassCard>
          <p>
            <strong>
              Large Format Printing:
            </strong>{" "}
            Banners, flex boards,
            hoardings, standees.
          </p>

          <p className="mt-4">
            <strong>
              Outdoor & Transit Prints:
            </strong>{" "}
            Bus ads, barricades,
            vehicle graphics.
          </p>

          <p className="mt-4">
            <strong>
              Promotional Materials:
            </strong>{" "}
            Danglers, POP displays,
            signage.
          </p>
        </GlassCard>
      </div>
    </div>

    {/* bottom gallery */}
    <div className="grid grid-cols-2 gap-4">
      <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
        <Image
          src="/tmp/project_placeholder.webp"
          alt=""
          width={400}
          height={300}
          className="
            aspect-[4/3]
            w-full
            object-cover
          "
        />
      </div>

      <div className="relative overflow-hidden rounded-[1.5rem] border border-cyan-400/40">
        <Image
          src="/tmp/project_placeholder.webp"
          alt=""
          width={400}
          height={300}
          className="
            aspect-[4/3]
            w-full
            object-cover
          "
        />
      </div>
    </div>
  </div>

  {/* ===================================== */}
  {/* DESKTOP */}
  {/* ===================================== */}

  <div className="relative hidden grid-cols-3 gap-16 lg:grid">
    {/* LEFT */}
    <div className="flex flex-col justify-between gap-20">
      {/* top image */}
      <div
        ref={topLeftRef}
        className="relative mx-auto w-fit"
      >
        <Glow />

        <div className="relative overflow-hidden rounded-md border border-white/20 bg-zinc-900 p-2">
          <Image
            src="/tmp/project_placeholder.webp"
            alt=""
            width={260}
            height={160}
            className="object-cover"
          />
        </div>
      </div>

      {/* bottom card */}
      <div
        ref={bottomLeftRef}
        className="relative"
      >
        <Glow />

        <GlassCard>
          <p>
            <strong>
              Large Format Printing:
            </strong>{" "}
            Banners, flex boards,
            hoardings, standees.
          </p>

          <p className="mt-4">
            <strong>
              Outdoor & Transit Prints:
            </strong>{" "}
            Bus ads, barricades,
            vehicle graphics.
          </p>

          <p className="mt-4">
            <strong>
              Promotional Materials:
            </strong>{" "}
            Danglers, POP displays,
            signage.
          </p>
        </GlassCard>
      </div>
    </div>

    {/* CENTER */}
    <div className="flex items-center justify-center">
      <div
        ref={centerRef}
        className="relative"
      >
        <Glow large />

        <div className="relative overflow-hidden rounded-lg border border-white/10 bg-white/5 p-4 backdrop-blur-xl">
          <Image
            src="/tmp/project_placeholder.webp"
            alt=""
            width={320}
            height={220}
            className="object-cover"
          />
        </div>
      </div>
    </div>

    {/* RIGHT */}
    <div className="flex flex-col justify-between gap-20">
      {/* top card */}
      <div
        ref={topRightRef}
        className="relative"
      >
        <Glow />

        <GlassCard>
          <p>
            <strong>
              Branding & Marketing Prints:
            </strong>{" "}
            Brochures, flyers,
            catalogs.
          </p>

          <p className="mt-4">
            <strong>
              Corporate Printing:
            </strong>{" "}
            Business cards,
            letterheads, envelopes.
          </p>

          <p className="mt-4">
            <strong>
              Packaging Printing:
            </strong>{" "}
            Labels, stickers,
            cartons.
          </p>
        </GlassCard>
      </div>

      {/* bottom image */}
      <div
        ref={bottomRightRef}
        className="relative mx-auto w-fit"
      >
        <Glow />

        <div className="overflow-hidden rounded-md border border-cyan-400/50 bg-zinc-900 p-2 shadow-[0_0_40px_rgba(59,130,246,0.35)]">
          <Image
            src="/tmp/project_placeholder.webp"
            alt=""
            width={260}
            height={160}
            className="object-cover"
          />
        </div>
      </div>
    </div>

    {/* SVG CONNECTIONS */}
    <svg className="pointer-events-none absolute inset-0 h-full w-full">
      <path
        d={paths.topLeft}
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      <path
        d={paths.topRight}
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      <path
        d={paths.bottomLeft}
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      <path
        d={paths.bottomRight}
        stroke="white"
        strokeWidth="1.5"
        fill="none"
        opacity="0.5"
      />

      <circle cx="50%" cy="50%" r="4" fill="white" />
    </svg>
  </div>
</div>
    </section>
  );
}

function GlassCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[32px] border border-white/10 bg-white/5 p-8 text-sm leading-7 text-white/80 backdrop-blur-xl">
      {children}
    </div>
  );
}

function Glow({
  large = false,
}: {
  large?: boolean;
}) {
  return (
    <div
      className={`absolute left-1/2 top-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/40 blur-3xl ${
        large
          ? "h-[320px] w-[320px]"
          : "h-[220px] w-[220px]"
      }`}
    />
  );
}