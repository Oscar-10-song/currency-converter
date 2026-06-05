import { AdSlot } from './AdSlot';

/**
 * Pre-configured ad slots for common page positions.
 * These components wrap AdSlot with position-specific defaults,
 * making it easy to manage ads from one file.
 */

export function BannerTopAd() {
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
