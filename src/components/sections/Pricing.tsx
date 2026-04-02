"use client";

import { useEffect, useRef } from "react";

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
        <span className="eyebrow">Pricing</span>
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
          Built Around
          <br />
          <span
            style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}
          >
            Your Problem.
          </span>
        </h2>
      </div>

      {/* Body */}
      <div className="reveal hidden-below delay-2 mb-12 md:mb-16 max-w-2xl">
        <p
          className="font-sans font-light text-[15px] leading-relaxed mb-6"
          style={{ color: "#6b7280" }}
        >
          Every project we take on is different in scope, complexity, and ambition.
          We don&apos;t believe a price list does justice to that.
        </p>
        <p
          className="font-sans font-light text-[15px] leading-relaxed mb-6"
          style={{ color: "#6b7280" }}
        >
          We typically partner with brands investing seriously in their content and
          growth. If you have a vision worth executing, we want to hear it — no
          matter where you&apos;re starting from.
        </p>
        <p
          className="font-sans font-light text-[15px] leading-relaxed"
          style={{ color: "#6b7280" }}
        >
          Tell us what you&apos;re building. We&apos;ll tell you exactly what it takes.
        </p>
      </div>

      {/* CTA */}
      <div className="reveal hidden-below delay-3 flex flex-col items-start gap-4">
        <a
          href="mailto:hello@blackvertex.io"
          className="btn-fill inline-flex items-center px-6 py-3 text-[13px] font-sans font-light tracking-wide"
        >
          Start a Conversation →
        </a>
        <p
          className="font-sans font-light text-[11px] leading-relaxed"
          style={{ color: "#aaaaaa" }}
        >
          * Most brand campaigns are scoped after an initial consultation. We&apos;ll
          give you a clear number before any work begins. No surprises.
        </p>
      </div>
    </section>
  );
}
