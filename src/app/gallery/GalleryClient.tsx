"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";

interface Video {
  id: number;
  vimeoId: string;
  tags: string[];
  thumbnail: string | null;
}

interface GalleryClientProps {
  videos: Video[];
}

const ALL_TAG = "all";

export default function GalleryClient({ videos }: GalleryClientProps) {
  const [activeTag, setActiveTag] = useState<string>(ALL_TAG);
  const [openVideoId, setOpenVideoId] = useState<string | null>(null);

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    videos.forEach((v) => v.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, [videos]);

  const filtered = useMemo(() => {
    if (activeTag === ALL_TAG) return videos;
    return videos.filter((v) => v.tags.includes(activeTag));
  }, [videos, activeTag]);

  const closeModal = useCallback(() => setOpenVideoId(null), []);

  useEffect(() => {
    if (!openVideoId) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [openVideoId, closeModal]);

  useEffect(() => {
    document.body.style.overflow = openVideoId ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [openVideoId]);

  return (
    <main className="min-h-screen" style={{ background: "#ffffff", color: "#000000" }}>
      <div
        className="mx-auto"
        style={{
          maxWidth: "1200px",
          paddingTop: "clamp(5rem, 12vw, 8rem)",
          paddingBottom: "clamp(4rem, 10vw, 6rem)",
          paddingLeft: "clamp(24px, 5vw, 40px)",
          paddingRight: "clamp(24px, 5vw, 40px)",
        }}
      >
        {/* Header */}
        <h1
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(2.5rem, 5vw, 3rem)",
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.2,
            color: "#000000",
            marginBottom: "16px",
          }}
        >
          Our Work
        </h1>

        <p
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: 1.5,
            color: "#666666",
            marginBottom: "32px",
            maxWidth: "480px",
          }}
        >
          Every project, every vision — fully AI-generated.
        </p>

        {/* Filter tags */}
        <div
          className="flex flex-wrap"
          style={{ gap: "12px", marginBottom: "clamp(40px, 6vw, 56px)" }}
        >
          <FilterButton
            label="All"
            active={activeTag === ALL_TAG}
            onClick={() => setActiveTag(ALL_TAG)}
          />
          {allTags.map((tag) => (
            <FilterButton
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>

        {/* Video grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gap: "clamp(16px, 2vw, 24px)" }}
        >
          {filtered.map((video) => (
            <VideoCard
              key={video.id}
              video={video}
              onOpen={() => setOpenVideoId(video.vimeoId)}
            />
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {openVideoId && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.9)", zIndex: 50 }}
          onClick={closeModal}
        >
          <div
            className="relative w-full"
            style={{ maxWidth: "min(90vw, 1100px)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close gallery modal"
              style={{
                position: "absolute",
                top: "-44px",
                right: 0,
                width: 32,
                height: 32,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "rgba(255,255,255,0.7)",
                fontSize: "28px",
                lineHeight: 1,
                cursor: "pointer",
                background: "none",
                border: "none",
                padding: 0,
                transition: "color 150ms ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#ffffff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.7)"; }}
            >
              ×
            </button>

            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              <iframe
                src={`https://player.vimeo.com/video/${openVideoId}?autoplay=1&title=0&byline=0&portrait=0`}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "8px",
                }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Video player"
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function FilterButton({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        fontFamily: "var(--font-dm-sans), sans-serif",
        fontSize: "14px",
        fontWeight: 500,
        padding: "6px 16px",
        borderRadius: "100px",
        border: "1px solid #000000",
        background: active ? "#000000" : "#f5f5f5",
        color: active ? "#ffffff" : "#000000",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "background 150ms ease, color 150ms ease",
      }}
    >
      {label}
    </button>
  );
}

function VideoCard({
  video,
  onOpen,
}: {
  video: Video;
  onOpen: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const label = video.tags[0] ?? "video";

  return (
    <button
      onClick={onOpen}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
      style={{
        aspectRatio: "16/9",
        display: "block",
        borderRadius: "12px",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
      aria-label={`Play video: ${video.tags.join(", ")}`}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0"
        style={{
          transform: hovered ? "scale(1.04)" : "scale(1)",
          transition: "transform 500ms ease-out",
        }}
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={`Video: ${video.tags.join(", ")}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
            quality={85}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              background: "linear-gradient(135deg, #2a2a2a 0%, #111111 100%)",
            }}
          />
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.6) 100%)",
          opacity: hovered ? 1 : 0.7,
          transition: "opacity 300ms ease",
        }}
      />

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: "rgba(255,255,255,1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "scale(1.1)" : "scale(1)",
            transition: "transform 250ms ease",
            boxShadow: "0 4px 24px rgba(0,0,0,0.25)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#000000"
            aria-hidden="true"
            style={{ marginLeft: 3 }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Tag chip — bottom-left */}
      <div className="absolute" style={{ bottom: "12px", left: "12px" }}>
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "12px",
            fontWeight: 500,
            color: "rgba(255,255,255,0.95)",
            background: "rgba(0,0,0,0.6)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "100px",
            padding: "4px 10px",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
