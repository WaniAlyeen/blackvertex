/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        // Supabase Storage — used for blog cover images uploaded via the admin CMS
        protocol: 'https',
        hostname: '*.supabase.co',
      },
      {
        // Vimeo thumbnail CDN — used by the gallery page via oEmbed API
        protocol: 'https',
        hostname: 'i.vimeocdn.com',
      },
    ],
  },
};

export default nextConfig;
