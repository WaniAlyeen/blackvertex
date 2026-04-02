"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#projects" },
  { label: "Blog", href: "/blog" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  function handleMobileNav(href: string) {
    setOpen(false);
    router.push(href);
  }

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
        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1">
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
        </div>

        {/* Contact CTA — pill within pill */}
        <a
          href="mailto:hello@blackvertex.io"
          className="ml-2 text-[12px] font-light whitespace-nowrap hidden md:inline-flex"
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

        {/* Hamburger — mobile only */}
        <button
          className="md:hidden ml-2 flex flex-col justify-center items-center gap-[5px] p-2"
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          style={{ width: 36, height: 36 }}
        >
          <span className="block w-5 h-px bg-gray-800" />
          <span className="block w-5 h-px bg-gray-800" />
          <span className="block w-5 h-px bg-gray-800" />
        </button>
      </nav>

      {/* Fullscreen mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center"
          style={{ animation: "fadeIn 200ms ease forwards" }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 p-6 text-2xl text-gray-800"
            aria-label="Close menu"
          >
            ×
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-0">
            {navItems.map(({ label, href }) => (
              <button
                key={label}
                onClick={() => handleMobileNav(href)}
                className="py-4 text-3xl font-medium text-gray-900"
              >
                {label}
              </button>
            ))}
            <button
              onClick={() => handleMobileNav("/#contact")}
              className="py-4 text-3xl font-medium text-gray-900"
            >
              Contact
            </button>
          </nav>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </>
  );
}
