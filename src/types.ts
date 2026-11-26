export type Language = 'en' | 'ur';

export type TabId = 'video' | 'poetry' | 'dp' | 'downloads';

export type PoetryCategory =
  | 'all'
  | 'sad'
  | 'romantic'
  | 'islamic'
  | 'jumma'
  | 'attitude'
  | 'motivation';

export interface PoetryItem {
  id: string;
  category: Exclude<PoetryCategory, 'all'>;
  lines: string[];
  poetUr: string;
  poetEn: string;
  defaultBgId: string;
}

export interface PoetryBackground {
  id: string;
  nameEn: string;
  nameUr: string;
  type: 'photo' | 'gradient';
  imageSrc?: string;
  colors: [string, string, string?];
  accentColor: string;
  textColor: string;
  scrimOpacity?: number;
}

export interface VideoInfoResponse {
  title: string;
  thumbnail: string;
  downloadUrl: string;
  platform?: string;
  duration?: string;
  author?: string;
}

export type DownloadItemType = 'video' | 'poetry' | 'dp';

export interface DownloadRecord {
  id: string;
  type: DownloadItemType;
  title: string;
  subtitle: string;
  fileName: string;
  downloadUrl?: string;
  previewDataUrl?: string;
  thumbnailUrl?: string;
  platform?: string;
  createdAt: number;
}

export interface AdCountdownRequest {
  seconds: number;
  titleEn: string;
  titleUr: string;
  preparingLabelEn: string;
  preparingLabelUr: string;
  onComplete: () => Promise<void> | void;
}

export type DpFrameId =
  | 'neon-gold'
  | 'royal-emerald'
  | 'rose-velvet'
  | 'islamic-calligraphy'
  | 'dark-minimal'
  | 'crescent-midnight'
  | 'lahore-sandstone'
  | 'pearl-marble'
  | 'sapphire-crown'
  | 'jade-botanical'
  | 'obsidian-ruby'
  | 'golden-dawn';

export type DpFontStyle = 'auto' | 'nastaliq' | 'display' | 'serif';

declare global {
  interface Window {
    AndroidAds?: {
      showRewardedVideo?: () => void;
    };
    onUnityAdCompleted?: () => void;
    onUnityAdFailed?: (reason?: string) => void;
  }
}
