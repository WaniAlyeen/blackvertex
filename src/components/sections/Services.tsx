"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

const services = [
  {
    num: "01",
    ariaLabel: "AI Product Video Ads — High-Converting Product Advertisements from Your Images",
    title: "AI Product\nVideo Ads",
    subtitle: "From your product images\nto broadcast-ready ads.",
    description:
      "Send us your product images. We return a professionally produced video ad engineered to stop scroll and drive action.\n\nOur AI production pipeline transforms even basic product photography into broadcast-quality commercial content — color-graded, sound-designed, and optimised for every platform you run.",
    tags: "Performance Creative  /  Image-to-Ad  /  Platform Advertising",
    href: "/services/ai-product-video-ads",
    dotColor: "#FF6B35",
    accentBg: "rgba(255, 107, 53, 0.25)",
    accentBg2: null,
  },
  {
    num: "02",
    ariaLabel: "Cinematic AI Commercials for Brands — Premium AI Brand Film Production",
    title: "Cinematic AI\nCommercials",
    subtitle: "Brand films and premium commercials\nfor campaigns that demand more.",
    description:
      "We produce long-form cinematic commercials entirely through AI — no studios, no crews, no location logistics.\n\nFrom brand launches to campaign hero films, we build premium video narratives that match the quality of broadcast production at a fraction of the time and cost. Every frame directed with intention.",
    tags: "Brand Films  /  Campaign Creative  /  Broadcast Quality",
    href: "/services/cinematic-ai-commercials",
    dotColor: "#667EEA",
    accentBg: "rgba(102, 126, 234, 0.25)",
    accentBg2: "rgba(255, 60, 172, 0.15)",
  },
  {
    num: "03",
    ariaLabel: "AI Animation and Product Reveal Videos — Stylized Motion and Cinematic Showcases",
    title: "AI Animation &\nProduct Reveals",
    subtitle: "Stylized animation and cinematic\nproduct showcases.",
    description:
      "From Pixar-style character animation to dramatic product reveal sequences, we produce motion content that traditional studios cannot match at this speed or price point.\n\nEvery animation and reveal is built to specification — your aesthetic, your pacing, your brand world. Fully AI-generated. Fully original.",
    tags: "AI Animation  /  Product Showcases  /  Motion Design",
    href: "/services/ai-animation-studio",
    dotColor: "#34D399",
    accentBg: "rgba(52, 211, 153, 0.25)",
    accentBg2: null,
  },
];

function useBidirectionalReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden-below", "hidden-above");
          } else {
            const rect = entry.boundingClientRect;
            entry.target.classList.remove("visible");
            if (rect.top > 0) {
              entry.target.classList.add("hidden-below");
            } else {
              entry.target.classList.add("hidden-above");
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    ref.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ref]);
}

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  useBidirectionalReveal(sectionRef);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <style>{`
        .bento-card {
          background: #FFFFFF;
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 16px;
          padding: 2rem;
          overflow: hidden;
          position: relative;
          transition: all 220ms ease;
        }
        .bento-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 32px rgba(0,0,0,0.08);
          border-color: rgba(0,0,0,0.12);
        }
        .bento-explore {
          font-family: var(--font-dm-sans), sans-serif;
          font-size: 13px;
          font-weight: 500;
          color: #0A0A0A;
          text-decoration: none;
          transition: color 150ms ease;
          display: inline-block;
        }
        .bento-explore:hover {
          background: var(--gradient-warm);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        @media (max-width: 767px) {
          .bento-grid { display: flex !important; flex-direction: column; gap: 1rem; }
          .bento-card-tall { grid-row: span 1 !important; }
        }
        @media (min-width: 768px) and (max-width: 1279px) {
          .bento-grid { grid-template-columns: 1fr 1fr !important; }
          .bento-card-tall { grid-row: span 1 !important; }
          .bento-card-3 { grid-column: 1 / -1 !important; }
        }
      `}</style>

      <div className="flex items-start justify-between mb-16 md:mb-24 reveal hidden-below">
        <span className="eyebrow">0.1&nbsp;&nbsp;What We Do</span>
      </div>

      <div className="reveal hidden-below delay-1 mb-10 md:mb-16">
        <h2
          className="font-sans font-light text-foreground"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          One Suite.
          <br />
          <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
            Every Dimension.
          </span>
        </h2>
      </div>

      <div className="reveal hidden-below delay-2 mb-16 md:mb-24">
        <p
          className="font-sans font-light text-[15px] leading-relaxed"
          style={{ color: "#6b7280" }}
        >
          We do not follow production playbooks. We wrote our own.
        </p>
      </div>

      {/* Bento grid */}
      <div
        className="bento-grid reveal hidden-below delay-3"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: "1.25rem",
        }}
      >
        {/* Card 1 — col 1, row 1 */}
        <div
          className="bento-card"
          aria-label={services[0].ariaLabel}
          style={{ gridColumn: "1", gridRow: "1" }}
        >
          {/* accent circle top-right */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: services[0].accentBg,
              filter: "blur(40px)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <CardBody service={services[0]} />
        </div>

        {/* Card 2 — col 2, rows 1-2 */}
        <div
          className="bento-card bento-card-tall"
          aria-label={services[1].ariaLabel}
          style={{ gridColumn: "2", gridRow: "1 / span 2" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: services[1].accentBg,
              filter: "blur(40px)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              bottom: "-30px",
              left: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: services[1].accentBg2 ?? "transparent",
              filter: "blur(40px)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <CardBody service={services[1]} />
        </div>

        {/* Card 3 — col 1, row 2 */}
        <div
          className="bento-card bento-card-3"
          aria-label={services[2].ariaLabel}
          style={{ gridColumn: "1", gridRow: "2" }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-30px",
              right: "-30px",
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: services[2].accentBg,
              filter: "blur(40px)",
              opacity: 0.5,
              pointerEvents: "none",
            }}
          />
          <CardBody service={services[2]} />
        </div>
      </div>
    </section>
  );
}

interface ServiceItem {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string;
  href: string;
  dotColor: string;
  accentBg: string;
  accentBg2: string | null;
  ariaLabel: string;
}

function CardBody({ service }: { service: ServiceItem }) {
  return (
    <div className="flex flex-col h-full" style={{ position: "relative", zIndex: 1 }}>
      {/* Number */}
      <span
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "11px",
          letterSpacing: "0.1em",
          color: "rgba(0,0,0,0.3)",
        }}
      >
        {service.num}
      </span>

      {/* Title */}
      <h3
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "1.375rem",
          fontWeight: 700,
          color: "#0A0A0A",
          letterSpacing: "-0.02em",
          lineHeight: 1.2,
          marginTop: "0.5rem",
          whiteSpace: "pre-line",
        }}
      >
        {service.title}
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.8125rem",
          color: "#9ca3af",
          lineHeight: 1.4,
          marginTop: "0.5rem",
          whiteSpace: "pre-line",
        }}
      >
        {service.subtitle}
      </p>

      {/* Body */}
      <p
        style={{
          fontFamily: "var(--font-dm-sans), sans-serif",
          fontSize: "0.9375rem",
          color: "#555555",
          lineHeight: 1.75,
          marginTop: "1.25rem",
          whiteSpace: "pre-line",
          flex: 1,
        }}
      >
        {service.description}
      </p>

      {/* Tag line */}
      <p
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          fontSize: "10px",
          letterSpacing: "0.08em",
          color: "rgba(0,0,0,0.35)",
          textTransform: "uppercase",
          marginTop: "1.5rem",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            background: service.dotColor,
            marginRight: "6px",
            verticalAlign: "middle",
          }}
        />
        {service.tags}
      </p>

      {/* Explore link */}
      <div style={{ marginTop: "1rem" }}>
        <Link href={service.href} className="bento-explore">
          Explore →
        </Link>
      </div>
    </div>
  );
}
