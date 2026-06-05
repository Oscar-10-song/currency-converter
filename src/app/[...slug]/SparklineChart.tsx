'use client';

import { RateHistoryPoint } from '@/types/currency';

interface SparklineChartProps {
  data: RateHistoryPoint[];
  base: string;
  target: string;
}

/**
 * Lightweight Sparkline chart using SVG path.
 * No JS charting library overhead for this simple visualization.
 */
export function SparklineChart({ data, base, target }: SparklineChartProps) {
  if (!data || data.length < 2) {
    return (
      <div className="flex items-center justify-center h-16 text-sm text-neutral-400">
        Insufficient data for chart
      </div>
    );
  }

  const width = 300;
  const height = 60;
  const padding = { top: 4, bottom: 4, left: 0, right: 0 };
  const chartWidth = width - padding.left - padding.right;
  const chartHeight = height - padding.top - padding.bottom;

  const rates = data.map((d) => d.rate);
  const minRate = Math.min(...rates);
  const maxRate = Math.max(...rates);
  const range = maxRate - minRate || 1;

  const xStep = chartWidth / (data.length - 1);

  const points = data.map((d, i) => {
    const x = padding.left + i * xStep;
    const y = padding.top + chartHeight - ((d.rate - minRate) / range) * chartHeight;
    return { x, y };
  });

  const pathD = points.map((p, i) => (i === 0 ? `M${p.x},${p.y}` : `L${p.x},${p.y}`)).join(' ');

  const isUp = rates[rates.length - 1] >= rates[0];
  const strokeColor = isUp ? '#22c55e' : '#ef4444';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-neutral-400">
          {data[0]?.date} — {data[data.length - 1]?.date}
        </span>
        <span className={`text-xs font-medium ${isUp ? 'text-green-500' : 'text-red-500'}`}>
          {isUp ? '▲' : '▼'} {((rates[rates.length - 1] / rates[0] - 1) * 100).toFixed(2)}%
        </span>
      </div>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={`sparkline-fill-${base}-${target}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={strokeColor} stopOpacity="0.15" />
            <stop offset="100%" stopColor={strokeColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        {/* Area fill */}
        <path
          d={`${pathD} L${points[points.length - 1].x},${padding.top + chartHeight} L${points[0].x},${padding.top + chartHeight} Z`}
          fill={`url(#sparkline-fill-${base}-${target})`}
        />
        {/* Line */}
        <path
          d={pathD}
          fill="none"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
