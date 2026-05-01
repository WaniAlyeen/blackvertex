"use client";

import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full bg-white overflow-hidden">

      {/* Gradient mesh — behind both layouts */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse at 15% 60%, rgba(255,107,53,0.10) 0%, transparent 55%),
            radial-gradient(ellipse at 85% 15%, rgba(102,126,234,0.09) 0%, transparent 55%),
            radial-gradient(ellipse at 55% 85%, rgba(255,60,172,0.07) 0%, transparent 50%)
          `,
        }}
      />

      {/* ─── MOBILE LAYOUT: text overlaid directly on full-screen image ─── */}
      <div className="relative z-10 md:hidden" style={{ height: "100svh" }}>

        {/* Image — full screen */}
        <div className="absolute inset-0" style={{ zIndex: 0 }}>
          <Image
            src="/phbg.png"
            alt=""
            fill
            priority
            quality={75}
            className="object-cover object-top"
            sizes="(max-width: 768px) 100vw, 100vw"
          />
        </div>

        {/* Subtle bottom gradient — darkens just enough for text readability */}
        <div
          className="absolute bottom-0 left-0 right-0 pointer-events-none"
          style={{
            height: "50%",
            background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.18))",
            zIndex: 1,
          }}
        />

        {/* Text — absolute bottom, no background */}
        <div
          className="absolute bottom-0 left-0 right-0 px-6 pb-10"
          style={{ zIndex: 10 }}
        >
          <p
            className="font-medium uppercase mb-3"
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.12em",
              color: "#333333",
            }}
          >
            BLACK VERTEX — EST. 2024
          </p>

          <h1
            className="mb-2"
            style={{
              fontSize: "clamp(2.4rem, 8vw, 3.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              fontWeight: 500,
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
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.8rem",
              color: "rgba(0,0,0,0.3)",
              maxWidth: "480px",
              marginTop: "0.75rem",
              lineHeight: 1.5,
            }}
          >
            AI Video Production Studio — Cinematic commercials, product video ads, AI animation, and product reveal videos for product brands.
          </p>

          <p
            className="font-light mb-4"
            style={{ fontSize: "0.7rem", color: "#666666" }}
          >
            ¹ AI-powered advertising at the edge of what exists
          </p>

          <p
            className="font-light mb-6"
            style={{ fontSize: "0.9rem", color: "#444444" }}
          >
            Black Vertex is a 100% AI-powered video production studio. We create cinematic commercials, product video ads, AI animation, and product reveal videos — no cameras, no crews, no compromises.
          </p>

          {/* CTA buttons — stacked, full width */}
          <div className="flex flex-col gap-3">
            <a href="/#contact" className="btn-gradient">
              Start a Project →
            </a>
            <a
              href="/#projects"
              className="font-light text-center"
              style={{
                fontSize: "0.75rem",
                color: "#444444",
                border: "1px solid rgba(0,0,0,0.15)",
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
      <div className="relative z-10 hidden md:block" style={{ minHeight: "100svh" }}>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/bg.png"
            alt=""
            fill
            priority
            quality={75}
            className="object-cover object-center"
            sizes="(max-width: 1200px) 100vw, 100vw"
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
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "0.8rem",
              color: "rgba(0,0,0,0.3)",
              maxWidth: "480px",
              marginTop: "0.75rem",
              lineHeight: 1.5,
            }}
          >
            AI Video Production Studio — Cinematic commercials, product video ads, AI animation, and product reveal videos for product brands.
          </p>

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
            Black Vertex is a 100% AI-powered video production studio. We create cinematic commercials, product video ads, AI animation, and product reveal videos — no cameras, no crews, no compromises.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-2 mb-7">
            <a href="/#contact" className="btn-gradient" style={{ fontSize: "0.8125rem", padding: "8px 18px" }}>
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
