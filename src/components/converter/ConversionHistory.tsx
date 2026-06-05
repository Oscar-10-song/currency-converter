'use client';

import { useHistory } from '@/lib/hooks/useHistory';
import { CURRENCIES } from '@/lib/constants/currencies';
import { formatTimestamp, formatCurrency } from '@/lib/utils/formatters';

export function ConversionHistory() {
  const { history, clearHistory, removeEntry } = useHistory();

  if (history.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          Recent Conversions
        </h2>
        <button
          onClick={clearHistory}
          className="text-xs text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
        >
          Clear all
        </button>
      </div>
      <div className="space-y-1.5">
        {history.map((entry) => {
          const fromCcy = CURRENCIES[entry.fromCurrency];
          return (
            <div
              key={entry.id}
              className="group flex items-center justify-between gap-3 px-3.5 py-2.5 rounded-xl border border-neutral-100 dark:border-neutral-800 hover:border-neutral-200 dark:hover:border-neutral-700 transition-all"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="text-base shrink-0">{fromCcy?.flag}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                    {formatCurrency(entry.fromAmount, entry.fromCurrency)}
                  </p>
                  <p className="text-xs text-neutral-400">
                    {formatCurrency(entry.toAmount, entry.toCurrency)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <div className="text-right">
                  <p className="text-xs text-neutral-400">
                    {entry.fromCurrency}/{entry.toCurrency}
                  </p>
                  <p className="text-[11px] text-neutral-400">
                    {formatTimestamp(entry.timestamp)}
                  </p>
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-all"
                  aria-label="Remove"
                >
                  <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
