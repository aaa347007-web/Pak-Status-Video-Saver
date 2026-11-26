import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CheckCircle2, AlertCircle, Languages } from 'lucide-react';
import {
  AdCountdownRequest,
  DownloadRecord,
  Language,
  TabId,
} from './types';
import { TRANSLATIONS } from './i18n';
import {
  clearDownloadHistory,
  deleteDownloadRecord,
  getDownloadHistory,
  saveDownloadRecord,
} from './utils/storage';
import { SplashScreen } from './components/SplashScreen';
import { AdCountdownModal } from './components/AdCountdownModal';
import { BottomAdAndNav } from './components/BottomAdAndNav';
import { VideoSaverTab } from './components/VideoSaverTab';
import { PoetryTab } from './components/PoetryTab';
import { NameDpTab } from './components/NameDpTab';
import { DownloadsTab } from './components/DownloadsTab';

interface ToastState {
  id: number;
  message: string;
  variant: 'success' | 'error';
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('pak_status_lang');
      return saved === 'ur' ? 'ur' : 'en';
    } catch {
      return 'en';
    }
  });
  const [activeTab, setActiveTab] = useState<TabId>('video');
  const [downloads, setDownloads] = useState<DownloadRecord[]>([]);
  const [adRequest, setAdRequest] = useState<AdCountdownRequest | null>(null);
  const [toast, setToast] = useState<ToastState | null>(null);

  const t = TRANSLATIONS[lang];
  const isUrdu = lang === 'ur';

  useEffect(() => {
    getDownloadHistory().then(setDownloads).catch(() => {});
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('pak_status_lang', lang);
    } catch {
      // Ignore storage errors
    }
    document.documentElement.lang = lang === 'ur' ? 'ur' : 'en';
  }, [lang]);

  const handleNotify = useCallback(
    (message: string, variant: 'success' | 'error' = 'success') => {
      const id = Date.now();
      setToast({ id, message, variant });
      window.setTimeout(() => {
        setToast((prev) => (prev?.id === id ? null : prev));
      }, 3200);
    },
    []
  );

  const handleSaveDownload = useCallback(async (record: DownloadRecord) => {
    await saveDownloadRecord(record);
    setDownloads((prev) => [record, ...prev.filter((r) => r.id !== record.id)]);
  }, []);

  const handleDeleteRecord = useCallback(async (id: string) => {
    await deleteDownloadRecord(id);
    setDownloads((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const handleClearAll = useCallback(async () => {
    await clearDownloadHistory();
    setDownloads([]);
  }, []);

  const toggleLanguage = () => {
    setLang((prev) => (prev === 'en' ? 'ur' : 'en'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#EDF4F1] via-[#F4F8F6] to-[#E8F0EC] text-[#111815] flex flex-col">
      {/* Sleek Animated Startup Splash Screen */}
      <AnimatePresence>
        {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}
      </AnimatePresence>

      {/* Rich Deep-Emerald to Teal Gradient Top App Header */}
      <header className="sticky top-0 z-30 pt-safe bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-800 border-b border-emerald-400/20 shadow-lg shadow-emerald-950/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-15 flex items-center justify-between gap-4">
          {/* Glowing Gold/Emerald Icon Badge + Crisp White Title */}
          <button
            type="button"
            onClick={() => setActiveTab('video')}
            className="flex items-center gap-3 min-w-0 text-left focus-visible:outline-2 focus-visible:outline-amber-300 rounded-xl group"
          >
            <span className="relative flex h-9.5 w-9.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-emerald-500 p-[1.5px] shadow-[0_0_18px_rgba(251,191,36,0.4)] group-hover:shadow-[0_0_24px_rgba(52,211,153,0.55)] transition-shadow">
              <span className="flex h-full w-full items-center justify-center rounded-[10px] bg-gradient-to-br from-emerald-950 to-emerald-900">
                <svg
                  viewBox="0 0 32 32"
                  className="h-5 w-5"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="7"
                    y="7"
                    width="18"
                    height="18"
                    rx="2.5"
                    stroke="#FCD34D"
                    strokeWidth="1.7"
                    transform="rotate(45 16 16)"
                  />
                  <path d="M13.5 11.6L21 16L13.5 20.4V11.6Z" fill="#FFFFFF" />
                </svg>
              </span>
            </span>
            <span
              dir={isUrdu ? 'rtl' : 'ltr'}
              className={`truncate font-bold tracking-tight text-white whitespace-nowrap drop-shadow-xs ${
                isUrdu ? 'font-urdu-compact text-base sm:text-lg' : 'font-display text-base sm:text-lg'
              }`}
            >
              {t.appName}
            </span>
          </button>

          {/* Clean Frosted Glass Bilingual Toggle ("اردو / EN") */}
          <button
            type="button"
            onClick={toggleLanguage}
            aria-label="Toggle Urdu and English language"
            className="min-h-[40px] px-3.5 py-1.5 rounded-xl bg-white/12 hover:bg-white/20 text-white border border-white/20 backdrop-blur-md flex items-center gap-2 transition-all active:scale-[0.97] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-amber-300"
          >
            <Languages className="h-4 w-4 text-amber-300 shrink-0" />
            <span className="flex items-center gap-1.5 text-xs font-semibold">
              <span
                className={
                  lang === 'ur'
                    ? 'text-amber-300 font-urdu-compact text-sm'
                    : 'text-emerald-100/75 font-urdu-compact text-sm'
                }
              >
                اردو
              </span>
              <span className="text-white/30" aria-hidden="true">
                /
              </span>
              <span className={lang === 'en' ? 'text-amber-300' : 'text-emerald-100/75'}>
                EN
              </span>
            </span>
          </button>
        </div>
      </header>

      {/* Main Scrollable Content Area (extra bottom padding clears fixed ad container + bottom nav) */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 pt-5 pb-40">
        {activeTab === 'video' && (
          <VideoSaverTab
            lang={lang}
            t={t}
            onRequestAdCountdown={setAdRequest}
            onSaveDownload={handleSaveDownload}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'poetry' && (
          <PoetryTab
            lang={lang}
            t={t}
            onRequestAdCountdown={setAdRequest}
            onSaveDownload={handleSaveDownload}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'dp' && (
          <NameDpTab
            lang={lang}
            t={t}
            onRequestAdCountdown={setAdRequest}
            onSaveDownload={handleSaveDownload}
            onNotify={handleNotify}
          />
        )}

        {activeTab === 'downloads' && (
          <DownloadsTab
            lang={lang}
            t={t}
            records={downloads}
            onDeleteRecord={handleDeleteRecord}
            onClearAll={handleClearAll}
            onNavigateTab={setActiveTab}
            onNotify={handleNotify}
          />
        )}
      </main>

      {/* Subtle Floating Toast Feedback */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            role="status"
            aria-live="polite"
            className="fixed bottom-[126px] left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-sm pointer-events-none"
          >
            <div
              dir={isUrdu ? 'rtl' : 'ltr'}
              className={`rounded-2xl px-4 py-3 shadow-lg border flex items-center gap-2.5 text-sm font-medium ${
                toast.variant === 'error'
                  ? 'bg-red-950 text-red-50 border-red-800'
                  : 'bg-[#042F24] text-emerald-50 border-emerald-800/80'
              }`}
            >
              {toast.variant === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-300 shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 text-emerald-300 shrink-0" />
              )}
              <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                {toast.message}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad Countdown Modal (6s for Video MP4, 5s for Poetry PNG & Name DP PNG) */}
      <AdCountdownModal
        request={adRequest}
        lang={lang}
        t={t}
        onClose={() => setAdRequest(null)}
      />

      {/* Fixed Bottom 320x50 Ad Banner + 4-Tab Mobile Navigation Bar */}
      <BottomAdAndNav
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        lang={lang}
        t={t}
        downloadsCount={downloads.length}
      />
    </div>
  );
}
