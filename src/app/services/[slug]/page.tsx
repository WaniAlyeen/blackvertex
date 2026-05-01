import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ServiceFAQ from "@/components/ServiceFAQ";

// ─── Icon lookup (server-side JSX) ──────────────────────────────────────────

const ICONS: Record<string, React.ReactNode> = {
  film: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
    </svg>
  ),
  sparkles: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
      <path d="M18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
    </svg>
  ),
  repeat: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    </svg>
  ),
  layers: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
    </svg>
  ),
  image: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
    </svg>
  ),
  zap: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  ),
  "bar-chart": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  ),
  copy: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9 3.664A2.251 2.251 0 0015 9.75H9a2.25 2.25 0 00-2.25 2.25v9A2.25 2.25 0 009 23.25h6A2.25 2.25 0 0017.25 21v-9a2.25 2.25 0 00-.6-1.586z" />
    </svg>
  ),
  star: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
    </svg>
  ),
  pen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125" />
    </svg>
  ),
  user: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  ),
  globe: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
  ),
  "play-circle": (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      <path d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
    </svg>
  ),
  smartphone: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 8.25h3" />
    </svg>
  ),
  calendar: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  ),
  package: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
    </svg>
  ),
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface FAQ {
  q: string;
  a: string;
}

interface SubCard {
  icon: string;
  title: string;
  body: string;
}

interface ServiceData {
  eyebrow: string;
  h1: string;
  subheading: string;
  metaTitle: string;
  metaDescription: string;
  vimeoId: string | null;
  whatBody: string;
  whoBody: string;
  howSteps: string[];
  subCards: SubCard[];
  faqs: FAQ[];
}

// ─── Service data ─────────────────────────────────────────────────────────────

