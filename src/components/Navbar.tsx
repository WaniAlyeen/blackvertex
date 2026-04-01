"use client";

import Link from "next/link";
import Image from "next/image";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
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
          width={40}
          height={40}
          priority
        />
      </Link>

      {/* Centered floating nav — permanent capsule */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1"
        style={{
          borderRadius: "9999px",
          border: "1px solid rgba(0,0,0,0.08)",
          background: "rgba(250,250,248,0.92)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow: "0 2px 16px rgba(0,0,0,0.06)",
          padding: "8px 8px 8px 20px",
        }}
      >
        {navItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="px-4 py-1.5 text-[13px] font-light whitespace-nowrap"
            style={{ color: "#555555" }}
          >
            {label}
          </Link>
        ))}

        {/* Contact CTA — pill within pill */}
        <a
          href="mailto:hello@blackvertex.io"
          className="ml-2 text-[12px] font-light whitespace-nowrap"
          style={{
            background: "#1a1a1a",
            color: "#ffffff",
            border: "1px solid transparent",
            borderRadius: "9999px",
            padding: "6px 16px",
          }}
        >
          Contact
        </a>
      </nav>
    </>
  );
}
