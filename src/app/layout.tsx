import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
import { MobileStickyAd } from '@/components/ads/AdPlacements';
import { JsonLdWebSite } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants/routes';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CurrencyHub — Free Currency Converter | Real-Time Exchange Rates',
    template: '%s | CurrencyHub',
  },
  description:
    'Convert currencies instantly with CurrencyHub. Free real-time exchange rate calculator for USD, EUR, GBP, CNY, JPY, and 50+ global currencies. Fast, accurate, and mobile-friendly.',
  keywords: [
    'currency converter',
    'exchange rate',
    'USD to CNY',
    'USD to EUR',
    'currency calculator',
    'money converter',
    'forex rates',
  ],
  authors: [{ name: 'CurrencyHub' }],
  metadataBase: new URL(SITE_CONFIG.url),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'CurrencyHub',
    title: 'CurrencyHub — Free Currency Converter',
    description:
      'Convert currencies instantly with real-time exchange rates. Free currency calculator for 50+ global currencies.',
    url: SITE_CONFIG.url,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CurrencyHub — Free Currency Converter',
    description:
      'Convert currencies instantly with real-time exchange rates.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'wORWG5l5IyJvy0Y_i7en95RNDIcquAvelVobCtInxE0',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="font-sans bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 antialiased min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <main className="flex-1">
            <ErrorBoundary>
              {children}
            </ErrorBoundary>
          </main>
          <Footer />
          <MobileStickyAd />

          {/* Google Analytics */}
          {(process.env.NEXT_PUBLIC_GA_ID || 'G-5WNG1TN53M') && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-5WNG1TN53M'}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-5WNG1TN53M'}');
                  `,
                }}
              />
            </>
          )}
        </ThemeProvider>
        <JsonLdWebSite />
      </body>
    </html>
  );
}
