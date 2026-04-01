"use client";

export const dynamic = 'force-dynamic';

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase-browser";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

// useSearchParams must live inside a Suspense boundary for static export
function AdminLoginInner() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      const redirect = searchParams.get("redirect") || "/admin/dashboard";
      router.push(redirect);
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative">
      <Link href="/blog" className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-accent transition-colors text-sm z-10">
        ← Back to blog
      </Link>
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/3 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-accent rounded-sm rotate-45 shadow-[0_0_20px_rgba(0,212,255,0.6)]" />
            <span className="text-xl font-display font-bold text-white tracking-tight">Black Vertex</span>
          </div>
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-accent text-2xl mx-auto mb-4">
            <FaLock />
          </div>
          <h1 className="text-3xl font-display font-bold text-white mb-2">Admin Portal</h1>
          <p className="text-foreground/60 text-sm">Sign in to manage your blog and content.</p>
        </div>

        <div className="bg-white/[0.03] border border-white/10 rounded-2xl p-8 backdrop-blur-xl shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm p-4 rounded-xl flex items-start gap-3">
                <span className="text-red-400 mt-0.5">⚠</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-[0.15em] block mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-all text-sm"
                placeholder="admin@blackvertex.com"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-white/60 uppercase tracking-[0.15em] block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 pr-12 text-white placeholder:text-white/25 focus:outline-none focus:border-accent/60 focus:ring-1 focus:ring-accent/40 transition-all text-sm"
                  placeholder="••••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 rounded-xl bg-accent text-black font-bold text-sm tracking-wide hover:bg-cyan-300 active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(0,212,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Authenticating...
                </>
              ) : (
                "Sign In to Dashboard"
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-white/30 text-xs mt-6">
          Protected area · Black Vertex Admin v1.0
        </p>
      </div>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <AdminLoginInner />
    </Suspense>
  );
}
