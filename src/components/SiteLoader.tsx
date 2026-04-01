"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function SiteLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 1400);
    const hideTimer = setTimeout(() => setHidden(true), 2200);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        backgroundColor: "#FAFAF8",
        opacity: fading ? 0 : 1,
        transition: "opacity 0.8s cubic-bezier(0.19,1,0.22,1)",
        pointerEvents: fading ? "none" : "all",
      }}
    >
      <div
        style={{
          opacity: fading ? 0 : 1,
          transform: fading ? "translateY(-8px)" : "translateY(0)",
          transition: "opacity 0.5s ease, transform 0.5s ease",
        }}
      >
        <Image
          src="/Logo.svg"
          alt="Black Vertex"
          width={140}
          height={36}
          priority
        />
      </div>
    </div>
  );
}
