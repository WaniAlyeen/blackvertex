"use client";

import { useEffect, useRef } from "react";

const blocks = [
  {
    label: "The Hard Part",
    text: "Consistent human faces across every frame of every video — without a single real shoot.",
  },
  {
    label: "The Rarer Part",
    text: "A proprietary workflow built from zero. No off-the-shelf pipeline. No shared process. No competitor has seen it.",
  },
  {
    label: "The Result",
    text: "Advertisements that look like they cost ten times what they did — and perform like it too.",
  },
];

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

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-0 reveal hidden-below delay-3 section-rule"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        {blocks.map((block, i) => (
          <div
            key={i}
            className={`py-6 md:py-12 pr-0 md:pr-12${i < blocks.length - 1 ? " border-b border-gray-100 md:border-b-0" : ""}`}
            style={{
              borderRight: i < blocks.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              paddingLeft: i > 0 ? "clamp(0rem, 4vw, 3rem)" : "0",
            }}
          >
            <div className="eyebrow mb-3">{block.label}</div>
            <p
              className="font-sans font-light text-sm md:text-[14px] leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              {block.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
