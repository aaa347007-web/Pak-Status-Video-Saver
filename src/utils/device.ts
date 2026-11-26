interface CapacitorFilesystemPlugin {
  writeFile?: (options: {
    path: string;
    data: string;
    directory?: string;
  }) => Promise<unknown>;
}

interface CapacitorGlobal {
  isNativePlatform?: () => boolean;
  Plugins?: {
    Filesystem?: CapacitorFilesystemPlugin;
  };
}

function getCapacitor(): CapacitorGlobal | undefined {
  return (window as unknown as { Capacitor?: CapacitorGlobal }).Capacitor;
}

export function sanitizeFileName(raw: string, extension: string): string {
  const cleaned = raw
    .replace(/[<>:"/\\|?*\x00-\x1F]/g, '')
    .trim()
    .slice(0, 48)
    .replace(/\s+/g, '_');
  const base = cleaned || `pak_status_${Date.now()}`;
  return base.toLowerCase().endsWith(`.${extension}`) ? base : `${base}.${extension}`;
}

export async function downloadDataUrl(dataUrl: string, fileName: string): Promise<void> {
  // Capacitor Android Filesystem compatibility when native plugin is present
  const cap = getCapacitor();
  if (cap?.isNativePlatform?.() && cap.Plugins?.Filesystem?.writeFile) {
    try {
      const base64Data = dataUrl.includes(',') ? dataUrl.split(',')[1] : dataUrl;
      await cap.Plugins.Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: 'DOCUMENTS',
      });
    } catch {
      // Fall through to standard anchor download
    }
  }

  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = fileName;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadRemoteVideo(
  downloadUrl: string,
  fileName: string
): Promise<void> {
  try {
    // Attempt CORS-enabled blob fetch first for clean direct file saving
    const response = await fetch(downloadUrl);
    if (response.ok) {
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.setTimeout(() => URL.revokeObjectURL(blobUrl), 15000);
      return;
    }
  } catch {
    // Cross-origin direct download fallback
  }

  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = fileName;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fallback below
    }
  }

  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand('copy');
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

export async function pasteFromClipboard(): Promise<string | null> {
  if (navigator.clipboard && navigator.clipboard.readText) {
    try {
      const text = await navigator.clipboard.readText();
      return text;
    } catch {
      return null;
    }
  }
  return null;
}

export function detectPlatform(url: string): string {
  const lower = url.toLowerCase();
  if (lower.includes('tiktok.com')) return 'TikTok';
  if (lower.includes('instagram.com') || lower.includes('instagr.am')) return 'Instagram';
  if (lower.includes('facebook.com') || lower.includes('fb.watch') || lower.includes('fb.com'))
    return 'Facebook';
  if (lower.includes('youtube.com') || lower.includes('youtu.be')) return 'YouTube';
  return 'HD Video';
}
