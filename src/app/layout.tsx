import type { Metadata } from "next";
import { DM_Sans, DM_Mono, Syne } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/SiteLoader";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-sans",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://blackvertex.io"),
  title: {
    default: "Black Vertex | AI Video Production Studio for Product Brands",
    template: "%s | Black Vertex",
  },
  description:
    "Black Vertex is a 100% AI-powered video production studio. Cinematic AI commercials, product video ads, AI animation, and product reveal videos — no cameras, no crews.",
  keywords: [
    "AI video production agency",
    "cinematic AI commercials",
    "AI product video ads",
    "AI animation studio",
    "product reveal videos",
    "AI advertising agency for brands",
    "AI brand storytelling",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://blackvertex.io",
    siteName: "Black Vertex",
    title: "Black Vertex | AI Video Production Studio for Product Brands",
    description:
      "Cinematic AI commercials, product video ads, AI animation, and product reveal videos. 100% AI-powered. No cameras, no crews.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Black Vertex AI Video Production Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@blackvertexio",
    creator: "@blackvertexio",
    title: "Black Vertex | AI Video Production Studio",
    description:
      "Cinematic AI commercials, product video ads, and AI animation for product brands.",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: { canonical: "https://blackvertex.io" },
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Black Vertex",
  url: "https://blackvertex.io",
  logo: "https://blackvertex.io/Logo.svg",
  description:
    "100% AI-powered video production studio creating cinematic AI commercials, product video ads, AI animation, and product reveal videos.",
  email: "hello@blackvertex.io",
  sameAs: ["https://x.com/blackvertexio"],
  foundingDate: "2024",
  serviceArea: { "@type": "Place", name: "Global" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${dmSans.variable} ${dmMono.variable} ${syne.variable} antialiased`}
      >
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <SiteLoader />
        {children}
        <Analytics />
        <Script
          id="voiceflow-widget"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(d, t) {
                var v = d.createElement(t), s = d.getElementsByTagName(t)[0];
                v.onload = function() {
                  window.voiceflow.chat.load({
                    verify: { projectID: '69f1febf2081880a379990b9' },
                    url: 'https://general-runtime.voiceflow.com',
                    versionID: 'production',
                    voice: { url: 'https://runtime-api.voiceflow.com' }
                  });
                }
                v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
                v.type = "text/javascript";
                s.parentNode.insertBefore(v, s);
              })(document, 'script');
            `,
          }}
        />
      </body>
    </html>
  );
}
