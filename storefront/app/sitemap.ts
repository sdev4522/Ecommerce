import { MetadataRoute } from 'next';
import { getProducts, getCategories, getBlogPosts } from '../lib/botble';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const currentDate = new Date().toISOString();

  // Core static marketing and storefront routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${siteUrl}/shop`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${siteUrl}/wishlist`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    {
      url: `${siteUrl}/cart`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.4,
    },
  ];

  try {
    const [products, categories, posts] = await Promise.all([
      getProducts({ per_page: 100 }),
      getCategories(),
      getBlogPosts(),
    ]);

    const productRoutes: MetadataRoute.Sitemap = (products || []).map((product) => ({
      url: `${siteUrl}/product/${product.slug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

    const categoryRoutes: MetadataRoute.Sitemap = (categories || []).map((cat) => ({
      url: `${siteUrl}/shop?category=${encodeURIComponent(cat.slug)}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    }));

    const blogRoutes: MetadataRoute.Sitemap = (posts?.posts || []).map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    }));

    return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...blogRoutes];
  } catch {
    return staticRoutes;
  }
}
