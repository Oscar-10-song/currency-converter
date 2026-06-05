import { Metadata } from 'next';
import Link from 'next/link';
import { CURRENCY_LIST } from '@/lib/constants/currencies';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

export const metadata: Metadata = {
  title: 'All Currencies — Exchange Rates',
  description:
    'Browse all supported currencies with exchange rate information. Convert between 50+ global currencies including USD, EUR, GBP, CNY, JPY and more.',
};

export default function CurrenciesPage() {
  // Group currencies by region for better UX
  const majorCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF'];
  const asiaPacific = ['HKD', 'SGD', 'KRW', 'INR', 'TWD', 'THB', 'IDR', 'MYR', 'PHP', 'VND', 'PKR', 'LKR'];
  const europe = ['SEK', 'NOK', 'DKK', 'PLN', 'HUF', 'CZK', 'RON', 'BGN', 'TRY', 'RUB', 'UAH'];
  const americas = ['MXN', 'BRL', 'CLP', 'COP', 'PEN'];
  const middleEast = ['AED', 'SAR', 'QAR', 'KWD', 'OMR', 'BHD', 'JOD', 'ILS'];
  const africa = ['ZAR', 'EGP', 'NGN', 'MAD', 'DZD'];

  const groups = [
    { title: 'Major Currencies', codes: majorCurrencies },
    { title: 'Asia Pacific', codes: asiaPacific },
    { title: 'Europe', codes: europe },
    { title: 'Americas', codes: americas },
    { title: 'Middle East', codes: middleEast },
    { title: 'Africa', codes: africa },
  ];

  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'All Currencies' }]} />

        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
            All Currencies
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
            Browse all 50+ supported currencies. Click any currency to see its exchange rates.
          </p>

          <div className="space-y-8">
            {groups.map((group) => {
              const currencies = group.codes
                .map((code) => CURRENCY_LIST.find((c) => c.code === code))
                .filter(Boolean);

              return (
                <div key={group.title}>
                  <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 mb-3">
                    {group.title}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {currencies.map((currency) => currency && (
                      <Link
                        key={currency.code}
                        href={`/${currency.code.toLowerCase()}`}
                        className="flex items-center gap-3 p-3 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 transition-all"
                      >
                        <span className="text-lg">{currency.flag}</span>
                        <div>
                          <p className="text-sm font-medium">{currency.code}</p>
                          <p className="text-xs text-neutral-400 truncate">{currency.name}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
