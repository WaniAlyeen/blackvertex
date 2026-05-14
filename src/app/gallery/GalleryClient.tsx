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
    if (openVideoId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openVideoId]);

  const pillBase: React.CSSProperties = {
    borderRadius: "100px",
    padding: "6px 16px",
    fontSize: "13px",
    fontWeight: 400,
    cursor: "pointer",
    transition: "all 150ms ease",
    fontFamily: "var(--font-dm-sans), sans-serif",
    whiteSpace: "nowrap" as const,
  };

  const pillActive: React.CSSProperties = {
    ...pillBase,
    background: "var(--pill-active-bg)",
    color: "var(--pill-active-text)",
    border: "1px solid transparent",
  };

  const pillInactive: React.CSSProperties = {
    ...pillBase,
    background: "transparent",
    color: "#888888",
    border: "1px solid rgba(0,0,0,0.12)",
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div
        className="max-w-[1200px] mx-auto px-6 md:px-8"
        style={{
          paddingTop: "clamp(7rem, 12vw, 10rem)",
          paddingBottom: "clamp(5rem, 10vw, 8rem)",
        }}
      >
        {/* Header */}
        <div className="mb-4">
          <span className="eyebrow">Gallery</span>
        </div>

        <h1
          className="mb-4"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 300,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            color: "#1a1a1a",
          }}
        >
          Our Work
        </h1>

        <p
          className="mb-12 md:mb-16 max-w-lg"
          style={{
            fontFamily: "var(--font-dm-sans), sans-serif",
            fontSize: "16px",
            fontWeight: 300,
            lineHeight: 1.6,
            color: "#888888",
          }}
        >
          Every project, every vision — fully AI-generated.
        </p>

        {/* Filter tags */}
        <div className="flex flex-wrap gap-2 mb-10 md:mb-14">
          <button
            onClick={() => setActiveTag(ALL_TAG)}
            style={activeTag === ALL_TAG ? pillActive : pillInactive}
          >
            All
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              style={activeTag === tag ? pillActive : pillInactive}
            >
              {tag}
            </button>
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

      {/* Modal */}
      {openVideoId && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
          style={{ background: "rgba(0,0,0,0.85)" }}
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute -top-11 right-0 flex items-center justify-center text-white/70 hover:text-white transition-colors"
              style={{
                fontSize: "28px",
                lineHeight: 1,
                minWidth: 44,
                minHeight: 44,
              }}
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
      className="relative w-full overflow-hidden rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
      style={{ aspectRatio: "16/9", display: "block" }}
      aria-label={`Play video: ${label}`}
    >
      {/* Thumbnail */}
      <div
        className="absolute inset-0 transition-transform duration-500 ease-out"
        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
      >
        {video.thumbnail ? (
          <Image
            src={video.thumbnail}
            alt={`Video: ${label}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full" style={{ background: "#1a1a1a" }} />
        )}
      </div>

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          opacity: hovered ? 1 : 0.65,
        }}
      />

      {/* Play button */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ opacity: hovered ? 1 : 0.75, transition: "opacity 250ms ease" }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.92)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transform: hovered ? "scale(1.12)" : "scale(1)",
            transition: "transform 250ms ease",
            boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="#1a1a1a"
            aria-hidden="true"
            style={{ marginLeft: 2 }}
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Tag chip */}
      <div className="absolute bottom-3 left-3">
        <span
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            fontSize: "10px",
            fontWeight: 400,
            color: "rgba(255,255,255,0.9)",
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: "100px",
            padding: "3px 10px",
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}
