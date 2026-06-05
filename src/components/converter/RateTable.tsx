import { formatCurrency, formatRate } from '@/lib/utils/formatters';
import { CURRENCIES } from '@/lib/constants/currencies';

interface RateTableProps {
  base: string;
  target: string;
  rate: number;
}

const COMMON_AMOUNTS = [1, 5, 10, 25, 50, 100, 500, 1000];

/**
 * Batch Rate Table — Shows common amounts converted between two currencies.
 * Provides SEO value (gives users quick reference conversions) and utility.
 * Responsive: grid cards on mobile, table on desktop.
 */
export function RateTable({ base, target, rate }: RateTableProps) {
  const baseCcy = CURRENCIES[base];
  const targetCcy = CURRENCIES[target];

  return (
    <div className="rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
          {base} to {target} — Conversion Table
        </h2>
      </div>

      {/* Mobile: grid cards */}
      <div className="grid grid-cols-2 sm:hidden">
        {COMMON_AMOUNTS.map((amount) => (
          <div
            key={amount}
            className="flex flex-col gap-0.5 px-4 py-3 border-b border-r border-neutral-100 dark:border-neutral-800 even:border-r-0"
          >
            <span className="text-xs text-neutral-400">
              {baseCcy?.flag} {amount} {base}
            </span>
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              {targetCcy?.flag} {formatCurrency(amount * rate, target)}
            </span>
          </div>
        ))}
      </div>

      {/* Desktop: table */}
      <table className="hidden sm:table w-full text-sm">
        <thead>
          <tr className="border-b border-neutral-100 dark:border-neutral-800">
            <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              {base} ({base} )
            </th>
            <th className="px-4 py-2.5 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              {target} ({target})
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Rate
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
          {COMMON_AMOUNTS.map((amount) => (
            <tr
              key={amount}
              className="hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
            >
              <td className="px-4 py-2.5 text-neutral-600 dark:text-neutral-400">
                {baseCcy?.flag} {amount} {base}
              </td>
              <td className="px-4 py-2.5 font-medium text-neutral-900 dark:text-white">
                {targetCcy?.flag} {formatCurrency(amount * rate, target)}
              </td>
              <td className="px-4 py-2.5 text-right text-neutral-400">
                {formatRate(rate)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
