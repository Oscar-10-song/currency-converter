'use client';

import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/Card';
import { AmountInput } from './AmountInput';
import { CurrencySelect } from './CurrencySelect';
import { SwapButton } from './SwapButton';
import { ResultDisplay } from './ResultDisplay';
import { useConverter } from '@/lib/hooks/useConverter';
import { useHistory } from '@/lib/hooks/useHistory';
import { CURRENCIES } from '@/lib/constants/currencies';
import { Skeleton } from '@/components/ui/Skeleton';

interface ConverterProps {
  defaultFrom?: string;
  defaultTo?: string;
}

export function Converter({ defaultFrom = 'USD', defaultTo = 'CNY' }: ConverterProps) {
  const converter = useConverter(defaultFrom, defaultTo);
  const { addEntry } = useHistory();
  const hasAddedRef = useRef(false);

  const fromCcy = CURRENCIES[converter.fromCurrency];
  const toCcy = CURRENCIES[converter.toCurrency];

  // Save to history when conversion completes
  useEffect(() => {
    if (
      converter.result &&
      converter.rate &&
      !converter.isConverting &&
      parseFloat(converter.amount) > 0
    ) {
      if (!hasAddedRef.current) {
        hasAddedRef.current = true;
        addEntry({
          fromAmount: parseFloat(converter.amount),
          fromCurrency: converter.fromCurrency,
          toAmount: parseFloat(converter.result),
          toCurrency: converter.toCurrency,
          rate: converter.rate,
        });
        setTimeout(() => {
          hasAddedRef.current = false;
        }, 2000);
      }
    }
  }, [converter.result, converter.rate, converter.isConverting, converter.amount, converter.fromCurrency, converter.toCurrency, addEntry]);

  return (
    <Card className="w-full" padding="lg">
      <div className="space-y-4">
        {/* From */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <AmountInput
            label="Amount"
            value={converter.amount}
            onChange={converter.setAmount}
            currencySymbol={fromCcy?.symbol || '$'}
          />
          <CurrencySelect
            label="From"
            value={converter.fromCurrency}
            onChange={converter.setFromCurrency}
          />
        </div>

        {/* Swap */}
        <SwapButton onClick={converter.swapCurrencies} />

        {/* To */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Result display (read-only amount) */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 dark:text-neutral-400 mb-1.5">
              Converted Amount
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-neutral-400 dark:text-neutral-500 font-medium">
                {toCcy?.symbol || '$'}
              </span>
              <div className="w-full pl-8 pr-4 py-2.5 bg-neutral-50 dark:bg-neutral-800 ring-1 ring-neutral-200 dark:ring-neutral-700 rounded-xl text-sm text-neutral-900 dark:text-white">
                {converter.isConverting ? (
                  <Skeleton className="h-4 w-24" />
                ) : converter.result ? (
                  <span className="font-medium">
                    {parseFloat(converter.result).toLocaleString('en-US', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 6,
                    })}
                  </span>
                ) : (
                  <span className="text-neutral-400">0.00</span>
                )}
              </div>
            </div>
          </div>
          <CurrencySelect
            label="To"
            value={converter.toCurrency}
            onChange={converter.setToCurrency}
          />
        </div>

        {/* Result details */}
        <ResultDisplay
          amount={parseFloat(converter.amount || '0')}
          fromCurrency={converter.fromCurrency}
          toCurrency={converter.toCurrency}
          result={converter.result}
          rate={converter.rate}
          inverseRate={converter.inverseRate}
          isConverting={converter.isConverting}
          lastUpdated={converter.lastUpdated}
          error={converter.error}
          fromFlag={fromCcy?.flag}
          toFlag={toCcy?.flag}
        />
      </div>
    </Card>
  );
}
