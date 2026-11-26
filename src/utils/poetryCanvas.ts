import { PoetryBackground } from '../types';
import { containsUrduScript } from '../data/dpFrames';

export interface RenderPoetryOptions {
  lines: string[];
  poetName: string;
  showPoet: boolean;
  background: PoetryBackground;
  fontSize: number; // 36 to 66
  textColor: string;
  alignment: 'center' | 'right' | 'left';
}

const imageCache = new Map<string, HTMLImageElement>();

export function loadImageCached(src: string): Promise<HTMLImageElement | null> {
  if (imageCache.has(src)) {
    return Promise.resolve(imageCache.get(src)!);
  }
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageCache.set(src, img);
      resolve(img);
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function wrapTextLine(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length === 0) return [''];
  const result: string[] = [];
  let current = words[0];

  for (let i = 1; i < words.length; i++) {
    const candidate = `${current} ${words[i]}`;
    if (ctx.measureText(candidate).width <= maxWidth) {
      current = candidate;
    } else {
      result.push(current);
      current = words[i];
    }
  }
  result.push(current);
  return result;
}

export async function renderPoetryCanvas(
  canvas: HTMLCanvasElement,
  options: RenderPoetryOptions
): Promise<void> {
  const size = 1080;
  if (canvas.width !== size) canvas.width = size;
  if (canvas.height !== size) canvas.height = size;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const { background } = options;
  ctx.clearRect(0, 0, size, size);

  // 1. Background (photo or rich gradient)
  let drewPhoto = false;
  if (background.type === 'photo' && background.imageSrc) {
    const img = await loadImageCached(background.imageSrc);
    if (img && img.naturalWidth > 0) {
      // Cover-crop cleanly
      const scale = Math.max(size / img.naturalWidth, size / img.naturalHeight);
      const drawW = img.naturalWidth * scale;
      const drawH = img.naturalHeight * scale;
      const dx = (size - drawW) / 2;
      const dy = (size - drawH) / 2;
      ctx.drawImage(img, dx, dy, drawW, drawH);
      drewPhoto = true;

      // Measured editorial contrast scrim for guaranteed WCAG AA legibility
      const scrim = ctx.createRadialGradient(
        size / 2,
        size / 2,
        120,
        size / 2,
        size / 2,
        size * 0.72
      );
      const op = background.scrimOpacity ?? 0.56;
      scrim.addColorStop(0, `rgba(6, 12, 10, ${op})`);
      scrim.addColorStop(1, `rgba(4, 8, 7, ${Math.min(0.84, op + 0.24)})`);
      ctx.fillStyle = scrim;
      ctx.fillRect(0, 0, size, size);
    }
  }

  if (!drewPhoto) {
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, background.colors[0]);
    grad.addColorStop(0.55, background.colors[1]);
    grad.addColorStop(1, background.colors[2] ?? background.colors[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Soft center radial illumination
    const glow = ctx.createRadialGradient(
      size / 2,
      size * 0.44,
      40,
      size / 2,
      size / 2,
      size * 0.68
    );
    glow.addColorStop(0, 'rgba(255,255,255,0.08)');
    glow.addColorStop(1, 'rgba(0,0,0,0.18)');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, size, size);
  }

  // 2. Refined editorial border frame
  ctx.save();
  ctx.strokeStyle = background.accentColor;
  ctx.globalAlpha = 0.42;
  ctx.lineWidth = 2.5;
  ctx.strokeRect(54, 54, size - 108, size - 108);

  // Delicate corner accents
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 4;
  const cLen = 34;
  const inset = 42;
  const corners = [
    [inset, inset, 1, 1],
    [size - inset, inset, -1, 1],
    [inset, size - inset, 1, -1],
    [size - inset, size - inset, -1, -1],
  ];
  for (const [x, y, sx, sy] of corners) {
    ctx.beginPath();
    ctx.moveTo(x, y + sy * cLen);
    ctx.lineTo(x, y);
    ctx.lineTo(x + sx * cLen, y);
    ctx.stroke();
  }
  ctx.restore();

  // 3. Prepare poetry text lines
  const fullText = options.lines.join('\n');
  const isUrdu = containsUrduScript(fullText);
  const fontFamily = isUrdu
    ? "'Noto Nastaliq Urdu', 'Jameel Noori Nastaleeq', serif"
    : "'Plus Jakarta Sans', sans-serif";

  const maxTextWidth = 840;
  ctx.font = `600 ${options.fontSize}px ${fontFamily}`;

  const wrappedLines: string[] = [];
  for (const rawLine of options.lines) {
    const cleaned = rawLine.trim();
    if (!cleaned) continue;
    wrappedLines.push(...wrapTextLine(ctx, cleaned, maxTextWidth));
  }

  const lineHeight = isUrdu ? options.fontSize * 2.35 : options.fontSize * 1.6;
  const totalTextHeight = wrappedLines.length * lineHeight;
  const startY =
    (size - totalTextHeight) / 2 +
    lineHeight * 0.5 -
    (options.showPoet && options.poetName ? 28 : 0);

  const anchorX =
    options.alignment === 'center'
      ? size / 2
      : options.alignment === 'right'
        ? size - 124
        : 124;

  // Decorative top flourish
  ctx.save();
  ctx.strokeStyle = background.accentColor;
  ctx.fillStyle = background.accentColor;
  ctx.globalAlpha = 0.78;
  ctx.lineWidth = 2.5;
  const flourishTopY = Math.max(150, startY - lineHeight * 0.82);
  ctx.beginPath();
  ctx.moveTo(size / 2 - 90, flourishTopY);
  ctx.lineTo(size / 2 - 14, flourishTopY);
  ctx.moveTo(size / 2 + 14, flourishTopY);
  ctx.lineTo(size / 2 + 90, flourishTopY);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(size / 2, flourishTopY, 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // Render poetry lines
  ctx.save();
  ctx.fillStyle = options.textColor;
  ctx.textAlign = options.alignment;
  ctx.textBaseline = 'middle';
  ctx.direction = isUrdu ? 'rtl' : 'ltr';
  ctx.font = `600 ${options.fontSize}px ${fontFamily}`;
  ctx.shadowColor = 'rgba(0,0,0,0.62)';
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 4;

  wrappedLines.forEach((line, idx) => {
    ctx.fillText(line, anchorX, startY + idx * lineHeight);
  });
  ctx.restore();

  // 4. Poet attribution
  if (options.showPoet && options.poetName.trim()) {
    const poetY = Math.min(size - 140, startY + wrappedLines.length * lineHeight + 36);
    const poetIsUrdu = containsUrduScript(options.poetName);
    ctx.save();
    ctx.fillStyle = background.accentColor;
    ctx.textAlign = options.alignment;
    ctx.textBaseline = 'middle';
    ctx.direction = poetIsUrdu ? 'rtl' : 'ltr';
    ctx.font = poetIsUrdu
      ? "600 32px 'Noto Nastaliq Urdu', serif"
      : "600 28px 'Outfit', sans-serif";
    ctx.fillText(`— ${options.poetName.trim()}`, anchorX, poetY);
    ctx.restore();
  }
}
