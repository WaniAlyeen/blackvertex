"use client";

import { useEffect, useRef } from "react";

interface CaseStudyRevealProps {
  html: string;
}

export default function CaseStudyReveal({ html }: CaseStudyRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // container children come from dangerouslySetInnerHTML — React does not
    // reconcile these, so DOM manipulation here is safe.
    const children = Array.from(container.children) as HTMLElement[];
    const groups: HTMLElement[][] = [];
    let current: HTMLElement[] = [];

    children.forEach((el) => {
      if (el.tagName === "H2" && current.length > 0) {
        groups.push(current);
        current = [];
      }
      current.push(el);
    });
    if (current.length > 0) groups.push(current);

    const wrappers: HTMLDivElement[] = [];
    groups.forEach((group) => {
      const wrapper = document.createElement("div");
      wrapper.className = "reveal hidden-below";
      group[0].parentNode?.insertBefore(wrapper, group[0]);
      group.forEach((el) => wrapper.appendChild(el));
      wrappers.push(wrapper);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.remove("hidden-below", "hidden-above");
          } else {
            entry.target.classList.remove("visible");
            const rect = entry.target.getBoundingClientRect();
            if (rect.top > 0) {
              entry.target.classList.add("hidden-below");
              entry.target.classList.remove("hidden-above");
            } else {
              entry.target.classList.add("hidden-above");
              entry.target.classList.remove("hidden-below");
            }
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );

    wrappers.forEach((w) => observer.observe(w));

    return () => {
      observer.disconnect();
      // Restore original DOM order so Strict Mode double-invoke starts clean
      wrappers.forEach((wrapper) => {
        while (wrapper.firstChild) {
          wrapper.parentNode?.insertBefore(wrapper.firstChild, wrapper);
        }
        wrapper.parentNode?.removeChild(wrapper);
      });
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      className="prose-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
