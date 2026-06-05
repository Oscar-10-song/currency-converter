import { getTransferServices } from './transfer-services';

interface TransferLinksProps {
  fromCurrency: string;
  toCurrency: string;
  className?: string;
}

/**
 * Affiliate links component for money transfer services.
 * Only renders services that have referral codes configured.
 * Shows contextual links: "Send {from} to {to} with {service}"
 */
export function TransferLinks({
  fromCurrency,
  toCurrency,
  className = '',
}: TransferLinksProps) {
  const services = getTransferServices().filter((s) => s.referralUrl);

  if (services.length === 0) return null;

  return (
    <div className={`rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden ${className}`}>
      <div className="px-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-b border-neutral-100 dark:border-neutral-800">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          Send Money
        </h2>
      </div>
      <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
        {services.map((service) => (
          <a
            key={service.slug}
            href={service.referralUrl!}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="flex items-center gap-3 px-4 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-900/30 transition-colors"
          >
            <span className="text-xl">{service.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Send {fromCurrency} to {toCurrency} with {service.name}
              </p>
              <p className="text-xs text-neutral-400">{service.description}</p>
            </div>
            <svg
              className="w-4 h-4 text-neutral-300 dark:text-neutral-600 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}
