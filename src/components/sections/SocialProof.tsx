"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export default function SocialProof() {
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
      id="proof"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      {/* Eyebrow */}
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.5&nbsp;&nbsp;Proof</span>
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
          The Work
          <br />
          <span style={{ paddingLeft: "clamp(1rem, 8%, 6rem)", fontStyle: "italic" }}>
            Says Everything.
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
          We do not make promises. We make advertisements. Every project in our
          portfolio started with a brief, a reference, and a problem most studios
          declined to take on.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
          <Link
            href="/work"
            className="btn-fill px-8 py-4 text-[13px] font-sans font-light tracking-wide"
          >
            View Case Studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
