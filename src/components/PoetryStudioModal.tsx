import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Download,
  Sparkles,
  X,
} from 'lucide-react';
import {
  AdCountdownRequest,
  DownloadRecord,
  Language,
  PoetryBackground,
  PoetryItem,
} from '../types';
import { Translations } from '../i18n';
import { POETRY_BACKGROUNDS } from '../data/poetry';
import { renderPoetryCanvas } from '../utils/poetryCanvas';
import { downloadDataUrl, sanitizeFileName } from '../utils/device';

interface PoetryStudioModalProps {
  item: PoetryItem | null;
  lang: Language;
  t: Translations;
  onClose: () => void;
  onRequestAdCountdown: (req: AdCountdownRequest) => void;
  onSaveDownload: (record: DownloadRecord) => Promise<void>;
  onNotify: (message: string, variant?: 'success' | 'error') => void;
}

const TEXT_COLORS = [
  '#FFFFFF',
  '#FFFBEB',
  '#FCD34D',
  '#FDE68A',
  '#F9A8D4',
  '#A7F3D0',
];

export function PoetryStudioModal({
  item,
  lang,
  t,
  onClose,
  onRequestAdCountdown,
  onSaveDownload,
  onNotify,
}: PoetryStudioModalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [textValue, setTextValue] = useState('');
  const [selectedBgId, setSelectedBgId] = useState(POETRY_BACKGROUNDS[0].id);
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#FFFFFF');
  const [alignment, setAlignment] = useState<'center' | 'right' | 'left'>('center');
  const [showPoet, setShowPoet] = useState(true);

  const isUrdu = lang === 'ur';

  useEffect(() => {
    if (!item) return;
    setTextValue(item.lines.join('\n'));
    const defaultBg =
      POETRY_BACKGROUNDS.find((b) => b.id === item.defaultBgId) ??
      POETRY_BACKGROUNDS[0];
    setSelectedBgId(defaultBg.id);
    setTextColor(defaultBg.textColor);
    setFontSize(48);
    setAlignment('center');
    setShowPoet(true);
  }, [item]);

  const activeBg: PoetryBackground =
    POETRY_BACKGROUNDS.find((b) => b.id === selectedBgId) ??
    POETRY_BACKGROUNDS[0];

  useEffect(() => {
    if (!item || !canvasRef.current) return;
    let cancelled = false;
    const draw = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      if (cancelled || !canvasRef.current) return;
      await renderPoetryCanvas(canvasRef.current, {
        lines: textValue.split('\n'),
        poetName: item.poetUr,
        showPoet,
        background: activeBg,
        fontSize,
        textColor,
        alignment,
      });
    };
    draw();
    return () => {
      cancelled = true;
    };
  }, [item, textValue, activeBg, fontSize, textColor, alignment, showPoet]);

  const handleSelectBg = (bg: PoetryBackground) => {
    setSelectedBgId(bg.id);
    setTextColor(bg.textColor);
  };

  const handleExportPng = () => {
    if (!item || !canvasRef.current) return;
    const lines = textValue.split('\n').filter((l) => l.trim().length > 0);
    const titleSnippet = lines[0]?.slice(0, 32) || 'Urdu_Poetry_Status';
    const fileName = sanitizeFileName(`urdu_status_${item.id}`, 'png');

    onRequestAdCountdown({
      seconds: 7,
      titleEn: 'Download Status Image',
      titleUr: 'شاعری تصویر ڈاؤن لوڈ',
      preparingLabelEn: 'Ad is loading... Please wait',
      preparingLabelUr: 'اشتہار لوڈ ہو رہا ہے...',
      onComplete: async () => {
        if (!canvasRef.current) return;
        await renderPoetryCanvas(canvasRef.current, {
          lines: textValue.split('\n'),
          poetName: item.poetUr,
          showPoet,
          background: activeBg,
          fontSize,
          textColor,
          alignment,
        });
        const dataUrl = canvasRef.current.toDataURL('image/png', 1.0);
        await downloadDataUrl(dataUrl, fileName);
        await onSaveDownload({
          id: `poetry_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: 'poetry',
          title: titleSnippet,
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

  const photoBgs = POETRY_BACKGROUNDS.filter((b) => b.type === 'photo');
  const gradientBgs = POETRY_BACKGROUNDS.filter((b) => b.type === 'gradient');

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/75 backdrop-blur-md sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="poetry-studio-title"
        >
          <motion.div
            initial={{ y: 36, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 24, opacity: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-t-3xl sm:rounded-3xl bg-[#0A1412] text-white border border-emerald-400/20 shadow-2xl overflow-hidden"
          >
            {/* Pro Studio Header */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 bg-[#07100E] shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 border border-amber-300/30 text-amber-300">
                  <Sparkles className="h-4 w-4" />
                </span>
                <h2
                  id="poetry-studio-title"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className={`font-bold text-white ${
                    isUrdu ? 'font-urdu-compact text-lg' : 'font-display text-lg'
                  }`}
                >
                  {t.poetry.studioTitle}
                </h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label={t.poetry.close}
                className="min-h-[42px] min-w-[42px] flex items-center justify-center rounded-full text-emerald-100/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto p-5 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
              {/* Live 1:1 Glowing Canvas Stage */}
              <div className="md:col-span-6 flex flex-col items-center">
                <div className="relative w-full max-w-[360px] md:max-w-full aspect-square rounded-2xl overflow-hidden border border-amber-300/35 bg-black shadow-[0_0_40px_rgba(16,185,129,0.18)]">
                  <canvas
                    ref={canvasRef}
                    width={1080}
                    height={1080}
                    className="w-full h-full block"
                  />
                </div>
              </div>

              {/* Studio Controls */}
              <div className="md:col-span-6 space-y-5">
                {/* Edit Couplet */}
                <div className="space-y-1.5">
                  <label
                    htmlFor="studio-poetry-text"
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`block text-xs font-semibold text-emerald-200/80 ${
                      isUrdu ? 'font-urdu-compact text-sm' : ''
                    }`}
                  >
                    {t.poetry.editTextLabel}
                  </label>
                  <textarea
                    id="studio-poetry-text"
                    rows={3}
                    dir="rtl"
                    value={textValue}
                    onChange={(e) => setTextValue(e.target.value)}
                    className="w-full rounded-xl bg-white/8 border border-white/15 px-3.5 py-2.5 font-urdu text-base text-white focus:bg-white/12 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/25 resize-none"
                  />
                </div>

                {/* Scenic Photo Backdrops */}
                <div className="space-y-2">
                  <span
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`block text-xs font-semibold text-emerald-200/80 ${
                      isUrdu ? 'font-urdu-compact text-sm' : ''
                    }`}
                  >
                    {t.poetry.photoBgs}
                  </span>
                  <div className="grid grid-cols-3 gap-2.5">
                    {photoBgs.map((bg) => {
                      const active = bg.id === selectedBgId;
                      return (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => handleSelectBg(bg)}
                          className={`group relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all focus-visible:outline-2 focus-visible:outline-amber-300 ${
                            active
                              ? 'border-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.35)]'
                              : 'border-white/15 hover:border-white/40'
                          }`}
                        >
                          <img
                            src={bg.imageSrc}
                            alt={bg.nameEn}
                            referrerPolicy="no-referrer"
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-2">
                            <span className="text-[11px] font-medium text-white truncate">
                              {isUrdu ? bg.nameUr : bg.nameEn}
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Luxury Gradient Palettes */}
                <div className="space-y-2">
                  <span
                    dir={isUrdu ? 'rtl' : 'ltr'}
                    className={`block text-xs font-semibold text-emerald-200/80 ${
                      isUrdu ? 'font-urdu-compact text-sm' : ''
                    }`}
                  >
                    {t.poetry.gradientBgs}
                  </span>
                  <div className="grid grid-cols-3 gap-2">
                    {gradientBgs.map((bg) => {
                      const active = bg.id === selectedBgId;
                      return (
                        <button
                          key={bg.id}
                          type="button"
                          onClick={() => handleSelectBg(bg)}
                          style={{
                            background: `linear-gradient(135deg, ${bg.colors[0]}, ${bg.colors[1]})`,
                          }}
                          className={`min-h-[46px] rounded-xl px-2.5 py-2 text-left border-2 transition-all flex items-end ${
                            active
                              ? 'border-amber-300 shadow-[0_0_16px_rgba(252,211,77,0.35)]'
                              : 'border-white/15 hover:border-white/40'
                          }`}
                        >
                          <span
                            style={{ color: bg.textColor }}
                            className="text-[11px] font-semibold truncate"
                          >
                            {isUrdu ? bg.nameUr : bg.nameEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Typography Size & Color */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/80">
                      <span>{t.poetry.fontSizeLabel}</span>
                      <span className="tabular-nums text-amber-300">{fontSize}px</span>
                    </div>
                    <input
                      type="range"
                      min={36}
                      max={64}
                      value={fontSize}
                      onChange={(e) => setFontSize(Number(e.target.value))}
                      className="w-full accent-amber-400 h-2 rounded-lg bg-white/15 cursor-pointer"
                    />
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-semibold text-emerald-200/80">
                      {t.poetry.textColorLabel}
                    </span>
                    <div className="flex items-center gap-2">
                      {TEXT_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() => setTextColor(color)}
                          aria-label={`Select color ${color}`}
                          style={{ backgroundColor: color }}
                          className={`h-8 w-8 rounded-full border-2 transition-transform ${
                            textColor === color
                              ? 'border-amber-300 scale-110 shadow-[0_0_12px_rgba(252,211,77,0.5)]'
                              : 'border-white/25 hover:scale-105'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alignment & Poet Toggle */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                  <div className="flex items-center gap-1 p-1 bg-white/8 border border-white/10 rounded-xl">
                    {(
                      [
                        { id: 'right', Icon: AlignRight, label: 'Right' },
                        { id: 'center', Icon: AlignCenter, label: 'Center' },
                        { id: 'left', Icon: AlignLeft, label: 'Left' },
                      ] as const
                    ).map(({ id, Icon, label }) => (
                      <button
                        key={id}
                        type="button"
                        onClick={() => setAlignment(id)}
                        aria-label={label}
                        className={`min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-colors ${
                          alignment === id
                            ? 'bg-emerald-600 text-white'
                            : 'text-emerald-100/70 hover:text-white'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                      </button>
                    ))}
                  </div>

                  <label className="flex items-center gap-2.5 cursor-pointer select-none min-h-[44px]">
                    <input
                      type="checkbox"
                      checked={showPoet}
                      onChange={(e) => setShowPoet(e.target.checked)}
                      className="h-4 w-4 rounded accent-amber-400"
                    />
                    <span
                      className={`text-sm font-medium text-emerald-100 ${
                        isUrdu ? 'font-urdu-compact' : ''
                      }`}
                    >
                      {t.poetry.showPoetLabel}
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Sticky Pro Studio Footer */}
            <div className="px-5 py-3.5 border-t border-white/10 bg-[#07100E] flex items-center justify-end gap-3 shrink-0">
              <button
                type="button"
                onClick={onClose}
                className="min-h-[46px] px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/18 text-white font-medium text-sm transition-colors whitespace-nowrap shrink-0"
              >
                {t.poetry.close}
              </button>
              <button
                type="button"
                onClick={handleExportPng}
                className="min-h-[46px] px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all active:scale-[0.98] whitespace-nowrap shrink-0"
              >
                <Download className="h-4 w-4" />
                <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                  {t.poetry.exportPng}
                </span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
