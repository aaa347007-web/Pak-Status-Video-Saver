import { DpFontStyle, DpFrameId } from '../types';

export interface DpFrameConfig {
  id: DpFrameId;
  nameEn: string;
  nameUr: string;
  bgColors: [string, string, string];
  ringPrimary: string;
  ringSecondary: string;
  defaultTextColor: string;
  accentColor: string;
  motif:
    | 'neon-gold'
    | 'royal-emerald'
    | 'rose-velvet'
    | 'islamic-star'
    | 'minimal'
    | 'crescent'
    | 'arch'
    | 'marble'
    | 'crown'
    | 'botanical'
    | 'ruby-bezel'
    | 'sunburst';
}

export const DP_FRAMES: DpFrameConfig[] = [
  {
    id: 'neon-gold',
    nameEn: 'Neon Gold',
    nameUr: 'نیون گولڈ',
    bgColors: ['#0E0D0A', '#1B170D', '#070604'],
    ringPrimary: '#F7C948',
    ringSecondary: '#B8860B',
    defaultTextColor: '#FFF5D1',
    accentColor: '#F7C948',
    motif: 'neon-gold',
  },
  {
    id: 'royal-emerald',
    nameEn: 'Royal Emerald',
    nameUr: 'شاہی زمرد',
    bgColors: ['#03271E', '#065F46', '#021A14'],
    ringPrimary: '#D9B35F',
    ringSecondary: '#34D399',
    defaultTextColor: '#F6FBF9',
    accentColor: '#D9B35F',
    motif: 'royal-emerald',
  },
  {
    id: 'rose-velvet',
    nameEn: 'Rose Velvet',
    nameUr: 'مخملی گلاب',
    bgColors: ['#290B15', '#4B1527', '#17060C'],
    ringPrimary: '#E8A598',
    ringSecondary: '#C86D7C',
    defaultTextColor: '#FFF4F5',
    accentColor: '#F2B8B5',
    motif: 'rose-velvet',
  },
  {
    id: 'islamic-calligraphy',
    nameEn: 'Islamic Calligraphy',
    nameUr: 'اسلامی خطاطی',
    bgColors: ['#08242B', '#0E3F4B', '#05171C'],
    ringPrimary: '#E2BE70',
    ringSecondary: '#58A4B0',
    defaultTextColor: '#FDF8EC',
    accentColor: '#E2BE70',
    motif: 'islamic-star',
  },
  {
    id: 'dark-minimal',
    nameEn: 'Dark Minimal',
    nameUr: 'سادہ سیاہ',
    bgColors: ['#141619', '#1D2024', '#0D0E10'],
    ringPrimary: '#E5E7EB',
    ringSecondary: '#525866',
    defaultTextColor: '#F9FAFB',
    accentColor: '#9CA3AF',
    motif: 'minimal',
  },
  {
    id: 'crescent-midnight',
    nameEn: 'Crescent Midnight',
    nameUr: 'چاندنی رات',
    bgColors: ['#0B132B', '#1C2541', '#070B1A'],
    ringPrimary: '#E8C574',
    ringSecondary: '#6F86B8',
    defaultTextColor: '#F5F7FF',
    accentColor: '#E8C574',
    motif: 'crescent',
  },
  {
    id: 'lahore-sandstone',
    nameEn: 'Lahore Sandstone',
    nameUr: 'لاہوری محراب',
    bgColors: ['#3D1E14', '#5F2E1E', '#24110B'],
    ringPrimary: '#E7B980',
    ringSecondary: '#C47E52',
    defaultTextColor: '#FDF5EB',
    accentColor: '#E7B980',
    motif: 'arch',
  },
  {
    id: 'pearl-marble',
    nameEn: 'Pearl Marble',
    nameUr: 'سفید سنگِ مرمر',
    bgColors: ['#FAF8F3', '#EFEAE0', '#E4DDD0'],
    ringPrimary: '#A37B35',
    ringSecondary: '#CBB183',
    defaultTextColor: '#1E1B16',
    accentColor: '#A37B35',
    motif: 'marble',
  },
  {
    id: 'sapphire-crown',
    nameEn: 'Sapphire Crown',
    nameUr: 'نیلم تاج',
    bgColors: ['#0A1B3D', '#122E63', '#061128'],
    ringPrimary: '#D9E4F5',
    ringSecondary: '#6096E8',
    defaultTextColor: '#F8FBFF',
    accentColor: '#D9E4F5',
    motif: 'crown',
  },
  {
    id: 'jade-botanical',
    nameEn: 'Jade Botanical',
    nameUr: 'سبز پتے',
    bgColors: ['#0D241C', '#173C2F', '#081611'],
    ringPrimary: '#C5B076',
    ringSecondary: '#5CA483',
    defaultTextColor: '#F3FAF6',
    accentColor: '#C5B076',
    motif: 'botanical',
  },
  {
    id: 'obsidian-ruby',
    nameEn: 'Obsidian Ruby',
    nameUr: 'یاقوت سیاہ',
    bgColors: ['#140B0D', '#2A1016', '#0B0607'],
    ringPrimary: '#E05A6D',
    ringSecondary: '#D4A55F',
    defaultTextColor: '#FFF5F6',
    accentColor: '#D4A55F',
    motif: 'ruby-bezel',
  },
  {
    id: 'golden-dawn',
    nameEn: 'Golden Dawn',
    nameUr: 'سنہری سحر',
    bgColors: ['#2B1B0E', '#4F3014', '#1A1007'],
    ringPrimary: '#F3C87B',
    ringSecondary: '#C27E35',
    defaultTextColor: '#FFF8EB',
    accentColor: '#F3C87B',
    motif: 'sunburst',
  },
];

