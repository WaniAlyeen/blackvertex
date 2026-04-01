"use client";

import { useEffect, useRef } from "react";

const attributions = [
  { name: "Sarah Jenkins", role: "Nexus AI" },
  { name: "David Chen", role: "EduTech Global" },
  { name: "Elena Rossi", role: "Finserve" },
  { name: "Marcus Thorne", role: "Vanguard Media" },
  { name: "James Park", role: "Apex Brands" },
];

const stats = [
  { value: "400+", label: "Hours saved / month" },
  { value: "15", label: "Languages localized" },
  { value: "100×", label: "More creatives generated" },
];

export default function WhyTrustUs() {
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
      id="why-us"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.2&nbsp;&nbsp;Proof</span>
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
            Why trust
            <br />
            <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
              Black Vertex?
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-end reveal hidden-below delay-2">
          <blockquote
            className="font-sans font-light text-[17px] leading-relaxed mb-6"
            style={{ color: "#4b5563" }}
          >
            &ldquo;Black Vertex balances creative vision and technical execution
            extremely well. They&apos;ve built thoughtful production systems over
            advanced AI foundations — the content just delivers.&rdquo;
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "rgba(0,0,0,0.12)" }} />
            <span className="eyebrow">
              Sarah Jenkins — Head of Marketing, Nexus AI
            </span>
          </div>
        </div>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 gap-0 reveal hidden-below delay-3 section-rule"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.07)" }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            className="py-10 md:py-12 pr-12"
            style={{
              borderRight: i < stats.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              paddingLeft: i > 0 ? "clamp(1.5rem, 4vw, 3rem)" : "0",
            }}
          >
            <div
              className="font-sans font-light mb-2"
              style={{
                fontSize: "clamp(2rem, 4vw, 4rem)",
                letterSpacing: "-0.03em",
                color: "#1a1a1a",
              }}
            >
              {stat.value}
            </div>
            <div className="eyebrow">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mt-10 reveal hidden-below delay-4">
        {attributions.map((a, i) => (
          <div
            key={i}
            className="px-4 py-2 text-[13px] font-sans"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <span style={{ color: "#374151" }}>{a.name}</span>
            <span className="ml-2 eyebrow" style={{ fontSize: "10px" }}>
              {a.role}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
