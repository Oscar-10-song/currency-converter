'use client';

import { useState } from 'react';
import { RateHistoryPoint } from '@/types/currency';
import { SparklineChart } from '@/app/[...slug]/SparklineChart';

interface SparklineChartWrapperProps {
  data7d: RateHistoryPoint[];
  data30d: RateHistoryPoint[];
  base: string;
  target: string;
}

type RangeOption = 7 | 30;

export function SparklineChartWrapper({
  data7d,
  data30d,
  base,
  target,
}: SparklineChartWrapperProps) {
  const [range, setRange] = useState<RangeOption>(7);

  const chartData = range === 7 ? data7d : data30d;

  return (
    <div className="mt-6 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Rate History
        </h2>
        <div className="flex gap-1">
          {([7, 30] as const).map((d) => (
            <button
              key={d}
              onClick={() => setRange(d)}
              className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all duration-200 ${
                range === d
                  ? 'bg-indigo-500 text-white shadow-sm shadow-indigo-200 dark:shadow-indigo-900/30'
                  : 'bg-neutral-100 text-neutral-500 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-neutral-700'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>
      <SparklineChart data={chartData} base={base} target={target} />
    </div>
  );
}
