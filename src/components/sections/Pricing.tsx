"use client";

import { useEffect, useRef } from "react";

const tiers = [
  {
    name: "Starter",
    price: "$1,000",
    period: "/ project",
    description: "Perfect for brands entering cinematic advertising.",
    features: [
      "30-second cinematic advertisement",
      "Online team support",
      "2 revisions included",
      "Turnaround: 1 week",
    ],
    cta: "Get started →",
    ctaHref: "mailto:hello@blackvertex.io",
    featured: false,
  },
  {
    name: "Pro",
    price: "$1,500",
    period: "/ project",
    description: "One flagship video or three punchy reels.",
    features: [
      "60-second cinematic project",
      "OR 3 reels × 20 seconds each",
      "Online team support",
      "4 revisions included",
      "Turnaround: 5 days",
    ],
    cta: "Book a demo →",
    ctaHref: "mailto:hello@blackvertex.io",
    featured: true,
  },
  {
    name: "Scale",
    price: "$4,000",
    period: "/ project",
    description: "Full content suite for high-output brands.",
    features: [
      "4 videos × 60 seconds each",
      "Dedicated assistant",
      "Unlimited revisions",
      "1 video per 6 days",
      "OR 4 min of content, split freely",
    ],
    cta: "Book a demo →",
    ctaHref: "mailto:hello@blackvertex.io",
    featured: false,
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);

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

    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      {/* Eyebrow */}
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.5&nbsp;&nbsp;Investment</span>
      </div>

      {/* Heading */}
      <div className="reveal hidden-below delay-1 mb-16 md:mb-20">
        <h2
          className="font-sans font-light text-foreground"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Simple pricing
          <br />
          <span
            style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}
          >
            you can trust.
          </span>
        </h2>
      </div>

      {/* Desktop table */}
      <div
        className="hidden md:grid grid-cols-3 mb-0 reveal hidden-below delay-2"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="pb-8 pr-8"
            style={{
              borderRight:
                i < tiers.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 2.5rem)" : "0",
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="eyebrow">{tier.name}</span>
              {tier.featured && (
                <span
                  className="eyebrow px-2 py-1"
                  style={{
                    fontSize: "9px",
                    border: "1px solid rgba(0,0,0,0.15)",
                    color: "#6b7280",
                  }}
                >
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mt-3">
              <span
                className="font-sans font-light"
                style={{
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {tier.price}
              </span>
              <span className="eyebrow">{tier.period}</span>
            </div>
            <p
              className="font-sans font-light text-[13px] mt-3 leading-relaxed"
              style={{ color: "#9ca3af" }}
            >
              {tier.description}
            </p>
          </div>
        ))}
      </div>

      {/* Feature rows — desktop */}
      {Array.from({ length: Math.max(...tiers.map((t) => t.features.length)) }).map(
        (_, rowIdx) => (
          <div
            key={rowIdx}
            className="hidden md:grid grid-cols-3 reveal hidden-below"
            style={{
              borderBottom: "1px solid rgba(0,0,0,0.07)",
              transitionDelay: `${0.3 + rowIdx * 0.05}s`,
            }}
          >
            {tiers.map((tier, colIdx) => (
              <div
                key={colIdx}
                className="py-5 pr-8"
                style={{
                  borderRight:
                    colIdx < tiers.length - 1
                      ? "1px solid rgba(0,0,0,0.07)"
                      : "none",
                  paddingLeft:
                    colIdx > 0 ? "clamp(1.5rem, 3vw, 2.5rem)" : "0",
                }}
              >
                {tier.features[rowIdx] ? (
                  <span
                    className="font-sans font-light text-[14px]"
                    style={{ color: "#6b7280" }}
                  >
                    {tier.features[rowIdx]}
                  </span>
                ) : (
                  <span
                    className="block w-4 h-px"
                    style={{ background: "rgba(0,0,0,0.1)" }}
                  />
                )}
              </div>
            ))}
          </div>
        )
      )}

      {/* CTA row — desktop */}
      <div className="hidden md:grid grid-cols-3 mt-10 reveal hidden-below delay-5">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="pr-8"
            style={{
              paddingLeft: i > 0 ? "clamp(1.5rem, 3vw, 2.5rem)" : "0",
            }}
          >
            <a
              href={tier.ctaHref}
              className="btn-fill inline-flex items-center px-6 py-3 text-[13px] font-sans font-light tracking-wide"
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-6 reveal hidden-below delay-2">
        {tiers.map((tier, i) => (
          <div
            key={i}
            className="p-7 bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="eyebrow">{tier.name}</span>
              {tier.featured && (
                <span
                  className="eyebrow px-2 py-1"
                  style={{
                    fontSize: "9px",
                    border: "1px solid rgba(0,0,0,0.15)",
                    color: "#6b7280",
                  }}
                >
                  Popular
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-1 mb-4">
              <span
                className="font-sans font-light"
                style={{
                  fontSize: "2.5rem",
                  letterSpacing: "-0.03em",
                  color: "#1a1a1a",
                }}
              >
                {tier.price}
              </span>
              <span className="eyebrow">{tier.period}</span>
            </div>
            <ul className="mb-7 flex flex-col gap-2.5">
              {tier.features.map((feat, fi) => (
                <li
                  key={fi}
                  className="flex items-start gap-2.5 font-sans font-light text-[14px]"
                  style={{ color: "#6b7280" }}
                >
                  <span
                    className="mt-2 w-1 h-1 shrink-0"
                    style={{ background: "rgba(0,0,0,0.2)" }}
                  />
                  {feat}
                </li>
              ))}
            </ul>
            <a
              href={tier.ctaHref}
              className="btn-fill inline-flex items-center px-6 py-3 text-[13px] font-sans font-light tracking-wide"
            >
              {tier.cta}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
