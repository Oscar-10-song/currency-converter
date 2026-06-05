import { MetadataRoute } from 'next';
import { CURRENCIES, TOP_PAIRS } from '@/lib/constants/currencies';
import { SITE_CONFIG } from '@/lib/constants/routes';
import { ARTICLES } from '@/lib/constants/articles';

/**
 * Dynamic sitemap generation.
 * Includes: homepage, all currency pairs, all currency pages, and info pages.
 * This ensures all SEO pages are discoverable by search engines.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/currencies`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
  ];

  // Blog article pages
  const blogPages: MetadataRoute.Sitemap = ARTICLES.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Currency pair pages (Top 50 pairs + all pairs against USD)
  const pairPages: MetadataRoute.Sitemap = TOP_PAIRS.map((pair) => ({
    url: `${baseUrl}/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  // Generate additional pairs: all currencies x USD (if not already in TOP_PAIRS)
  const usdPairs: MetadataRoute.Sitemap = Object.keys(CURRENCIES)
    .filter((code) => code !== 'USD' && !TOP_PAIRS.some((p) => p.base === code && p.target === 'USD'))
    .map((code) => ({
      url: `${baseUrl}/${code.toLowerCase()}-to-usd`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.9,
    }));

  // Single currency pages
  const currencyPages: MetadataRoute.Sitemap = Object.keys(CURRENCIES).map((code) => ({
    url: `${baseUrl}/${code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Also add reverse pairs for all USD pairs (USD to X is already in TOP_PAIRS for most)
  const reverseUsdPairs: MetadataRoute.Sitemap = Object.keys(CURRENCIES)
    .filter(
      (code) =>
        code !== 'USD' &&
        !TOP_PAIRS.some((p) => p.base === 'USD' && p.target === code)
    )
    .map((code) => ({
      url: `${baseUrl}/usd-to-${code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.85,
    }));

  // Combine all, deduplicating by URL
  const allPages = [
    ...staticPages,
    ...blogPages,
    ...pairPages,
    ...usdPairs,
    ...reverseUsdPairs,
    ...currencyPages,
  ];

  // Deduplicate by URL
  const seen = new Set<string>();
  return allPages.filter((page) => {
    if (seen.has(page.url)) return false;
    seen.add(page.url);
    return true;
  });
}
