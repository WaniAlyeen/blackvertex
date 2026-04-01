import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogList from "@/components/blog/BlogList";

export const revalidate = 60;

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { page?: string; query?: string };
}) {
  const page = parseInt(searchParams.page || "1", 10);
  const query = searchParams.query || "";
  const LIMIT = 9;
  const offset = (page - 1) * LIMIT;

  // Fetch featured post (always the latest, regardless of page/query)
  const { data: featuredArr } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .limit(1);
  const featuredPost = featuredArr?.[0] ?? null;

  // Fetch paginated posts (skip the featured one on page 1)
  let supaQuery = supabase
    .from("blog_posts")
    .select("*", { count: "exact" })
    .eq("is_published", true)
    .order("published_at", { ascending: false })
    .range(offset, offset + LIMIT - 1);

  if (query) {
    supaQuery = supaQuery.ilike("title", `%${query}%`);
  }

  const { data: posts, count } = await supaQuery;

  // Unique categories
  const { data: allCats } = await supabase
    .from("blog_posts")
    .select("category")
    .eq("is_published", true);

  const uniqueCategories = Array.from(
    new Set(allCats?.map((c) => c.category).filter(Boolean))
  ) as string[];

  const totalPages = Math.ceil((count || 0) / LIMIT);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 max-w-7xl mx-auto w-full">
        {/* Page header */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl md:text-6xl font-sans font-semibold text-gray-900 mb-4 tracking-tight">
            The Vertex Log
          </h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Insights, strategies, and industry news on how AI is fundamentally
            reshaping business operations and cinematic production.
          </p>
        </div>

        <BlogList
          featuredPost={page === 1 && !query ? featuredPost : undefined}
          initialPosts={posts || []}
          categories={uniqueCategories}
          currentPage={page}
          totalPages={totalPages}
          searchQuery={query}
        />
      </main>

      <Footer />
    </div>
  );
}
