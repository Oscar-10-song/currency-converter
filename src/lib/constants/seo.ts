import { CURRENCIES } from './currencies';

/**
 * Generate SEO metadata for a currency pair page.
 */
export function getPairSeo(base: string, target: string) {
  const baseCcy = CURRENCIES[base.toUpperCase()];
  const targetCcy = CURRENCIES[target.toUpperCase()];

  if (!baseCcy || !targetCcy) {
    return {
      title: `Currency Converter | ${base.toUpperCase()} to ${target.toUpperCase()}`,
      description: `Convert ${base.toUpperCase()} to ${target.toUpperCase()} with real-time exchange rates. Free currency converter tool.`,
    };
  }

  const title = `${baseCcy.symbol ? baseCcy.symbol + ' ' : ''}${baseCcy.name} (${base}) to ${targetCcy.name} (${target}) Converter — CurrencyHub`;

  const description = `Convert ${baseCcy.name} to ${targetCcy.name} instantly. Get the latest ${base}/${target} exchange rate, historical charts, and currency conversion tools. Free and updated in real-time.`;

  return { title, description };
}

/**
 * Generate SEO metadata for a single currency page.
 */
export function getCurrencySeo(code: string) {
  const currency = CURRENCIES[code.toUpperCase()];
  if (!currency) {
    return {
      title: `${code.toUpperCase()} Currency Information`,
      description: `Get the latest exchange rates and information for ${code.toUpperCase()}.`,
    };
  }

  const title = `${currency.name} (${code}) — Exchange Rates & Information`;
  const description = `Get the latest ${currency.name} exchange rates, currency information, and convert ${currency.name} to any major world currency. Free ${currency.name} converter tool.`;

  return { title, description };
}

/**
 * Home page SEO
 */
export const HOME_SEO = {
  title: 'CurrencyHub — Free Currency Converter | Real-Time Exchange Rates',
  description:
    'Convert currencies instantly with CurrencyHub. Free real-time exchange rate calculator for USD, EUR, GBP, CNY, JPY, and 50+ global currencies. Fast, accurate, and mobile-friendly.',
};
