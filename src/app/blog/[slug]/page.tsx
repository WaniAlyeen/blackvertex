import { supabase } from "@/lib/supabase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css';
import { FaTwitter, FaLinkedin, FaFacebook, FaLink, FaCalendarAlt, FaClock } from "react-icons/fa";
import Link from "next/link";
import { Metadata } from 'next';

export const revalidate = 60;
export const dynamicParams = true;

// Calculate reading time
const getReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text ? text.trim().split(/\s+/).length : 0;
  return Math.max(1, Math.ceil(words / wordsPerMinute));
};

export async function generateStaticParams() {
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('slug')
    .eq('is_published', true);

  return (posts || []).map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, excerpt, seo_title, seo_description, og_image_url, cover_image_url')
    .eq('slug', params.slug)
    .single();

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.seo_title || `${post.title} | Black Vertex`,
    description: post.seo_description || post.excerpt,
    openGraph: {
      title: post.seo_title || post.title,
      description: post.seo_description || post.excerpt,
      images: [post.og_image_url || post.cover_image_url || ''],
    },
    twitter: {
      card: 'summary_large_image',
    }
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .single();

  if (!post) {
    notFound();
  }

  // Fetch related posts (same category, not this post, limit 3)
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('is_published', true)
    .eq('category', post.category)
    .neq('id', post.id)
    .limit(3);

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://blackvertex.com";
  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.seo_title || post.title,
    "description": post.seo_description || post.excerpt,
    "image": post.og_image_url || post.cover_image_url,
    "datePublished": post.published_at,
    "dateModified": post.published_at,
    "author": [{
        "@type": "Person",
        "name": post.author,
    }]
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Navbar />
      
      <main className="flex-grow pt-32 pb-24 w-full">
        <article className="max-w-4xl mx-auto px-6">
          <header className="mb-12 text-center">
            {post.category && (
              <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-bold text-xs uppercase tracking-widest mb-6">
                {post.category}
              </span>
            )}
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-heading leading-[1.1] mb-8">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm font-semibold text-foreground/60 uppercase tracking-wider">
              <span>By {post.author}</span>
              <span className="flex items-center gap-1.5"><FaCalendarAlt className="text-accent" /> {new Date(post.published_at).toLocaleDateString("en-US", { month: 'long', day: 'numeric', year: 'numeric'})}</span>
              <span className="flex items-center gap-1.5"><FaClock className="text-accent"/> {getReadingTime(post.body)} min read</span>
            </div>
          </header>

          {post.cover_image_url && (
            <div className="w-full aspect-[21/9] rounded-2xl overflow-hidden mb-16 border border-white/5 relative bg-black/50">
              <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-white prose-a:text-accent prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-pre:border prose-pre:border-white/10 prose-pre:bg-[#050505]">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {post.body}
            </ReactMarkdown>
          </div>

          {/* Social Share */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold uppercase tracking-widest text-foreground/50 mr-2">Share</span>
              <a href={`https://twitter.com/intent/tweet?url=${postUrl}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1DA1F2] hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#0A66C2] hover:text-white transition-colors">
                <FaLinkedin />
              </a>
              <a href={`https://www.facebook.com/sharer/sharer.php?u=${postUrl}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-colors">
                <FaFacebook />
              </a>
            </div>
            
            <div className="flex gap-2">
              {post.tags && post.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-white/5 rounded-md text-xs font-semibold text-foreground/60 border border-white/5">
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts && relatedPosts.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 mt-24">
            <h3 className="text-2xl font-display font-bold text-heading mb-8 border-b border-white/10 pb-4">Read Next in {post.category}</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <Link href={`/blog/${rp.slug}`} key={rp.id} className="group glass-card rounded-2xl overflow-hidden flex flex-col h-full border border-white/5 hover:border-accent/30 transition-all">
                  <div className="w-full aspect-video relative overflow-hidden bg-black/50">
                    {rp.cover_image_url ? (
                      <img src={rp.cover_image_url} alt={rp.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-black to-gray-900 border-b border-white/5">
                        <span className="w-8 h-8 bg-accent/20 rounded-md rotate-45 border border-accent/30"></span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <h4 className="text-lg font-display font-bold text-heading mb-2 group-hover:text-accent transition-colors line-clamp-2">
                      {rp.title}
                    </h4>
                    <p className="text-sm text-foreground/70 line-clamp-2 mb-4">
                      {rp.excerpt}
                    </p>
                    <span className="mt-auto text-xs font-bold text-accent uppercase tracking-widest flex items-center gap-1">Read <FaLink /></span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
