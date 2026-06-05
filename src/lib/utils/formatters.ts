/**
 * Format a number as currency. Uses the target currency's locale for proper formatting.
 */
export function formatCurrency(amount: number, currencyCode: string): string {
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    }).format(amount);
  } catch {
    // Fallback for unsupported currency codes
    return `${amount.toFixed(2)} ${currencyCode}`;
  }
}

/**
 * Format a rate value with appropriate precision.
 */
export function formatRate(rate: number): string {
  if (rate >= 1) {
    return rate.toFixed(4);
  }
  if (rate >= 0.01) {
    return rate.toFixed(6);
  }
  return rate.toFixed(8);
}

/**
 * Format a timestamp to a human-readable date/time string.
 */
export function formatTimestamp(timestamp: number): string {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
}

/**
 * Format a date string (YYYY-MM-DD) to human-readable.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

/**
 * Generate a unique ID for history entries.
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Format large numbers with abbreviations (e.g., 1.5M, 2.3B).
 */
export function formatCompactNumber(num: number): string {
  try {
    return new Intl.NumberFormat('en-US', {
      notation: 'compact',
      compactDisplay: 'short',
    }).format(num);
  } catch {
    if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + 'B';
    if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + 'M';
    if (num >= 1_000) return (num / 1_000).toFixed(1) + 'K';
    return num.toString();
  }
}
