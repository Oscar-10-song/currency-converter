'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { getExchangeRate } from '@/lib/api/exchange-rate';

interface UseConverterReturn {
  amount: string;
  setAmount: (value: string) => void;
  fromCurrency: string;
  setFromCurrency: (value: string) => void;
  toCurrency: string;
  setToCurrency: (value: string) => void;
  result: string;
  rate: number | null;
  inverseRate: number | null;
  isConverting: boolean;
  lastUpdated: number | null;
  swapCurrencies: () => void;
  error: string | null;
}

export function useConverter(
  initialFrom: string = 'USD',
  initialTo: string = 'CNY'
): UseConverterReturn {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState(initialFrom);
  const [toCurrency, setToCurrency] = useState(initialTo);
  const [result, setResult] = useState('');
  const [rate, setRate] = useState<number | null>(null);
  const [inverseRate, setInverseRate] = useState<number | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const convert = useCallback(async (from: string, to: string, amt: string) => {
    const numAmount = parseFloat(amt);
    if (isNaN(numAmount) || numAmount <= 0 || !from || !to) {
      setResult('');
      setRate(null);
      setInverseRate(null);
      return;
    }

    // Cancel previous request
    if (abortRef.current) {
      abortRef.current.abort();
    }
    abortRef.current = new AbortController();

    setIsConverting(true);
    setError(null);

    try {
      const exchangeRate = await getExchangeRate(from, to);
      if (exchangeRate === null) {
        throw new Error('Unable to fetch exchange rate');
      }

      const converted = numAmount * exchangeRate;
      const invRate = 1 / exchangeRate;

      setRate(exchangeRate);
      setInverseRate(invRate);
      setResult(converted.toFixed(6));
      setLastUpdated(Date.now());
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Conversion failed';
      setError(message);
      setResult('');
    } finally {
      setIsConverting(false);
    }
  }, []);

  // Trigger conversion when inputs change (with debounce)
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      convert(fromCurrency, toCurrency, amount);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [amount, fromCurrency, toCurrency, convert]);

  const swapCurrencies = useCallback(() => {
    setFromCurrency((prev) => {
      setToCurrency(prev);
      return toCurrency;
    });
  }, [toCurrency]);

  return {
    amount,
    setAmount,
    fromCurrency,
    setFromCurrency,
    toCurrency,
    setToCurrency,
    result,
    rate,
    inverseRate,
    isConverting,
    lastUpdated,
    swapCurrencies,
    error,
  };
}
