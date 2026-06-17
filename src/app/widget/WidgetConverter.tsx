'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { getExchangeRate } from '@/lib/api/exchange-rate';
import { CURRENCIES } from '@/lib/constants/currencies';

interface Props {
  from?: string;
  to?: string;
  amount?: string;
}

const ALL_CODES = Object.keys(CURRENCIES);

/**
 * Compact converter component for the embeddable widget.
 * Self-contained with its own rate fetching logic.
 */
export function WidgetConverter({ from = 'USD', to = 'EUR', amount = '1' }: Props) {
  const [fromCcy, setFromCcy] = useState(from.toUpperCase());
  const [toCcy, setToCcy] = useState(to.toUpperCase());
  const [amt, setAmt] = useState(amount);
  const [result, setResult] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const convert = useCallback(async (f: string, t: string, a: string) => {
    const n = parseFloat(a);
    if (isNaN(n) || n <= 0 || f === t) {
      setResult('');
      setRate(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const r = await getExchangeRate(f, t);
      if (r === null) {
        setError('Rate unavailable');
        setResult('');
        setRate(null);
      } else {
        setRate(r);
        setResult((n * r).toFixed(4));
      }
    } catch {
      setError('Try again');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      convert(fromCcy, toCcy, amt);
    }, 300);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [fromCcy, toCcy, amt, convert]);

  // Quick preset amounts
  const presets = [1, 10, 100, 1000];

  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 p-4 sm:p-5 shadow-sm">
      {/* Flags + Currencies row */}
      <div className="flex items-center gap-3 mb-4">
        <select
          value={fromCcy}
          onChange={(e) => setFromCcy(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
        >
          {ALL_CODES.map((code) => (
            <option key={code} value={code}>
              {CURRENCIES[code]?.flag} {code} — {CURRENCIES[code]?.name}
            </option>
          ))}
        </select>

        {/* Swap button */}
        <button
          onClick={() => {
            const tmp = fromCcy;
            setFromCcy(toCcy);
            setToCcy(tmp);
          }}
          className="shrink-0 w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors"
          title="Swap currencies"
        >
          <svg className="w-4 h-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>

        <select
          value={toCcy}
          onChange={(e) => setToCcy(e.target.value)}
          className="flex-1 px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-sm font-medium text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
        >
          {ALL_CODES.map((code) => (
            <option key={code} value={code}>
              {CURRENCIES[code]?.flag} {code} — {CURRENCIES[code]?.name}
            </option>
          ))}
        </select>
      </div>

      {/* Amount input */}
      <div className="mb-3">
        <input
          type="number"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
          min="0"
          step="any"
          className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-lg font-medium text-neutral-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-indigo-400/40"
          placeholder="Amount"
        />
      </div>

      {/* Quick presets */}
      <div className="flex justify-center gap-2 mb-4">
        {presets.map((p) => (
          <button
            key={p}
            onClick={() => setAmt(String(p))}
            className={`px-3 py-1 text-xs rounded-lg border transition-colors ${
              parseFloat(amt) === p
                ? 'border-indigo-300 bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400'
                : 'border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:border-neutral-300'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Result */}
      <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800 text-center">
        {loading ? (
          <div className="h-8 w-32 mx-auto rounded bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
        ) : error ? (
          <p className="text-sm text-red-500">{error}</p>
        ) : result ? (
          <div>
            <p className="text-2xl font-semibold text-neutral-900 dark:text-white tabular-nums">
              {parseFloat(result).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              {CURRENCIES[fromCcy]?.symbol || fromCcy}{parseFloat(amt).toLocaleString()} = {CURRENCIES[toCcy]?.symbol || toCcy}{parseFloat(result).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
            </p>
            {rate && (
              <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                1 {fromCcy} = {rate.toFixed(6)} {toCcy}
              </p>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-400">Enter an amount to convert</p>
        )}
      </div>

      {/* Attribution — this is what builds backlinks */}
      <div className="mt-3 text-center">
        <a
          href="https://www.currencyhub.me"
          target="_blank"
          rel="noopener"
          className="text-xs text-neutral-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          Powered by CurrencyHub
        </a>
      </div>
    </div>
  );
}
