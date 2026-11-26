import { useMemo, useState } from 'react';
import { Check, Copy, Download, Palette, Search } from 'lucide-react';
import {
  AdCountdownRequest,
  DownloadRecord,
  Language,
  PoetryCategory,
  PoetryItem,
} from '../types';
import { Translations } from '../i18n';
import { POETRY_BACKGROUNDS, POETRY_COLLECTION } from '../data/poetry';
import { renderPoetryCanvas } from '../utils/poetryCanvas';
import { copyToClipboard, downloadDataUrl, sanitizeFileName } from '../utils/device';
import { PoetryStudioModal } from './PoetryStudioModal';

interface PoetryTabProps {
  lang: Language;
  t: Translations;
  onRequestAdCountdown: (req: AdCountdownRequest) => void;
  onSaveDownload: (record: DownloadRecord) => Promise<void>;
  onNotify: (message: string, variant?: 'success' | 'error') => void;
}

const CATEGORIES: PoetryCategory[] = [
  'all',
  'sad',
  'romantic',
  'islamic',
  'jumma',
  'attitude',
  'motivation',
];

export function PoetryTab({
  lang,
  t,
  onRequestAdCountdown,
  onSaveDownload,
  onNotify,
}: PoetryTabProps) {
  const [selectedCategory, setSelectedCategory] = useState<PoetryCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [studioItem, setStudioItem] = useState<PoetryItem | null>(null);

  const isUrdu = lang === 'ur';

  const filteredPoetry = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return POETRY_COLLECTION.filter((item) => {
      const catMatch =
        selectedCategory === 'all' || item.category === selectedCategory;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        item.lines.join(' ').toLowerCase().includes(q) ||
        item.poetUr.toLowerCase().includes(q) ||
        item.poetEn.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
      );
    });
  }, [selectedCategory, searchQuery]);

  const handleCopy = async (item: PoetryItem) => {
    const fullText = `${item.lines.join('\n')}\n— ${item.poetUr}`;
    const ok = await copyToClipboard(fullText);
    if (ok) {
      setCopiedId(item.id);
      onNotify(
        isUrdu ? 'شاعری کاپی ہو گئی۔' : 'Urdu poetry copied to clipboard.',
        'success'
      );
      window.setTimeout(() => {
        setCopiedId((prev) => (prev === item.id ? null : prev));
      }, 1800);
    }
  };

  const handleQuickDownload = (item: PoetryItem) => {
    const bg =
      POETRY_BACKGROUNDS.find((b) => b.id === item.defaultBgId) ??
      POETRY_BACKGROUNDS[0];
    const fileName = sanitizeFileName(`urdu_poetry_${item.id}`, 'png');

    onRequestAdCountdown({
      seconds: 7,
      titleEn: 'Download Poetry Image',
      titleUr: 'شاعری تصویر ڈاؤن لوڈ',
      preparingLabelEn: 'Ad is loading... Please wait',
      preparingLabelUr: 'اشتہار لوڈ ہو رہا ہے...',
      onComplete: async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        const offscreen = document.createElement('canvas');
        offscreen.width = 1080;
        offscreen.height = 1080;
        await renderPoetryCanvas(offscreen, {
          lines: item.lines,
          poetName: item.poetUr,
          showPoet: true,
          background: bg,
          fontSize: 48,
          textColor: bg.textColor,
          alignment: 'center',
        });
        const dataUrl = offscreen.toDataURL('image/png', 1.0);
        await downloadDataUrl(dataUrl, fileName);
        await onSaveDownload({
          id: `poetry_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: 'poetry',
          title: item.lines[0].slice(0, 34),
          subtitle: isUrdu ? item.poetUr : item.poetEn,
          fileName,
          previewDataUrl: dataUrl,
          createdAt: Date.now(),
        });
        onNotify(
          isUrdu
            ? 'شاعری کارڈ محفوظ ہو گیا اور میری گیلری میں شامل ہو گیا۔'
            : 'HD Poetry PNG saved to device & My Downloads.',
          'success'
        );
      },
    });
  };

  return (
    <section className="space-y-5">
      {/* Luxury Header Banner & Search */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-[#073B30] to-[#1A2942] p-5 sm:p-6 text-white shadow-xl shadow-emerald-950/15 border border-emerald-400/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1" dir={isUrdu ? 'rtl' : 'ltr'}>
          <h1
            className={`font-bold tracking-tight text-white text-balance ${
              isUrdu
                ? 'font-urdu-compact text-2xl sm:text-3xl'
                : 'font-display text-2xl sm:text-3xl'
            }`}
          >
            {t.poetry.heading}
          </h1>
          <p
            className={`text-emerald-100/80 max-w-xl ${
              isUrdu ? 'font-urdu-compact text-base' : 'text-sm'
            }`}
          >
            {t.poetry.subheading}
          </p>
        </div>

        <div className="relative w-full md:w-72 shrink-0">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-200/70" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t.poetry.searchPlaceholder}
            aria-label={t.poetry.searchPlaceholder}
            className="w-full min-h-[44px] rounded-xl bg-white/12 border border-white/20 backdrop-blur-md pl-10 pr-4 text-sm text-white placeholder:text-emerald-100/60 focus:bg-white/18 focus:border-amber-300/70 focus:outline-none focus:ring-2 focus:ring-amber-300/25 transition-all"
          />
        </div>
      </div>

      {/* Vibrant Category Filter Controls */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
        {CATEGORIES.map((category) => {
          const isActive = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-emerald-700 ${
                isActive
                  ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-md shadow-emerald-800/25'
                  : 'bg-white/90 border border-emerald-950/10 text-slate-700 hover:bg-white hover:border-emerald-600/30 hover:text-emerald-950'
              }`}
            >
              <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                {t.poetry.categories[category]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Luxury Poetry Cards Grid */}
      {filteredPoetry.length === 0 ? (
        <div className="rounded-3xl bg-white/90 border border-emerald-950/10 p-12 text-center text-slate-500">
          <p className={isUrdu ? 'font-urdu-compact text-base' : 'text-sm'}>
            {t.poetry.noResults}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPoetry.map((item) => {
            const bg =
              POETRY_BACKGROUNDS.find((b) => b.id === item.defaultBgId) ??
              POETRY_BACKGROUNDS[0];
            const isCopied = copiedId === item.id;

            return (
              <article
                key={item.id}
                className="group flex flex-col rounded-3xl bg-[#091512] border border-emerald-500/20 overflow-hidden shadow-lg shadow-emerald-950/12 hover:shadow-xl hover:shadow-emerald-950/20 transition-all"
              >
                {/* Luxury Gradient / Photo Calligraphy Stage */}
                <div
                  className="relative min-h-[240px] p-6 sm:p-7 flex flex-col items-center justify-center text-center overflow-hidden"
                  style={
                    bg.type === 'gradient'
                      ? {
                          background: `linear-gradient(145deg, ${bg.colors[0]} 0%, ${bg.colors[1]} 52%, ${bg.colors[2] ?? bg.colors[0]} 100%)`,
                        }
                      : { backgroundColor: bg.colors[0] }
                  }
                >
                  {bg.type === 'photo' && bg.imageSrc && (
                    <>
                      <img
                        src={bg.imageSrc}
                        alt=""
                        aria-hidden="true"
                        referrerPolicy="no-referrer"
                        className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/55 to-black/45"
                      />
                    </>
                  )}

                  {/* Soft radial golden spotlight */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(251,191,36,0.12),transparent_65%)]"
                  />

                  {/* Ornate Calligraphy Double Border + Corner Accents */}
                  <div
                    aria-hidden="true"
                    style={{ borderColor: bg.accentColor }}
                    className="pointer-events-none absolute inset-3 rounded-2xl border opacity-40"
                  />
                  <div
                    aria-hidden="true"
                    style={{ borderColor: bg.accentColor }}
                    className="pointer-events-none absolute top-2.5 left-2.5 h-4 w-4 border-t-2 border-l-2 rounded-tl-md opacity-85"
                  />
                  <div
                    aria-hidden="true"
                    style={{ borderColor: bg.accentColor }}
                    className="pointer-events-none absolute top-2.5 right-2.5 h-4 w-4 border-t-2 border-r-2 rounded-tr-md opacity-85"
                  />
                  <div
                    aria-hidden="true"
                    style={{ borderColor: bg.accentColor }}
                    className="pointer-events-none absolute bottom-2.5 left-2.5 h-4 w-4 border-b-2 border-l-2 rounded-bl-md opacity-85"
                  />
                  <div
                    aria-hidden="true"
                    style={{ borderColor: bg.accentColor }}
                    className="pointer-events-none absolute bottom-2.5 right-2.5 h-4 w-4 border-b-2 border-r-2 rounded-br-md opacity-85"
                  />

                  <div className="relative z-10 space-y-2.5 max-w-full">
                    {/* Subtle golden diamond flourish */}
                    <div className="flex items-center justify-center gap-2 opacity-80">
                      <span
                        style={{ backgroundColor: bg.accentColor }}
                        className="h-[1px] w-7"
                      />
                      <span
                        style={{ backgroundColor: bg.accentColor }}
                        className="h-1.5 w-1.5 rotate-45"
                      />
                      <span
                        style={{ backgroundColor: bg.accentColor }}
                        className="h-[1px] w-7"
                      />
                    </div>

                    <div
                      dir="rtl"
                      style={{ color: bg.textColor }}
                      className="font-urdu text-lg sm:text-[19px] font-semibold leading-[2.35] drop-shadow-sm"
                    >
                      {item.lines.map((line, idx) => (
                        <p key={idx}>{line}</p>
                      ))}
                    </div>

                    <p
                      dir="rtl"
                      style={{ color: bg.accentColor }}
                      className="font-urdu-compact text-xs font-semibold pt-0.5 tracking-wide"
                    >
                      — {item.poetUr}
                    </p>
                  </div>
                </div>

                {/* Sleek Dark Footer Bar with Unboxed Metadata + Crisp Actions */}
                <div className="p-4 flex flex-col gap-3 flex-1 justify-between bg-[#091512] border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-emerald-100/70">
                    <span className="font-semibold text-amber-300">
                      {t.poetry.categories[item.category]}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">
                      {isUrdu ? item.poetUr : item.poetEn}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(item)}
                      className="min-h-[42px] px-2 py-2 rounded-xl bg-white/10 hover:bg-white/18 border border-white/10 text-white text-xs font-medium flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] whitespace-nowrap shrink-0"
                    >
                      {isCopied ? (
                        <>
                          <Check className="h-3.5 w-3.5 text-emerald-300 shrink-0" />
                          <span className="text-emerald-200">{t.poetry.copied}</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5 text-emerald-200/80 shrink-0" />
                          <span className="truncate">{t.poetry.copyBtn}</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setStudioItem(item)}
                      className="min-h-[42px] px-2 py-2 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/30 text-amber-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all active:scale-[0.97] whitespace-nowrap shrink-0"
                    >
                      <Palette className="h-3.5 w-3.5 text-amber-300 shrink-0" />
                      <span className="truncate">{t.poetry.customizeBtn}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickDownload(item)}
                      className="min-h-[42px] px-2 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-900/40 transition-all active:scale-[0.97] whitespace-nowrap shrink-0"
                    >
                      <Download className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{t.poetry.downloadBtn}</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* Card Studio Modal */}
      <PoetryStudioModal
        item={studioItem}
        lang={lang}
        t={t}
        onClose={() => setStudioItem(null)}
        onRequestAdCountdown={onRequestAdCountdown}
        onSaveDownload={onSaveDownload}
        onNotify={onNotify}
      />
    </section>
  );
}
