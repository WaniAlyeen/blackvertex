"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const testimonials = [
  {
    quote:
      "Black Vertex created an AI-powered video showcasing our showroom that felt like a real cinematic experience, plus an ad campaign that drives serious engagement. The team delivered both with incredible speed and quality — they understood our brand instantly and created content our customers respond to immediately.",
    name: "Josh",
    company: "Best Brand Appliances",
  },
  {
    quote:
      "Working with Black Vertex was a game-changer for us. We came to them with a concept, and they didn't just execute it — they elevated it. The AI-powered creativity brought a level of polish and storytelling to our content that we didn't think was possible on our timeline. The team was incredibly collaborative, responsive to feedback, and they delivered faster than we expected. Our content now feels premium, which matters when you're competing for attention. They've set a new standard for what we expect from our creative partners.",
    name: "Madiha",
    company: "Ru Posh",
  },
  {
    quote:
      "Black Vertex created visuals that honored our heritage while feeling completely modern and cinematic. The team delivered beautiful, high-impact content that represents our club exactly as we wanted to be seen — with exceptional professionalism and production quality.",
    name: "Abid",
    company: "Royal Crest Horse Club",
  },
  {
    quote:
      "In the energy sector, messaging clarity is critical, but so is capturing attention. Black Vertex did both. They took our technical story and turned it into something visually compelling and genuinely engaging. The speed at which they delivered was remarkable — we needed fast turnaround, and they delivered without compromising on cinematic quality. The team's innovation with AI tools meant we could iterate quickly and get more creative iterations than we'd budgeted for. They're not just an ad production company — they're strategic partners who understand impact.",
    name: "Fahad",
    company: "Electra Energy",
  },
  {
    quote:
      "We wanted our campaigns to feel premium, and Black Vertex delivered exactly that. Every frame looked intentional, every shot told a story. The team brought a creative energy that was refreshing — they didn't just follow our brief, they interpreted it and made it better. The turnaround was impressive, but what really stood out was the quality of collaboration. They asked the right questions, understood our brand DNA, and produced content that our customers responded to immediately. This is the level of production we'll be coming back for.",
    name: "Ifaq",
    company: "Royal Yamaha",
  },
  {
    quote:
      "Black Vertex created ads that feel like art — cinematic, thoughtful, and unmistakably premium. The team was professional and genuinely invested in making our brand shine, delivering sophisticated content that tells the story of our craft.",
    name: "Uroosa",
    company: "Cashmere Naqqashi",
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
          ))}
        </div>
      </div>
    </section>
  );
}
