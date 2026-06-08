/**
 * JSON-LD Structured Data Components
 * Generates schema.org markup for SEO.
 */

export function JsonLdBreadcrumb({
  items,
}: {
  items: { name: string; url: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdExchangeRate({
  fromCurrency,
  toCurrency,
  exchangeRate,
  dateModified,
}: {
  fromCurrency: string;
  toCurrency: string;
  exchangeRate: number;
  dateModified: string;
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ExchangeRateSpecification',
    currency: fromCurrency,
    currentExchangeRate: {
      '@type': 'UnitPriceSpecification',
      price: exchangeRate,
      priceCurrency: toCurrency,
    },
    dateModified,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdFAQ({
  questions,
}: {
  questions: { question: string; answer: string }[];
}) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function JsonLdWebSite() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'CurrencyHub',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.currencyhub.me',
    description: 'Free currency converter with real-time exchange rates',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate:
          (process.env.NEXT_PUBLIC_SITE_URL || 'https://currencyhub.vercel.app') +
          '/{currency_code}-to-{target_currency}',
      },
      'query-input': 'required name=currency_code',
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
