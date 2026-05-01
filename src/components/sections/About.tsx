"use client";

import { useEffect, useRef } from "react";

export default function About() {
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
      id="about"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.5&nbsp;&nbsp;Who We Are</span>
      </div>

      <div className="grid grid-cols-12 gap-8 mb-16 md:mb-20">
        <div className="col-span-12 md:col-span-5 reveal hidden-below delay-1">
          <h2
            className="font-sans font-light text-gray-900"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Built at the
            <br />
            <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
              Bleeding Edge.
            </span>
          </h2>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-end reveal hidden-below delay-2">
          <p
            className="font-sans font-light text-[17px] leading-relaxed"
            style={{ color: "#4b5563", whiteSpace: "pre-line" }}
          >
            {`Black Vertex Inc. is a one-of-a-kind AI video production studio specializing in high-quality, fully AI-generated commercials, product video ads, animations, and product reveal videos for product brands.\n\nWe are one of the only studios in the world operating at 100% AI capacity — no cameras, no crews, no studios. Just cutting-edge artificial intelligence and a proprietary production workflow built entirely from scratch.`}
          </p>
        </div>
      </div>

      <div
        className="grid grid-cols-12 gap-8 pt-10 reveal hidden-below delay-3"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <div className="col-span-12 md:col-span-5">
          <p
            className="font-sans font-light text-[15px] leading-relaxed"
            style={{ color: "#6b7280", whiteSpace: "pre-line" }}
          >
            {`Our production process is unlike anything else in the market. We built our workflow from the ground up — layer by layer, model by model — specifically to solve the problems that other AI studios refuse to tackle.\n\nThe result is a studio that moves faster, costs less, and delivers quality that rivals traditional broadcast production.\n\nBlack Vertex does not follow this industry.\nWe are several steps ahead of it.`}
          </p>
        </div>

        <div className="col-span-12 md:col-span-6 md:col-start-7 reveal hidden-below delay-4">
          <p
            className="font-sans font-light text-[13px] leading-relaxed"
            style={{ color: "#aaaaaa" }}
          >
            * Based globally. Working with product brands and agencies who refuse
            to settle for what AI looked like yesterday.
          </p>
        </div>
      </div>
    </section>
  );
}
