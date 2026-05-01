/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://blackvertex.io',
  generateRobotsTxt: false,
  changefreq: 'weekly',
  priority: 0.7,
  additionalPaths: async () => [
    { loc: '/', changefreq: 'weekly', priority: 1.0 },
    { loc: '/services/cinematic-ai-commercials', changefreq: 'monthly', priority: 0.8 },
    { loc: '/services/ai-product-video-ads', changefreq: 'monthly', priority: 0.8 },
    { loc: '/services/ai-animation-studio', changefreq: 'monthly', priority: 0.8 },
    { loc: '/services/product-reveal-videos', changefreq: 'monthly', priority: 0.8 },
  ],
};
