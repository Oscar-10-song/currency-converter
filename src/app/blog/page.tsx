import { Metadata } from 'next';
import Link from 'next/link';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { ARTICLES } from '@/lib/constants/articles';

export const metadata: Metadata = {
  title: 'Currency Guides & Articles — CurrencyHub',
  description:
    'Learn about currency conversion, exchange rates, and international money transfers. Expert guides for travelers, businesses, and investors.',
};

const categoryColors: Record<string, string> = {
  guide: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
  explainer: 'bg-purple-50 text-purple-600 dark:bg-purple-900/20 dark:text-purple-400',
  analysis: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
};

const categoryLabels: Record<string, string> = {
  guide: 'Guide',
  explainer: 'Explainer',
  analysis: 'Analysis',
};

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Articles' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
            Currency Guides & Articles
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
            Learn about exchange rates, currency conversion, and international money transfers.
          </p>

          <div className="space-y-4">
            {ARTICLES.map((article) => (
              <Link
                key={article.slug}
                href={`/blog/${article.slug}`}
                className="block p-5 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-all"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${categoryColors[article.category]}`}>
                    {categoryLabels[article.category]}
                  </span>
                  <span className="text-xs text-neutral-400">{article.readingTime} min read</span>
                </div>
                <h2 className="text-base font-semibold text-neutral-900 dark:text-white mb-1.5">
                  {article.title}
                </h2>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {article.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
