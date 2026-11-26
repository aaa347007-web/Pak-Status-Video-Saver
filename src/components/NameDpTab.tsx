import { useEffect, useRef, useState } from 'react';
import { CircleDashed, Download, Sparkles, SlidersHorizontal } from 'lucide-react';
import {
  AdCountdownRequest,
  DownloadRecord,
  DpFontStyle,
  DpFrameId,
  Language,
} from '../types';
import { Translations } from '../i18n';
import {
  containsUrduScript,
  DP_FRAMES,
  DP_TEXT_COLOR_SWATCHES,
  renderDpCanvas,
} from '../data/dpFrames';
import { downloadDataUrl, sanitizeFileName } from '../utils/device';

interface NameDpTabProps {
  lang: Language;
  t: Translations;
  onRequestAdCountdown: (req: AdCountdownRequest) => void;
  onSaveDownload: (record: DownloadRecord) => Promise<void>;
  onNotify: (message: string, variant?: 'success' | 'error') => void;
}

const GRADIENT_COLOR_SWATCHES: {
  id: string;
  hex: string;
  preview: string;
  label: string;
}[] = [
  { id: 'pure', hex: '#FFFFFF', preview: 'linear-gradient(135deg, #FFFFFF, #E2E8F0)', label: 'Pure White' },
  { id: 'gold', hex: '#F7C948', preview: 'linear-gradient(135deg, #FDE68A, #D97706)', label: 'Royal Gold' },
  { id: 'champagne', hex: '#FFF5D1', preview: 'linear-gradient(135deg, #FFFBEB, #FDE68A)', label: 'Champagne' },
  { id: 'rose', hex: '#F4A9B8', preview: 'linear-gradient(135deg, #FBCFE8, #E11D48)', label: 'Rose Velvet' },
  { id: 'emerald', hex: '#6EE7B7', preview: 'linear-gradient(135deg, #A7F3D0, #059669)', label: 'Emerald Mint' },
  { id: 'sapphire', hex: '#93C5FD', preview: 'linear-gradient(135deg, #DBEAFE, #2563EB)', label: 'Sapphire Ice' },
  { id: 'amber', hex: '#FDBA74', preview: 'linear-gradient(135deg, #FED7AA, #EA580C)', label: 'Sunset Amber' },
  { id: 'obsidian', hex: '#1E1B16', preview: 'linear-gradient(135deg, #475569, #0F172A)', label: 'Deep Ink' },
];

