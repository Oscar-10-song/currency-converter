export interface Currency {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  name_zh?: string;
}

export interface ExchangeRateResponse {
  base: string;
  target: string;
  rate: number;
  timestamp: number;
  date: string;
}

export interface ExchangeRatesAll {
  base: string;
  date: string;
  rates: Record<string, number>;
  timestamp: number;
}

export interface ConversionResult {
  amount: number;
  base: string;
  target: string;
  result: number;
  rate: number;
  timestamp: number;
  inverseRate: number;
}

export interface ConversionHistory {
  id: string;
  fromAmount: number;
  fromCurrency: string;
  toAmount: number;
  toCurrency: string;
  rate: number;
  timestamp: number;
}

export interface CurrencyPair {
  base: Currency;
  target: Currency;
  slug: string;
  searchVolume: 'high' | 'medium' | 'low';
}

export interface RateHistoryPoint {
  date: string;
  rate: number;
}
