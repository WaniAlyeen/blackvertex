"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 pointer-events-none">
        <Image
          src="/bg.png"
          alt=""
          fill
          className="object-cover"
          priority
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
      <div className="absolute bottom-12 left-10 z-10 max-w-sm" style={{ zIndex: 2 }}>
        <p
          className="text-[11px] font-medium tracking-[0.22em] uppercase mb-3"
          style={{ color: "#aaaaaa" }}
        >
          BLACK VERTEX — EST. 2024
        </p>

        <h1
          className="text-[1.75rem] font-light leading-snug mb-1"
          style={{ color: "#111111", letterSpacing: "-0.02em" }}
        >
          We Make the
          <br />
          Impossible,
          <br />
          Inevitable.<sup style={{ fontSize: "0.55em", verticalAlign: "super", letterSpacing: 0 }}>¹</sup>
        </h1>

        <p className="text-[11px] font-light mb-4" style={{ color: "#aaaaaa" }}>
          ¹ AI-powered advertising at the edge of what exists
        </p>

        <p className="text-sm font-light mb-6" style={{ color: "#888888" }}>
          Black Vertex is an AI consultancy building the advertisements
          your competition doesn&apos;t know how to make yet.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-wrap gap-2 mb-7">
          <a
            href="/#contact"
            className="text-[11px] font-light"
            style={{
              color: "#111111",
              border: "1px solid rgba(0,0,0,0.25)",
              borderRadius: "9999px",
              padding: "4px 12px",
            }}
          >
            Start a Project →
          </a>
          <a
            href="/#projects"
            className="text-[11px] font-light"
            style={{
              color: "#6b7280",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: "9999px",
              padding: "4px 12px",
            }}
          >
            View Our Work →
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          className="flex items-center gap-2.5"
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
          <span
            className="text-[10px] font-light tracking-[0.2em] uppercase"
          >
            Scroll
          </span>
        </div>
      </div>
    </section>
  );
}
