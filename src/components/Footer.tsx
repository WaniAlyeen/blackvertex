"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaTwitter, FaLinkedin, FaYoutube, FaKey } from "react-icons/fa";

const footerLinks = {
  Pages: [
    { label: "Services", href: "/#services" },
    { label: "Work", href: "/work" },
    { label: "Blog", href: "/blog" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Contact", href: "/#contact" },
  ],
  Follow: [
    { label: "LinkedIn →", href: "#" },
    { label: "X / Twitter →", href: "#" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Use", href: "/terms" },
  ],
};

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

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
      { threshold: 0.05, rootMargin: "0px 0px -40px 0px" }
    );

    footerRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="section-rule w-full px-8 md:px-12 pt-20 pb-10 bg-background"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16">
        {/* Brand column */}
        <div className="md:col-span-4 reveal hidden-below">
          <Link href="/" className="inline-block mb-6">
            <Image
              src="/Logo.svg"
              alt="Black Vertex"
              width={120}
              height={30}
                />
          </Link>
          <p
            className="font-sans font-light text-[14px] leading-relaxed mb-7 max-w-xs"
            style={{ color: "#9ca3af" }}
          >
            AI Advertising &amp; Automation
          </p>
          <div className="flex gap-3">
            {[FaTwitter, FaLinkedin, FaYoutube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="btn-fill w-9 h-9 flex items-center justify-center"
                style={{
                  borderColor: "rgba(0,0,0,0.1)",
                  color: "#9ca3af",
                }}
              >
                <Icon className="text-[12px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([group, links], gi) => (
          <div
            key={group}
            className={`md:col-span-2 ${gi === 0 ? "md:col-start-6" : ""} reveal hidden-below delay-${gi + 1}`}
          >
            <h4 className="eyebrow mb-6">{group}</h4>
            <ul className="flex flex-col gap-3">
              {links.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="nav-link font-sans font-light text-[13px] transition-colors duration-200"
                    style={{ color: "#9ca3af" }}
                    onMouseEnter={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#1a1a1a")
                    }
                    onMouseLeave={(e) =>
                      ((e.currentTarget as HTMLElement).style.color = "#9ca3af")
                    }
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-8 reveal hidden-below"
        style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
      >
        <p className="eyebrow">
          © {new Date().getFullYear()} Black Vertex. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <p className="eyebrow">Crafted at the edge of what AI can do.</p>
          <Link
            href="/admin"
            aria-label="Admin"
            style={{ opacity: 0.3, color: "#888888" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.7")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.opacity = "0.3")
            }
          >
            <FaKey className="text-[11px]" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
