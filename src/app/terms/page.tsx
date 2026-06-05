import { Metadata } from 'next';
import Link from 'next/link';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

export const metadata: Metadata = {
  title: 'Terms of Service — CurrencyHub',
  description:
    'CurrencyHub terms of service. Understand the terms and conditions for using our currency converter.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms of Service' }]} />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            Terms of Service
          </h1>

          <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4">
            <p><strong className="text-neutral-900 dark:text-white">Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">1. Acceptance of Terms</h2>
            <p>
              By accessing and using CurrencyHub, you agree to be bound by these Terms of Service.
              If you do not agree, please do not use our website.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">2. Use of Service</h2>
            <p>
              CurrencyHub provides currency conversion information for reference purposes only.
              You agree to use the service for lawful purposes only and not to disrupt or manipulate
              the functioning of the website.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">3. Accuracy of Information</h2>
            <p>
              Exchange rates provided are for informational purposes only and may not reflect
              actual market rates available from financial institutions. We strive for accuracy
              but do not guarantee that rates are error-free. Do not rely solely on this
              information for financial decisions.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">4. Intellectual Property</h2>
            <p>
              All content, design, and code on CurrencyHub are our property or used with permission.
              You may not reproduce, distribute, or modify our content without authorization.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">5. Limitation of Liability</h2>
            <p>
              CurrencyHub is provided &ldquo;as is&rdquo; without warranties of any kind.
              We are not liable for any damages arising from the use of our service, including
              financial losses resulting from reliance on exchange rate data.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes are effective
              immediately upon posting. Continued use of the service after changes constitutes
              acceptance of the new terms.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">7. Contact</h2>
            <p>
              For questions about these terms, please{' '}
              <Link href="/contact" className="text-neutral-900 dark:text-white underline underline-offset-2">contact us</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
