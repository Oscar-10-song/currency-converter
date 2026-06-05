import Link from 'next/link';
import { FooterAd } from '@/components/ads/AdPlacements';

const footerLinks = [
  {
    title: 'Tools',
    links: [
      { label: 'Currency Converter', href: '/' },
      { label: 'All Currencies', href: '/currencies' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-950">
      <FooterAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-lg font-semibold text-neutral-900 dark:text-white mb-3">
              <svg
                className="w-6 h-6"
                viewBox="0 0 28 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="14" cy="14" r="10" />
                <path d="M7 14h14M14 7v14" />
                <circle cx="14" cy="14" r="3" fill="currentColor" />
              </svg>
              CurrencyHub
            </Link>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">
              Fast, accurate currency conversion for USD, EUR, GBP, CNY, JPY and 50+ global currencies.
            </p>
          </div>

          {/* Link groups */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold text-neutral-900 dark:text-white mb-3">
                {group.title}
              </h3>
              <ul className="space-y-2">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} CurrencyHub. All rights reserved.
          </p>
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            Exchange rates are for reference only. Check with your financial institution for actual rates.
          </p>
        </div>
      </div>
    </footer>
  );
}
