import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import SiteLoader from "@/components/SiteLoader";

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
    "Elite AI consultancy specializing in business process automation, AI-generated ads, cinematic AI video, and lip-sync dialogue.",
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
      </body>
    </html>
  );
}
