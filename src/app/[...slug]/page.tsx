import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Converter } from '@/components/converter/Converter';
import { RateTable } from '@/components/converter/RateTable';
import { SparklineChartWrapper } from '@/components/converter/SparklineChartWrapper';
import { TransferLinks } from '@/components/affiliate/TransferLinks';
import { BannerTopAd, InContentAd } from '@/components/ads/AdPlacements';
import { JsonLdBreadcrumb, JsonLdExchangeRate, JsonLdFAQ } from '@/components/seo/JsonLd';
import { Breadcrumb } from '@/components/seo/Breadcrumb';
import { CURRENCIES, ALL_PAIRS } from '@/lib/constants/currencies';
import { getPairSeo, getCurrencySeo } from '@/lib/constants/seo';
import { SITE_CONFIG } from '@/lib/constants/routes';
import { getExchangeRate, getHistoricalRates } from '@/lib/api/exchange-rate';
import Link from 'next/link';

interface Props {
  params: Promise<{ slug: string[] }>;
}

/**
 * Parse the slug to determine page type.
 * - ['usd-to-cny'] => currency pair
 * - ['usd'] => single currency
 */
function parseSlug(slug: string[]) {
  if (slug.length !== 1) return null;

  const segment = slug[0].toUpperCase();

  // Check for currency pair pattern: "USD-TO-CNY"
  const match = segment.match(/^([A-Z]{3})-TO-([A-Z]{3})$/);
  if (match) {
    const base = match[1];
    const target = match[2];
    if (CURRENCIES[base] && CURRENCIES[target]) {
      return { type: 'pair' as const, base, target };
    }
  }

  // Check for single currency
  if (CURRENCIES[segment]) {
    return { type: 'currency' as const, code: segment };
  }

  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: 'Page Not Found' };

  if (parsed.type === 'pair') {
    const seo = getPairSeo(parsed.base, parsed.target);
    const baseLower = parsed.base.toLowerCase();
    const targetLower = parsed.target.toLowerCase();
    return {
      title: seo.title,
      description: seo.description,
      alternates: {
        canonical: `${SITE_CONFIG.url}/${baseLower}-to-${targetLower}`,
      },
    };
  }

  const seo = getCurrencySeo(parsed.code);
  const codeLower = parsed.code.toLowerCase();
  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: `${SITE_CONFIG.url}/${codeLower}`,
    },
  };
}

export default async function SlugPage({ params }: Props) {
  const { slug } = await params;
  const parsed = parseSlug(slug);

  if (!parsed) {
    notFound();
  }

  if (parsed.type === 'pair') {
    return <CurrencyPairPage base={parsed.base} target={parsed.target} />;
  }

  return <CurrencyPage code={parsed.code} />;
}

