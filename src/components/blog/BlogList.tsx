"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";

const getReadingTime = (text: string) => {
  const words = text ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / 200));
};

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  category: string | null;
  author: string;
  published_at: string;
  cover_image_url: string | null;
};

export default function BlogList({
  featuredPost,
  initialPosts,
  categories,
  currentPage,
  totalPages,
  searchQuery,
}: {
  featuredPost?: Post;
  initialPosts: Post[];
  categories: string[];
  currentPage: number;
  totalPages: number;
  searchQuery: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (searchTerm) {
        params.set("query", searchTerm);
        params.set("page", "1");
      } else {
        params.delete("query");
      }
      router.push(`/blog?${params.toString()}`, { scroll: false });
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm, router, searchParams]);

  const filteredPosts =
    activeCategory === "All"
      ? initialPosts
      : initialPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-14">
      {/* ── Featured Hero Post ── */}
      {featuredPost && (
        <Link
          href={`/blog/${featuredPost.slug}`}
          className="group block rounded-2xl overflow-hidden"
          style={{ border: "1px solid rgba(0,0,0,0.08)", background: "#ffffff" }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 min-h-[320px]">
            {/* Text side */}
            <div className="p-10 flex flex-col justify-center">
              {featuredPost.category && (
                <span
                  className="inline-block mb-4 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
                  style={{ background: "#1a1a1a", color: "#ffffff" }}
                >
                  {featuredPost.category}
                </span>
              )}
              <h2 className="text-2xl md:text-3xl font-sans font-medium text-gray-900 leading-snug mb-4 group-hover:text-gray-600 transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-7 line-clamp-3">
                {featuredPost.excerpt || featuredPost.body?.substring(0, 180) + "..."}
              </p>
              <div className="flex items-center gap-5 text-xs text-gray-500 mb-7">
                <span>By {featuredPost.author}</span>
                <span>{new Date(featuredPost.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
                <span>{getReadingTime(featuredPost.body)} min read</span>
              </div>
              <span
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium w-fit transition-colors"
                style={{ border: "1px solid rgba(0,0,0,0.15)", color: "#1a1a1a", background: "#ffffff" }}
              >
                Read More →
              </span>
            </div>

            {/* Image side */}
            <div
              className="relative min-h-[240px] md:min-h-0"
              style={{ background: "#f3f4f6" }}
            >
              {featuredPost.cover_image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={featuredPost.cover_image_url}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-24 h-24 rounded-2xl rotate-12 opacity-20"
                    style={{ background: "rgba(0,0,0,0.08)", border: "1px solid rgba(0,0,0,0.1)" }}
                  />
                </div>
              )}
            </div>
          </div>
        </Link>
      )}

      {/* ── Filters ── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-5">
        <div className="flex overflow-x-auto pb-1 -mb-1 scrollbar-hide gap-2 flex-nowrap">
          {["All", ...categories].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? "bg-gray-900 text-white"
                  : "text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-400"
              }`}
            >
              {cat === "All" ? "All Updates" : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64 shrink-0">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search articles..."
            className="w-full rounded-full py-2.5 pl-10 pr-4 text-sm text-gray-900 focus:outline-none transition-colors"
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.12)",
            }}
          />
        </div>
      </div>

      {/* ── Post Grid ── */}
      {filteredPosts.length === 0 ? (
        <div
          className="py-24 text-center rounded-2xl"
          style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#ffffff" }}
        >
          <p className="text-gray-500 mb-3">No articles found.</p>
          <button
            onClick={() => { setSearchTerm(""); setActiveCategory("All"); }}
            className="text-gray-900 text-sm underline"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link
              href={`/blog/${post.slug}`}
              key={post.id}
              className="group flex flex-col rounded-2xl overflow-hidden transition-all"
              style={{ border: "1px solid rgba(0,0,0,0.07)", background: "#ffffff" }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.15)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.07)")
              }
            >
              {/* Cover */}
              <div className="w-full aspect-video relative overflow-hidden shrink-0" style={{ background: "#f3f4f6" }}>
                {post.cover_image_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-lg rotate-45 opacity-20" style={{ background: "rgba(0,0,0,0.2)" }} />
                  </div>
                )}
                {post.category && (
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider"
                      style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)", color: "#1a1a1a", border: "1px solid rgba(0,0,0,0.08)" }}
                    >
                      {post.category}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-grow">
                <div className="flex gap-4 text-xs text-gray-500 mb-3">
                  <span>{new Date(post.published_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>{getReadingTime(post.body)} min read</span>
                </div>
                <h3 className="text-base font-sans font-medium text-gray-900 mb-2 group-hover:text-gray-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 mb-5">
                  {post.excerpt || post.body?.substring(0, 140) + "..."}
                </p>
                <div
                  className="mt-auto pt-4 flex items-center justify-between text-xs font-medium text-gray-500 group-hover:text-gray-900 transition-colors"
                  style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}
                >
                  Read Article <span>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <button
            disabled={currentPage <= 1}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (currentPage - 1).toString());
              router.push(`/blog?${params.toString()}`);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-25 transition-colors"
            style={{ border: "1px solid rgba(0,0,0,0.12)" }}
          >
            ←
          </button>
          <span className="text-sm text-gray-500">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage >= totalPages}
            onClick={() => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("page", (currentPage + 1).toString());
              router.push(`/blog?${params.toString()}`);
            }}
            className="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-25 transition-colors"
            style={{ border: "1px solid rgba(0,0,0,0.12)" }}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}
