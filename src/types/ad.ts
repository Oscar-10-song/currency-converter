export type AdSlotPosition =
  | 'banner-top'
  | 'in-content'
  | 'sidebar'
  | 'footer'
  | 'mobile-sticky';

export type AdDevice = 'all' | 'desktop' | 'mobile';

export type AdFormat = 'banner' | 'native' | 'sticky';

export type AdProvider = 'adsense' | 'ezoic' | 'mediavine' | 'placeholder';

export interface AdSlotConfig {
  slot: AdSlotPosition;
  format: AdFormat;
  device: AdDevice;
  className?: string;
  fallback?: 'hide' | 'placeholder';
  refreshInterval?: number; // milliseconds, for rotating ads
}

export interface AdSize {
  width: number;
  height: number;
  label: string;
}

export const AD_SIZES: Record<AdSlotPosition, AdSize[]> = {
  'banner-top': [
    { width: 728, height: 90, label: 'Leaderboard' },
    { width: 320, height: 50, label: 'Mobile Banner' },
  ],
  'in-content': [
    { width: 728, height: 90, label: 'Leaderboard' },
    { width: 336, height: 280, label: 'Large Rectangle' },
    { width: 300, height: 250, label: 'Medium Rectangle' },
  ],
  sidebar: [
    { width: 300, height: 600, label: 'Half Page' },
    { width: 300, height: 250, label: 'Medium Rectangle' },
  ],
  footer: [
    { width: 728, height: 90, label: 'Leaderboard' },
    { width: 320, height: 50, label: 'Mobile Banner' },
  ],
  'mobile-sticky': [
    { width: 320, height: 50, label: 'Mobile Banner' },
  ],
};
