"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/#pricing" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Logo — fixed top-left, independent of pill */}
      <Link
        href="/"
        className="fixed top-5 left-8 z-50 flex items-center"
        aria-label="Black Vertex home"
      >
        <Image
          src="/Logo.svg"
          alt="Black Vertex"
          width={28}
          height={28}
          priority
        />
      </Link>

      {/* Centered floating nav — morphs from transparent to pill on scroll */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1"
        style={{
          borderRadius: "9999px",
          border: scrolled
            ? "1px solid rgba(0,0,0,0.08)"
            : "1px solid transparent",
          background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(18px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(18px)" : "none",
          boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.06)" : "none",
          padding: "8px 8px 8px 20px",
          transition:
            "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease, box-shadow 0.35s ease",
        }}
      >
        {navItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="px-4 py-1.5 text-[13px] font-light whitespace-nowrap"
            style={{
              color: scrolled ? "#555555" : "rgba(255,255,255,0.82)",
              transition: "color 0.35s ease",
            }}
          >
            {label}
          </Link>
        ))}

        {/* Contact CTA — pill within pill */}
        <a
          href="mailto:hello@blackvertex.io"
          className="ml-2 text-[12px] font-light whitespace-nowrap"
          style={{
            background: scrolled ? "#1a1a1a" : "rgba(255,255,255,0.15)",
            color: "#ffffff",
            border: scrolled
              ? "1px solid transparent"
              : "1px solid rgba(255,255,255,0.28)",
            borderRadius: "9999px",
            padding: "6px 16px",
            transition: "background 0.35s ease, border-color 0.35s ease",
          }}
        >
          Contact
        </a>
      </nav>
    </>
  );
}
