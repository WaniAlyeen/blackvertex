"use client";

import { useState } from "react";

interface FAQItem {
  q: string;
  a: string;
}

export default function ServiceFAQ({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {faqs.map((item, i) => (
        <div
          key={i}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderRadius: "8px",
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
              padding: "16px 20px",
              cursor: "pointer",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "15px",
              fontWeight: 500,
              color: "#ffffff",
              background: "transparent",
              border: "none",
              textAlign: "left",
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
                color: "rgba(255,255,255,0.4)",
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
                padding: "0 20px 16px",
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "15px",
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.75,
              }}
            >
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
