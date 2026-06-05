import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { BannerTopAd, InContentAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { ARTICLES } from '@/lib/constants/articles';
import { CURRENCIES } from '@/lib/constants/currencies';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return ARTICLES.map((article) => ({ slug: article.slug }));
}

export function generateMetadata({ params }: Props): Promise<Metadata> {
  return params.then(({ slug }) => {
    const article = ARTICLES.find((a) => a.slug === slug);
    if (!article) return { title: 'Article Not Found' };
    return {
      title: `${article.title} — CurrencyHub`,
      description: article.description,
    };
  });
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: 'Articles', href: '/blog' },
            { label: article.title },
          ]}
        />

        <article className="max-w-2xl mx-auto">
          <header className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white mb-3">
              {article.title}
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              {article.description}
            </p>
            <div className="flex items-center gap-3 mt-3 text-xs text-neutral-400">
              <span>{article.readingTime} min read</span>
            </div>
          </header>

          <div className="space-y-6 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  {section.heading}
                </h2>
                <p>{section.content}</p>
              </section>
            ))}
          </div>

          <InContentAd />

          {/* Related currency pairs */}
          {article.relatedPairs.length > 0 && (
            <div className="mt-10">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                Related Exchange Rates
              </h2>
              <div className="flex flex-wrap gap-2">
                {article.relatedPairs.map((pair) => {
                  const baseCcy = CURRENCIES[pair.base];
                  return (
                    <Link
                      key={`${pair.base}-${pair.target}`}
                      href={`/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      <span>{baseCcy?.flag}</span>
                      <span>{pair.base}/{pair.target}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Back link */}
          <div className="mt-10 pb-10">
            <Link
              href="/blog"
              className="text-sm text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
            >
              ← Back to all articles
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
