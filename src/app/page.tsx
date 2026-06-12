import Link from 'next/link';
import { Converter } from '@/components/converter/Converter';
import { ConversionHistory } from '@/components/converter/ConversionHistory';
import { BannerTopAd, InContentAd } from '@/components/ads/AdPlacements';
import { JsonLdFAQ } from '@/components/seo/JsonLd';
import { TOP_PAIRS, CURRENCIES } from '@/lib/constants/currencies';

const FAQ_ITEMS = [
  {
    question: 'How does the currency converter work?',
    answer:
      'Enter the amount you want to convert, select your currencies, and the result appears instantly. Our rates are updated in real-time from financial data providers and refreshed every 10 minutes.',
  },
  {
    question: 'Which currencies do you support?',
    answer:
      'We support 50+ major global currencies including USD, EUR, GBP, JPY, CNY, AUD, CAD, CHF, and many more. Our currency list covers all major trading pairs and popular travel currencies.',
  },
  {
    question: 'Are the exchange rates live?',
    answer:
      'Our rates are sourced from Frankfurter API and updated daily at 16:00 CET on working days. The rates shown are market mid-rates and may differ from the rates offered by banks or money transfer services.',
  },
  {
    question: 'Can I use this on my mobile phone?',
    answer:
      'Yes! CurrencyHub is fully responsive and works seamlessly on all devices — smartphones, tablets, and desktops. The converter is optimized for mobile with easy-to-use currency selection.',
  },
  {
    question: 'Is CurrencyHub free to use?',
    answer:
      'Yes, CurrencyHub is completely free. Our currency converter, historical data, and all tools are available at no cost. We may display advertisements to support the service.',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />

      {/* Hero Section — Converter is the hero */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        {/* Subtle radial gradient behind converter */}
        <div className="absolute inset-0 -top-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-50/40 via-transparent to-transparent dark:from-indigo-950/20 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto">
          {/* Headline */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-neutral-900 dark:text-white">
              Currency Converter
            </h1>
            <p className="mt-3 text-base sm:text-lg text-neutral-500 dark:text-neutral-400 max-w-lg mx-auto">
              Convert between 50+ global currencies with real-time exchange rates.
              Fast, accurate, and free.
            </p>
          </div>

          {/* Converter */}
          <Converter />

          {/* Conversion History */}
          <div className="mt-8">
            <ConversionHistory />
          </div>

          {/* Quick links to popular pairs */}
          <div className="mt-8">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3 text-center">
              Popular Currency Pairs
            </h2>
            <div className="flex flex-wrap justify-center gap-2">
              {TOP_PAIRS.slice(0, 16).map((pair) => {
                const base = CURRENCIES[pair.base];
                return (
                  <Link
                    key={`${pair.base}-${pair.target}`}
                    href={`/${pair.base.toLowerCase()}-to-${pair.target.toLowerCase()}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-950/30 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{base?.flag}</span>
                    <span>{pair.base}/{pair.target}</span>
                  </Link>
                );
              })}
            </div>
            <div className="text-center mt-3">
              <Link
                href="/pairs"
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Browse all 2,450+ currency pairs →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <InContentAd />

      {/* Features Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-10">
            Why CurrencyHub?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Real-Time Rates',
                desc: 'Exchange rates updated every 10 minutes from reliable financial data sources.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                ),
              },
              {
                title: '50+ Currencies',
                desc: 'Support for all major world currencies including USD, EUR, GBP, JPY, CNY, and more.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707" />
                  </svg>
                ),
              },
              {
                title: 'Mobile First',
                desc: 'Designed for all screens. Use on your phone, tablet, or desktop seamlessly.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                  </svg>
                ),
              },
              {
                title: 'Zero Cost',
                desc: 'Free to use. No registration, no hidden fees, no limits on conversions.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125V9M5.25 6h13.5M3.75 9h16.5" />
                  </svg>
                ),
              },
              {
                title: 'Dark Mode',
                desc: 'Easy on the eyes with automatic dark mode support that follows your system preference.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                  </svg>
                ),
              },
              {
                title: 'Privacy First',
                desc: 'No account needed. Your conversion history stays on your device. We do not track you.',
                icon: (
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                ),
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="p-5 rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-900/50"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-3 text-neutral-600 dark:text-neutral-400">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-sm mb-1">{feature.title}</h3>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <InContentAd />

      {/* SEO Content Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-6">
            About CurrencyHub
          </h2>
          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4">
            <p>
              CurrencyHub is a free, real-time currency converter designed for travelers,
              businesses, and anyone who needs accurate exchange rate information. We support
              over 50 of the most traded currencies worldwide, from major pairs like USD to EUR
              and USD to CNY, to emerging market currencies.
            </p>
            <p>
              Our exchange rates are sourced from European Central Bank data via the Frankfurter
              API, providing reliable mid-market rates. Whether you are planning international
              travel, managing cross-border payments, or just curious about exchange rates,
              CurrencyHub gives you the information you need in a clean, fast interface.
            </p>
            <p>
              Need a specific currency pair? Try our most popular converters:
              {' '}
              <Link href="/usd-to-cny" className="text-neutral-900 dark:text-white underline underline-offset-2 hover:no-underline">USD to CNY</Link>,
              {' '}
              <Link href="/usd-to-eur" className="text-neutral-900 dark:text-white underline underline-offset-2 hover:no-underline">USD to EUR</Link>,
              {' '}
              <Link href="/usd-to-jpy" className="text-neutral-900 dark:text-white underline underline-offset-2 hover:no-underline">USD to JPY</Link>,
              {' '}
              <Link href="/usd-to-gbp" className="text-neutral-900 dark:text-white underline underline-offset-2 hover:no-underline">USD to GBP</Link>, and
              {' '}
              <Link href="/usd-to-inr" className="text-neutral-900 dark:text-white underline underline-offset-2 hover:no-underline">USD to INR</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-2">
            {FAQ_ITEMS.map((item) => (
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
        </div>
        <JsonLdFAQ questions={FAQ_ITEMS} />
      </section>
    </div>
  );
}
