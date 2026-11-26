import { useState, FormEvent } from 'react';
import {
  AlertCircle,
  ArrowRight,
  ClipboardPaste,
  Copy,
  Download,
  Film,
  ImageDown,
  Loader2,
  Play,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from 'lucide-react';
import {
  AdCountdownRequest,
  DownloadRecord,
  Language,
  VideoInfoResponse,
} from '../types';
import { Translations } from '../i18n';
import {
  detectPlatform,
  downloadRemoteVideo,
  pasteFromClipboard,
  sanitizeFileName,
} from '../utils/device';

interface VideoSaverTabProps {
  lang: Language;
  t: Translations;
  onRequestAdCountdown: (req: AdCountdownRequest) => void;
  onSaveDownload: (record: DownloadRecord) => Promise<void>;
  onNotify: (message: string, variant?: 'success' | 'error') => void;
}

function PlatformIcon({ id }: { id: 'tiktok' | 'instagram' | 'facebook' | 'youtube' }) {
  if (id === 'tiktok') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
      </svg>
    );
  }
  if (id === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </svg>
    );
  }
  if (id === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
        <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.326V1.326C24 .597 23.403 0 22.675 0z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

const PLATFORM_PILLS: {
  id: 'tiktok' | 'instagram' | 'facebook' | 'youtube';
  label: string;
  classes: string;
}[] = [
  {
    id: 'tiktok',
    label: 'TikTok',
    classes:
      'bg-gradient-to-r from-slate-900 to-slate-800 text-white border-cyan-400/40 shadow-sm shadow-cyan-500/15',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    classes:
      'bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-500 text-white border-rose-300/35 shadow-sm shadow-rose-500/20',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    classes:
      'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-300/35 shadow-sm shadow-blue-600/20',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    classes:
      'bg-gradient-to-r from-red-600 to-rose-600 text-white border-red-300/35 shadow-sm shadow-red-600/20',
  },
];

const VIDEO_INFO_ENDPOINT = 'https://pakfintechs.com/api/video-info';

const DEMO_TEST_VIDEO: VideoInfoResponse = {
  title: 'Lahore Twilight — Sample HD Status Video (No Watermark)',
  thumbnail: '/src/assets/images/poetry_bg_lahore_dusk_1795614052107.jpg',
  downloadUrl:
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  platform: 'Demo HD Video',
  duration: '0:15',
  author: 'Sample HD Clip',
};

function extractServerErrorMessage(status: number, statusText: string, rawText: string, parsed: Record<string, unknown> | null): string {
  const jsonMsg =
    (typeof parsed?.error === 'string' && parsed.error.trim()) ||
    (typeof parsed?.message === 'string' && parsed.message.trim()) ||
    (typeof parsed?.detail === 'string' && parsed.detail.trim()) ||
    (typeof parsed?.msg === 'string' && parsed.msg.trim());

  if (jsonMsg) {
    return `HTTP ${status}: ${jsonMsg}`;
  }

  const trimmedRaw = rawText.trim();
  if (trimmedRaw) {
    // Strip HTML tags cleanly if the server returned an HTML error page (e.g. 404 Not Found)
    const plainText = trimmedRaw
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 220);

    if (plainText) {
      return `HTTP ${status}: ${plainText}`;
    }
  }

  return statusText ? `HTTP ${status} (${statusText})` : `HTTP ${status}`;
}

