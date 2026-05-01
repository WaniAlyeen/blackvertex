"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function ServiceFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <h2
        style={{
          fontFamily: "var(--font-syne), sans-serif",
          fontSize: "1.375rem",
          fontWeight: 600,
          color: "#0A0A0A",
          textAlign: "center",
          marginBottom: "2.5rem",
          letterSpacing: "-0.02em",
        }}
      >
        Frequently Asked Questions
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {faqs.map((item, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.07)",
              borderRadius: "10px",
              overflow: "hidden",
            }}
          >
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "16px",
                padding: "1.25rem 1.5rem",
                cursor: "pointer",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.9375rem",
                fontWeight: 500,
                color: "#0A0A0A",
                background: openIndex === i ? "transparent" : "transparent",
                border: "none",
                textAlign: "left",
                transition: "background 150ms ease",
              }}
              onMouseEnter={(e) => {
                if (openIndex !== i) {
                  (e.currentTarget as HTMLButtonElement).style.background = "#F9F9F9";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              }}
              aria-expanded={openIndex === i}
            >
              {item.q}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                style={{
                  flexShrink: 0,
                  color: "rgba(0,0,0,0.4)",
                  transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
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

            {openIndex === i && (
              <div
                style={{
                  padding: "0 1.5rem 1.25rem",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  fontSize: "0.9375rem",
                  color: "#555555",
                  lineHeight: 1.75,
                  borderTop: "1px solid rgba(0,0,0,0.06)",
                  paddingTop: "1rem",
                }}
              >
                {item.a}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
