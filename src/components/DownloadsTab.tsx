import { useMemo, useState } from 'react';
import {
  BookOpen,
  Download,
  Film,
  FolderOpen,
  Sparkles,
  Trash2,
} from 'lucide-react';
import { DownloadItemType, DownloadRecord, Language, TabId } from '../types';
import { Translations } from '../i18n';
import { downloadDataUrl, downloadRemoteVideo } from '../utils/device';

interface DownloadsTabProps {
  lang: Language;
  t: Translations;
  records: DownloadRecord[];
  onDeleteRecord: (id: string) => Promise<void>;
  onClearAll: () => Promise<void>;
  onNavigateTab: (tab: TabId) => void;
  onNotify: (message: string, variant?: 'success' | 'error') => void;
}

type FilterKey = 'all' | DownloadItemType;

function formatTimestamp(ts: number, lang: Language): string {
  try {
    return new Intl.DateTimeFormat(lang === 'ur' ? 'ur-PK' : 'en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(ts));
  } catch {
    return new Date(ts).toLocaleDateString();
  }
}

export function DownloadsTab({
  lang,
  t,
  records,
  onDeleteRecord,
  onClearAll,
  onNavigateTab,
  onNotify,
}: DownloadsTabProps) {
  const [filter, setFilter] = useState<FilterKey>('all');
  const [confirmClear, setConfirmClear] = useState(false);

  const isUrdu = lang === 'ur';

  const filteredRecords = useMemo(() => {
    if (filter === 'all') return records;
    return records.filter((r) => r.type === filter);
  }, [records, filter]);

  const handleRedownload = async (record: DownloadRecord) => {
    if (record.previewDataUrl) {
      await downloadDataUrl(record.previewDataUrl, record.fileName);
      onNotify(
        isUrdu ? 'فائل دوبارہ ڈاؤن لوڈ ہو گئی۔' : 'Image downloaded again.',
        'success'
      );
      return;
    }

    if (record.downloadUrl) {
      await downloadRemoteVideo(record.downloadUrl, record.fileName);
      onNotify(
        isUrdu ? 'ویڈیو ڈاؤن لوڈ شروع ہو گئی۔' : 'Video download started.',
        'success'
      );
    }
  };

  const handleConfirmClear = async () => {
    await onClearAll();
    setConfirmClear(false);
    onNotify(t.downloads.clearedToast, 'success');
  };

  const filterButtons: { key: FilterKey; label: string; count: number }[] = [
    { key: 'all', label: t.downloads.filterAll, count: records.length },
    {
      key: 'video',
      label: t.downloads.filterVideo,
      count: records.filter((r) => r.type === 'video').length,
    },
    {
      key: 'poetry',
      label: t.downloads.filterPoetry,
      count: records.filter((r) => r.type === 'poetry').length,
    },
    {
      key: 'dp',
      label: t.downloads.filterDp,
      count: records.filter((r) => r.type === 'dp').length,
    },
  ];

  return (
    <section className="space-y-5">
      {/* Sleek Emerald Gallery Header */}
      <div className="rounded-3xl bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-800 p-5 sm:p-6 text-white shadow-xl shadow-emerald-950/15 border border-emerald-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1" dir={isUrdu ? 'rtl' : 'ltr'}>
          <h1
            className={`font-bold tracking-tight text-white text-balance ${
              isUrdu
                ? 'font-urdu-compact text-2xl sm:text-3xl'
                : 'font-display text-2xl sm:text-3xl'
            }`}
          >
            {t.downloads.heading}
          </h1>
          <p
            className={`text-emerald-100/80 max-w-xl ${
              isUrdu ? 'font-urdu-compact text-base' : 'text-sm'
            }`}
          >
            {t.downloads.subheading}
          </p>
        </div>

        {records.length > 0 && (
          <div className="flex items-center gap-2 shrink-0">
            {confirmClear ? (
              <>
                <button
                  type="button"
                  onClick={() => setConfirmClear(false)}
                  className="min-h-[42px] px-3.5 py-2 rounded-xl bg-white/12 border border-white/20 text-white text-xs font-medium hover:bg-white/20 whitespace-nowrap"
                >
                  {t.downloads.cancel}
                </button>
                <button
                  type="button"
                  onClick={handleConfirmClear}
                  className="min-h-[42px] px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold whitespace-nowrap shadow-md"
                >
                  {t.downloads.confirmClear}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmClear(true)}
                className="min-h-[42px] px-4 py-2 rounded-xl bg-white/12 hover:bg-red-500/25 border border-white/20 hover:border-red-300/40 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors whitespace-nowrap"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>{t.downloads.clearAll}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Filter Pills */}
      {records.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {filterButtons.map((btn) => {
            const active = filter === btn.key;
            return (
              <button
                key={btn.key}
                type="button"
                onClick={() => setFilter(btn.key)}
                className={`min-h-[42px] px-4 py-2 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all whitespace-nowrap shrink-0 ${
                  active
                    ? 'bg-gradient-to-r from-emerald-700 to-teal-700 text-white shadow-md shadow-emerald-800/25'
                    : 'bg-white/90 border border-emerald-950/10 text-slate-700 hover:bg-white'
                }`}
              >
                <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                  {btn.label}
                </span>
                <span
                  className={`text-xs tabular-nums ${
                    active ? 'text-amber-300' : 'text-slate-400'
                  }`}
                >
                  {btn.count}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Empty State or Records Grid */}
      {filteredRecords.length === 0 ? (
        <div
          dir={isUrdu ? 'rtl' : 'ltr'}
          className="rounded-3xl bg-white/90 backdrop-blur-md border border-emerald-950/10 px-6 py-12 text-center flex flex-col items-center shadow-sm"
        >
          <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-600/15 to-amber-500/15 border border-emerald-600/20 text-emerald-800 flex items-center justify-center mb-4">
            <FolderOpen className="h-8 w-8" />
          </div>
          <h2
            className={`font-bold text-slate-900 ${
              isUrdu ? 'font-urdu-compact text-xl' : 'font-display text-lg'
            }`}
          >
            {t.downloads.emptyTitle}
          </h2>
          <p
            className={`mt-1.5 text-slate-500 max-w-md ${
              isUrdu ? 'font-urdu-compact text-sm' : 'text-sm'
            }`}
          >
            {t.downloads.emptySubtitle}
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
            <button
              type="button"
              onClick={() => onNavigateTab('video')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-emerald-700/20 transition-all whitespace-nowrap"
            >
              {t.downloads.goVideo}
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('poetry')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-500/25 text-emerald-950 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
            >
              {t.downloads.goPoetry}
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab('dp')}
              className="min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap"
            >
              {t.downloads.goDp}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredRecords.map((record) => {
            const previewSrc = record.previewDataUrl || record.thumbnailUrl;
            const FallbackIcon =
              record.type === 'video'
                ? Film
                : record.type === 'poetry'
                  ? BookOpen
                  : Sparkles;

            return (
              <article
                key={record.id}
                className="rounded-3xl bg-white/95 border border-emerald-950/10 overflow-hidden shadow-md shadow-emerald-950/6 hover:shadow-lg transition-all flex flex-col"
              >
                {/* Preview Media */}
                <div className="relative aspect-[4/3] w-full bg-[#071612] overflow-hidden">
                  {previewSrc ? (
                    <img
                      src={previewSrc}
                      alt={record.title}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex flex-col items-center justify-center bg-gradient-to-br from-emerald-950 to-teal-900 text-emerald-100/75">
                      <FallbackIcon className="h-10 w-10 mb-1.5" />
                      <span className="text-xs font-semibold">
                        {t.downloads.typeLabels[record.type]}
                      </span>
                    </div>
                  )}
                </div>

                {/* Details + Actions */}
                <div className="p-4 flex flex-col flex-1 justify-between gap-3.5">
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-500">
                      <span className="font-bold text-emerald-800">
                        {t.downloads.typeLabels[record.type]}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate max-w-[120px]">{record.subtitle}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">
                        {formatTimestamp(record.createdAt, lang)}
                      </span>
                    </div>
                    <h2 className="font-semibold text-sm sm:text-base text-slate-900 line-clamp-1">
                      {record.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRedownload(record)}
                      className="flex-1 min-h-[44px] px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm shadow-emerald-700/20 transition-all active:scale-[0.98] whitespace-nowrap"
                    >
                      <Download className="h-3.5 w-3.5 shrink-0" />
                      <span>{t.downloads.redownload}</span>
                    </button>

                    <button
                      type="button"
                      onClick={async () => {
                        await onDeleteRecord(record.id);
                        onNotify(t.downloads.deletedToast, 'success');
                      }}
                      aria-label={t.downloads.deleteItem}
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
