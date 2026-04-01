"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowLeft, FaImage, FaGlobe, FaEyeSlash } from "react-icons/fa";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false }) as any;

type PostData = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  cover_image_url: string;
  category: string;
  tags: string;
  author: string;
  seo_title: string;
  seo_description: string;
  og_image_url: string;
  is_published: boolean;
};

const defaultPost: PostData = {
  title: "",
  slug: "",
  excerpt: "",
  body: "## Introduction\n\nStart writing your post here...",
  cover_image_url: "",
  category: "",
  tags: "",
  author: "Black Vertex Team",
  seo_title: "",
  seo_description: "",
  og_image_url: "",
  is_published: false,
};

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const isNew = params.id === "new";
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [post, setPost] = useState<PostData>(defaultPost);
  const [tab, setTab] = useState<"content" | "seo">("content");
  const supabase = createClient();

  const fetchPost = useCallback(async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", params.id)
      .single();

    if (data) {
      setPost({
        ...data,
        tags: Array.isArray(data.tags) ? data.tags.join(", ") : (data.tags || ""),
      });
    }
    setLoading(false);
  }, [params.id, supabase]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin"); return; }
      if (!isNew) fetchPost();
    };
    init();
  }, [router, isNew, fetchPost, supabase]);

  const generateSlug = (title: string) =>
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");

  const handleTitleBlur = () => {
    if (!post.slug && post.title) {
      setPost(prev => ({ ...prev, slug: generateSlug(prev.title) }));
    }
    if (!post.seo_title && post.title) {
      setPost(prev => ({ ...prev, seo_title: `${prev.title} | Black Vertex` }));
    }
  };

  const handleSave = async (publish?: boolean) => {
    setSaving(true);
    setSaved(false);

    const payload = {
      ...post,
      is_published: publish !== undefined ? publish : post.is_published,
      tags: post.tags ? post.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      published_at: new Date().toISOString(),
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from("blog_posts").insert([payload]));
    } else {
      ({ error } = await supabase.from("blog_posts").update(payload).eq("id", params.id));
    }

    if (error) {
      alert("Save failed: " + error.message);
    } else {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      if (isNew) router.push("/admin/dashboard");
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    setUploading(true);
    const file = e.target.files[0];
    const ext = file.name.split(".").pop();
    const path = `covers/${Date.now()}.${ext}`;

    const { error } = await supabase.storage.from("blog_images").upload(path, file, { upsert: true });
    if (!error) {
      const { data: { publicUrl } } = supabase.storage.from("blog_images").getPublicUrl(path);
      setPost(prev => ({ ...prev, cover_image_url: publicUrl }));
    } else {
      alert("Upload failed: " + error.message);
    }
    setUploading(false);
  };

  const inputClass = "w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-accent/50 transition-all";
  const labelClass = "text-xs font-bold text-white/50 uppercase tracking-[0.12em] block mb-2";

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <svg className="animate-spin w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading editor...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/admin/dashboard" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm shrink-0">
            <FaArrowLeft /> Dashboard
          </Link>

          <div className="flex items-center gap-2 flex-1 justify-end">
            {saved && (
              <span className="text-green-400 text-sm font-semibold flex items-center gap-1.5 animate-pulse">
                ✓ Saved
              </span>
            )}
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="px-4 py-2 border border-white/20 text-white/80 font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <FaEyeSlash /> Save Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="px-5 py-2 bg-accent text-black font-bold text-sm rounded-lg hover:bg-cyan-300 transition-colors shadow-[0_0_15px_rgba(0,212,255,0.3)] disabled:opacity-50 flex items-center gap-2"
            >
              {saving ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : <FaGlobe />}
              {saving ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT: Main Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title */}
          <input
            autoFocus
            required
            type="text"
            value={post.title}
            onChange={e => setPost({ ...post, title: e.target.value })}
            onBlur={handleTitleBlur}
            className="w-full bg-transparent border-b border-white/10 px-2 py-3 text-4xl font-display font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-accent/50 transition-colors"
            placeholder="Post title..."
          />

          {/* Tab Switch */}
          <div className="flex gap-1 bg-white/5 rounded-xl p-1 w-fit">
            {(["content", "seo"] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-lg text-sm font-bold transition-all capitalize ${tab === t ? "bg-white/10 text-white" : "text-white/40 hover:text-white/70"
                  }`}
              >
                {t === "seo" ? "SEO & Meta" : "Content"}
              </button>
            ))}
          </div>

          {tab === "content" && (
            <div data-color-mode="dark">
              <MDEditor
                value={post.body}
                onChange={(val: string | undefined) => setPost(prev => ({ ...prev, body: val || "" }))}
                height={520}
                preview="live"
              />
            </div>
          )}

          {tab === "seo" && (
            <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-6 space-y-5">
              <div>
                <label className={labelClass}>SEO Title <span className="text-white/30 normal-case tracking-normal font-normal">({post.seo_title.length}/60)</span></label>
                <input type="text" value={post.seo_title} onChange={e => setPost({ ...post, seo_title: e.target.value })} className={inputClass} placeholder="Compelling title for search engines..." maxLength={60} />
              </div>
              <div>
                <label className={labelClass}>Meta Description <span className="text-white/30 normal-case tracking-normal font-normal">({post.seo_description.length}/160)</span></label>
                <textarea value={post.seo_description} onChange={e => setPost({ ...post, seo_description: e.target.value })} className={`${inputClass} min-h-[100px] resize-none`} placeholder="Describe this post for search results..." maxLength={160} />
              </div>
              <div>
                <label className={labelClass}>OG Image URL (for social sharing)</label>
                <input type="text" value={post.og_image_url} onChange={e => setPost({ ...post, og_image_url: e.target.value })} className={inputClass} placeholder="https://..." />
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: Settings Sidebar */}
        <div className="space-y-5">

          {/* Publish Status */}
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-bold text-white text-sm border-b border-white/8 pb-3">Publishing</h3>

            <label className="flex items-center gap-3 cursor-pointer p-3 bg-white/5 rounded-xl hover:bg-white/8 transition-colors">
              <input
                type="checkbox"
                checked={post.is_published}
                onChange={e => setPost({ ...post, is_published: e.target.checked })}
                className="w-5 h-5 rounded accent-accent"
              />
              <div>
                <div className="text-sm font-bold text-white">Publish immediately</div>
                <div className="text-xs text-white/40 mt-0.5">Visible to all visitors</div>
              </div>
            </label>

            <div>
              <label className={labelClass}>URL Slug</label>
              <div className="flex items-center gap-2">
                <span className="text-white/30 text-sm">/blog/</span>
                <input
                  type="text"
                  value={post.slug}
                  onChange={e => setPost({ ...post, slug: e.target.value })}
                  className="flex-1 bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-accent/50 transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>Author</label>
              <input type="text" value={post.author} onChange={e => setPost({ ...post, author: e.target.value })} className={inputClass} />
            </div>
          </div>

          {/* Cover Image */}
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-bold text-white text-sm border-b border-white/8 pb-3">Cover Image</h3>

            {post.cover_image_url && (
              <div className="w-full aspect-video rounded-xl overflow-hidden bg-black/50 border border-white/5">
                <img src={post.cover_image_url} alt="Cover" className="w-full h-full object-cover" />
              </div>
            )}

            <div>
              <label className={labelClass}>Image URL</label>
              <input type="text" value={post.cover_image_url} onChange={e => setPost({ ...post, cover_image_url: e.target.value })} className={inputClass} placeholder="https://..." />
            </div>

            <label className={`flex items-center justify-center gap-2 p-3 border-2 border-dashed border-white/15 rounded-xl text-white/50 hover:border-accent/40 hover:text-accent cursor-pointer transition-colors text-sm font-semibold ${uploading ? "opacity-50" : ""}`}>
              <FaImage />
              {uploading ? "Uploading..." : "Upload from device"}
              <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={uploading} />
            </label>
          </div>

          {/* Taxonomy */}
          <div className="bg-white/[0.02] border border-white/8 rounded-2xl p-5 space-y-4">
            <h3 className="font-display font-bold text-white text-sm border-b border-white/8 pb-3">Taxonomy</h3>

            <div>
              <label className={labelClass}>Category</label>
              <input type="text" value={post.category} onChange={e => setPost({ ...post, category: e.target.value })} className={inputClass} placeholder="e.g. AI Video, Guides..." />
            </div>

            <div>
              <label className={labelClass}>Tags <span className="text-white/30 normal-case font-normal tracking-normal">(comma separated)</span></label>
              <input type="text" value={post.tags} onChange={e => setPost({ ...post, tags: e.target.value })} className={inputClass} placeholder="ai, automation, marketing" />
            </div>

            <div>
              <label className={labelClass}>Excerpt <span className="text-white/30 normal-case font-normal tracking-normal">(shown on cards)</span></label>
              <textarea value={post.excerpt} onChange={e => setPost({ ...post, excerpt: e.target.value })} className={`${inputClass} min-h-[90px] resize-none`} placeholder="2–3 sentence summary..." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
