import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Enable React strict mode for development
  reactStrictMode: true,

  // Security + performance headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      // Cache static assets aggressively
      {
        source: '/:path*(\\.(?:svg|png|jpg|webp|ico|woff2|ttf))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Allow embedding on any site (widget iframe)
      {
        source: '/widget(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *",
          },
        ],
      },
      // Remove X-Frame-Options for widget (CSP takes over)
      {
        source: '/widget(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: '',
          },
        ],
      },
    ];
  },

  // ISR configuration for dynamic pages
  experimental: {
    staleTimes: {
      dynamic: 600, // 10 min
      static: 600,
    },
  },
};

export default nextConfig;
