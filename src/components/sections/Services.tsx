"use client";

import { useEffect, useRef } from "react";

const services = [
  {
    num: "01",
    ariaLabel: "AI Product Video Ads — High-Converting Product Advertisements from Your Images",
    title: "AI Product\nVideo Ads",
    subtitle: "From your product images\nto broadcast-ready ads.",
    description:
      "Send us your product images. We return a professionally produced video ad engineered to stop scroll and drive action.\n\nOur AI production pipeline transforms even basic product photography into broadcast-quality commercial content — color-graded, sound-designed, and optimised for every platform you run.",
    tags: "Performance Creative  /  Image-to-Ad  /  Platform Advertising",
  },
  {
    num: "02",
    ariaLabel: "Cinematic AI Commercials for Brands — Premium AI Brand Film Production",
    title: "Cinematic AI\nCommercials",
    subtitle: "Brand films and premium commercials\nfor campaigns that demand more.",
    description:
      "We produce long-form cinematic commercials entirely through AI — no studios, no crews, no location logistics.\n\nFrom brand launches to campaign hero films, we build premium video narratives that match the quality of broadcast production at a fraction of the time and cost. Every frame directed with intention.",
    tags: "Brand Films  /  Campaign Creative  /  Broadcast Quality",
  },
  {
    num: "03",
    ariaLabel: "AI Animation and Product Reveal Videos — Stylized Motion and Cinematic Showcases",
    title: "AI Animation &\nProduct Reveals",
    subtitle: "Stylized animation and cinematic\nproduct showcases.",
    description:
      "From Pixar-style character animation to dramatic product reveal sequences, we produce motion content that traditional studios cannot match at this speed or price point.\n\nEvery animation and reveal is built to specification — your aesthetic, your pacing, your brand world. Fully AI-generated. Fully original.",
    tags: "AI Animation  /  Product Showcases  /  Motion Design",
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
            aria-label={service.ariaLabel}
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
              <p
                className="font-sans font-light text-[13px] leading-snug mt-2"
                style={{ color: "#9ca3af", whiteSpace: "pre-line" }}
              >
                {service.subtitle}
              </p>
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
