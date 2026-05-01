"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

const SERVICE_LINKS = [
  {
    label: "Cinematic AI Commercials",
    href: "/services/cinematic-ai-commercials",
    title: "Cinematic AI Commercial Production for Brands",
  },
  {
    label: "AI Product Video Ads",
    href: "/services/ai-product-video-ads",
    title: "AI Product Video Advertising",
  },
  {
    label: "AI Animation Studio",
    href: "/services/ai-animation-studio",
    title: "AI Animation Video Production — Pixar & Anime Style",
  },
  {
    label: "Product Reveal Videos",
    href: "/services/product-reveal-videos",
    title: "AI Product Reveal Video Production",
  },
];

const OTHER_NAV_ITEMS = [
  { label: "Work", href: "/#projects", activePath: "/work" },
  { label: "Blog", href: "/blog", activePath: "/blog" },
  { label: "Pricing", href: "/pricing", activePath: "/pricing" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const router = useRouter();
  const pathname = usePathname();

  function openDropdown() {
    clearTimeout(closeTimerRef.current);
    setServicesOpen(true);
  }

  function scheduleClose() {
    closeTimerRef.current = setTimeout(() => setServicesOpen(false), 120);
  }

  function handleMobileNav(href: string) {
    setOpen(false);
    router.push(href);
  }

  function isActive(activePath: string) {
    return pathname.startsWith(activePath);
  }

  return (
    <>
      {/* Logo — fixed top-left */}
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

      {/* Capsule nav — desktop only */}
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-1"
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
        {/* Services dropdown */}
        <div
          className="relative"
          onMouseEnter={openDropdown}
          onMouseLeave={scheduleClose}
        >
          <button
            className="px-4 py-1.5 text-[13px] font-light whitespace-nowrap flex items-center gap-1.5"
            style={{ color: "#555555" }}
            aria-expanded={servicesOpen}
            aria-haspopup="true"
          >
            Services
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              style={{
                color: "rgba(85,85,85,0.5)",
                transform: servicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 200ms ease",
              }}
            >
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Bridge — covers the 8px gap so mouseleave doesn't fire mid-travel */}
          <div className="absolute w-full h-3 top-full left-0 z-40" aria-hidden="true" />

          {servicesOpen && (
            <div
              className="absolute left-0 z-50"
              style={{
                top: "calc(100% + 8px)",
                background: "rgba(255,255,255,0.95)",
                border: "1px solid rgba(0,0,0,0.09)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "12px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
                minWidth: "240px",
                padding: "6px",
              }}
              onMouseEnter={openDropdown}
              onMouseLeave={scheduleClose}
            >
              {SERVICE_LINKS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className="block font-sans"
                  style={{
                    fontFamily: "var(--font-dm-sans), sans-serif",
                    fontSize: "14px",
                    fontWeight: 500,
                    letterSpacing: "-0.01em",
                    color: "#0A0A0A",
                    padding: "9px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    transition: "background 150ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#F5F5F5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        {OTHER_NAV_ITEMS.map(({ label, href, activePath }) => {
          const active = isActive(activePath);
          return (
            <Link
              key={label}
              href={href}
              className="px-4 py-1.5 text-[13px] font-light whitespace-nowrap"
              style={
                active
                  ? {
                      background: "var(--pill-active-bg)",
                      color: "var(--pill-active-text)",
                      borderRadius: "100px",
                      padding: "6px 14px",
                    }
                  : { color: "#555555" }
              }
            >
              {label}
            </Link>
          );
        })}

        <a
          href="mailto:hello@blackvertex.io"
          className="ml-2 text-[12px] font-light whitespace-nowrap inline-flex"
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

      {/* Hamburger — mobile only, fixed top-right */}
      <button
        className="fixed top-5 right-5 z-50 md:hidden flex flex-col justify-center items-center gap-[5px]"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        style={{ width: 36, height: 36 }}
      >
        <span className="block w-5 h-px bg-gray-800" />
        <span className="block w-5 h-px bg-gray-800" />
        <span className="block w-5 h-px bg-gray-800" />
      </button>

      {/* Fullscreen mobile menu */}
      {open && (
        <div
          className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center"
          style={{ animation: "fadeIn 200ms ease forwards" }}
        >
          <button
            onClick={() => setOpen(false)}
            className="absolute top-0 right-0 p-6 text-2xl text-gray-800"
            aria-label="Close menu"
          >
            ×
          </button>

          <nav className="flex flex-col items-center gap-0 w-full px-8">
            {/* Services accordion */}
            <div className="flex flex-col items-center w-full">
              <button
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className="py-4 text-3xl font-medium text-gray-900 flex items-center gap-2"
              >
                Services
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 16 16"
                  fill="none"
                  aria-hidden="true"
                  style={{
                    color: "rgba(0,0,0,0.4)",
                    transform: mobileServicesOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                >
                  <path
                    d="M4 6l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {mobileServicesOpen && (
                <div className="flex flex-col items-center gap-0 pb-2">
                  {SERVICE_LINKS.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => handleMobileNav(item.href)}
                      className="py-2.5 text-lg font-medium"
                      style={{ color: "#555555" }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {OTHER_NAV_ITEMS.map(({ label, href }) => (
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
          to   { opacity: 1; }
        }
      `}</style>
    </>
  );
}
