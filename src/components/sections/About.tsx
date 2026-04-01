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
        <span className="eyebrow">0.4&nbsp;&nbsp;Who We Are</span>
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
            {`Black Vertex was built to operate in the space most AI studios are afraid to enter.\n\nWe are an AI consultancy — part production studio, part technology firm — specialized in the kind of advertising work that pushes against the limits of what artificial intelligence can currently do.\n\nConsistent faces. Consistent characters. Pixel-perfect product accuracy. Cinematic quality from imperfect source material. These are not easy problems. They are the problems we chose to dedicate ourselves to.`}
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
            {`Our work sits at the intersection of two worlds that rarely collaborate well — creative advertising and deep AI production.\n\nWe do not use off-the-shelf tools and call it innovation. We built our own workflow, layer by layer, from the ground up. The result is a process that our clients cannot find anywhere else — and our competitors cannot replicate.\n\nBlack Vertex does not follow this industry.\nWe are several steps ahead of it.`}
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
