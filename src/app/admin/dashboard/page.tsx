"use client";

export const dynamic = 'force-dynamic';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase-browser";
import Link from "next/link";
import {
  FaPlus, FaEdit, FaTrash, FaSignOutAlt,
  FaEye, FaSearch, FaToggleOn, FaToggleOff
} from "react-icons/fa";

type Post = {
  id: string;
  title: string;
  slug: string;
  category: string | null;
  is_published: boolean;
  created_at: string;
  published_at: string;
  excerpt: string | null;
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filtered, setFiltered] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();
  const supabase = createClient();

  const fetchPosts = useCallback(async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, title, slug, category, is_published, created_at, published_at, excerpt")
      .order("created_at", { ascending: false });
    if (data) {
      setPosts(data);
      setFiltered(data);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push("/admin"); return; }
      setUserEmail(user.email || "");
      fetchPosts();
    };
    init();
  }, [router, supabase, fetchPosts]);

  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      (p.category || "").toLowerCase().includes(q)
    ));
  }, [search, posts]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/admin");
    router.refresh();
  };

  const handleTogglePublish = async (id: string, current: boolean) => {
    await supabase.from("blog_posts").update({ is_published: !current }).eq("id", id);
    setPosts(prev => prev.map(p => p.id === id ? { ...p, is_published: !current } : p));
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  const publishedCount = posts.filter(p => p.is_published).length;
  const draftCount = posts.filter(p => !p.is_published).length;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/50">
          <svg className="animate-spin w-5 h-5 text-accent" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading posts...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Top Nav Bar */}
      <header className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-accent rounded-sm rotate-45 shadow-[0_0_15px_rgba(0,212,255,0.5)]" />
            <span className="font-display font-bold text-white text-lg tracking-tight">Black Vertex</span>
            <span className="text-white/20 mx-2">|</span>
            <span className="text-white/50 text-sm">CMS Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/40 text-sm hidden md:block">{userEmail}</span>
            <Link
              href="/admin/editor/new"
              className="px-4 py-2 bg-accent text-black font-bold text-sm rounded-lg flex items-center gap-2 hover:bg-cyan-300 transition-colors shadow-[0_0_12px_rgba(0,212,255,0.3)]"
            >
              <FaPlus className="text-xs" /> New Post
            </Link>
            <button
              onClick={handleSignOut}
              title="Sign out"
              className="p-2.5 bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            >
              <FaSignOutAlt />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Total Posts", value: posts.length, color: "text-white" },
            { label: "Published", value: publishedCount, color: "text-green-400" },
            { label: "Drafts", value: draftCount, color: "text-yellow-400" },
          ].map((s) => (
            <div key={s.label} className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
              <div className={`text-3xl font-display font-bold mb-1 ${s.color}`}>{s.value}</div>
              <div className="text-xs text-white/40 uppercase tracking-widest font-semibold">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Table */}
        <div className="bg-white/[0.02] border border-white/8 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <h2 className="font-display font-bold text-white text-lg">All Articles</h2>
            <div className="relative w-64">
              <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-black/40 border border-white/10 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-accent/50 placeholder:text-white/25"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[11px] uppercase tracking-[0.12em] text-white/35 font-bold border-b border-white/5">
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center text-white/40">
                      {posts.length === 0
                        ? <>No posts yet. <Link href="/admin/editor/new" className="text-accent underline">Create your first post</Link>.</>
                        : "No posts match your search."
                      }
                    </td>
                  </tr>
                ) : filtered.map((post) => (
                  <tr key={post.id} className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors group">
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-semibold text-white text-sm truncate">{post.title}</div>
                      <div className="text-xs text-white/40 truncate mt-0.5">/blog/{post.slug}</div>
                    </td>
                    <td className="px-6 py-4">
                      {post.category ? (
                        <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-md text-xs text-white/70 font-medium">
                          {post.category}
                        </span>
                      ) : <span className="text-white/25 text-xs">—</span>}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleTogglePublish(post.id, post.is_published)}
                        className={`flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${
                          post.is_published
                            ? "bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20"
                            : "bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20"
                        }`}
                      >
                        {post.is_published ? <FaToggleOn /> : <FaToggleOff />}
                        {post.is_published ? "Published" : "Draft"}
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-white/40 whitespace-nowrap">
                      {new Date(post.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          title="Preview live post"
                          className="p-2 text-white/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/editor/${post.id}`}
                          title="Edit post"
                          className="p-2 text-white/60 hover:text-accent hover:bg-accent/10 rounded-lg transition-colors"
                        >
                          <FaEdit />
                        </Link>
                        <button
                          onClick={() => handleDelete(post.id, post.title)}
                          title="Delete post"
                          className="p-2 text-white/60 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
