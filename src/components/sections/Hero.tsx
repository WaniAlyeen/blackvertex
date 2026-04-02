"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-white" style={{ minHeight: "100svh" }}>
      {/* Mobile background */}
      <div className="block md:hidden absolute inset-0">
        <Image
          src="/phbg.png"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-top"
          sizes="100vw"
        />
      </div>

      {/* Desktop background */}
      <div className="hidden md:block absolute inset-0">
        <Image
          src="/bg.png"
          alt=""
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Subtle bottom vignette only — for text readability */}
      <div
        className="absolute bottom-0 inset-x-0 h-52 pointer-events-none z-[1]"
        style={{
          background:
            "linear-gradient(to top, rgba(250,250,248,0.88) 0%, transparent 100%)",
        }}
      />

      {/* Bottom-left content — sits above vignette */}
      <div
        className="absolute bottom-10 left-5 right-5 md:left-10 md:right-auto z-10 md:max-w-sm px-1"
        style={{ zIndex: 2 }}
      >
        <p
          className="font-medium uppercase mb-3"
          style={{
            fontSize: "clamp(0.55rem, 2vw, 0.6875rem)",
            letterSpacing: "0.12em",
            color: "#aaaaaa",
          }}
        >
          BLACK VERTEX — EST. 2024
        </p>

        <h1
          className="font-light mb-1"
          style={{
            fontSize: "clamp(2.2rem, 9vw, 9rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "#111111",
          }}
        >
          We Make the
          <br />
          Impossible,
          <br />
          Inevitable.<sup style={{ fontSize: "0.55em", verticalAlign: "super", letterSpacing: 0 }}>¹</sup>
        </h1>

        <p
          className="font-light mb-4"
          style={{
            fontSize: "clamp(0.6rem, 2vw, 0.6875rem)",
            color: "#aaaaaa",
            wordWrap: "break-word",
          }}
        >
          ¹ AI-powered advertising at the edge of what exists
        </p>

        <p
          className="font-light mb-6"
          style={{
            fontSize: "clamp(0.8rem, 2.5vw, 0.875rem)",
            color: "#888888",
            maxWidth: "100%",
          }}
        >
          Black Vertex is an AI consultancy building the advertisements
          your competition doesn&apos;t know how to make yet.
        </p>

        {/* CTA buttons — stack on mobile, side-by-side on desktop */}
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-2 mb-7">
          <a
            href="/#contact"
            className="text-[11px] font-light text-center"
            style={{
              color: "#111111",
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "9999px",
              padding: "8px 16px",
            }}
          >
            Start a Project →
          </a>
          <a
            href="/#projects"
            className="text-[11px] font-light text-center"
            style={{
              color: "#6b7280",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: "9999px",
              padding: "8px 16px",
            }}
          >
            View Our Work →
          </a>
        </div>

        {/* Scroll indicator — desktop only */}
        <div
          className="hidden md:flex items-center gap-2.5"
          style={{ color: "#aaaaaa" }}
        >
          <div
            className="w-6 h-6 flex items-center justify-center text-[12px]"
            style={{
              border: "1px solid rgba(0,0,0,0.15)",
              borderRadius: "9999px",
            }}
          >
            ↓
          </div>
          <span className="text-[10px] font-light tracking-[0.2em] uppercase">
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
