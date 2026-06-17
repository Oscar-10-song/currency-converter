import type { Metadata } from 'next';
import Link from 'next/link';
import { WidgetConverter } from './WidgetConverter';
import { SITE_CONFIG } from '@/lib/constants/routes';

export const metadata: Metadata = {
  title: 'Free Currency Converter Widget — Embed on Your Site | CurrencyHub',
  description:
    'Add a free live currency converter to your website in seconds. Embeddable widget with real-time exchange rates for 50+ currencies. No API key required.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/widget`,
  },
};

/**
 * Widget landing page — shows the live widget preview + embed instructions.
 * Also serves as the widget display when embedded via iframe.
 */
export default function WidgetPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; amount?: string }>;
}) {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 sm:py-12">
      {/* Preview widget */}
      <WidgetConverterWrapper searchParams={searchParams} />

      {/* Embed instructions */}
      <div className="mt-8 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50">
        <h2 className="text-lg font-semibold mb-3">Add this widget to your site</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">
          Copy the code below and paste it into your HTML. The widget automatically
          adjusts to your page width.
        </p>

        {/* Embed code */}
        <div className="relative">
          <pre className="p-4 rounded-xl bg-neutral-900 text-green-400 text-xs overflow-x-auto">
            <code>{`<!-- CurrencyHub Free Currency Converter Widget -->
<iframe
  src="${SITE_CONFIG.url}/widget?from=USD&to=EUR"
  width="100%"
  height="320"
  style="border:none;border-radius:12px;max-width:480px;"
  title="Currency Converter"
  loading="lazy"
></iframe>
<!-- End CurrencyHub Widget -->`}</code>
          </pre>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span>Customize: change <code className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded">from=USD</code> and <code className="px-1 py-0.5 bg-neutral-200 dark:bg-neutral-700 rounded">to=EUR</code> for any currency pair.</span>
        </div>
      </div>

      {/* Features */}
      <div className="mt-8 grid sm:grid-cols-3 gap-4">
        {[
          { title: 'Always Free', desc: 'No API key, no account, no cost. Works forever.' },
          { title: 'Auto-Updating', desc: 'Exchange rates refresh every 10 minutes.' },
          { title: '50+ Currencies', desc: 'USD, EUR, GBP, JPY, CNY and 45+ more.' },
        ].map((f) => (
          <div key={f.title} className="p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
            <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Back to site */}
      <div className="mt-8 text-center">
        <Link
          href="/"
          className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
        >
          ← Back to CurrencyHub
        </Link>
      </div>
    </div>
  );
}

/** Async wrapper so WidgetConverter can receive resolved searchParams */
async function WidgetConverterWrapper({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; to?: string; amount?: string }>;
}) {
  const params = await searchParams;
  return <WidgetConverter from={params.from} to={params.to} amount={params.amount} />;
}
