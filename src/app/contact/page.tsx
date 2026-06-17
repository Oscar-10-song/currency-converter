import { Metadata } from 'next';
import { BannerTopAd } from '@/components/ads/AdPlacements';
import { Breadcrumb } from '@/components/seo/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact — CurrencyHub',
  description:
    'Get in touch with CurrencyHub. Send us your questions, feedback, or partnership inquiries.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <BannerTopAd />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />

        <div className="max-w-xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2">
            Contact Us
          </h1>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-8">
            Have questions, feedback, or partnership inquiries? We would love to hear from you.
          </p>

          <form
            action={process.env.NEXT_PUBLIC_CONTACT_FORM_URL || '#'}
            method="POST"
            className="space-y-5"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Subject
              </label>
              <select
                id="subject"
                name="subject"
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/40"
              >
                <option value="general">General Inquiry</option>
                <option value="feedback">Feedback</option>
                <option value="partnership">Partnership</option>
                <option value="advertising">Advertising</option>
                <option value="bug">Bug Report</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-2.5 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-neutral-400/40 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 text-sm font-medium rounded-xl hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
            >
              Send Message
            </button>
          </form>

          <div className="mt-10 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-100 dark:border-neutral-800">
            <h2 className="text-sm font-semibold mb-2">Other ways to reach us</h2>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              Email: ttkx1010@gmail.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
