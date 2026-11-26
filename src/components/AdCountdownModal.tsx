import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Download, Film, Loader2, ShieldCheck, X } from 'lucide-react';
import { AdCountdownRequest, Language } from '../types';
import { Translations } from '../i18n';

interface AdCountdownModalProps {
  request: AdCountdownRequest | null;
  lang: Language;
  t: Translations;
  onClose: () => void;
}

type GateMode = 'unity-loading' | 'web-countdown' | 'completed';

const STRICT_GATE_SECONDS = 7;

export function AdCountdownModal({
  request,
  lang,
  t,
  onClose,
}: AdCountdownModalProps) {
  const [mode, setMode] = useState<GateMode>('web-countdown');
  const [remaining, setRemaining] = useState<number>(STRICT_GATE_SECONDS);
  const [adCacheBust, setAdCacheBust] = useState<number>(() => Date.now());
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    if (!request) {
      setMode('web-countdown');
      setRemaining(STRICT_GATE_SECONDS);
      return;
    }

    const totalSeconds = Math.max(
      STRICT_GATE_SECONDS,
      request.seconds || STRICT_GATE_SECONDS
    );

    let cancelled = false;
    let settled = false;
    let intervalId: number | undefined;
    let closeTimeout: number | undefined;

    let unityCompletedHandler: (() => void) | undefined;
    let unityFailedHandler: ((reason?: string) => void) | undefined;

    const cleanupUnityCallbacks = () => {
      if (unityCompletedHandler && window.onUnityAdCompleted === unityCompletedHandler) {
        delete window.onUnityAdCompleted;
      }
      if (unityFailedHandler && window.onUnityAdFailed === unityFailedHandler) {
        delete window.onUnityAdFailed;
      }
      unityCompletedHandler = undefined;
      unityFailedHandler = undefined;
    };

    const triggerDownloadAndFinish = () => {
      if (cancelled || settled) return;
      settled = true;
      cleanupUnityCallbacks();
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
        intervalId = undefined;
      }

      setRemaining(0);
      setMode('completed');

      Promise.resolve(request.onComplete()).finally(() => {
        if (cancelled) return;
        closeTimeout = window.setTimeout(() => {
          if (!cancelled) onCloseRef.current();
        }, 1200);
      });
    };

    const startWebCountdownFallback = () => {
      if (cancelled || settled) return;
      cleanupUnityCallbacks();

      let secondsLeft = totalSeconds;
      setMode('web-countdown');
      setRemaining(totalSeconds);
      setAdCacheBust(Date.now());

      // Strict 7-second countdown gate: NEVER trigger download until secondsLeft reaches 0
      intervalId = window.setInterval(() => {
        if (cancelled || settled) {
          if (intervalId !== undefined) window.clearInterval(intervalId);
          return;
        }

        secondsLeft -= 1;

        if (secondsLeft > 0) {
          setRemaining(secondsLeft);
          return;
        }

        triggerDownloadAndFinish();
      }, 1000);
    };

    // Check if running inside Android APK with native Unity Rewarded Video Ad bridge
    const hasNativeUnityBridge =
      typeof window !== 'undefined' &&
      Boolean(window.AndroidAds) &&
      typeof window.AndroidAds?.showRewardedVideo === 'function';

    if (hasNativeUnityBridge) {
      setMode('unity-loading');
      setRemaining(totalSeconds);

      unityCompletedHandler = () => {
        triggerDownloadAndFinish();
      };

      unityFailedHandler = () => {
        if (cancelled || settled) return;
        startWebCountdownFallback();
      };

      window.onUnityAdCompleted = unityCompletedHandler;
      window.onUnityAdFailed = unityFailedHandler;

      try {
        window.AndroidAds!.showRewardedVideo!();
      } catch {
        startWebCountdownFallback();
      }
    } else {
      // Running in standard web browser — launch 7-second banner ad countdown modal
      startWebCountdownFallback();
    }

    return () => {
      cancelled = true;
      cleanupUnityCallbacks();
      if (intervalId !== undefined) {
        window.clearInterval(intervalId);
      }
      if (closeTimeout !== undefined) {
        window.clearTimeout(closeTimeout);
      }
    };
  }, [request]);

  const total = request
    ? Math.max(STRICT_GATE_SECONDS, request.seconds || STRICT_GATE_SECONDS)
    : STRICT_GATE_SECONDS;
  const clampedRemaining = Math.min(total, Math.max(0, remaining));
  const progressRatio = total > 0 ? (total - clampedRemaining) / total : 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  const isUrdu = lang === 'ur';
  const title = request ? (isUrdu ? request.titleUr : request.titleEn) : '';
  const completed = mode === 'completed';

  const countdownMessage = isUrdu
    ? `اشتہار لوڈ ہو رہا ہے... ایچ ڈی ڈاؤن لوڈ کے لیے ${clampedRemaining} سیکنڈ انتظار کریں`
    : `Ad is loading... Please wait ${clampedRemaining}s to unlock HD download`;

  return (
    <>
      {/* Hidden preloaded ad iframe warms up connection & banner assets before modal opens */}
      {!request && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed -left-[9999px] top-0 h-[50px] w-[320px] overflow-hidden opacity-0"
        >
          <iframe
            src="https://pakfintechs.com/ad-banner"
            title="Preloaded Sponsored Banner"
            width={320}
            height={50}
            scrolling="no"
            loading="eager"
            tabIndex={-1}
            className="block h-[50px] w-[320px] border-0"
          />
        </div>
      )}

      <AnimatePresence>
        {request && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ad-countdown-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 8 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md rounded-3xl bg-[#0A1613] text-white border border-emerald-400/25 shadow-2xl shadow-black/60 overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-3 border-b border-white/10 bg-[#07110E]">
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500/25 to-amber-400/20 border border-emerald-400/30 text-amber-300">
                    {mode === 'unity-loading' ? (
                      <Film className="h-4 w-4" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                  </span>
                  <h2
                    id="ad-countdown-title"
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`truncate font-bold text-white ${
                      isUrdu ? 'font-urdu-compact text-base' : 'font-display text-base'
                    }`}
                  >
                    {title}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label={t.adModal.cancel}
                  className="min-h-[40px] min-w-[40px] flex items-center justify-center rounded-full text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-amber-300"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Body: Native Android Unity Rewarded Video Loading Overlay OR 7s Web Countdown */}
              {mode === 'unity-loading' ? (
                <div className="px-6 py-8 flex flex-col items-center text-center">
                  <div className="relative flex h-22 w-22 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/20 to-amber-400/20 border border-amber-300/35 shadow-[0_0_32px_rgba(251,191,36,0.2)]">
                    <Loader2 className="h-10 w-10 text-amber-300 animate-spin" />
                  </div>

                  <p
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`mt-5 font-bold text-white ${
                      isUrdu ? 'font-urdu-compact text-lg' : 'font-display text-lg'
                    }`}
                  >
                    {t.adModal.loadingVideoAd}
                  </p>

                  <p
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`mt-1.5 text-emerald-100/75 max-w-xs ${
                      isUrdu
                        ? 'font-urdu-compact text-sm leading-loose'
                        : 'text-xs sm:text-sm leading-relaxed'
                    }`}
                  >
                    {t.adModal.loadingVideoAdSub}
                  </p>
                </div>
              ) : (
                <div className="pt-5 pb-4 flex flex-col items-center text-center">
                  <div className="px-5 flex flex-col items-center">
                    <div className="relative flex h-24 w-24 items-center justify-center">
                      <svg
                        className="h-24 w-24 -rotate-90"
                        viewBox="0 0 84 84"
                        aria-hidden="true"
                      >
                        <circle
                          cx="42"
                          cy="42"
                          r={radius}
                          fill="none"
                          stroke="rgba(255,255,255,0.12)"
                          strokeWidth="5.5"
                        />
                        <circle
                          cx="42"
                          cy="42"
                          r={radius}
                          fill="none"
                          stroke={completed ? '#34D399' : '#FBBF24'}
                          strokeWidth="5.5"
                          strokeLinecap="round"
                          strokeDasharray={circumference}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-[stroke-dashoffset] duration-700 ease-linear"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        {completed ? (
                          <CheckCircle2 className="h-9 w-9 text-emerald-400" />
                        ) : (
                          <span className="font-display text-2xl font-extrabold tabular-nums text-amber-300">
                            {clampedRemaining}s
                          </span>
                        )}
                      </div>
                    </div>

                    <p
                      dir={isUrdu ? 'rtl' : 'ltr'}
                      className={`mt-3.5 font-semibold tabular-nums max-w-xs ${
                        completed ? 'text-emerald-300' : 'text-white'
                      } ${
                        isUrdu
                          ? 'font-urdu-compact text-base leading-loose'
                          : 'text-sm leading-relaxed'
                      }`}
                    >
                      {completed ? t.adModal.downloadStarted : countdownMessage}
                    </p>
                  </div>

                  {/* Full-Width Unclipped 320x50 Centered Sponsored Ad Container */}
                  <div className="mt-5 w-full bg-[#06100D] border-y border-emerald-400/15 py-3 flex flex-col items-center justify-center">
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold tracking-wider text-emerald-200/60 mb-2">
                      <ShieldCheck className="h-3 w-3 text-amber-300/80" />
                      <span>{t.adModal.sponsoredLabel}</span>
                    </span>

                    <div className="w-full flex items-center justify-center overflow-x-auto no-scrollbar">
                      <div className="w-[320px] h-[50px] shrink-0 bg-[#0E201B] border border-emerald-400/20 rounded-md overflow-hidden flex items-center justify-center">
                        <iframe
                          key={adCacheBust}
                          src={`https://pakfintechs.com/ad-banner?t=${adCacheBust}`}
                          title="Sponsored Ad Banner"
                          width={320}
                          height={50}
                          scrolling="no"
                          loading="eager"
                          className="border-0 w-[320px] h-[50px] block shrink-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer Action */}
              <div className="px-5 pb-4 pt-1 flex items-center justify-between gap-3">
                <span className="text-[11px] text-emerald-200/55 tabular-nums">
                  {completed
                    ? t.adModal.downloadStarted
                    : mode === 'unity-loading'
                      ? t.adModal.loadingVideoAd
                      : `${clampedRemaining}s / ${total}s`}
                </span>
                <button
                  type="button"
                  onClick={onClose}
                  className="min-h-[42px] px-4 py-2 text-xs sm:text-sm font-semibold text-emerald-100/80 hover:text-white hover:bg-white/10 rounded-xl transition-colors whitespace-nowrap shrink-0"
                >
                  {t.adModal.cancel}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
