import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";

interface FAQ {
  q: string;
  a: string;
}

interface ServiceData {
  eyebrow: string;
  h1: string;
  subheading: string;
  metaTitle: string;
  metaDescription: string;
  whatBody: string;
  whoBody: string;
  howSteps: string[];
  faqs: FAQ[];
}

const SERVICE_DATA: Record<string, ServiceData> = {
  "cinematic-ai-commercials": {
    eyebrow: "Brand Storytelling",
    h1: "Cinematic AI Commercials",
    subheading:
      "Long-form brand films and premium AI commercials — built for campaigns that demand more than an ad.",
    metaTitle: "Cinematic AI Commercials for Brands",
    metaDescription:
      "Premium AI-generated brand films and long-form cinematic commercials. No studio, no crew — broadcast-quality storytelling powered entirely by AI.",
    whatBody:
      "We produce long-form cinematic commercials entirely through AI — no studios, no crews, no location logistics. From brand launches to campaign hero films, we build premium video narratives that match the quality of broadcast production at a fraction of the time and cost. Every frame is directed with intention.",
    whoBody:
      "Built for product brands, luxury labels, and companies launching campaigns that need to establish emotional authority. If your brand story requires cinematic weight — not just a product clip — this is the service.",
    howSteps: [
      "Brief & Alignment — we extract your brand tone, visual references, and narrative goals.",
      "AI Production — our multi-layered workflow generates, grades, and assembles the commercial.",
      "Delivery — broadcast-ready final cut delivered within your timeline, with unlimited revisions.",
    ],
    faqs: [
      {
        q: "What is a cinematic AI commercial?",
        a: "A cinematic AI commercial is a fully AI-generated brand film — scripted, shot, and edited without cameras or crew. We use advanced generative video models combined with a proprietary layered production workflow to produce long-form ads that rival traditional studio output in quality.",
      },
      {
        q: "How long does production take?",
        a: "Most cinematic commercials are delivered within 7–14 business days depending on complexity. Rush timelines are available for launch-critical projects.",
      },
      {
        q: "What do you need from us to get started?",
        a: "A brief, your brand guidelines or visual references, and any product images or footage you have. We can work from mood boards, competitor examples, or simply a written description of your vision.",
      },
      {
        q: "Can you match our existing brand aesthetic?",
        a: "Yes. Before a single frame is generated, we conduct a full visual alignment session to lock in your color language, tone, pacing, and character direction. The output reflects your brand, not a generic AI aesthetic.",
      },
      {
        q: "What platforms are these optimized for?",
        a: "Cinematic commercials are primarily built for YouTube pre-roll, Meta video ads, connected TV, and brand website hero sections. We can deliver in multiple aspect ratios for each platform.",
      },
    ],
  },

  "ai-product-video-ads": {
    eyebrow: "Performance Advertising",
    h1: "AI Product Video Ads",
    subheading:
      "High-converting product advertisements built directly from your product images — no studio required.",
    metaTitle: "AI Product Video Ads",
    metaDescription:
      "High-converting AI product video ads built from your product images. Engineered to capture attention and drive sales across every digital platform.",
    whatBody:
      "Send us your product images and details. We return a professionally produced video ad engineered to stop scroll and drive action. Our AI production pipeline transforms even basic product photography into broadcast-quality commercial content — color-graded, sound-designed, and platform-optimized.",
    whoBody:
      "Ideal for D2C brands, e-commerce companies, and product launches that need high-quality ad creative at speed and volume. If you're spending on paid social and your creative is the bottleneck, this service solves it.",
    howSteps: [
      "Asset Intake — send product images, brand colors, and target platform.",
      "AI Production — we build your ad using our cinematic product workflow.",
      "Platform Delivery — final video exported in all required specs (9:16, 1:1, 16:9).",
    ],
    faqs: [
      {
        q: "What is an AI product video ad?",
        a: "An AI product video ad is a fully produced commercial advertisement created entirely from your product images using generative AI — no studio shoot, no models, no production day required.",
      },
      {
        q: "Do I need professional product photography to get started?",
        a: "No. We regularly produce broadcast-quality ads from smartphone product images. Our workflow is specifically designed to elevate imperfect source material.",
      },
      {
        q: "Which platforms do these ads run on?",
        a: "Our product video ads are optimized for Meta (Facebook/Instagram), TikTok, YouTube, and Google Display. We deliver in all required aspect ratios per platform.",
      },
      {
        q: "How many ad variations can you produce?",
        a: "We can produce multiple creative variations from a single brief — different hooks, formats, and cuts. Volume pricing is available for brands that need large creative libraries.",
      },
      {
        q: "What is the turnaround time?",
        a: "Standard delivery is 5–10 business days. For high-volume orders, we scope timelines per project during the initial consultation.",
      },
    ],
  },

  "ai-animation-studio": {
    eyebrow: "AI Animation",
    h1: "AI Animation Studio",
    subheading:
      "Pixar-quality character animation and anime-style video — for brands that want to be impossible to forget.",
    metaTitle: "AI Animation Studio — Pixar & Anime Style",
    metaDescription:
      "World-class AI animation production. Pixar-quality character animation and anime-style video for brand campaigns that demand to be remembered.",
    whatBody:
      "We produce world-class AI animation — from Pixar-quality 3D character narratives to stylized anime-influenced brand films. Our animation pipeline generates visually stunning, character-driven content that makes products and brands feel like stories worth watching, not just ads worth skipping.",
    whoBody:
      "For brands targeting younger audiences, gaming and entertainment adjacents, or any company that wants brand content with lasting visual impact. Also ideal for explainer content that needs personality and memorability over plain live-action.",
    howSteps: [
      "Style Selection — we align on animation style, character direction, and narrative tone.",
      "AI Animation Production — scenes, characters, and motion are generated through our animation workflow.",
      "Post-Production & Delivery — color, sound design, and final cut delivered to spec.",
    ],
    faqs: [
      {
        q: "What animation styles do you produce?",
        a: "We produce Pixar-influenced 3D character animation, anime-style 2D motion, and stylized hybrid formats. Style selection happens during the alignment phase so the output reflects your brand's visual world.",
      },
      {
        q: "Can I get a consistent animated character for my brand?",
        a: "Yes. Character consistency is one of our core specialisms. We build and lock a character visually before production begins, ensuring they appear identically across every scene and future campaign.",
      },
      {
        q: "Is AI animation cheaper than traditional animation?",
        a: "Significantly. Traditional Pixar-quality animation costs hundreds of thousands of dollars and takes months. Our AI animation workflow delivers comparable visual quality at a fraction of the cost and timeline.",
      },
      {
        q: "What do I need to provide?",
        a: "A brief describing your brand, the story you want to tell, character references or descriptions, and any brand guidelines. We handle everything from there.",
      },
      {
        q: "Can these animations be used in paid advertising?",
        a: "Yes. All animation deliverables are formatted and cleared for use in paid social, YouTube pre-roll, display advertising, and broadcast.",
      },
    ],
  },

  "product-reveal-videos": {
    eyebrow: "Product Launch",
    h1: "Product Reveal Videos",
    subheading:
      "Sleek, high-motion AI product reveals built for launch moments, social drops, and press announcements.",
    metaTitle: "AI Product Reveal Videos",
    metaDescription:
      "Dramatic, high-motion AI product reveal videos for launches, social drops, and press moments. Sleek. Precise. Launch-ready.",
    whatBody:
      "A product reveal video is a precision-engineered short-form production designed to make a single product feel like an event. We use hyper-motion AI techniques — dramatic camera movement, cinematic lighting transitions, and sound-synchronized cuts — to create reveal content that builds anticipation and lands impact.",
    whoBody:
      "Built for brands launching new products, limited editions, or seasonal collections. Particularly effective for social media drops, press kit content, and e-commerce hero video.",
    howSteps: [
      "Product Intake — send product images, launch context, and preferred platform.",
      "Motion Production — our hyper-motion AI workflow builds the reveal sequence.",
      "Delivery — final cut in all required formats, ready to publish on launch day.",
    ],
    faqs: [
      {
        q: "What is a product reveal video?",
        a: "A product reveal video is a short-form, high-impact video designed to unveil a product dramatically — using motion, light, and sound to build anticipation before the full product is shown. They are built for launch moments.",
      },
      {
        q: "How short or long are these videos?",
        a: "Typically 15–45 seconds. Most social-first reveals are 15–30 seconds. We can produce longer versions for press kits or website hero sections.",
      },
      {
        q: "What platforms are they designed for?",
        a: "Instagram Reels, TikTok, YouTube Shorts, and Twitter/X are the primary platforms. We deliver in 9:16 vertical and 16:9 horizontal formats as standard.",
      },
      {
        q: "What assets do I need to provide?",
        a: "Your product images — even smartphone photography works. We also welcome any brand color preferences, mood references, or launch date context.",
      },
      {
        q: "Can I use these for paid advertising?",
        a: "Yes. Product reveal videos perform strongly as paid social ads, particularly as awareness-stage content. All files are delivered in platform-compatible specs.",
      },
    ],
  },
};

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return [
    { slug: "cinematic-ai-commercials" },
    { slug: "ai-product-video-ads" },
    { slug: "ai-animation-studio" },
    { slug: "product-reveal-videos" },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const data = SERVICE_DATA[params.slug];
  if (!data) return {};
  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://blackvertex.io/services/${params.slug}`,
    },
  };
}

