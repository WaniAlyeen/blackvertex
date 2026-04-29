import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Black Vertex | Global AI Automation Consultancy",
  description:
    "Black Vertex is an AI consultancy building the advertisements your competition doesn't know how to make yet.",
  metadataBase: new URL("https://blackvertex.io"),
  openGraph: {
    title: "Black Vertex | AI Advertising & Automation",
    description:
      "We make the impossible, inevitable. AI-powered advertising at the edge of what exists.",
    url: "https://blackvertex.io",
    siteName: "Black Vertex",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Black Vertex | AI Advertising & Automation",
    description: "We make the impossible, inevitable.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Black Vertex",
    url: "https://blackvertex.com",
    logo: "https://blackvertex.com/Logo.svg",
    description:
      "Elite AI consultancy specializing in business process automation, AI-generated ads, cinematic AI video, and lip-sync dialogue.",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${dmMono.variable} antialiased`}
      >
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
