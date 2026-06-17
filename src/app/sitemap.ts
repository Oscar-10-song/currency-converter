import { MetadataRoute } from 'next';
import { CURRENCIES, ALL_PAIRS } from '@/lib/constants/currencies';
import { SITE_CONFIG } from '@/lib/constants/routes';
import { ARTICLES } from '@/lib/constants/articles';

/**
 * Dynamic sitemap generation.
 * Includes: homepage, all 2,450 currency pairs, single currency pages,
 * blog articles, and static info pages.
 * Total: ~2,500+ URLs, all discoverable by search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/currencies`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pairs`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.3 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/widget`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // All 2,450 currency pair pages
  const pairPages: MetadataRoute.Sitemap = ALL_PAIRS.map((pair, i) => {
    // Tiered priority: major×major pairs get 0.9, others get 0.75
    const priority = i < 50 * 16 ? 0.9 : 0.75;
    return {
      url: `${baseUrl}/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority,
    };
  });

  // Single currency pages
  const currencyPages: MetadataRoute.Sitemap = Object.keys(CURRENCIES).map((code) => ({
    url: `${baseUrl}/${code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages, ...pairPages, ...currencyPages];
}