export function NameDpTab({
  lang,
  t,
  onRequestAdCountdown,
  onSaveDownload,
  onNotify,
}: NameDpTabProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState('حمزہ خان');
  const [tagline, setTagline] = useState('پاکستان');
  const [selectedFrameId, setSelectedFrameId] = useState<DpFrameId>('royal-emerald');
  const [fontStyle, setFontStyle] = useState<DpFontStyle>('auto');
  const [fontSize, setFontSize] = useState<number>(106);
  const [textColor, setTextColor] = useState<string>(DP_TEXT_COLOR_SWATCHES[1]);
  const [showCircleGuide, setShowCircleGuide] = useState<boolean>(true);

  const isUrdu = lang === 'ur';

  const activeFrame =
    DP_FRAMES.find((f) => f.id === selectedFrameId) ?? DP_FRAMES[0];

  useEffect(() => {
    let active = true;
    const draw = async () => {
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }
      if (!active || !canvasRef.current) return;
      renderDpCanvas(canvasRef.current, {
        name,
        tagline,
        frameId: selectedFrameId,
        fontSize,
        fontStyle,
        textColor,
        showCircleGuide,
      });
    };
    draw();
    return () => {
      active = false;
    };
  }, [name, tagline, selectedFrameId, fontSize, fontStyle, textColor, showCircleGuide]);

  const handleSelectFrame = (frameId: DpFrameId) => {
    setSelectedFrameId(frameId);
    const frame = DP_FRAMES.find((f) => f.id === frameId);
    if (frame) {
      setTextColor(frame.defaultTextColor);
    }
  };

  const handleDownloadDp = () => {
    const trimmedName = name.trim();
    if (!trimmedName) {
      onNotify(t.dp.emptyNameError, 'error');
      return;
    }

    const fileName = sanitizeFileName(`name_dp_${selectedFrameId}`, 'png');

    onRequestAdCountdown({
      seconds: 7,
      titleEn: 'Download 1080×1080 Name DP',
      titleUr: '1080×1080 نام ڈی پی ڈاؤن لوڈ',
      preparingLabelEn: 'Ad is loading... Please wait',
      preparingLabelUr: 'اشتہار لوڈ ہو رہا ہے...',
      onComplete: async () => {
        if (document.fonts && document.fonts.ready) {
          await document.fonts.ready;
        }
        const exportCanvas = document.createElement('canvas');
        exportCanvas.width = 1080;
        exportCanvas.height = 1080;
        renderDpCanvas(exportCanvas, {
          name: trimmedName,
          tagline,
          frameId: selectedFrameId,
          fontSize,
          fontStyle,
          textColor,
          showCircleGuide: false,
        });

        const dataUrl = exportCanvas.toDataURL('image/png', 1.0);
        await downloadDataUrl(dataUrl, fileName);

        await onSaveDownload({
          id: `dp_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          type: 'dp',
          title: trimmedName,
          subtitle: isUrdu ? activeFrame.nameUr : activeFrame.nameEn,
          fileName,
          previewDataUrl: dataUrl,
          createdAt: Date.now(),
        });

        onNotify(t.dp.savedToast, 'success');
      },
    });
  };

  const nameIsUrdu = containsUrduScript(name);

  return (
    <section className="space-y-5">
      {/* Pro Studio Header Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-[#071612] via-[#0B2922] to-[#1D2415] p-5 sm:p-6 text-white shadow-xl shadow-emerald-950/20 border border-emerald-400/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-1" dir={isUrdu ? 'rtl' : 'ltr'}>
          <div className="inline-flex items-center gap-1.5 text-amber-300 text-xs font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>1080×1080 HD STUDIO</span>
          </div>
          <h1
            className={`font-bold tracking-tight text-white text-balance ${
              isUrdu
                ? 'font-urdu-compact text-2xl sm:text-3xl'
                : 'font-display text-2xl sm:text-3xl'
            }`}
          >
            {t.dp.heading}
          </h1>
          <p
            className={`text-emerald-100/80 max-w-xl ${
              isUrdu ? 'font-urdu-compact text-base' : 'text-sm'
            }`}
          >
            {t.dp.subheading}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCircleGuide((v) => !v)}
          className={`self-start sm:self-center min-h-[42px] px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all whitespace-nowrap shrink-0 ${
            showCircleGuide
              ? 'bg-amber-400/20 border-amber-300/50 text-amber-200 shadow-sm shadow-amber-400/15'
              : 'bg-white/10 border-white/15 text-emerald-100/80 hover:bg-white/15'
          }`}
        >
          <CircleDashed className="h-4 w-4" />
          <span>{t.dp.circleGuideLabel}</span>
        </button>
      </div>

      {/* Pro Photo Editor Workstation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Dark Pro Canvas Viewport + Export CTA */}
        <div className="lg:col-span-5 lg:sticky lg:top-20 space-y-4">
          <div className="relative rounded-3xl bg-[#091411] border border-emerald-400/20 p-4 sm:p-5 shadow-2xl shadow-emerald-950/25 space-y-4 overflow-hidden">
            {/* Ambient studio glow behind canvas */}
            <div
              aria-hidden="true"
              style={{
                background: `radial-gradient(circle, ${activeFrame.ringPrimary}33 0%, transparent 70%)`,
              }}
              className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl"
            />

            <div className="relative z-10 flex items-center justify-between gap-2 text-xs text-emerald-100/75">
              <div className="flex items-center gap-2">
                <span className="font-bold text-amber-300">
                  {isUrdu ? activeFrame.nameUr : activeFrame.nameEn}
                </span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums text-emerald-200/70">1:1 · 1080px</span>
              </div>
              <span className="text-[11px] font-semibold text-emerald-300/80">PNG HD</span>
            </div>

            {/* Live Glowing Square Canvas */}
            <div
              style={{
                boxShadow: `0 0 36px ${activeFrame.ringPrimary}35`,
                borderColor: `${activeFrame.ringPrimary}55`,
              }}
              className="relative z-10 w-full max-w-[380px] mx-auto aspect-square rounded-2xl overflow-hidden border bg-black transition-shadow duration-300"
            >
              <canvas
                ref={canvasRef}
                width={1080}
                height={1080}
                className="w-full h-full block"
              />
            </div>

            <button
              type="button"
              onClick={handleDownloadDp}
              className="relative z-10 w-full min-h-[52px] px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:via-teal-400 hover:to-amber-400 text-emerald-950 font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-lg shadow-emerald-500/25 transition-all active:scale-[0.98] whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              <Download className="h-5 w-5 shrink-0" />
              <span className={isUrdu ? 'font-urdu-compact text-base' : ''}>
                {t.dp.downloadBtn}
              </span>
            </button>
          </div>
        </div>

        {/* Right: Pro Editor Controls & 12 Live Glowing Frames */}
        <div className="lg:col-span-7 space-y-5">
          {/* Text, Font Pills, Size Slider & Gradient Swatches */}
          <div className="rounded-3xl bg-[#091411] text-white border border-emerald-400/20 p-5 shadow-xl shadow-emerald-950/15 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="dp-name-input"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className={`block text-xs font-semibold text-emerald-200/80 ${
                    isUrdu ? 'font-urdu-compact text-sm' : ''
                  }`}
                >
                  {t.dp.nameLabel}
                </label>
                <input
                  id="dp-name-input"
                  type="text"
                  maxLength={32}
                  dir={nameIsUrdu ? 'rtl' : 'ltr'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.dp.namePlaceholder}
                  className={`w-full min-h-[48px] rounded-xl bg-white/8 border border-white/15 px-4 text-white placeholder:text-emerald-100/40 focus:bg-white/12 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/25 transition-all ${
                    nameIsUrdu ? 'font-urdu-compact text-lg' : 'font-display text-base font-semibold'
                  }`}
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="dp-tagline-input"
                  dir={isUrdu ? 'rtl' : 'ltr'}
                  className={`block text-xs font-semibold text-emerald-200/80 ${
                    isUrdu ? 'font-urdu-compact text-sm' : ''
                  }`}
                >
                  {t.dp.taglineLabel}
                </label>
                <input
                  id="dp-tagline-input"
                  type="text"
                  maxLength={26}
                  dir={containsUrduScript(tagline) ? 'rtl' : 'ltr'}
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder={t.dp.taglinePlaceholder}
                  className={`w-full min-h-[48px] rounded-xl bg-white/8 border border-white/15 px-4 text-white placeholder:text-emerald-100/40 focus:bg-white/12 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400/25 transition-all ${
                    containsUrduScript(tagline)
                      ? 'font-urdu-compact text-base'
                      : 'text-sm'
                  }`}
                />
              </div>
            </div>

            {/* Stylish Font Pills */}
            <div className="space-y-2 pt-1 border-t border-white/10">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-200/80">
                <SlidersHorizontal className="h-3.5 w-3.5 text-amber-300" />
                <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                  {t.dp.fontStyleLabel}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {(['auto', 'nastaliq', 'display', 'serif'] as DpFontStyle[]).map(
                  (styleKey) => {
                    const active = fontStyle === styleKey;
                    return (
                      <button
                        key={styleKey}
                        type="button"
                        onClick={() => setFontStyle(styleKey)}
                        className={`min-h-[40px] px-4 py-2 rounded-full text-xs font-semibold border transition-all whitespace-nowrap ${
                          active
                            ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-emerald-950 border-amber-300 shadow-md shadow-amber-500/25'
                            : 'bg-white/8 text-emerald-100/80 border-white/12 hover:bg-white/14 hover:text-white'
                        }`}
                      >
                        {t.dp.fontStyles[styleKey]}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            {/* Font Size Slider + Gradient Swatches */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1 border-t border-white/10">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-semibold text-emerald-200/80">
                  <span className={isUrdu ? 'font-urdu-compact text-sm' : ''}>
                    {t.dp.fontSizeLabel}
                  </span>
                  <span className="tabular-nums text-amber-300 font-bold">{fontSize}px</span>
                </div>
                <input
                  type="range"
                  min={56}
                  max={148}
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full accent-amber-400 h-2 rounded-lg bg-white/15 cursor-pointer mt-2"
                />
              </div>

              <div className="space-y-2">
                <span
                  className={`block text-xs font-semibold text-emerald-200/80 ${
                    isUrdu ? 'font-urdu-compact text-sm' : ''
                  }`}
                >
                  {t.dp.textColorLabel}
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {GRADIENT_COLOR_SWATCHES.map((swatch) => {
                    const active = textColor.toLowerCase() === swatch.hex.toLowerCase();
                    return (
                      <button
                        key={swatch.id}
                        type="button"
                        onClick={() => setTextColor(swatch.hex)}
                        aria-label={swatch.label}
                        style={{ background: swatch.preview }}
                        className={`h-8 w-8 rounded-full border-2 transition-all ${
                          active
                            ? 'border-amber-300 scale-115 shadow-[0_0_14px_rgba(252,211,77,0.65)]'
                            : 'border-white/25 hover:scale-105'
                        }`}
                      />
                    );
                  })}
                  <label
                    className="h-8 w-8 rounded-full border-2 border-white/30 overflow-hidden cursor-pointer flex items-center justify-center bg-[conic-gradient(from_0deg,#10b981,#f59e0b,#ec4899,#3b82f6,#10b981)] hover:scale-105 transition-transform"
                    title="Custom color"
                  >
                    <input
                      type="color"
                      value={textColor}
                      onChange={(e) => setTextColor(e.target.value)}
                      className="opacity-0 w-full h-full cursor-pointer"
                      aria-label="Custom text color"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 12 Live Glowing Frame Previews */}
          <div className="rounded-3xl bg-[#091411] text-white border border-emerald-400/20 p-5 shadow-xl shadow-emerald-950/15 space-y-4">
            <div className="flex items-center justify-between">
              <h2
                dir={isUrdu ? 'rtl' : 'ltr'}
                className={`font-bold text-white ${
                  isUrdu ? 'font-urdu-compact text-lg' : 'font-display text-base'
                }`}
              >
                {t.dp.framesLabel}
              </h2>
              <span className="text-xs font-semibold text-amber-300 tabular-nums">
                12 HD Frames
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {DP_FRAMES.map((frame) => {
                const isSelected = frame.id === selectedFrameId;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => handleSelectFrame(frame.id)}
                    style={
                      isSelected
                        ? { boxShadow: `0 0 22px ${frame.ringPrimary}45` }
                        : undefined
                    }
                    className={`group flex flex-col items-center p-2.5 rounded-2xl border-2 transition-all text-center focus-visible:outline-2 focus-visible:outline-amber-300 ${
                      isSelected
                        ? 'border-amber-300 bg-white/10'
                        : 'border-white/10 bg-white/[0.04] hover:border-emerald-400/40 hover:bg-white/[0.08]'
                    }`}
                  >
                    {/* Live Glowing Mini Frame Preview */}
                    <div
                      style={{
                        background: `radial-gradient(circle at 50% 42%, ${frame.bgColors[1]}, ${frame.bgColors[0]} 65%, ${frame.bgColors[2]})`,
                      }}
                      className="relative w-full aspect-square rounded-xl flex items-center justify-center overflow-hidden mb-2 shadow-inner"
                    >
                      <div
                        style={{
                          borderColor: frame.ringPrimary,
                          boxShadow: `0 0 12px ${frame.ringPrimary}66`,
                        }}
                        className="w-[78%] h-[78%] rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-105"
                      >
                        <div
                          style={{ borderColor: frame.ringSecondary }}
                          className="w-[82%] h-[82%] rounded-full border border-dashed opacity-85 flex items-center justify-center px-1"
                        >
                          <span
                            dir={nameIsUrdu ? 'rtl' : 'ltr'}
                            style={{ color: frame.defaultTextColor }}
                            className={`truncate max-w-full font-bold ${
                              nameIsUrdu ? 'font-urdu-compact text-[11px]' : 'font-display text-xs'
                            }`}
                          >
                            {name.trim().slice(0, 8) || 'Aa'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <span
                      dir={isUrdu ? 'rtl' : 'ltr'}
                      className={`w-full truncate font-semibold ${
                        isSelected ? 'text-amber-300' : 'text-emerald-100/80'
                      } ${isUrdu ? 'font-urdu-compact text-xs' : 'text-xs'}`}
                    >
                      {isUrdu ? frame.nameUr : frame.nameEn}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
