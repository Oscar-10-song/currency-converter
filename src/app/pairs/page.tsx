import type { Metadata } from 'next';
import Link from 'next/link';
import { CURRENCIES, ALL_PAIRS } from '@/lib/constants/currencies';
import { SITE_CONFIG } from '@/lib/constants/routes';
import { BannerTopAd, InContentAd } from '@/components/ads/AdPlacements';

export const metadata: Metadata = {
  title: 'Browse All Currency Pairs — Exchange Rates | CurrencyHub',
  description:
    'Browse all 2,450+ currency pairs with live exchange rates. Find any currency pair from USD, EUR, GBP, JPY, CNY and 45+ more global currencies.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/pairs`,
  },
};

/**
 * Browse All Pairs page — a comprehensive currency matrix.
 * Serves as an internal link hub, helping search engines discover
 * all 2,450 currency pair pages and distributing PageRank.
 */
export default function PairsPage() {
  const allCodes = Object.keys(CURRENCIES);

  // Group pairs by base currency for organized display
  const grouped = new Map<string, { base: string; target: string }[]>();
  for (const pair of ALL_PAIRS) {
    if (!grouped.has(pair.base)) grouped.set(pair.base, []);
    grouped.get(pair.base)!.push(pair);
  }

  return (
    <div className="min-h-screen">
      <BannerTopAd />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight">
              Browse All Currency Pairs
            </h1>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
              {ALL_PAIRS.length.toLocaleString()}+ currency pairs with real-time exchange rates.
              Select a base currency to explore all available conversions.
            </p>
          </div>

          <InContentAd />

          {/* Currency Matrix — grid of base currencies with their target links */}
          <div className="mt-8 space-y-10">
            {allCodes.map((base) => {
              const currency = CURRENCIES[base];
              const pairs = grouped.get(base) || [];
              return (
                <section key={base} id={base.toLowerCase()}>
                  <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <span>{currency.flag}</span>
                    <span>{currency.name} ({base})</span>
                    <span className="text-xs font-normal text-neutral-400">
                      — {pairs.length} pairs
                    </span>
                  </h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-1.5">
                    {pairs.map((pair) => {
                      const targetCcy = CURRENCIES[pair.target];
                      return (
                        <Link
                          key={`${pair.base}-${pair.target}`}
                          href={`/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`}
                          className="block px-3 py-2 text-sm rounded-lg border border-neutral-100 dark:border-neutral-800 hover:border-indigo-200 dark:hover:border-indigo-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 transition-all"
                        >
                          <span className="text-xs text-neutral-400">
                            {targetCcy?.flag}{' '}
                          </span>
                          <span className="font-medium tabular-nums text-neutral-700 dark:text-neutral-300">
                            {pair.base}/{pair.target}
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-12 pt-8 border-t border-neutral-100 dark:border-neutral-800 text-center">
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Can not find what you need?{' '}
              <Link href="/" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Go to the converter
              </Link>{' '}
              and enter any currency pair manually.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
