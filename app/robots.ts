import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/help-center',
          '/be-a-vendor',
          '/archive',
        ],
      },
      // Block AI training scrapers
      { userAgent: 'GPTBot',        disallow: '/' },
      { userAgent: 'ChatGPT-User',  disallow: '/' },
      { userAgent: 'CCBot',         disallow: '/' },
      { userAgent: 'anthropic-ai',  disallow: '/' },
      { userAgent: 'Claude-Web',    disallow: '/' },
      { userAgent: 'Google-Extended',disallow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
    ],
    sitemap: 'https://longstrider.ai/sitemap.xml',
    host: 'https://longstrider.ai',
  };
}