const SERVICE_DATA: Record<string, ServiceData> = {
  "cinematic-ai-commercials": {
    eyebrow: "Brand Storytelling",
    h1: "Cinematic AI Commercials",
    subheading:
      "Long-form brand films and premium AI commercials — built for campaigns that demand more than an ad.",
    metaTitle: "Cinematic AI Commercials for Brands",
    metaDescription:
      "Premium AI-generated brand films and long-form cinematic commercials. No studio, no crew — broadcast-quality storytelling powered entirely by AI.",
    vimeoId: null,
    whatBody:
      "We produce long-form cinematic commercials entirely through AI — no studios, no crews, no location logistics. From brand launches to campaign hero films, we build premium video narratives that match the quality of broadcast production at a fraction of the time and cost. Every frame is directed with intention.",
    whoBody:
      "Built for product brands, luxury labels, and companies launching campaigns that need to establish emotional authority. If your brand story requires cinematic weight — not just a product clip — this is the service.",
    howSteps: [
      "Brief & Alignment — we extract your brand tone, visual references, and narrative goals.",
      "AI Production — our multi-layered workflow generates, grades, and assembles the commercial.",
      "Delivery — broadcast-ready final cut delivered within your timeline, with unlimited revisions.",
    ],
    subCards: [
      {
        icon: "film",
        title: "Brand Films",
        body: "Long-form narrative commercials built to establish emotional authority for your brand across premium channels.",
      },
      {
        icon: "sparkles",
        title: "Campaign Hero Ads",
        body: "Flagship ad creative for major campaign launches — cinematic, broadcast-ready, and built to anchor your entire creative strategy.",
      },
      {
        icon: "repeat",
        title: "Multi-Format Delivery",
        body: "Every commercial delivered in all required aspect ratios — 16:9, 9:16, 1:1 — for every platform simultaneously.",
      },
      {
        icon: "layers",
        title: "Unlimited Revisions",
        body: "We stay in production until the output matches the vision. Every project includes unlimited revision rounds.",
      },
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
    vimeoId: null,
    whatBody:
      "Send us your product images and details. We return a professionally produced video ad engineered to stop scroll and drive action. Our AI production pipeline transforms even basic product photography into broadcast-quality commercial content — color-graded, sound-designed, and platform-optimized.",
    whoBody:
      "Ideal for D2C brands, e-commerce companies, and product launches that need high-quality ad creative at speed and volume. If you're spending on paid social and your creative is the bottleneck, this service solves it.",
    howSteps: [
      "Asset Intake — send product images, brand colors, and target platform.",
      "AI Production — we build your ad using our cinematic product workflow.",
      "Platform Delivery — final video exported in all required specs (9:16, 1:1, 16:9).",
    ],
    subCards: [
      {
        icon: "image",
        title: "Image-to-Ad Pipeline",
        body: "Send us your product images — even smartphone photos. We return broadcast-quality ad creative. No studio required.",
      },
      {
        icon: "zap",
        title: "Platform-Optimised Formats",
        body: "Meta, TikTok, YouTube, Google Display — every ad delivered in all specs, cut for platform-native performance.",
      },
      {
        icon: "bar-chart",
        title: "Performance Creative",
        body: "Designed to stop scroll and drive action. Every ad is engineered with performance intent, not just visual appeal.",
      },
      {
        icon: "copy",
        title: "Creative Volume",
        body: "Multiple variations, hooks, and cuts from a single brief. Built for brands that test at scale.",
      },
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
    vimeoId: null,
    whatBody:
      "We produce world-class AI animation — from Pixar-quality 3D character narratives to stylized anime-influenced brand films. Our animation pipeline generates visually stunning, character-driven content that makes products and brands feel like stories worth watching, not just ads worth skipping.",
    whoBody:
      "For brands targeting younger audiences, gaming and entertainment adjacents, or any company that wants brand content with lasting visual impact. Also ideal for explainer content that needs personality and memorability over plain live-action.",
    howSteps: [
      "Style Selection — we align on animation style, character direction, and narrative tone.",
      "AI Animation Production — scenes, characters, and motion are generated through our animation workflow.",
      "Post-Production & Delivery — color, sound design, and final cut delivered to spec.",
    ],
    subCards: [
      {
        icon: "star",
        title: "Pixar-Quality 3D",
        body: "Character-driven 3D animation that rivals Hollywood studio output — at a fraction of the timeline and cost.",
      },
      {
        icon: "pen",
        title: "Anime & Stylised",
        body: "2D anime-influenced and stylised animation for brands targeting younger, culturally-engaged audiences.",
      },
      {
        icon: "user",
        title: "Consistent Characters",
        body: "We build and lock your animated character before production, ensuring identical appearance across every scene and future campaign.",
      },
      {
        icon: "globe",
        title: "Ad-Ready Output",
        body: "All animation delivered cleared and formatted for paid social, YouTube pre-roll, and broadcast advertising.",
      },
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
    vimeoId: null,
    whatBody:
      "A product reveal video is a precision-engineered short-form production designed to make a single product feel like an event. We use hyper-motion AI techniques — dramatic camera movement, cinematic lighting transitions, and sound-synchronized cuts — to create reveal content that builds anticipation and lands impact.",
    whoBody:
      "Built for brands launching new products, limited editions, or seasonal collections. Particularly effective for social media drops, press kit content, and e-commerce hero video.",
    howSteps: [
      "Product Intake — send product images, launch context, and preferred platform.",
      "Motion Production — our hyper-motion AI workflow builds the reveal sequence.",
      "Delivery — final cut in all required formats, ready to publish on launch day.",
    ],
    subCards: [
      {
        icon: "play-circle",
        title: "Hyper-Motion Reveals",
        body: "Dramatic camera movement, cinematic lighting transitions, and sound-synchronized cuts — engineered for maximum impact at the moment of unveil.",
      },
      {
        icon: "smartphone",
        title: "Social-First Format",
        body: "Built for Instagram Reels, TikTok, and YouTube Shorts. Vertical-first with horizontal variants included as standard.",
      },
      {
        icon: "calendar",
        title: "Launch-Day Ready",
        body: "Tight timelines, precise delivery. Product reveals are scoped and scheduled around your launch date, not our convenience.",
      },
      {
        icon: "package",
        title: "Product Fidelity",
        body: "Your product's packaging, label, colour, and form are preserved with pixel-level accuracy in every frame.",
      },
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

// ─── Next.js exports ─────────────────────────────────────────────────────────

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

// ─── Page component ───────────────────────────────────────────────────────────

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

      <style>{`
        .svc-primary-btn {
          display: inline-block;
          background: #0A0A0A;
          color: #fff;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: 0.9375rem;
          padding: 13px 28px;
          border-radius: 6px;
          text-decoration: none;
          transition: background 150ms ease;
          text-align: center;
        }
        .svc-primary-btn:hover { background: #2A2A2A; }
        .svc-primary-btn.full-mobile { display: block; width: 100%; }
        @media (min-width: 640px) { .svc-primary-btn.full-mobile { display: inline-block; width: auto; } }

        .svc-ghost-btn {
          display: inline-block;
          background: transparent;
          color: #0A0A0A;
          font-family: var(--font-dm-sans), sans-serif;
          font-weight: 600;
          font-size: 0.9375rem;
          padding: 13px 28px;
          border-radius: 6px;
          border: 1px solid rgba(0,0,0,0.15);
          text-decoration: none;
          transition: border-color 150ms ease;
        }
        .svc-ghost-btn:hover { border-color: rgba(0,0,0,0.4); }

        .svc-secondary-link { transition: color 150ms ease; }
        .svc-secondary-link:hover { color: #0A0A0A !important; }

        .svc-card {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(0,0,0,0.07);
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04);
          padding: 1.75rem;
          transition: transform 200ms ease, box-shadow 200ms ease;
        }
        .svc-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 28px rgba(0,0,0,0.09);
        }

        .svc-thumb {
          border-radius: 10px;
          overflow: hidden;
          aspect-ratio: 16/9;
          background: #E8E8E8;
          transition: transform 200ms ease, box-shadow 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .svc-thumb:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 24px rgba(0,0,0,0.1);
        }

        .svc-process-step {
          display: flex;
          gap: 1.5rem;
          align-items: flex-start;
          padding: 0.75rem;
          border-radius: 8px;
          transition: background 150ms ease;
          cursor: default;
        }
        .svc-process-step:hover { background: #F7F7F7; }
      `}</style>

      <div style={{ background: "#FFFFFF", minHeight: "100vh" }}>
        <Navbar />

        {/* ── A: Breadcrumb ─────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16"
          style={{ paddingTop: "6.5rem", paddingBottom: "0" }}
        >
          <div
            className="max-w-screen-lg mx-auto flex items-center justify-between"
          >
            <nav
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "13px",
                color: "rgba(0,0,0,0.4)",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
              aria-label="Breadcrumb"
            >
              <Link href="/" style={{ color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>
                Home
              </Link>
              <span style={{ color: "rgba(0,0,0,0.25)" }}>›</span>
              <Link href="/#services" style={{ color: "rgba(0,0,0,0.4)", textDecoration: "none" }}>
                Services
              </Link>
              <span style={{ color: "rgba(0,0,0,0.25)" }}>›</span>
              <span style={{ color: "#0A0A0A", fontWeight: 500 }}>{data.h1}</span>
            </nav>
            <span
              className="hidden sm:block"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.1em",
                color: "rgba(0,0,0,0.45)",
                textTransform: "uppercase",
              }}
            >
              {data.eyebrow}
            </span>
          </div>
        </section>

        {/* ── B: Hero ───────────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#FFFFFF" }}
        >
          <div className="max-w-[900px] mx-auto text-center">
            <p
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "11px",
                letterSpacing: "0.12em",
                color: "rgba(0,0,0,0.45)",
                textTransform: "uppercase",
                marginBottom: "1rem",
              }}
            >
              {data.eyebrow}
            </p>

            <h1
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.75rem)",
                fontWeight: 700,
                color: "#0A0A0A",
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              {data.h1}
            </h1>

            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.125rem",
                color: "#555555",
                maxWidth: "600px",
                margin: "1rem auto 0",
                lineHeight: 1.7,
              }}
            >
              {data.subheading}
            </p>

            <div
              style={{
                width: "48px",
                height: "2px",
                background: "#0A0A0A",
                margin: "1.5rem auto 0",
              }}
            />

            <div style={{ marginTop: "2rem" }}>
              <a
                href="mailto:hello@blackvertex.io"
                className="btn-gradient full-mobile"
              >
                Get a Quote for {data.h1}
              </a>
            </div>
          </div>
        </section>

        {/* ── C: Video Showcase ─────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#F7F7F7" }}
        >
          <div className="max-w-screen-lg mx-auto">
            <h2
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "1.25rem",
                fontWeight: 600,
                color: "#0A0A0A",
                textAlign: "center",
                marginBottom: "2rem",
              }}
            >
              Watch Our {data.h1} Examples
            </h2>

            {/* Primary video */}
            <div className="mx-auto" style={{ maxWidth: "820px" }}>
              <div
                className="w-full aspect-video"
                style={{
                  background: "#0A0A0A",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
                }}
              >
                {data.vimeoId ? (
                  <iframe
                    src={`https://player.vimeo.com/video/${data.vimeoId}?autoplay=0&title=0&byline=0&portrait=0`}
                    className="w-full h-full"
                    frameBorder="0"
                    allowFullScreen
                    title={`${data.h1} — Black Vertex`}
                  />
                ) : (
                  <div
                    className="w-full h-full flex flex-col items-center justify-center gap-4"
                    style={{ color: "rgba(255,255,255,0.6)" }}
                  >
                    <svg
                      width="48"
                      height="48"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      <path d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                    </svg>
                    <span
                      style={{
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        fontSize: "0.875rem",
                        color: "rgba(255,255,255,0.45)",
                      }}
                    >
                      Video Coming Soon
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail grid */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 mx-auto"
              style={{ maxWidth: "820px" }}
            >
              {["Example Work A", "Example Work B"].map((label) => (
                <div key={label} className="svc-thumb">
                  <span
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.8125rem",
                      color: "#999999",
                    }}
                  >
                    {data.h1} — {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── D: Service Description ────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#FFFFFF" }}
        >
          <div className="max-w-[760px] mx-auto">
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.0625rem",
                color: "#555555",
                lineHeight: 1.85,
                marginBottom: "1.5rem",
              }}
            >
              {data.whatBody}
            </p>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "1.0625rem",
                color: "#555555",
                lineHeight: 1.85,
                marginBottom: "2rem",
              }}
            >
              {data.whoBody}
            </p>
            <a href="mailto:hello@blackvertex.io" className="svc-primary-btn full-mobile">
              Start a Project →
            </a>
          </div>
        </section>

        {/* ── E: Sub-Service Grid ───────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#F7F7F7" }}
        >
          <div className="max-w-screen-lg mx-auto">
            <h2
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "#0A0A0A",
                marginBottom: "0.5rem",
              }}
            >
              What&apos;s Included
            </h2>
            <p
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.9375rem",
                color: "#555555",
                marginBottom: "2.5rem",
              }}
            >
              Every {data.h1} project includes the following as standard.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {data.subCards.map((card) => (
                <div key={card.title} className="svc-card">
                  <div style={{ color: "#0A0A0A", marginBottom: "1rem" }}>
                    {ICONS[card.icon]}
                  </div>
                  <h3
                    style={{
                      fontFamily: "var(--font-syne), sans-serif",
                      fontSize: "1.125rem",
                      fontWeight: 600,
                      color: "#0A0A0A",
                      marginBottom: "0.5rem",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      fontSize: "0.9375rem",
                      color: "#555555",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── F: Process ───────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#FFFFFF" }}
        >
          <div className="max-w-[760px] mx-auto">
            <h2
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "1.375rem",
                fontWeight: 600,
                color: "#0A0A0A",
                marginBottom: "2.5rem",
              }}
            >
              Our {data.h1} Process
            </h2>

            <div>
              {data.howSteps.map((step, i) => {
                const dashIdx = step.indexOf(" — ");
                const stepTitle = dashIdx > -1 ? step.slice(0, dashIdx) : step;
                const stepBody = dashIdx > -1 ? step.slice(dashIdx + 3) : "";

                return (
                  <div key={i}>
                    <div className="svc-process-step">
                      <span
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          fontSize: "1.5rem",
                          fontWeight: 700,
                          color: "#0A0A0A",
                          minWidth: "2rem",
                          lineHeight: 1.2,
                          flexShrink: 0,
                        }}
                      >
                        {i + 1}
                      </span>
                      <div>
                        <h3
                          style={{
                            fontFamily: "var(--font-dm-sans), sans-serif",
                            fontSize: "1rem",
                            fontWeight: 600,
                            color: "#0A0A0A",
                            margin: 0,
                          }}
                        >
                          {stepTitle}
                        </h3>
                        {stepBody && (
                          <p
                            style={{
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              fontSize: "0.9375rem",
                              color: "#555555",
                              lineHeight: 1.7,
                              marginTop: "0.25rem",
                              margin: "0.25rem 0 0",
                            }}
                          >
                            {stepBody}
                          </p>
                        )}
                      </div>
                    </div>
                    {i < data.howSteps.length - 1 && (
                      <div
                        style={{
                          height: "1px",
                          background: "rgba(0,0,0,0.07)",
                          margin: "1.5rem 0",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── G: FAQ ───────────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-10 md:py-16"
          style={{ background: "#F7F7F7" }}
        >
          <div className="max-w-[760px] mx-auto">
            <ServiceFAQ faqs={data.faqs} />
          </div>
        </section>

        {/* ── H: CTA Footer ────────────────────────────────────────────── */}
        <section
          className="px-6 md:px-10 lg:px-16 py-16 md:py-24 text-center"
          style={{ background: "#FFFFFF" }}
        >
          <h2
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 700,
              color: "#0A0A0A",
            }}
          >
            Ready to See What&apos;s Possible?
          </h2>
          <p
            style={{
              fontFamily: "var(--font-dm-sans), sans-serif",
              fontSize: "1rem",
              color: "#555555",
              marginTop: "0.75rem",
            }}
          >
            Bring us your product. We&apos;ll bring you the impossible.
          </p>

          <div style={{ marginTop: "2rem" }}>
            <a href="mailto:hello@blackvertex.io" className="svc-primary-btn full-mobile">
              Start a Project →
            </a>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "2rem",
              marginTop: "1.25rem",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/work"
              className="svc-secondary-link"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "rgba(0,0,0,0.45)",
                textDecoration: "none",
              }}
            >
              View Our Work →
            </Link>
            <Link
              href="/"
              className="svc-secondary-link"
              style={{
                fontFamily: "var(--font-dm-sans), sans-serif",
                fontSize: "0.875rem",
                color: "rgba(0,0,0,0.45)",
                textDecoration: "none",
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
