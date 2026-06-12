import { Currency } from '@/types/currency';

/**
 * Top 50 most traded & searched currencies globally.
 * Includes major, minor, and emerging market currencies.
 */
export const CURRENCIES: Record<string, Currency> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', flag: '🇺🇸' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', flag: '🇬🇧' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', flag: '🇯🇵' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: '¥', flag: '🇨🇳', name_zh: '人民币' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'A$', flag: '🇦🇺' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$', flag: '🇨🇦' },
  CHF: { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr', flag: '🇨🇭' },
  HKD: { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$', flag: '🇭🇰' },
  SGD: { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$', flag: '🇸🇬' },
  SEK: { code: 'SEK', name: 'Swedish Krona', symbol: 'kr', flag: '🇸🇪' },
  KRW: { code: 'KRW', name: 'South Korean Won', symbol: '₩', flag: '🇰🇷' },
  NOK: { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr', flag: '🇳🇴' },
  NZD: { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$', flag: '🇳🇿' },
  MXN: { code: 'MXN', name: 'Mexican Peso', symbol: 'Mex$', flag: '🇲🇽' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', flag: '🇮🇳' },
  RUB: { code: 'RUB', name: 'Russian Ruble', symbol: '₽', flag: '🇷🇺' },
  BRL: { code: 'BRL', name: 'Brazilian Real', symbol: 'R$', flag: '🇧🇷' },
  ZAR: { code: 'ZAR', name: 'South African Rand', symbol: 'R', flag: '🇿🇦' },
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', flag: '🇹🇷' },
  TWD: { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$', flag: '🇹🇼' },
  DKK: { code: 'DKK', name: 'Danish Krone', symbol: 'kr', flag: '🇩🇰' },
  PLN: { code: 'PLN', name: 'Polish Zloty', symbol: 'zł', flag: '🇵🇱' },
  THB: { code: 'THB', name: 'Thai Baht', symbol: '฿', flag: '🇹🇭' },
  IDR: { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp', flag: '🇮🇩' },
  HUF: { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft', flag: '🇭🇺' },
  CZK: { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč', flag: '🇨🇿' },
  ILS: { code: 'ILS', name: 'Israeli Shekel', symbol: '₪', flag: '🇮🇱' },
  CLP: { code: 'CLP', name: 'Chilean Peso', symbol: 'CLP$', flag: '🇨🇱' },
  PHP: { code: 'PHP', name: 'Philippine Peso', symbol: '₱', flag: '🇵🇭' },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ', flag: '🇦🇪' },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: '﷼', flag: '🇸🇦' },
  MYR: { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM', flag: '🇲🇾' },
  RON: { code: 'RON', name: 'Romanian Leu', symbol: 'lei', flag: '🇷🇴' },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨', flag: '🇵🇰' },
  QAR: { code: 'QAR', name: 'Qatari Riyal', symbol: '﷼', flag: '🇶🇦' },
  KWD: { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك', flag: '🇰🇼' },
  EGP: { code: 'EGP', name: 'Egyptian Pound', symbol: 'E£', flag: '🇪🇬' },
  NGN: { code: 'NGN', name: 'Nigerian Naira', symbol: '₦', flag: '🇳🇬' },
  VND: { code: 'VND', name: 'Vietnamese Dong', symbol: '₫', flag: '🇻🇳' },
  BGN: { code: 'BGN', name: 'Bulgarian Lev', symbol: 'лв', flag: '🇧🇬' },
  LKR: { code: 'LKR', name: 'Sri Lankan Rupee', symbol: 'Rs', flag: '🇱🇰' },
  PEN: { code: 'PEN', name: 'Peruvian Sol', symbol: 'S/', flag: '🇵🇪' },
  MAD: { code: 'MAD', name: 'Moroccan Dirham', symbol: 'د.م.', flag: '🇲🇦' },
  DZD: { code: 'DZD', name: 'Algerian Dinar', symbol: 'د.ج', flag: '🇩🇿' },
  OMR: { code: 'OMR', name: 'Omani Rial', symbol: '﷼', flag: '🇴🇲' },
  BHD: { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب', flag: '🇧🇭' },
  JOD: { code: 'JOD', name: 'Jordanian Dinar', symbol: 'د.ا', flag: '🇯🇴' },
  COP: { code: 'COP', name: 'Colombian Peso', symbol: 'COL$', flag: '🇨🇴' },
  UAH: { code: 'UAH', name: 'Ukrainian Hryvnia', symbol: '₴', flag: '🇺🇦' },
};

export const CURRENCY_LIST: Currency[] = Object.values(CURRENCIES);

export const TOP_CURRENCY_CODES = [
  'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'AUD', 'CAD', 'CHF',
  'HKD', 'SGD', 'SEK', 'KRW', 'NOK', 'NZD', 'MXN', 'INR',
];

/**
 * Top 50 most searched currency pairs — used for homepage quick links.
 * Ordered by global search volume estimate.
 */
export const TOP_PAIRS: { base: string; target: string }[] = [
  { base: 'USD', target: 'CNY' },
  { base: 'USD', target: 'EUR' },
  { base: 'USD', target: 'JPY' },
  { base: 'USD', target: 'GBP' },
  { base: 'USD', target: 'INR' },
  { base: 'USD', target: 'KRW' },
  { base: 'USD', target: 'AUD' },
  { base: 'USD', target: 'CAD' },
  { base: 'USD', target: 'CHF' },
  { base: 'USD', target: 'HKD' },
  { base: 'USD', target: 'SGD' },
  { base: 'USD', target: 'TWD' },
  { base: 'USD', target: 'BRL' },
  { base: 'USD', target: 'MXN' },
  { base: 'USD', target: 'RUB' },
  { base: 'USD', target: 'THB' },
  { base: 'USD', target: 'TRY' },
  { base: 'USD', target: 'NOK' },
  { base: 'USD', target: 'SEK' },
  { base: 'USD', target: 'NZD' },
  { base: 'USD', target: 'IDR' },
  { base: 'USD', target: 'MYR' },
  { base: 'USD', target: 'PHP' },
  { base: 'USD', target: 'VND' },
  { base: 'USD', target: 'ZAR' },
  { base: 'USD', target: 'PLN' },
  { base: 'USD', target: 'AED' },
  { base: 'USD', target: 'SAR' },
  { base: 'USD', target: 'DKK' },
  { base: 'USD', target: 'ILS' },
  { base: 'EUR', target: 'USD' },
  { base: 'EUR', target: 'GBP' },
  { base: 'EUR', target: 'JPY' },
  { base: 'EUR', target: 'CNY' },
  { base: 'EUR', target: 'CHF' },
  { base: 'EUR', target: 'AUD' },
  { base: 'GBP', target: 'USD' },
  { base: 'GBP', target: 'EUR' },
  { base: 'GBP', target: 'JPY' },
  { base: 'GBP', target: 'CNY' },
  { base: 'JPY', target: 'USD' },
  { base: 'JPY', target: 'CNY' },
  { base: 'JPY', target: 'KRW' },
  { base: 'AUD', target: 'USD' },
  { base: 'AUD', target: 'CNY' },
  { base: 'AUD', target: 'JPY' },
  { base: 'CNY', target: 'JPY' },
  { base: 'CNY', target: 'HKD' },
  { base: 'CAD', target: 'USD' },
  { base: 'CHF', target: 'USD' },
];

/**
 * All possible currency pairs (50 × 49 = 2,450 pairs).
 * Each pair maps to a unique SEO page: /xxx-to-yyy
 * Captures long-tail search traffic for every currency combination.
 * Sorted by priority: major currencies first, then alphabetical.
 */
const ALL_CURRENCY_CODES = Object.keys(CURRENCIES);

function generateAllPairs(): { base: string; target: string }[] {
  const pairs: { base: string; target: string }[] = [];
  const majorSet = new Set(TOP_CURRENCY_CODES);

  // Tier 1: Major × All (highest search volume)
  for (const base of TOP_CURRENCY_CODES) {
    for (const target of ALL_CURRENCY_CODES) {
      if (base !== target) {
        pairs.push({ base, target });
      }
    }
  }

  // Tier 2: Non-major × All (long-tail coverage)
  for (const base of ALL_CURRENCY_CODES) {
    if (majorSet.has(base)) continue;
    for (const target of ALL_CURRENCY_CODES) {
      if (base !== target) {
        pairs.push({ base, target });
      }
    }
  }

  return pairs;
}

export const ALL_PAIRS: { base: string; target: string }[] = generateAllPairs();
