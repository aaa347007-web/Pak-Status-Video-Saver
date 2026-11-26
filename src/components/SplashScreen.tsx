import { useEffect } from 'react';
import { motion } from 'motion/react';

interface SplashScreenProps {
  onFinish: () => void;
}

export function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const duration = prefersReduced ? 350 : 1350;
    const timer = window.setTimeout(onFinish, duration);
    return () => window.clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#042F24] text-white px-6 select-none"
      role="status"
      aria-label="Loading Pak Status & Video Saver"
    >
      {/* Subtle radial glow behind emblem */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <motion.div
        initial={{ scale: 0.86, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex flex-col items-center text-center"
      >
        {/* Original geometric emerald & antique gold crest */}
        <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-950/90 border border-[#D4AF37]/40 shadow-2xl shadow-black/40">
          <svg
            viewBox="0 0 64 64"
            className="h-12 w-12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <rect
              x="12"
              y="12"
              width="40"
              height="40"
              rx="6"
              stroke="#D4AF37"
              strokeWidth="2.2"
              transform="rotate(45 32 32)"
            />
            <circle cx="32" cy="32" r="19" stroke="#34D399" strokeWidth="1.5" strokeOpacity="0.55" />
            <path
              d="M27 23.5L41 32L27 40.5V23.5Z"
              fill="#F8FAF9"
            />
          </svg>
        </div>

        <motion.h1
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.14, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-white"
        >
          Pak Status &amp; Video Saver
        </motion.h1>

        <motion.p
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.26, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          dir="rtl"
          className="font-urdu-compact mt-2 text-lg text-[#E5C675]"
        >
          پاک اسٹیٹس اور ویڈیو سیور
        </motion.p>

        {/* Sleek progress rail */}
        <div className="mt-8 h-1 w-44 overflow-hidden rounded-full bg-white/15">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.15, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: 'left' }}
            className="h-full w-full bg-gradient-to-r from-emerald-400 to-[#E5C675]"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
