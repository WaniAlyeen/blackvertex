import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import CaseStudyReveal from "@/components/CaseStudyReveal";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return {};
  return {
    title: `${project.title} — Black Vertex`,
    description: project.excerpt,
    openGraph: {
      title: `${project.title} — Black Vertex`,
      description: project.excerpt,
      images: [
        {
          url: project.thumbnail,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Black Vertex`,
      description: project.excerpt,
      images: [project.thumbnail],
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const project = await getProjectBySlug(params.slug);
  if (!project) notFound();

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === params.slug);
  const nextProject =
    currentIndex >= 0
      ? allProjects[(currentIndex + 1) % allProjects.length]
      : null;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background text-foreground">
        {/* Back navigation */}
        <div className="pt-28 pb-6 px-8">
          <Link
            href="/#projects"
            className="text-sm text-gray-400 hover:text-gray-900 transition-colors inline-flex items-center gap-2"
          >
            ← Back to Work
          </Link>
        </div>

        {/* Vimeo video */}
        {project.vimeoId && (
          <div className="w-full aspect-video overflow-hidden">
            <iframe
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&loop=1&title=0&byline=0&portrait=0&muted=1`}
              allow="autoplay; fullscreen; picture-in-picture"
              className="w-full h-full"
              title={project.title}
            />
          </div>
        )}

        {/* Project header */}
        <div className="px-8 py-10 border-b border-gray-100">
          <h1
            className="font-sans font-light text-gray-900"
            style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", letterSpacing: "-0.03em", lineHeight: 1.1 }}
          >
            {project.title}
          </h1>
          <p className="text-sm text-gray-400 mt-2">
            {project.client} &mdash; {project.year}
          </p>
          <p className="eyebrow mt-1">{project.industry}</p>
          {project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-gray-100 text-gray-600 text-xs px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Two-column content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 px-8 py-12">
          {/* Sticky sidebar */}
          <aside className="lg:col-span-1">
            <div
              className="bg-gray-50 rounded-xl p-6"
              style={{ position: "sticky", top: "7rem" }}
            >
              <div className="mb-5">
                <p className="eyebrow mb-1">Client</p>
                <p className="text-sm text-gray-900 font-medium">{project.client}</p>
              </div>
              <div className="mb-5">
                <p className="eyebrow mb-1">Industry</p>
                <p className="text-sm text-gray-900 font-medium">{project.industry}</p>
              </div>
              <div className="mb-5">
                <p className="eyebrow mb-1">Year</p>
                <p className="text-sm text-gray-900 font-medium">{project.year}</p>
              </div>
              {project.tags.length > 0 && (
                <div>
                  <p className="eyebrow mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white border border-gray-200 text-gray-600 text-xs px-2.5 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Markdown content with bidirectional reveal */}
          <div className="lg:col-span-2">
            <CaseStudyReveal html={project.content} />
          </div>
        </div>

        {/* Next Project */}
        {nextProject && (
          <div className="border-t border-gray-100 pt-12 pb-16 px-8">
            <p className="eyebrow mb-2">Next Project</p>
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-2xl font-light text-gray-900 hover:text-gray-500 transition-colors"
              style={{ letterSpacing: "-0.03em" }}
            >
              {nextProject.title} →
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
