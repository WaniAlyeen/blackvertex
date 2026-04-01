"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    title: "Character-Consistent\nAI Talent",
    description:
      "Your brand deserves a face that never cancels, never ages, and shows up identically across every campaign, forever.\n\nWe build fully consistent AI characters — crafted from your references, your aesthetic, your vision. A brand ambassador that is entirely yours. One face. Infinite executions.",
    tags: "AI Casting  /  Character Consistency  /  Brand Identity",
  },
  {
    num: "02",
    title: "Systems That Work\nWhile You Sleep",
    description:
      "Beyond advertising, we architect AI-powered business pipelines — custom agents, automated workflows, and intelligent systems designed to remove friction, reduce overhead, and scale operations without scaling headcount.\n\nBuilt for businesses serious about efficiency.",
    tags: "AI Automation  /  Core Service",
  },
  {
    num: "03",
    title: "Any Image.\nStudio Output.",
    description:
      "Hand us a smartphone photo.\nWe hand you a broadcast-ready advertisement.\n\nThrough a proprietary multi-layered production workflow we developed entirely in-house, we transform raw client references — however imperfect — into pixel-perfect, cinematic brand content. No studio required. No compromise on quality.",
    tags: "AI Production  /  Image Enhancement  /  Brand Advertising",
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

      <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {services.map((service, idx) => (
          <div
            key={idx}
            className={`reveal hidden-below delay-${idx + 3} grid grid-cols-12 gap-6 py-10 md:py-12`}
          >
            <div className="col-span-2 md:col-span-1 flex items-start pt-1">
              <span
                className="font-mono text-[11px] font-medium"
                style={{ color: "#1a1a1a" }}
              >
                {service.num}
              </span>
            </div>

            <div className="col-span-10 md:col-span-4">
              <h3
                className="font-sans font-light text-gray-900"
                style={{
                  fontSize: "clamp(1.3rem, 2.2vw, 1.8rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                  whiteSpace: "pre-line",
                }}
              >
                {service.title}
              </h3>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center gap-4">
              <p
                className="font-sans font-light text-[15px] leading-relaxed"
                style={{ color: "#6b7280", whiteSpace: "pre-line" }}
              >
                {service.description}
              </p>
              <p
                className="font-sans font-light text-[11px] tracking-[0.12em] uppercase"
                style={{ color: "#aaaaaa" }}
              >
                {service.tags}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
