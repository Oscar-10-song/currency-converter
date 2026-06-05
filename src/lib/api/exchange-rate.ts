'use server';

import { ExchangeRatesAll, RateHistoryPoint } from '@/types/currency';

/**
 * Exchange Rate API
 *
 * Architecture:
 * - Primary: Frankfurter API (free, no API key required, updated daily at 16:00 CET)
 * - Fallback: Hardcoded approximate rates for 50+ currencies
 * - Cache: Relies on Next.js `fetch` cache via `next: { revalidate }` (ISR data cache).
 *   No in-memory cache — it's ineffective on Vercel serverless (each request is a new process).
 *   The `fetch` cache persists across requests in production.
 *
 * Frankfurter supports 30+ currencies. For broader coverage, configure
 * EXCHANGE_RATE_API_KEY in environment variables and switch provider.
 */

const FRANKFURTER_BASE = 'https://api.frankfurter.dev';

/* -------------------------------------------------------------------------- */
/*  Public API                                                                */
/* -------------------------------------------------------------------------- */

/**
 * Fetch the latest exchange rates for a base currency against all targets.
 */
export async function getLatestRates(
  base: string = 'USD'
): Promise<ExchangeRatesAll | null> {
  try {
    const response = await fetch(
      `${FRANKFURTER_BASE}/latest?from=${base}`,
      { next: { revalidate: 600 } } // ISR: 10 min
    );

    if (!response.ok) {
      console.warn(`Frankfurter API error: ${response.status}`);
      return getFallbackRates(base);
    }

    const data = await response.json();
    return {
      base: data.base,
      date: data.date,
      rates: data.rates,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    return getFallbackRates(base);
  }
}

/**
 * Get a specific exchange rate between two currencies.
 */
export async function getExchangeRate(
  from: string,
  to: string
): Promise<number | null> {
  if (from === to) return 1;

  try {
    const response = await fetch(
      `${FRANKFURTER_BASE}/latest?from=${from}&to=${to}`,
      { next: { revalidate: 600 } }
    );

    if (!response.ok) {
      console.warn(`Frankfurter API error for ${from}/${to}: ${response.status}`);
      return getCrossRate(from, to);
    }

    const data = await response.json();
    return data.rates?.[to] ?? null;
  } catch (error) {
    console.error(`Failed to get rate ${from}/${to}:`, error);
    return getCrossRate(from, to);
  }
}

/**
 * Get a specific exchange rate between two currencies (client-side friendly).
 * In Next.js 16, 'use server' functions can be called from client components.
 */
export async function getRateClient(
  from: string,
  to: string
): Promise<number | null> {
  return getExchangeRate(from, to);
}

/**
 * Get historical exchange rates for a currency pair.
 * Returns daily rates for the past N days.
 */
export async function getHistoricalRates(
  from: string,
  to: string,
  days: number = 7
): Promise<RateHistoryPoint[]> {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - days);

  const startStr = startDate.toISOString().split('T')[0];
  const endStr = endDate.toISOString().split('T')[0];

  try {
    const response = await fetch(
      `${FRANKFURTER_BASE}/${startStr}..${endStr}?from=${from}&to=${to}`,
      { next: { revalidate: 3600 } }
    );

    if (!response.ok) {
      return generateMockHistorical(from, to, days);
    }

    const data = await response.json();
    const points: RateHistoryPoint[] = Object.entries(data.rates || {}).map(
      ([date, rates]) => ({
        date,
        rate: (rates as Record<string, number>)[to] ?? 0,
      })
    );

    points.sort((a, b) => a.date.localeCompare(b.date));
    return points;
  } catch {
    return generateMockHistorical(from, to, days);
  }
}

/* -------------------------------------------------------------------------- */
/*  Cross-rate via USD intermediary                                           */
/* -------------------------------------------------------------------------- */

async function getCrossRate(from: string, to: string): Promise<number | null> {
  try {
    const [fromRates, toRates] = await Promise.all([
      getLatestRates(from),
      getLatestRates(to),
    ]);

    if (fromRates?.rates?.['USD'] && toRates?.rates?.['USD']) {
      // 1 from = (1 / fromRates.USD) USD
      // 1 USD = toRates.USD in to currency
      // So 1 from = toRates.USD / fromRates.USD
      return toRates.rates['USD'] / fromRates.rates['USD'];
    }
    return null;
  } catch {
    return getHardcodedRate(from, to);
  }
}

/* -------------------------------------------------------------------------- */
/*  Hardcoded fallback rates (when APIs are unreachable)                      */
/* -------------------------------------------------------------------------- */

const BASE_RATES_USD: Record<string, number> = {
  USD: 1,
  EUR: 0.924,
  GBP: 0.792,
  JPY: 149.5,
  CNY: 7.245,
  AUD: 1.534,
  CAD: 1.367,
  CHF: 0.882,
  HKD: 7.82,
  SGD: 1.348,
  SEK: 10.45,
  KRW: 1320.0,
  NOK: 10.67,
  NZD: 1.656,
  MXN: 17.15,
  INR: 83.12,
  RUB: 92.5,
  BRL: 4.97,
  ZAR: 18.65,
  TRY: 30.25,
  TWD: 31.8,
  DKK: 6.89,
  PLN: 4.02,
  THB: 35.8,
  IDR: 15750,
  HUF: 360.5,
  CZK: 23.1,
  ILS: 3.65,
  CLP: 950,
  PHP: 56.2,
  AED: 3.673,
  SAR: 3.75,
  MYR: 4.72,
  RON: 4.59,
  PKR: 278.5,
  QAR: 3.64,
  KWD: 0.308,
  EGP: 30.9,
  NGN: 1550,
  VND: 24600,
  BGN: 1.81,
  LKR: 325,
  PEN: 3.75,
  MAD: 10.05,
  DZD: 134.5,
  OMR: 0.385,
  BHD: 0.376,
  JOD: 0.709,
  COP: 3920,
  UAH: 38.5,
};

function getHardcodedRate(from: string, to: string): number | null {
  const fromRate = BASE_RATES_USD[from.toUpperCase()];
  const toRate = BASE_RATES_USD[to.toUpperCase()];
  if (fromRate && toRate) {
    return toRate / fromRate;
  }
  return null;
}

function getFallbackRates(base: string): ExchangeRatesAll | null {
  const baseRate = getHardcodedRate('USD', base);
  if (baseRate === null) return null;

  const rates: Record<string, number> = {};
  for (const [code, usdRate] of Object.entries(BASE_RATES_USD)) {
    if (code !== base) {
      rates[code] = usdRate / baseRate;
    }
  }

  return {
    base,
    date: new Date().toISOString().split('T')[0],
    rates,
    timestamp: Date.now(),
  };
}

/**
 * Generate approximate historical data when API history is unavailable.
 * Uses a simple random walk around the hardcoded rate.
 */
function generateMockHistorical(
  from: string,
  to: string,
  days: number
): RateHistoryPoint[] {
  const rate = getHardcodedRate(from, to) ?? 1;
  const points: RateHistoryPoint[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const variation = (Math.random() - 0.5) * rate * 0.05;
    points.push({
      date: date.toISOString().split('T')[0],
      rate: Number((rate + variation).toFixed(6)),
    });
  }

  return points;
}
