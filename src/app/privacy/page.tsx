import { Metadata } from 'next';
import Link from 'next/link';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

export const metadata: Metadata = {
  title: 'Privacy Policy — CurrencyHub',
  description:
    'CurrencyHub privacy policy. Learn how we handle your data, cookies, and advertising.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy Policy' }]} />

        <div className="max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-6">
            Privacy Policy
          </h1>

          <div className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 space-y-4">
            <p><strong className="text-neutral-900 dark:text-white">Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">1. Introduction</h2>
            <p>
              CurrencyHub (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">2. Information We Collect</h2>
            <p>
              <strong className="text-neutral-900 dark:text-white">Information you provide:</strong> We do not require registration.
              Any information you submit through our contact form (name, email, message) is used only to respond to your inquiry.
            </p>
            <p>
              <strong className="text-neutral-900 dark:text-white">Automatically collected:</strong> We may collect standard web analytics
              data including pages visited, time spent, and browser type. This information is anonymized and used to improve our service.
            </p>
            <p>
              <strong className="text-neutral-900 dark:text-white">Local storage:</strong> Your conversion history is stored locally
              in your browser using localStorage. This data never leaves your device.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">3. Cookies</h2>
            <p>
              We use minimal cookies essential for the functioning of the website. We may also use cookies for analytics
              (Google Analytics) and advertising (Google AdSense) purposes. You can control cookie preferences through your browser settings.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">4. Third-Party Services</h2>
            <p>We may use the following third-party services:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Google Analytics (website analytics)</li>
              <li>Google AdSense (advertising)</li>
              <li>Frankfurter API (exchange rate data)</li>
              <li>Vercel (hosting)</li>
            </ul>
            <p>
              These services have their own privacy policies governing data handling.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your information.
              However, no method of transmission over the Internet is 100% secure.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">6. Your Rights</h2>
            <p>
              Depending on your location, you may have rights regarding your personal data including
              access, correction, deletion, and portability. Contact us to exercise these rights.
            </p>

            <h2 className="text-lg font-semibold text-neutral-900 dark:text-white mt-8">7. Contact</h2>
            <p>
              For privacy-related inquiries, please contact us through our{' '}
              <Link href="/contact" className="text-neutral-900 dark:text-white underline underline-offset-2">Contact page</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