export default function ServicePage({ params }: PageProps) {
  const data = SERVICE_DATA[params.slug];
  if (!data) notFound();

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: data.h1,
    provider: {
      "@type": "Organization",
      name: "Black Vertex",
      url: "https://blackvertex.io",
    },
    description: data.metaDescription,
    url: `https://blackvertex.io/services/${params.slug}`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: data.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div style={{ background: "#0A0A0A", minHeight: "100vh" }}>
        <Navbar />

        {/* Hero */}
        <section
          style={{
            paddingTop: "8rem",
            paddingBottom: "4rem",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: "11px",
              letterSpacing: "0.15em",
              color: "#00D4FF",
              textTransform: "uppercase",
              marginBottom: "1rem",
            }}
          >
            {data.eyebrow}
          </p>

          <h1
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 700,
              color: "#ffffff",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            {data.h1}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1.125rem",
              color: "rgba(255,255,255,0.6)",
              maxWidth: "580px",
              marginTop: "1rem",
              lineHeight: 1.6,
            }}
          >
            {data.subheading}
          </p>

          <div
            style={{
              width: "60px",
              height: "2px",
              background: "linear-gradient(90deg, #00D4FF, transparent)",
              margin: "1.5rem 0",
            }}
          />
        </section>

        {/* Body sections */}
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            {/* What We Do */}
            <div style={{ marginBottom: "4rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "1rem",
                }}
              >
                What We Do
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {data.whatBody}
              </p>
            </div>

            {/* Who It&apos;s For */}
            <div style={{ marginBottom: "4rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "1rem",
                }}
              >
                Who It&apos;s For
              </h2>
              <p
                style={{
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: 1.8,
                  fontSize: "1rem",
                }}
              >
                {data.whoBody}
              </p>
            </div>

            {/* How It Works */}
            <div>
              <h2
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  color: "#ffffff",
                  marginBottom: "1rem",
                }}
              >
                How It Works
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {data.howSteps.map((step, i) => (
                  <div key={i} style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}>
                    <span
                      style={{
                        color: "#00D4FF",
                        fontFamily: "var(--font-dm-mono), monospace",
                        fontWeight: 700,
                        fontSize: "1rem",
                        minWidth: "24px",
                        flexShrink: 0,
                        paddingTop: "2px",
                      }}
                    >
                      {i + 1}.
                    </span>
                    <p
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        color: "rgba(255,255,255,0.7)",
                        lineHeight: 1.8,
                        fontSize: "1rem",
                        margin: 0,
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          style={{
            paddingTop: "4rem",
            paddingBottom: "4rem",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <h2
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "1.5rem",
                fontWeight: 600,
                color: "#ffffff",
                marginBottom: "2rem",
              }}
            >
              Frequently Asked Questions
            </h2>
            <ServiceFAQ faqs={data.faqs} />
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "clamp(1.5rem, 5vw, 5rem)",
            paddingRight: "clamp(1.5rem, 5vw, 5rem)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 700,
              color: "#ffffff",
              marginBottom: "2rem",
            }}
          >
            Ready to See What&apos;s Possible?
          </h2>

          <style>{`
            .svc-cta-btn:hover { opacity: 0.85; }
            .svc-secondary-link:hover { color: #00D4FF !important; }
          `}</style>

          <a
            href="mailto:hello@blackvertex.io"
            className="svc-cta-btn"
            style={{
              display: "inline-block",
              background: "#00D4FF",
              color: "#0A0A0A",
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              padding: "14px 32px",
              borderRadius: "4px",
              textDecoration: "none",
              transition: "opacity 150ms ease",
            }}
          >
            Start a Project
          </a>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "1.5rem",
            }}
          >
            <Link
              href="/work"
              className="svc-secondary-link"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
            >
              View Our Work →
            </Link>
            <Link
              href="/"
              className="svc-secondary-link"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                color: "rgba(255,255,255,0.5)",
                fontSize: "14px",
                textDecoration: "none",
                transition: "color 150ms ease",
              }}
            >
              Back to Home →
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}
