/**
 * Affiliate money transfer links.
 * Shown on currency pair pages below the rate table.
 * Only renders when referral codes are configured in environment variables.
 */
export interface TransferService {
  name: string;
  slug: string;
  description: string;
  referralUrl: string | null;
  icon: string;
}

export function getTransferServices(): TransferService[] {
  return [
    {
      name: 'Wise',
      slug: 'wise',
      description: 'Real exchange rates, low fees',
      referralUrl: process.env.NEXT_PUBLIC_WISE_REFERRAL || null,
      icon: '💸',
    },
    {
      name: 'Revolut',
      slug: 'revolut',
      description: 'Multi-currency account',
      referralUrl: process.env.NEXT_PUBLIC_REVOLUT_REFERRAL || null,
      icon: '💳',
    },
    {
      name: 'CurrencyFair',
      slug: 'currencyfair',
      description: 'Peer-to-peer exchange',
      referralUrl: process.env.NEXT_PUBLIC_CURRENCYFAIR_REFERRAL || null,
      icon: '🔄',
    },
  ];
}
