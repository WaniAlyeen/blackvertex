"use client";

import { useEffect, useRef } from "react";

export default function CTA() {
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
      id="contact"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      {/* Eyebrow */}
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.8&nbsp;&nbsp;Let&apos;s Begin</span>
      </div>

      {/* Large heading */}
      <div className="reveal hidden-below delay-1 mb-16 md:mb-20">
        <h2
          className="font-sans font-light text-foreground"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 7.5rem)",
            lineHeight: 1.0,
            letterSpacing: "-0.03em",
          }}
        >
          Your Brand.
          <br />
          <span
            style={{
              paddingLeft: "clamp(1rem, 8%, 6rem)",
              fontStyle: "italic",
            }}
          >
            A New Dimension.
          </span>
        </h2>
      </div>

      {/* Bottom row */}
      <div
        className="reveal hidden-below delay-2 flex flex-col md:flex-row md:items-end justify-between gap-10 pt-10"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <p
          className="font-sans font-light text-[15px] leading-relaxed max-w-sm"
          style={{ color: "#9ca3af" }}
        >
          If you have a product, a vision, or a problem that traditional
          production cannot solve — we should talk. Bring us your references.
          We will bring you the impossible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <a
            href="mailto:hello@blackvertex.io"
            className="btn-fill px-8 py-4 text-[13px] font-sans font-light tracking-wide"
          >
            Start a Project →
          </a>
          <a
            href="mailto:hello@blackvertex.io"
            className="btn-fill px-8 py-4 text-[13px] font-sans font-light tracking-wide"
            style={{ borderColor: "rgba(0,0,0,0.1)" }}
          >
            hello@blackvertex.io
          </a>
        </div>
      </div>
    </section>
  );
}
