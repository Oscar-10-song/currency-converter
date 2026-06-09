import { AdSlot } from './AdSlot';

/**
 * Pre-configured ad slots for common page positions.
 * These components wrap AdSlot with position-specific defaults,
 * making it easy to manage ads from one file.
 *
 * If no NEXT_PUBLIC_ADSENSE_PUBLISHER_ID is set, all ad slots return null
 * (no "Advertisement" placeholder shown until AdSense is configured).
 */

function isAdEnabled(): boolean {
  return !!process.env.NEXT_PUBLIC_ADSENSE_PUBLISHER_ID;
}

export function BannerTopAd() {
  if (!isAdEnabled()) return null;
  return (
    <AdSlot
      slot="banner-top"
      format="banner"
      device="all"
      className="my-4 sm:my-6"
    />
  );
}

export function InContentAd() {
  if (!isAdEnabled()) return null;
  return (
    <AdSlot
      slot="in-content"
      format="banner"
      device="all"
      className="my-8"
    />
  );
}

export function SidebarAd() {
  if (!isAdEnabled()) return null;
  return (
    <div className="hidden lg:block">
      <AdSlot
        slot="sidebar"
        format="banner"
        device="desktop"
        className="mb-6"
      />
    </div>
  );
}

export function FooterAd() {
  if (!isAdEnabled()) return null;
  return (
    <AdSlot
      slot="footer"
      format="banner"
      device="all"
      className="my-8"
    />
  );
}

export function MobileStickyAd() {
  if (!isAdEnabled()) return null;
  return (
    <div className="lg:hidden">
      <AdSlot
        slot="mobile-sticky"
        format="sticky"
        device="mobile"
      />
    </div>
  );
}