export function VideoSaverTab({
  lang,
  t,
  onRequestAdCountdown,
  onSaveDownload,
  onNotify,
}: VideoSaverTabProps) {
  const [urlInput, setUrlInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [videoInfo, setVideoInfo] = useState<VideoInfoResponse | null>(null);
  const [thumbFailed, setThumbFailed] = useState(false);

  const isUrdu = lang === 'ur';

  const handleLoadDemoVideo = () => {
    setError(null);
    setThumbFailed(false);
    setVideoInfo(DEMO_TEST_VIDEO);
    if (!urlInput.trim()) {
      setUrlInput('https://pakfintechs.com/demo-hd-video');
    }
    onNotify(t.video.demoLoadedToast, 'success');
  };

  const handlePaste = async () => {
    const pasted = await pasteFromClipboard();
    if (pasted && pasted.trim()) {
      setUrlInput(pasted.trim());
      setError(null);
      onNotify(t.video.pastedSuccess, 'success');
    } else {
      onNotify(t.video.clipboardDenied, 'error');
    }
  };

  const handleFetchVideo = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = urlInput.trim();
    if (!trimmed) {
      setError(t.video.emptyUrlError);
      return;
    }

    // Allow quick demo/test keyword entry
    const lower = trimmed.toLowerCase();
    if (lower === 'demo' || lower === 'test' || lower === 'sample') {
      handleLoadDemoVideo();
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(trimmed);
      if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
        setError(t.video.invalidUrlError);
        return;
      }
    } catch {
      setError(t.video.invalidUrlError);
      return;
    }

    setLoading(true);
    setError(null);
    setVideoInfo(null);
    setThumbFailed(false);

    try {
      const response = await fetch(VIDEO_INFO_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: parsedUrl.toString() }),
      });

      const rawText = await response.text();
      let payload: Record<string, unknown> | null = null;
      if (rawText.trim()) {
        try {
          const decoded = JSON.parse(rawText);
          if (decoded && typeof decoded === 'object') {
            payload = decoded as Record<string, unknown>;
          }
        } catch {
          payload = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          extractServerErrorMessage(
            response.status,
            response.statusText,
            rawText,
            payload
          )
        );
      }

      const nestedData =
        payload?.data && typeof payload.data === 'object'
          ? (payload.data as Record<string, unknown>)
          : null;

      const resolvedDownloadUrl =
        (typeof payload?.downloadUrl === 'string' && payload.downloadUrl) ||
        (typeof payload?.videoUrl === 'string' && payload.videoUrl) ||
        (typeof payload?.url === 'string' && payload.url) ||
        (typeof nestedData?.downloadUrl === 'string' && nestedData.downloadUrl) ||
        (typeof nestedData?.videoUrl === 'string' && nestedData.videoUrl) ||
        (typeof nestedData?.url === 'string' && nestedData.url) ||
        '';

      if (!resolvedDownloadUrl) {
        const missingMsg =
          (typeof payload?.error === 'string' && payload.error) ||
          (typeof payload?.message === 'string' && payload.message) ||
          rawText.trim().slice(0, 200) ||
          'Server returned no downloadUrl in response.';
        throw new Error(missingMsg);
      }

      const resolvedTitle =
        (typeof payload?.title === 'string' && payload.title.trim()) ||
        (typeof nestedData?.title === 'string' && nestedData.title.trim()) ||
        `${detectPlatform(trimmed)} Video`;

      const resolvedThumbnail =
        (typeof payload?.thumbnail === 'string' && payload.thumbnail) ||
        (typeof payload?.thumb === 'string' && payload.thumb) ||
        (typeof payload?.cover === 'string' && payload.cover) ||
        (typeof nestedData?.thumbnail === 'string' && nestedData.thumbnail) ||
        '';

      setVideoInfo({
        title: resolvedTitle,
        thumbnail: resolvedThumbnail,
        downloadUrl: resolvedDownloadUrl,
        platform:
          (typeof payload?.platform === 'string' && payload.platform) ||
          detectPlatform(trimmed),
        duration:
          typeof payload?.duration === 'string' ? payload.duration : undefined,
        author:
          typeof payload?.author === 'string' ? payload.author : undefined,
      });
    } catch (err) {
      const reason =
        err instanceof Error ? err.message : 'Unable to reach video service.';
      setError(`${t.video.fetchErrorPrefix} ${reason}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerMp4Download = () => {
    if (!videoInfo) return;
    const safeTitle = videoInfo.title || 'Pak_Status_Video';
    const fileName = sanitizeFileName(safeTitle, 'mp4');

    onRequestAdCountdown({
      seconds: 7,
      titleEn: 'Download HD MP4',
      titleUr: 'ایچ ڈی MP4 ڈاؤن لوڈ',
      preparingLabelEn: 'Ad is loading... Please wait',
      preparingLabelUr: 'اشتہار لوڈ ہو رہا ہے...',
      onComplete: async () => {
        await downloadRemoteVideo(videoInfo.downloadUrl, fileName);
        await onSaveDownload({
          id: `vid_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: 'video',
          title: safeTitle,
          subtitle: videoInfo.platform || detectPlatform(urlInput),
          fileName,
          downloadUrl: videoInfo.downloadUrl,
          thumbnailUrl: videoInfo.thumbnail || undefined,
          platform: videoInfo.platform || detectPlatform(urlInput),
          createdAt: Date.now(),
        });
        onNotify(t.video.downloadStarted, 'success');
      },
    });
  };

  const features = [
    {
      title: t.video.features.hdTitle,
      sub: t.video.features.hdSub,
      icon: Film,
      iconBg: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/25',
    },
    {
      title: t.video.features.cleanTitle,
      sub: t.video.features.cleanSub,
      icon: ShieldCheck,
      iconBg: 'bg-amber-500/15 text-amber-700 border-amber-500/25',
    },
    {
      title: t.video.features.fastTitle,
      sub: t.video.features.fastSub,
      icon: Zap,
      iconBg: 'bg-teal-500/15 text-teal-700 border-teal-500/25',
    },
  ];

  const stepIcons = [Copy, ClipboardPaste, ImageDown];

  return (
    <section className="space-y-6">
      {/* 1. Vibrant Dark-Emerald / Gold Hero Banner Card + Glassmorphism Downloader */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950 via-[#054A38] to-[#262A14] p-5 sm:p-8 text-white shadow-2xl shadow-emerald-950/25 border border-emerald-500/20">
        {/* Ambient emerald & warm gold spotlight glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl"
        />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Hero Copy & Colorful Platform Pills */}
          <div className="lg:col-span-6 space-y-4" dir={isUrdu ? 'rtl' : 'ltr'}>
            {/* Sparkle Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400/20 to-emerald-400/15 border border-amber-300/40 px-3.5 py-1.5 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-amber-300 shrink-0" />
              <span
                className={`text-[11px] font-bold tracking-wider text-amber-200 whitespace-nowrap ${
                  isUrdu ? 'font-urdu-compact text-xs tracking-normal' : ''
                }`}
              >
                {t.video.heroBadge}
              </span>
            </div>

            <h1
              className={`font-bold tracking-tight text-white text-balance leading-tight ${
                isUrdu
                  ? 'font-urdu-compact text-2xl sm:text-4xl'
                  : 'font-display text-2xl sm:text-4xl'
              }`}
            >
              {t.video.heroTitle}
            </h1>

            <p
              className={`text-emerald-100/85 max-w-xl ${
                isUrdu ? 'font-urdu-compact text-base' : 'text-sm sm:text-base'
              }`}
            >
              {t.video.subheading}
            </p>

            {/* Colorful Platform Pills with Icons */}
            <div className="flex flex-wrap items-center gap-2 pt-1" dir="ltr">
              {PLATFORM_PILLS.map((pill) => (
                <span
                  key={pill.id}
                  className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold whitespace-nowrap ${pill.classes}`}
                >
                  <PlatformIcon id={pill.id} />
                  <span>{pill.label}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Right Glassmorphism Link Input Card */}
          <div className="lg:col-span-6">
            <form
              onSubmit={handleFetchVideo}
              noValidate
              className="rounded-2xl bg-white/92 backdrop-blur-xl border border-white/60 p-4 sm:p-5 shadow-2xl shadow-black/25 space-y-3.5 text-slate-900"
            >
              <div className="relative">
                <input
                  type="text"
                  inputMode="url"
                  value={urlInput}
                  onChange={(e) => {
                    setUrlInput(e.target.value);
                    if (error) setError(null);
                  }}
                  placeholder={t.video.placeholder}
                  aria-label={t.video.placeholder}
                  className="w-full min-h-[52px] rounded-xl bg-slate-50 border-2 border-emerald-900/15 px-4 pr-11 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:shadow-[0_0_24px_rgba(16,185,129,0.22)] transition-all"
                />
                {urlInput && (
                  <button
                    type="button"
                    onClick={() => {
                      setUrlInput('');
                      setError(null);
                      setVideoInfo(null);
                    }}
                    aria-label={t.video.clearBtn}
                    className="absolute right-2 top-1/2 -translate-y-1/2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-200/70 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Bright Amber/Gold Paste Link + Bold Gradient Download HD Video */}
              <div className="flex flex-col sm:flex-row gap-2.5">
                <button
                  type="button"
                  onClick={handlePaste}
                  className="min-h-[50px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 via-amber-400 to-yellow-500 hover:from-amber-300 hover:to-amber-500 text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-[0.97] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-500"
                >
                  <ClipboardPaste className="h-4 w-4 shrink-0" />
                  <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                    {t.video.pasteBtn}
                  </span>
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 min-h-[50px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 hover:from-emerald-500 hover:via-teal-500 hover:to-emerald-600 disabled:opacity-65 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/30 hover:shadow-xl hover:shadow-emerald-600/35 transition-all active:scale-[0.98] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4.5 w-4.5 animate-spin shrink-0" />
                      <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                        {t.video.fetching}
                      </span>
                    </>
                  ) : (
                    <>
                      <Download className="h-4.5 w-4.5 shrink-0" />
                      <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                        {t.video.fetchBtn}
                      </span>
                    </>
                  )}
                </button>
              </div>

              {/* Quick Demo Video Test Action */}
              <div className="flex items-center justify-between gap-2 pt-0.5 text-xs text-slate-500">
                <span className="truncate">
                  {isUrdu ? 'یا فوری ٹیسٹ کے لیے:' : 'Want to test the downloader?'}
                </span>
                <button
                  type="button"
                  onClick={handleLoadDemoVideo}
                  className="font-semibold text-emerald-700 hover:text-emerald-900 underline underline-offset-2 whitespace-nowrap shrink-0 transition-colors"
                >
                  {t.video.tryDemoBtn}
                </button>
              </div>

              {/* Exact Server Error Notice + 1-Tap Fallback Demo Button */}
              {error && (
                <div
                  role="alert"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className="rounded-xl bg-red-50 border border-red-200 px-3.5 py-3 text-xs sm:text-sm text-red-900 space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
                    <span
                      className={`break-words ${
                        isUrdu ? 'font-urdu-compact text-sm leading-relaxed' : ''
                      }`}
                    >
                      {error}
                    </span>
                  </div>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={handleLoadDemoVideo}
                      className="min-h-[38px] px-3.5 py-1.5 rounded-lg bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
                    >
                      <Play className="h-3.5 w-3.5 fill-white shrink-0" />
                      <span className={isUrdu ? 'font-urdu-compact text-xs' : ''}>
                        {t.video.loadDemoFallbackBtn}
                      </span>
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Video Preview Result Card (appears immediately when fetched) */}
      {videoInfo && (
        <div className="rounded-3xl bg-white/95 backdrop-blur-md border border-emerald-900/12 overflow-hidden shadow-xl shadow-emerald-950/8 grid grid-cols-1 md:grid-cols-12">
          <div className="md:col-span-5 relative aspect-video md:aspect-auto md:min-h-[220px] bg-[#071612] overflow-hidden">
            {videoInfo.thumbnail && !thumbFailed ? (
              <img
                src={videoInfo.thumbnail}
                alt={videoInfo.title}
                referrerPolicy="no-referrer"
                onError={() => setThumbFailed(true)}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 to-teal-900 text-emerald-100/80 p-6 text-center">
                <Film className="h-12 w-12 mb-2 opacity-80" />
                <span className="text-xs font-semibold">{videoInfo.platform}</span>
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent flex items-center justify-center">
              <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center text-white shadow-lg">
                <Play className="h-6 w-6 fill-white ml-0.5" />
              </div>
            </div>
          </div>

          <div className="md:col-span-7 p-5 sm:p-6 flex flex-col justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span className="font-bold text-emerald-800">
                  {videoInfo.platform || detectPlatform(urlInput)}
                </span>
                <span aria-hidden="true">·</span>
                <span>{t.video.noWatermarkTag}</span>
                {videoInfo.duration && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{videoInfo.duration}</span>
                  </>
                )}
              </div>
              <h2 className="font-display text-lg sm:text-xl font-bold text-slate-900 leading-snug line-clamp-2">
                {videoInfo.title}
              </h2>
              {videoInfo.author && (
                <p className="text-xs font-medium text-slate-500">{videoInfo.author}</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleTriggerMp4Download}
              className="w-full min-h-[52px] px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 hover:from-emerald-600 hover:to-teal-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-800/30 transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700"
            >
              <Download className="h-5 w-5 shrink-0" />
              <span className={isUrdu ? 'font-urdu-compact text-base' : ''}>
                {t.video.downloadMp4}
              </span>
            </button>
          </div>
        </div>
      )}

      {/* 2. 3-Column Mini Feature Row */}
      <div className="grid grid-cols-3 gap-2.5 sm:gap-4">
        {features.map((feat) => {
          const Icon = feat.icon;
          return (
            <div
              key={feat.title}
              dir={isUrdu ? 'rtl' : 'ltr'}
              className="rounded-2xl bg-white/90 backdrop-blur-md border border-emerald-950/8 p-3.5 sm:p-5 shadow-sm hover:shadow-md hover:border-emerald-600/25 transition-all flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-2.5 sm:gap-3.5"
            >
              <span
                className={`flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl border ${feat.iconBg}`}
              >
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <h2
                  className={`font-bold text-slate-900 leading-tight ${
                    isUrdu
                      ? 'font-urdu-compact text-xs sm:text-base'
                      : 'font-display text-xs sm:text-sm'
                  }`}
                >
                  {feat.title}
                </h2>
                <p
                  className={`text-slate-500 mt-0.5 hidden sm:block ${
                    isUrdu ? 'font-urdu-compact text-xs' : 'text-xs'
                  }`}
                >
                  {feat.sub}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Clean 3-Step Visual Guide */}
      <div
        dir={isUrdu ? 'rtl' : 'ltr'}
        className="rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-950/8 p-5 sm:p-6 shadow-sm space-y-4"
      >
        <div className="flex items-center justify-between gap-3">
          <h2
            className={`font-bold text-slate-900 ${
              isUrdu ? 'font-urdu-compact text-lg' : 'font-display text-base sm:text-lg'
            }`}
          >
            {t.video.howItWorksTitle}
          </h2>
          <span className="text-xs font-semibold text-emerald-800 tabular-nums whitespace-nowrap">
            1 → 2 → 3
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative">
          {t.video.steps.map((stepDesc, idx) => {
            const StepIcon = stepIcons[idx];
            const accentStyles = [
              'from-emerald-600 to-teal-600',
              'from-amber-500 to-amber-600',
              'from-teal-600 to-emerald-700',
            ][idx];

            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#F4F8F6] border border-emerald-900/8 p-4 flex flex-col gap-2.5"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${accentStyles} text-white shadow-sm`}
                    >
                      <StepIcon className="h-4.5 w-4.5" />
                    </span>
                    <h3
                      className={`font-bold text-slate-900 ${
                        isUrdu
                          ? 'font-urdu-compact text-sm'
                          : 'font-display text-sm'
                      }`}
                    >
                      {t.video.stepTitles[idx]}
                    </h3>
                  </div>
                  {idx < 2 && (
                    <ArrowRight
                      className={`hidden md:block h-4 w-4 text-emerald-700/50 shrink-0 ${
                        isUrdu ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  )}
                </div>

                <p
                  className={`text-slate-600 ${
                    isUrdu
                      ? 'font-urdu-compact text-xs leading-loose'
                      : 'text-xs sm:text-sm leading-relaxed'
                  }`}
                >
                  {stepDesc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
