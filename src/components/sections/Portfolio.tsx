"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ProjectMeta } from "@/lib/types/project";

interface PortfolioProps {
  projects: ProjectMeta[];
}

export default function Portfolio({ projects }: PortfolioProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // Main bidirectional observer for .reveal and .clip-reveal
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden-below", "hidden-above");
          } else {
            entry.target.classList.remove("visible");
            if (entry.target.classList.contains("reveal")) {
              const rect = entry.boundingClientRect;
              if (rect.top > 0) {
                entry.target.classList.add("hidden-below");
              } else {
                entry.target.classList.add("hidden-above");
              }
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    sectionRef.current
      ?.querySelectorAll(".reveal, .clip-reveal")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="section-rule w-full px-8 md:px-12 bg-background"
      style={{
        paddingTop: "clamp(5rem, 10vw, 12rem)",
        paddingBottom: "clamp(5rem, 10vw, 12rem)",
      }}
    >
      <div className="reveal hidden-below mb-16 md:mb-24">
        <span className="eyebrow">0.3&nbsp;&nbsp;Selected Work</span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 md:mb-16">
        <div className="reveal hidden-below delay-1">
          <h2
            className="font-sans font-light text-gray-900"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 4.5rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Our best
            <br />
            <span style={{ paddingLeft: "clamp(1rem, 8%, 5rem)", fontStyle: "italic" }}>
              work.
            </span>
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {projects.map((project, idx) => (
          <Link
            key={project.slug}
            href={`/work/${project.slug}`}
            className="clip-reveal group cursor-pointer"
            style={{ transitionDelay: `${idx * 0.08}s` }}
          >
            <div className="clip-reveal-inner relative aspect-[4/3] w-full">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              {/* Dark overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 z-10">
                <span
                  className="eyebrow block mb-1.5"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {project.industry}
                </span>
                <h4
                  className="font-sans font-light text-white"
                  style={{ fontSize: "1.1rem", letterSpacing: "-0.02em" }}
                >
                  {project.title}
                </h4>
                {project.excerpt && (
                  <p
                    className="text-xs mt-2 line-clamp-2"
                    style={{ color: "rgba(255,255,255,0.5)" }}
                  >
                    {project.excerpt}
                  </p>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
