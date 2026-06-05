'use client';

import { formatCurrency, formatRate, formatTimestamp } from '@/lib/utils/formatters';
import { Skeleton } from '@/components/ui/Skeleton';
import { CopyButton } from './CopyButton';

interface ResultDisplayProps {
  amount: number;
  fromCurrency: string;
  toCurrency: string;
  result: string;
  rate: number | null;
  inverseRate: number | null;
  isConverting: boolean;
  lastUpdated: number | null;
  error: string | null;
  fromFlag?: string;
  toFlag?: string;
}

export function ResultDisplay({
  fromCurrency,
  toCurrency,
  result,
  rate,
  inverseRate,
  isConverting,
  lastUpdated,
  error,
  fromFlag,
  toFlag,
}: ResultDisplayProps) {
  if (isConverting) {
    return (
      <div className="space-y-3 py-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-56" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-4">
        <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
        <p className="text-xs text-neutral-400 mt-1">Please try again later.</p>
      </div>
    );
  }

  if (!result || !rate) {
    return (
      <div className="py-4">
        <p className="text-sm text-neutral-400">Enter an amount to convert</p>
      </div>
    );
  }

  const numAmount = parseFloat(result);
  const copyText = `${result} ${toCurrency}`;

  return (
    <div className="space-y-4 py-4">
      {/* Main result + copy */}
      <div className="flex items-start gap-3">
        <span className="text-3xl sm:text-4xl font-semibold text-neutral-900 dark:text-white tracking-tight">
          {fromFlag} {formatCurrency(numAmount, toCurrency)}
        </span>
        <div className="mt-1.5 shrink-0">
          <CopyButton text={copyText} />
        </div>
      </div>

      {/* Exchange rate info */}
      <div className="space-y-1">
        <p className="text-sm text-neutral-500 dark:text-neutral-400">
          {fromFlag} 1 {fromCurrency} = {formatRate(rate)} {toCurrency}
        </p>
        {inverseRate && (
          <p className="text-sm text-neutral-400 dark:text-neutral-500">
            {toFlag} 1 {toCurrency} = {formatRate(inverseRate)} {fromCurrency}
          </p>
        )}
      </div>

      {/* Timestamp */}
      {lastUpdated && (
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          Updated: {formatTimestamp(lastUpdated)}
        </p>
      )}
    </div>
  );
}
