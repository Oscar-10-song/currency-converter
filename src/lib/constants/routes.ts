/**
 * Route definitions for the currency converter.
 * Centralized to avoid hardcoded strings and enable future i18n.
 */
export const ROUTES = {
  HOME: '/',
  CURRENCIES: '/currencies',
  ABOUT: '/about',
  CONTACT: '/contact',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  CURRENCY_PAIR: (base: string, target: string) => `/${base.toLowerCase()}-to-${target.toLowerCase()}`,
  CURRENCY: (code: string) => `/${code.toLowerCase()}`,
} as const;

export const SITE_CONFIG = {
  name: 'CurrencyHub',
  tagline: 'Fast & Accurate Currency Converter',
  description:
    'Convert currencies in real-time with CurrencyHub. Free exchange rate calculator for USD, EUR, GBP, CNY, JPY and 50+ global currencies.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.currencyhub.me',
  locale: 'en-US',
  defaultCurrency: 'USD',
  email: 'contact@currencyhub.me',
  social: {
    twitter: '@currencyhub',
  },
} as const;
