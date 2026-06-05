'use client';

import { useEffect, useRef, useState } from 'react';
import { AdSlotConfig, AdSlotPosition } from '@/types/ad';

interface AdSlotProps extends Partial<AdSlotConfig> {
  slot: AdSlotPosition;
}

/**
 * AdSlot — Universal ad component.
 *
 * Architecture:
 * - Renders a semantic placeholder div with known dimensions (prevents CLS)
 * - Uses IntersectionObserver to lazy-load ads when visible
 * - Provider-agnostic: switch AdSense / Ezoic / Mediavine via config
 * - Falls back to hidden placeholder on load failure
 * - Debug mode via ?adtest=1 query param
 */
export function AdSlot({ slot, format = 'banner', device = 'all', className = '', fallback = 'hide' }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const isSticky = slot === 'mobile-sticky';

  // IntersectionObserver for lazy loading
  useEffect(() => {
    const el = containerRef.current;
    if (!el || isVisible) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' } // Load 200px before entering viewport
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isVisible]);

  // Simulate ad load (replace with actual ad network script)
  useEffect(() => {
    if (!isVisible) return;

    // Ad load simulation — replace with AdSense script injection
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Timeout fallback — if ad doesn't load in 5s, hide
    const fallbackTimer = setTimeout(() => {
      if (!isLoaded) {
        setHasError(true);
      }
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(fallbackTimer);
    };
  }, [isVisible, isLoaded]);

  const containerClasses = [
    'ad-slot',
    `ad-slot--${slot}`,
    isSticky ? 'ad-slot--sticky' : '',
    !isVisible ? 'ad-slot--pending' : '',
    hasError && fallback === 'hide' ? 'ad-slot--hidden' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      data-ad-slot={slot}
      data-ad-format={format}
      data-ad-device={device}
      role="complementary"
      aria-label="Advertisement"
    >
      {!isVisible && !hasError && (
        <div className="ad-slot__placeholder" />
      )}

      {isVisible && !hasError && (
        <div className="ad-slot__content">
          {/*
           * Ad Network Scripts — Uncomment for production:
           *
           * Google AdSense:
           * <ins class="adsbygoogle"
           *   style="display:block"
           *   data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID}
           *   data-ad-slot={AD_SLOT_IDS[slot]}
           *   data-ad-format={format}
           * />
           * <script>(adsbygoogle = window.adsbygoogle || []).push({})</script>
           */}
          <div className="flex items-center justify-center h-full min-h-[50px] sm:min-h-[90px] bg-neutral-50 dark:bg-neutral-800/50 rounded-lg border border-dashed border-neutral-200 dark:border-neutral-700">
            <span className="text-xs text-neutral-400 dark:text-neutral-500">
              Advertisement
            </span>
          </div>
        </div>
      )}

      {/* Inline styles for ad dimensions and layout */}
      <style jsx>{`
        .ad-slot {
          width: 100%;
          overflow: hidden;
          transition: opacity 0.3s ease;
        }

        .ad-slot--hidden {
          display: none;
        }

        .ad-slot--pending {
          min-height: 90px;
        }

        .ad-slot--sticky {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 50;
          background: white;
          border-top: 1px solid #e5e7eb;
          padding: 4px 0;
        }

        :global(.dark) .ad-slot--sticky {
          background: #171717;
          border-top-color: #262626;
        }

        .ad-slot__placeholder {
          width: 100%;
          height: 90px;
        }

        .ad-slot__content {
          width: 100%;
        }

        @media (min-width: 768px) {
          .ad-slot--pending {
            min-height: 90px;
          }
        }

        @media (max-width: 767px) {
          .ad-slot--pending {
            min-height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
