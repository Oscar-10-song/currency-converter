import { ImageResponse } from 'next/og';

export const alt = 'CurrencyHub — Free Currency Converter';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
          fontFamily: 'Inter, sans-serif',
        }}
      >
        {/* Logo icon */}
        <svg
          width="80"
          height="80"
          viewBox="0 0 28 28"
          fill="none"
          stroke="white"
          strokeWidth="2"
          style={{ marginBottom: 24 }}
        >
          <circle cx="14" cy="14" r="10" />
          <path d="M7 14h14M14 7v14" />
          <circle cx="14" cy="14" r="3" fill="white" />
        </svg>

        {/* Title */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'white',
            marginBottom: 16,
          }}
        >
          CurrencyHub
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: '#a3a3a3',
            letterSpacing: '-0.01em',
          }}
        >
          Fast & Accurate Currency Converter
        </div>

        {/* Currency symbols decorative */}
        <div
          style={{
            display: 'flex',
            gap: 24,
            marginTop: 40,
            fontSize: 24,
            color: '#525252',
          }}
        >
          <span>USD</span>
          <span style={{ color: '#737373' }}>→</span>
          <span>EUR</span>
          <span style={{ color: '#737373' }}>·</span>
          <span>GBP</span>
          <span style={{ color: '#737373' }}>·</span>
          <span>JPY</span>
          <span style={{ color: '#737373' }}>·</span>
          <span>CNY</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
