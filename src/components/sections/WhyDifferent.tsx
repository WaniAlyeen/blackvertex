"use client";

import { useEffect, useRef } from "react";

export default function WhyDifferent() {
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
    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="why-different"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.2&nbsp;&nbsp;The Difference</span>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-20 md:mb-28">
        <div className="col-span-12 md:col-span-5 reveal hidden-below delay-1">
          <h2
            className="font-sans font-light text-gray-900"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            We Work Where
            <br />
            <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
              Others Stop.
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-end reveal hidden-below delay-2">
          <p
            className="font-sans font-light text-[17px] leading-relaxed"
            style={{ color: "#4b5563", whiteSpace: "pre-line" }}
          >
            {`Most AI production companies avoid the hard problems.\nConsistent human faces. Repeatable character identity. Frame-perfect accuracy across a full campaign.\n\nThese are the problems that separate real AI production from filters and gimmicks. They are also the problems most of our competition quietly refuses to take on.\n\nWe do not refuse them. We have solved them.`}
          </p>
        </div>
      </div>

      {/* Mixed bento row */}
      <div
        className="reveal hidden-below delay-3"
        style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
      >
        {/* Block 1 — wide (flex: 2) */}
        <div
          style={{
            flex: "2 1 280px",
            background: "var(--bento-warm)",
            border: "1px solid rgba(255,107,53,0.15)",
            borderRadius: "16px",
            padding: "2rem",
          }}
        >
          {/* Stat */}
          <div style={{ marginBottom: "0.5rem" }}>
            <span
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "4rem",
                fontWeight: 800,
                color: "#0A0A0A",
                lineHeight: 1,
                display: "block",
              }}
            >
              100%
            </span>
            <span
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "rgba(0,0,0,0.4)",
                display: "block",
                marginTop: "0.25rem",
              }}
            >
              AI-Generated
            </span>
          </div>
          <div className="eyebrow mb-3" style={{ marginTop: "1.25rem" }}>Truly 100% AI-Generated</div>
          <p
            className="font-sans font-light text-sm leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            Every frame, every scene, every commercial we produce is generated entirely by AI. No cameras. No crews. No studios. Nothing shot on set.
          </p>
        </div>

        {/* Block 2 */}
        <div
          style={{
            flex: "1 1 200px",
            background: "var(--bento-cool)",
            border: "1px solid rgba(102,126,234,0.15)",
            borderRadius: "16px",
            padding: "1.75rem",
          }}
        >
          {/* Tool badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
            {["Kling 3.0", "Veo 3", "Runway"].map((tool) => (
              <span
                key={tool}
                style={{
                  background: "rgba(0,0,0,0.06)",
                  borderRadius: "100px",
                  padding: "4px 10px",
                  fontSize: "10px",
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "rgba(0,0,0,0.55)",
                  display: "inline-block",
                }}
              >
                {tool}
              </span>
            ))}
          </div>
          <div className="eyebrow mb-3">Best-in-Class AI Tools</div>
          <p
            className="font-sans font-light text-sm leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            We work with the most advanced generative video and image models available — combined through a proprietary multi-layered workflow built entirely in-house.
          </p>
        </div>

        {/* Block 3 */}
        <div
          style={{
            flex: "1 1 200px",
            background: "var(--bento-pink)",
            border: "1px solid rgba(255,60,172,0.12)",
            borderRadius: "16px",
            padding: "1.75rem",
          }}
        >
          {/* Checklist */}
          <div style={{ marginBottom: "1rem", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            {[
              "Send your product images",
              "We handle production",
              "Receive broadcast-ready video",
            ].map((step) => (
              <div
                key={step}
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "13px",
                  color: "rgba(0,0,0,0.6)",
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span style={{ color: "#34D399", fontWeight: 700 }}>✓</span>
                {step}
              </div>
            ))}
          </div>
          <div className="eyebrow mb-3">Simple to Get Started</div>
          <p
            className="font-sans font-light text-sm leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            Send us your product images and a brief. That&apos;s all we need. No production prep, no logistics, no lead time. We handle everything from there.
          </p>
        </div>
      </div>
    </section>
  );
}
