"use client";

import { useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    label: "Reference",
    heading: "We start with what you have.",
    body: "Mood boards. Brand guidelines. A vision in your head. A photo taken on a phone. Whatever exists — we work from it. Nothing is too raw for our process.",
  },
  {
    num: "02",
    label: "Alignment",
    heading: "We translate vision into direction.",
    body: "Before a single frame is generated, we align completely on character, tone, aesthetic, and narrative. The brief becomes a blueprint.",
  },
  {
    num: "03",
    label: "Production",
    heading: "The layers begin.",
    body: "Our proprietary multi-layered workflow takes over. This is where Black Vertex operates differently from every other studio in this space. The process is ours. The output speaks for itself.",
  },
  {
    num: "04",
    label: "Delivery",
    heading: "Broadcast-ready. Every time.",
    body: "Final assets delivered to specification — formatted, finished, and built to perform across every channel you need.",
    footnote: "Every project includes unlimited revision rounds until the output is exactly right. This is partnership, not production.",
  },
  {
    num: "05",
    label: "Iteration",
    heading: "Until it's exactly right.",
    body: "We don't deliver and disappear. Every project includes unlimited revision rounds — because the brief is just the beginning. We stay in it until the output matches the vision. That's what partnership looks like.",
  },
];

export default function HowItWorks() {
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
      id="process"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <div className="flex items-start justify-between mb-16 md:mb-24 reveal hidden-below">
        <span className="eyebrow">0.3&nbsp;&nbsp;Our Process</span>
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
          The Method
          <br />
          <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
            is the Product.
          </span>
        </h2>
      </div>

      <div className="reveal hidden-below delay-2 mb-16 md:mb-24">
        <p
          className="font-sans font-light text-[15px] leading-relaxed"
          style={{ color: "#6b7280" }}
        >
          Our full workflow is proprietary. What we share below is the shape of it — the layers are ours alone.
        </p>
      </div>

      <div className="divide-y" style={{ borderColor: "rgba(0,0,0,0.07)" }}>
        {steps.map((step, idx) => (
          <div
            key={idx}
            className={`reveal hidden-below delay-${idx + 3} grid grid-cols-12 gap-4 md:gap-6 py-8 md:py-12`}
          >
            <div className="col-span-12 md:col-span-1 flex items-center gap-3 md:block md:pt-1">
              <span
                className="font-mono text-xs font-medium"
                style={{ color: "#1a1a1a" }}
              >
                {step.num}
              </span>
              <p className="eyebrow md:hidden">{step.label}</p>
            </div>

            <div className="col-span-12 md:col-span-4">
              <p className="eyebrow mb-2 hidden md:block">{step.label}</p>
              <h3
                className="font-sans font-light text-gray-900"
                style={{
                  fontSize: "clamp(1.1rem, 2.2vw, 1.8rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.15,
                }}
              >
                {step.heading}
              </h3>
            </div>

            <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-center gap-3">
              <p
                className="font-sans font-light text-sm md:text-[15px] leading-relaxed"
                style={{ color: "#6b7280" }}
              >
                {step.body}
              </p>
              {step.footnote && (
                <p
                  className="font-sans font-light text-[11px] tracking-[0.08em] uppercase"
                  style={{ color: "#aaaaaa" }}
                >
                  {step.footnote}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
