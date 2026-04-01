"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";

const testimonials = [
  {
    quote:
      "Black Vertex revolutionized our ad production. We generate 100× more creatives in half the time.",
    name: "Sarah Jenkins",
    company: "Nexus AI",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote:
      "The lip-sync technology is indistinguishable from reality. We localized our entire catalog into 15 languages.",
    name: "David Chen",
    company: "EduTech Global",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote:
      "Integrating their custom AI agents saved our team nearly 400 hours a month. Absolute game-changers.",
    name: "Elena Rossi",
    company: "Finserve",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop",
  },
  {
    quote:
      "The visual fidelity of the cinematic campaigns they produce is staggering. Hollywood-level production, accessible.",
    name: "Marcus Thorne",
    company: "Vanguard Media",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // Section bidirectional reveal
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

  // Infinite scroll via GSAP
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const items = Array.from(track.children) as HTMLElement[];
    const totalWidth = items.reduce(
      (acc, item) => acc + item.offsetWidth + 24,
      0
    );

    items.forEach((item) => track.appendChild(item.cloneNode(true)));

    const tween = gsap.to(track, {
      x: -totalWidth,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize((x) => parseFloat(x) % totalWidth),
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-rule w-full overflow-hidden bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      {/* Eyebrow */}
      <div className="reveal hidden-below px-8 md:px-12 mb-16 md:mb-20">
        <span className="eyebrow">0.4&nbsp;&nbsp;Client Voices</span>
      </div>

      {/* Heading */}
      <div className="reveal hidden-below delay-1 px-8 md:px-12 mb-16 md:mb-20">
        <h2
          className="font-sans font-light text-foreground"
          style={{
            fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
        >
          Trusted by
          <br />
          <span
            style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}
          >
            innovators.
          </span>
        </h2>
      </div>

      {/* Carousel */}
      <div className="relative">
        {/* Fade edges — MUST match bg color */}
        <div
          className="absolute top-0 left-0 w-24 md:w-40 h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to right, #FAFAF8, transparent)",
          }}
        />
        <div
          className="absolute top-0 right-0 w-24 md:w-40 h-full z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #FAFAF8, transparent)",
          }}
        />

        <div ref={trackRef} className="flex gap-6 px-8 md:px-12">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="shrink-0 w-[320px] md:w-[420px] p-8 flex flex-col justify-between bg-white"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
            >
              <p
                className="font-sans font-light text-[15px] leading-relaxed mb-8 italic"
                style={{ color: "#4b5563" }}
              >
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 overflow-hidden shrink-0">
                  <Image
                    src={t.avatar}
                    alt={t.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p
                    className="font-sans text-[13px] font-light"
                    style={{ color: "#374151" }}
                  >
                    {t.name}
                  </p>
                  <p className="eyebrow" style={{ fontSize: "10px" }}>
                    {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
