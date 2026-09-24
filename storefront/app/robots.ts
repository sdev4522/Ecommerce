import { MetadataRoute } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/account/',
          '/account',
          '/checkout/',
          '/checkout',
          '/track-order/',
          '/track-order',
          '/search',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
