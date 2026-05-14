import type { Metadata } from "next";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = {
  title: "Gallery - Black Vertex",
  description:
    "Explore all AI-generated video projects from Black Vertex — cinematic commercials, product reveals, and animation.",
  openGraph: {
    title: "Gallery - Black Vertex",
    description:
      "Explore all AI-generated video projects from Black Vertex — cinematic commercials, product reveals, and animation.",
    url: "https://blackvertex.io/gallery",
    siteName: "Black Vertex",
    type: "website",
  },
};

const VIDEOS = [
  { id: 1, vimeoId: "1192331557", tags: ["animated"] },
  { id: 2, vimeoId: "1192331556", tags: ["cinematics"] },
  { id: 3, vimeoId: "1192331560", tags: ["showroom showcase"] },
  { id: 4, vimeoId: "1192331667", tags: ["watch"] },
  { id: 5, vimeoId: "1192331553", tags: ["car"] },
  { id: 6, vimeoId: "1178209995", tags: ["product", "reveal"] },
  { id: 7, vimeoId: "1178210041", tags: ["showroom", "cinematics", "brand story"] },
  { id: 8, vimeoId: "1178210233", tags: ["cinematics", "product", "showroom"] },
  { id: 9, vimeoId: "1185409516", tags: ["cinematics"] },
];

async function fetchThumbnail(vimeoId: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=https://vimeo.com/${vimeoId}`,
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return (data.thumbnail_url as string) || null;
  } catch {
    return null;
  }
}

export default async function GalleryPage() {
  const videos = await Promise.all(
    VIDEOS.map(async (v) => ({
      ...v,
      thumbnail: await fetchThumbnail(v.vimeoId),
    }))
  );

  return <GalleryClient videos={videos} />;
}