export const DP_TEXT_COLOR_SWATCHES = [
  '#FFFFFF',
  '#FFF5D1',
  '#F7C948',
  '#E8A598',
  '#A7F3D0',
  '#D9E4F5',
  '#1E1B16',
  '#064E3B',
];

export function containsUrduScript(text: string): boolean {
  return /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/.test(text);
}

export interface RenderDpOptions {
  name: string;
  tagline: string;
  frameId: DpFrameId;
  fontSize: number; // 56 to 150
  fontStyle: DpFontStyle;
  textColor: string;
  showCircleGuide?: boolean;
}

function drawPolygon(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number,
  sides: number,
  rotation: number
) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const angle = rotation + (i * Math.PI * 2) / sides;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
}

function drawEightPointStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  radius: number
) {
  drawPolygon(ctx, cx, cy, radius, 4, 0);
  ctx.stroke();
  drawPolygon(ctx, cx, cy, radius, 4, Math.PI / 4);
  ctx.stroke();
}

function drawOrnamentalDivider(
  ctx: CanvasRenderingContext2D,
  cx: number,
  y: number,
  halfWidth: number,
  color: string
) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 2.5;
  ctx.globalAlpha = 0.85;

  ctx.beginPath();
  ctx.moveTo(cx - halfWidth, y);
  ctx.lineTo(cx - 18, y);
  ctx.moveTo(cx + 18, y);
  ctx.lineTo(cx + halfWidth, y);
  ctx.stroke();

  // Center diamond
  ctx.beginPath();
  ctx.moveTo(cx, y - 9);
  ctx.lineTo(cx + 9, y);
  ctx.lineTo(cx, y + 9);
  ctx.lineTo(cx - 9, y);
  ctx.closePath();
  ctx.fill();

  // Side dots
  ctx.beginPath();
  ctx.arc(cx - halfWidth - 10, y, 3, 0, Math.PI * 2);
  ctx.arc(cx + halfWidth + 10, y, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export function renderDpCanvas(
  canvas: HTMLCanvasElement,
  options: RenderDpOptions
): void {
  const size = 1080;
  if (canvas.width !== size) canvas.width = size;
  if (canvas.height !== size) canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const frame = DP_FRAMES.find((f) => f.id === options.frameId) ?? DP_FRAMES[0];
  const cx = size / 2;
  const cy = size / 2;

  ctx.clearRect(0, 0, size, size);

  // 1. Base radial background gradient
  const bgGrad = ctx.createRadialGradient(cx, cy * 0.82, 60, cx, cy, size * 0.75);
  bgGrad.addColorStop(0, frame.bgColors[1]);
  bgGrad.addColorStop(0.58, frame.bgColors[0]);
  bgGrad.addColorStop(1, frame.bgColors[2]);
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, size, size);

  // Subtle ambient vignette / texture shimmer
  const sheenGrad = ctx.createLinearGradient(0, 0, size, size);
  sheenGrad.addColorStop(0, 'rgba(255,255,255,0.06)');
  sheenGrad.addColorStop(0.5, 'rgba(255,255,255,0)');
  sheenGrad.addColorStop(1, 'rgba(0,0,0,0.22)');
  ctx.fillStyle = sheenGrad;
  ctx.fillRect(0, 0, size, size);

  // 2. Frame-specific circular-avatar-friendly geometry
  const outerR = 456;
  const innerR = 420;

  ctx.save();
  if (frame.motif === 'neon-gold') {
    // Luminous outer halo
    ctx.shadowColor = frame.ringPrimary;
    ctx.shadowBlur = 32;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.strokeStyle = frame.ringSecondary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.stroke();

    // Fine tick marks around inner bezel
    ctx.strokeStyle = frame.ringPrimary;
    ctx.globalAlpha = 0.5;
    for (let i = 0; i < 48; i++) {
      const a = (i * Math.PI * 2) / 48;
      const r1 = i % 4 === 0 ? innerR - 14 : innerR - 7;
      ctx.lineWidth = i % 4 === 0 ? 3 : 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1);
      ctx.lineTo(cx + Math.cos(a) * innerR, cy + Math.sin(a) * innerR);
      ctx.stroke();
    }
  } else if (frame.motif === 'royal-emerald') {
    // Double gold ring + emerald geometric lattice band
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.35;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR - 18, 0, Math.PI * 2);
    ctx.stroke();

    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.stroke();

    // 16 subtle diamonds around perimeter
    ctx.fillStyle = frame.ringPrimary;
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI * 2) / 16;
      const rx = cx + Math.cos(a) * ((outerR + innerR) / 2);
      const ry = cy + Math.sin(a) * ((outerR + innerR) / 2);
      ctx.save();
      ctx.translate(rx, ry);
      ctx.rotate(a + Math.PI / 4);
      ctx.fillRect(-5, -5, 10, 10);
      ctx.restore();
    }
  } else if (frame.motif === 'rose-velvet') {
    // Soft double rose-gold ring with petal arcs
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.7;
    for (let i = 0; i < 24; i++) {
      const a = (i * Math.PI * 2) / 24;
      const px = cx + Math.cos(a) * (outerR - 16);
      const py = cy + Math.sin(a) * (outerR - 16);
      ctx.beginPath();
      ctx.arc(px, py, 20, a - 0.8, a + 0.8);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'islamic-star') {
    // 8-pointed Rub el Hizb geometric calligraphy frame
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringPrimary;
    ctx.globalAlpha = 0.75;
    ctx.lineWidth = 3;
    drawEightPointStar(ctx, cx, cy, outerR - 12);

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    drawEightPointStar(ctx, cx, cy, outerR - 34);

    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 42, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'minimal') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.5;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + 10, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'crescent') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.arc(cx, cy, innerR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Top golden crescent
    ctx.globalAlpha = 0.95;
    ctx.fillStyle = frame.ringPrimary;
    ctx.beginPath();
    ctx.arc(cx, cy - 285, 34, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = frame.bgColors[1];
    ctx.beginPath();
    ctx.arc(cx + 13, cy - 294, 30, 0, Math.PI * 2);
    ctx.fill();

    // Subtle stars
    ctx.fillStyle = frame.ringPrimary;
    const starPositions = [
      [cx - 95, cy - 260, 4],
      [cx + 95, cy - 260, 4],
      [cx + 38, cy - 295, 5],
      [cx - 165, cy - 190, 3],
      [cx + 165, cy - 190, 3],
    ];
    for (const [sx, sy, sr] of starPositions) {
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }
  } else if (frame.motif === 'arch') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    // Inner Mughal-inspired pointed arch outline
    ctx.strokeStyle = frame.ringPrimary;
    ctx.globalAlpha = 0.85;
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(cx - 260, cy + 310);
    ctx.lineTo(cx - 260, cy - 60);
    ctx.quadraticCurveTo(cx - 260, cy - 250, cx, cy - 340);
    ctx.quadraticCurveTo(cx + 260, cy - 250, cx + 260, cy - 60);
    ctx.lineTo(cx + 260, cy + 310);
    ctx.closePath();
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + 8, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'marble') {
    // Subtle diagonal marble veins
    ctx.strokeStyle = 'rgba(163, 123, 53, 0.14)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(120, 260);
    ctx.bezierCurveTo(360, 320, 620, 140, 960, 240);
    ctx.moveTo(80, 790);
    ctx.bezierCurveTo(380, 710, 660, 880, 980, 740);
    ctx.stroke();

    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + 6, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'crown') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR + 4, 0, Math.PI * 2);
    ctx.stroke();

    // Minimal geometric crown emblem at top
    ctx.globalAlpha = 0.95;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.fillStyle = frame.ringPrimary;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(cx - 56, cy - 255);
    ctx.lineTo(cx - 70, cy - 310);
    ctx.lineTo(cx - 26, cy - 282);
    ctx.lineTo(cx, cy - 324);
    ctx.lineTo(cx + 26, cy - 282);
    ctx.lineTo(cx + 70, cy - 310);
    ctx.lineTo(cx + 56, cy - 255);
    ctx.closePath();
    ctx.stroke();
  } else if (frame.motif === 'botanical') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR - 10, 0, Math.PI * 2);
    ctx.stroke();

    // Symmetric olive/botanical leaf wreath
    ctx.fillStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.72;
    for (let i = 0; i < 28; i++) {
      const a = (i * Math.PI * 2) / 28;
      const lx = cx + Math.cos(a) * (outerR - 10);
      const ly = cy + Math.sin(a) * (outerR - 10);
      ctx.save();
      ctx.translate(lx, ly);
      ctx.rotate(a + Math.PI / 2);
      ctx.beginPath();
      ctx.ellipse(0, -14, 7, 18, 0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(0, 14, 7, 18, -0.35, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 12, 0, Math.PI * 2);
    ctx.stroke();
  } else if (frame.motif === 'ruby-bezel') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 9;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR - 20, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.45;
    ctx.lineWidth = 2;
    drawPolygon(ctx, cx, cy, innerR + 4, 12, 0);
    ctx.stroke();
  } else if (frame.motif === 'sunburst') {
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(cx, cy, outerR, 0, Math.PI * 2);
    ctx.stroke();

    // Radiating fine golden rays between outer and inner rings
    ctx.strokeStyle = frame.ringSecondary;
    ctx.globalAlpha = 0.55;
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 60; i++) {
      const a = (i * Math.PI * 2) / 60;
      const rStart = i % 2 === 0 ? innerR - 12 : innerR + 6;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * rStart, cy + Math.sin(a) * rStart);
      ctx.lineTo(cx + Math.cos(a) * (outerR - 6), cy + Math.sin(a) * (outerR - 6));
      ctx.stroke();
    }

    ctx.globalAlpha = 0.95;
    ctx.strokeStyle = frame.ringPrimary;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, innerR - 14, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Typography rendering
  const displayName = options.name.trim() || 'حمزہ خان';
  const isUrduName = containsUrduScript(displayName);
  const resolvedFontFamily =
    options.fontStyle === 'nastaliq' || (options.fontStyle === 'auto' && isUrduName)
      ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif"
      : options.fontStyle === 'serif'
        ? "Georgia, 'Times New Roman', serif"
        : "'Outfit', 'Plus Jakarta Sans', sans-serif";

  const fontWeight = isUrduName || options.fontStyle === 'nastaliq' ? '700' : '700';

  // Auto-fit if text exceeds circular safe width (690px)
  const maxSafeWidth = 680;
  let computedSize = options.fontSize;
  ctx.font = `${fontWeight} ${computedSize}px ${resolvedFontFamily}`;
  let measured = ctx.measureText(displayName).width;
  while (measured > maxSafeWidth && computedSize > 34) {
    computedSize -= 3;
    ctx.font = `${fontWeight} ${computedSize}px ${resolvedFontFamily}`;
    measured = ctx.measureText(displayName).width;
  }

  // Ornamental dividers above and below name
  const hasTagline = options.tagline.trim().length > 0;
  const nameY = hasTagline ? cy - 22 : cy;

  drawOrnamentalDivider(
    ctx,
    cx,
    nameY - Math.max(96, computedSize * 0.95),
    120,
    frame.accentColor
  );

  // Draw primary name with soft legibility shadow
  ctx.save();
  ctx.fillStyle = options.textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.direction = isUrduName ? 'rtl' : 'ltr';
  ctx.shadowColor =
    frame.motif === 'marble' ? 'rgba(0,0,0,0.12)' : 'rgba(0,0,0,0.55)';
  ctx.shadowBlur = frame.motif === 'marble' ? 8 : 22;
  ctx.shadowOffsetY = 6;
  ctx.font = `${fontWeight} ${computedSize}px ${resolvedFontFamily}`;
  ctx.fillText(displayName, cx, nameY);
  ctx.restore();

  drawOrnamentalDivider(
    ctx,
    cx,
    nameY + Math.max(98, computedSize * 0.98),
    120,
    frame.accentColor
  );

  // Optional subtitle / tagline
  if (hasTagline) {
    const cleanTag = options.tagline.trim();
    const isUrduTag = containsUrduScript(cleanTag);
    const tagFont = isUrduTag
      ? "600 34px 'Noto Nastaliq Urdu', serif"
      : "500 30px 'Plus Jakarta Sans', sans-serif";
    ctx.save();
    ctx.fillStyle = frame.accentColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.direction = isUrduTag ? 'rtl' : 'ltr';
    ctx.font = tagFont;
    ctx.fillText(cleanTag, cx, nameY + Math.max(166, computedSize * 1.48), 580);
    ctx.restore();
  }

  // Optional circular avatar crop guide overlay (preview only, disabled during export)
  if (options.showCircleGuide) {
    ctx.save();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.36)';
    ctx.beginPath();
    ctx.rect(0, 0, size, size);
    ctx.arc(cx, cy, 488, 0, Math.PI * 2, true);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.72)';
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    ctx.beginPath();
    ctx.arc(cx, cy, 488, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }
}
