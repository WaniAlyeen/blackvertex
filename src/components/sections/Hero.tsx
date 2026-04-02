"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-white overflow-hidden">

      {/* ─── MOBILE LAYOUT: image on top, text below ─── */}
      <div className="flex flex-col md:hidden">

        {/* Image */}
        <div className="relative w-full" style={{ minHeight: "60vh" }}>
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

        {/* Text block — glassmorphism panel overlapping image */}
        <div
          className="relative px-6 py-8"
          style={{
            marginTop: "-3rem",
            zIndex: 10,
            background: "rgba(255, 255, 255, 0.08)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <p
            className="font-medium uppercase mb-3"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "rgba(255, 255, 255, 0.6)",
            }}
          >
            BLACK VERTEX — EST. 2024
          </p>

          <h1
            className="font-light mb-2"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "#FFFFFF",
              textShadow: "0 1px 20px rgba(0,0,0,0.15)",
            }}
          >
            We Make the
            <br />
            Impossible,
            <br />
            Inevitable.<sup style={{ fontSize: "0.45em", verticalAlign: "super", letterSpacing: 0 }}>¹</sup>
          </h1>

          <p
            className="font-light mb-4"
            style={{ fontSize: "0.7rem", color: "rgba(255, 255, 255, 0.5)" }}
          >
            ¹ AI-powered advertising at the edge of what exists
          </p>

          <p
            className="font-light mb-6"
            style={{ fontSize: "0.9rem", color: "rgba(255, 255, 255, 0.75)" }}
          >
            Black Vertex is an AI consultancy building the advertisements
            your competition doesn&apos;t know how to make yet.
          </p>

          {/* CTA buttons — stacked, full width */}
          <div className="flex flex-col gap-3">
            <a
              href="/#contact"
              className="font-light text-center"
              style={{
                fontSize: "0.75rem",
                color: "#111111",
                border: "1px solid rgba(0,0,0,0.25)",
                borderRadius: "9999px",
                padding: "14px 16px",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Start a Project →
            </a>
            <a
              href="/#projects"
              className="font-light text-center"
              style={{
                fontSize: "0.75rem",
                color: "#6b7280",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "9999px",
                padding: "14px 16px",
                minHeight: "48px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              View Our Work →
            </a>
          </div>
        </div>
      </div>

      {/* ─── DESKTOP LAYOUT: full-bleed image, text overlay bottom-left ─── */}
      <div className="relative hidden md:block" style={{ minHeight: "100svh" }}>

        {/* Background image */}
        <div className="absolute inset-0">
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

        {/* Bottom vignette */}
        <div
          className="absolute bottom-0 inset-x-0 h-52 pointer-events-none z-[1]"
          style={{
            background:
              "linear-gradient(to top, rgba(250,250,248,0.88) 0%, transparent 100%)",
          }}
        />

        {/* Text — constrained to left 55% of viewport */}
        <div
          className="absolute bottom-12 left-10 z-10"
          style={{ maxWidth: "55vw" }}
        >
          <p
            className="font-medium uppercase mb-3"
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              color: "#aaaaaa",
            }}
          >
            BLACK VERTEX — EST. 2024
          </p>

          <h1
            className="font-light mb-1"
            style={{
              fontSize: "clamp(3rem, 5.5vw, 7rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "#111111",
            }}
          >
            We Make the
            <br />
            Impossible,
            <br />
            Inevitable.<sup style={{ fontSize: "0.45em", verticalAlign: "super", letterSpacing: 0 }}>¹</sup>
          </h1>

          <p
            className="font-light mb-4"
            style={{ fontSize: "0.6875rem", color: "#aaaaaa", wordWrap: "break-word" }}
          >
            ¹ AI-powered advertising at the edge of what exists
          </p>

          <p
            className="font-light mb-6"
            style={{ fontSize: "0.875rem", color: "#888888", maxWidth: "36rem" }}
          >
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
                padding: "6px 14px",
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
                padding: "6px 14px",
              }}
            >
              View Our Work →
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex items-center gap-2.5" style={{ color: "#aaaaaa" }}>
            <div
              className="w-6 h-6 flex items-center justify-center text-[12px]"
              style={{ border: "1px solid rgba(0,0,0,0.15)", borderRadius: "9999px" }}
            >
              ↓
            </div>
            <span className="text-[10px] font-light tracking-[0.2em] uppercase">
              Scroll
            </span>
          </div>
        </div>
      </div>

    </section>
  );
}
