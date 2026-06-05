import { Metadata } from 'next';
import Link from 'next/link';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

export const metadata: Metadata = {
  title: 'About — CurrencyHub',
  description:
    'Learn about CurrencyHub — the free, real-time currency converter for global exchange rates. Fast, accurate, and privacy-focused.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            About CurrencyHub
          </h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4">
            <p>
              CurrencyHub is a free, real-time currency converter designed for travelers,
              businesses, and anyone who needs accurate exchange rate information. Founded
              with the mission of making currency conversion accessible to everyone, we
              provide instant exchange rates for over 50 global currencies.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">
              Our Mission
            </h2>
            <p>
              We believe that exchange rate information should be free, fast, and accessible
              to everyone. Our goal is to provide the most user-friendly currency conversion
              experience on the web, with no registration, no hidden fees, and no unnecessary
              distractions.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">
              How We Get Our Rates
            </h2>
            <p>
              Our exchange rates are sourced from the Frankfurter API, which provides
              reliable mid-market rates based on European Central Bank data. Rates are
              updated daily at 16:00 CET on working days. While we strive for accuracy,
              please note that these are reference rates and may differ from the rates
              offered by banks or money transfer services.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">
              Privacy Commitment
            </h2>
            <p>
              We take your privacy seriously. CurrencyHub does not require any registration
              or personal information to use. Your conversion history is stored locally on
              your device and never transmitted to our servers. We do not sell your data to
              third parties.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">
              Contact Us
            </h2>
            <p>
              Have questions or feedback? We would love to hear from you. Visit our
              <Link href="/contact" className="text-neutral-900 dark:text-white underline underline-offset-2">Contact page</Link>
              {' '}to get in touch.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
