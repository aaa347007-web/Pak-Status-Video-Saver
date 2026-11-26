import { Download, FolderHeart, Sparkles, BookOpen } from 'lucide-react';
import { Language, TabId } from '../types';
import { Translations } from '../i18n';

interface BottomAdAndNavProps {
  activeTab: TabId;
  onSelectTab: (tab: TabId) => void;
  lang: Language;
  t: Translations;
  downloadsCount: number;
}

export function BottomAdAndNav({
  activeTab,
  onSelectTab,
  lang,
  t,
  downloadsCount,
}: BottomAdAndNavProps) {
  const isUrdu = lang === 'ur';

  const navItems: {
    id: TabId;
    label: string;
    icon: typeof Download;
  }[] = [
    { id: 'video', label: t.tabs.video, icon: Download },
    { id: 'poetry', label: t.tabs.poetry, icon: BookOpen },
    { id: 'dp', label: t.tabs.dp, icon: Sparkles },
    { id: 'downloads', label: t.tabs.downloads, icon: FolderHeart },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40">
      {/* Sleek Dark Sponsored Ad Container above Bottom Nav */}
      <div className="w-full bg-[#071512]/95 backdrop-blur-xl border-t border-emerald-500/20 pt-1 pb-1.5 px-2 flex flex-col items-center justify-center">
        <span className="text-[9.5px] font-medium tracking-wider text-emerald-200/55 leading-none mb-1">
          {t.adModal.advertisementLabel}
        </span>
        <div className="w-[320px] max-w-full h-[50px] overflow-hidden rounded-lg bg-[#0D211C] border border-emerald-400/15 shadow-inner flex items-center justify-center">
          <iframe
            src="https://pakfintechs.com/ad-banner"
            title="Advertisement Banner"
            width={320}
            height={50}
            scrolling="no"
            className="border-0 w-[320px] h-[50px] block"
          />
        </div>
      </div>

      {/* Sleek Modern 4-Tab Bottom Navigation Bar */}
      <nav
        aria-label="Main Navigation"
        className="w-full bg-[#04100D]/98 backdrop-blur-xl border-t border-white/10 pb-safe"
      >
        <div className="max-w-3xl mx-auto grid grid-cols-4 items-center h-[60px] px-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative flex flex-col items-center justify-center h-full min-h-[44px] px-1 transition-all focus-visible:outline-2 focus-visible:outline-amber-300 ${
                  isActive
                    ? 'text-amber-300'
                    : 'text-emerald-100/60 hover:text-emerald-50'
                }`}
              >
                {/* Luminous top active indicator */}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-[2.5px] w-11 rounded-b-full bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 shadow-[0_0_10px_rgba(252,211,77,0.65)]"
                  />
                )}

                <span
                  className={`relative flex items-center justify-center rounded-xl px-3 py-1 transition-colors ${
                    isActive ? 'bg-emerald-500/15' : ''
                  }`}
                >
                  <Icon
                    className="h-[20px] w-[20px]"
                    strokeWidth={isActive ? 2.3 : 1.8}
                  />
                  {item.id === 'downloads' && downloadsCount > 0 && (
                    <span className="absolute -top-1 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 text-[10px] font-bold tabular-nums flex items-center justify-center shadow-xs">
                      {downloadsCount > 99 ? '99+' : downloadsCount}
                    </span>
                  )}
                </span>

                <span
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className={`mt-0.5 leading-none whitespace-nowrap truncate max-w-full ${
                    isUrdu
                      ? 'font-urdu-compact text-[11px] font-semibold'
                      : 'text-[11px] font-medium tracking-tight'
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