/** Currency Pair Page: /usd-to-cny */
async function CurrencyPairPage({ base, target }: { base: string; target: string }) {
  const baseLower = base.toLowerCase();
  const targetLower = target.toLowerCase();
  const baseCcy = CURRENCIES[base];
  const targetCcy = CURRENCIES[target];

  // Fetch data
  const [rate, history7d, history30d] = await Promise.all([
    getExchangeRate(base, target),
    getHistoricalRates(base, target, 7),
    getHistoricalRates(base, target, 30),
  ]);

  const inverseRate = rate ? 1 / rate : null;

  // Build related pairs: same base, up to 12
  const relatedPairs = ALL_PAIRS
    .filter((p) => p.base === base && p.target !== target)
    .slice(0, 12);

  // Common conversion amounts for long-tail SEO
  const commonAmounts = [1, 5, 10, 25, 50, 100, 500, 1000, 5000, 10000];

  const faqItems = [
    {
      question: `What is the current ${base} to ${target} exchange rate?`,
      answer: `The current exchange rate from ${baseCcy?.name} (${base}) to ${targetCcy?.name} (${target}) is ${rate?.toFixed(6) || 'N/A'}. This rate is updated every 10 minutes.`,
    },
    {
      question: `How do I convert ${base} to ${target}?`,
      answer: `Enter the amount of ${baseCcy?.name} you want to convert in the converter above, select ${base} as the source currency and ${target} as the target currency, and you will see the converted amount instantly.`,
    },
    {
      question: `What is the best time to exchange ${base} to ${target}?`,
      answer: `Exchange rates fluctuate throughout the day based on global market conditions. The best time to exchange depends on market trends. Use our real-time converter to check the latest rate before making any transactions.`,
    },
  ];

  return (
    <div className="min-h-screen">
      <BannerTopAd />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: `${base} to ${target}` },
          ]}
        />
        <JsonLdBreadcrumb
          items={[
            { name: 'Home', url: SITE_CONFIG.url },
            { name: `${base} to ${target}`, url: `${SITE_CONFIG.url}/${baseLower}-to-${targetLower}` },
          ]}
        />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-center mb-2">
            {baseCcy?.flag} {base} to {targetCcy?.flag} {target} Converter
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center mb-8">
            Convert {baseCcy?.name} ({base}) to {targetCcy?.name} ({target}) in real-time.
          </p>

          {/* Converter with pre-selected pair */}
          <Converter defaultFrom={base} defaultTo={target} />

          {/* Rate Info */}
          <div className="mt-6 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Current Rate</p>
                <p className="text-lg font-semibold mt-0.5">
                  1 {base} = {rate?.toFixed(6) || '...'} {target}
                </p>
                {inverseRate && (
                  <p className="text-sm text-neutral-400 mt-0.5">
                    1 {target} = {inverseRate.toFixed(6)} {base}
                  </p>
                )}
              </div>
              {rate && (
                <JsonLdExchangeRate
                  fromCurrency={base}
                  toCurrency={target}
                  exchangeRate={rate}
                  dateModified={new Date().toISOString()}
                />
              )}
            </div>
          </div>

          {/* Common Conversion Amounts — captures "X USD to EUR" long-tail queries */}
          {rate && (
            <div className="mt-6">
              <h2 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                {base} to {target} Conversion Table
              </h2>
              <div className="overflow-hidden rounded-xl border border-neutral-100 dark:border-neutral-800">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-neutral-50 dark:bg-neutral-900/50">
                      <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {baseCcy?.name} ({base})
                      </th>
                      <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                        {targetCcy?.name} ({target})
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {commonAmounts.map((amt) => (
                      <tr key={amt} className="hover:bg-neutral-50/50 dark:hover:bg-neutral-900/30 transition-colors">
                        <td className="px-4 py-2.5 font-medium tabular-nums">
                          {amt.toLocaleString()} {base}
                        </td>
                        <td className="px-4 py-2.5 text-right tabular-nums text-neutral-600 dark:text-neutral-400">
                          {(amt * rate).toFixed(4)} {target}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Historical Sparkline */}
          <SparklineChartWrapper
            data7d={history7d}
            data30d={history30d}
            base={base}
            target={target}
          />

          {/* Rate Table */}
          {rate && (
            <div className="mt-6">
              <RateTable base={base} target={target} rate={rate} />
            </div>
          )}

          {/* Transfer affiliate links */}
          <div className="mt-6">
            <TransferLinks fromCurrency={base} toCurrency={target} />
          </div>

          <InContentAd />

          {/* SEO Content */}
          <div className="mt-10 space-y-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
              {baseCcy?.name} to {targetCcy?.name} Exchange Rate
            </h2>
            <p>
              The live {base} to {target} exchange rate shows how much one{' '}
              {baseCcy?.name} ({base}) is worth in {targetCcy?.name} ({target}).
              {rate && (
                <> As of today, <strong>1 {base} = {rate.toFixed(6)} {target}</strong>.</>
              )}{' '}
              This pair is actively traded by international businesses, travelers, and
              investors seeking exposure to these two currencies.
            </p>
            <p>
              {baseCcy?.flag} The <strong>{baseCcy?.name} ({base})</strong> (symbol:{' '}
              {baseCcy?.symbol}) is the official currency used in regions that accept it.
              {base === 'USD' && " As the world's primary reserve currency, it plays a central role in global trade and finance."}
              {base === 'EUR' && ' As the single currency of the Eurozone, it serves 20 EU member states and over 340 million citizens.'}
              {base === 'GBP' && ' As the oldest continuously used currency, the British Pound remains a major global reserve currency.'}
              {base === 'JPY' && ' The Japanese Yen is one of the most traded currencies in Asia and a key safe-haven asset.'}
              {base === 'CNY' && ' The Chinese Yuan (Renminbi) is increasingly used in international trade and is a component of the IMF SDR basket.'}
            </p>
            <p>
              {targetCcy?.flag} The <strong>{targetCcy?.name} ({target})</strong> (symbol:{' '}
              {targetCcy?.symbol}) is the official currency used in regions that accept it.
              {target === 'USD' && " As the world's primary reserve currency, it plays a central role in global trade and finance."}
              {target === 'EUR' && ' As the single currency of the Eurozone, it serves 20 EU member states and over 340 million citizens.'}
              {target === 'GBP' && ' As the oldest continuously used currency, the British Pound remains a major global reserve currency.'}
              {target === 'JPY' && ' The Japanese Yen is one of the most traded currencies in Asia and a key safe-haven asset.'}
              {target === 'CNY' && ' The Chinese Yuan (Renminbi) is increasingly used in international trade and is a component of the IMF SDR basket.'}
            </p>
          </div>

          {/* Related Pairs */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Related {base} Exchange Rates</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {relatedPairs.map((pair) => {
                const tCcy = CURRENCIES[pair.target];
                return (
                  <Link
                    key={`${pair.base}-${pair.target}`}
                    href={`/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`}
                    className="block p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
                  >
                    <span className="text-xs text-neutral-400">{pair.base}</span>
                    <p className="text-sm font-medium truncate">
                      {tCcy?.flag} {pair.target}
                    </p>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-10 pb-10">
            <h2 className="text-lg font-semibold mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {faqItems.map((item) => (
                <details
                  key={item.question}
                  className="group border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden"
                >
                  <summary className="flex items-center justify-between px-5 py-4 text-sm font-medium cursor-pointer list-none transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-800/50">
                    {item.question}
                    <svg
                      className="w-4 h-4 text-neutral-400 transition-transform duration-200 group-open:rotate-180 shrink-0 ml-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {item.answer}
                  </div>
                </details>
              ))}
            </div>
            <JsonLdFAQ questions={faqItems} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Single Currency Page: /usd */
async function CurrencyPage({ code }: { code: string }) {
  const currency = CURRENCIES[code];
  if (!currency) notFound();

  return (
    <div className="min-h-screen">
      <BannerTopAd />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Breadcrumb
          items={[
            { label: 'Home', href: '/' },
            { label: `${code} - ${currency.name}` },
          ]}
        />

        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-4xl mb-2 block">{currency.flag}</span>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              {currency.name} ({code})
            </h1>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Symbol: {currency.symbol}
            </p>
          </div>

          {/* Quick converter */}
          <Converter defaultFrom={code} defaultTo="USD" />

          {/* Popular pairs with this currency */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold mb-4">Popular {code} Exchange Rates</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ALL_PAIRS.filter(
                (p) => p.base === code || p.target === code
              ).slice(0, 12).map((pair) => {
                const relatedCode = pair.base === code ? pair.target : pair.base;
                const ccy = CURRENCIES[relatedCode];
                const href = pair.base === code
                  ? `/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`
                  : `/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`;
                return (
                  <Link
                    key={href}
                    href={href}
                    className="block p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-colors"
                  >
                    <span className="text-xs text-neutral-400">{pair.base}/{pair.target}</span>
                    <p className="text-sm font-medium truncate">{ccy?.flag} {relatedCode}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
