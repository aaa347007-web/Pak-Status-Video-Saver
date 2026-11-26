import { DownloadRecord } from '../types';

const DB_NAME = 'PakStatusSaverDB';
const STORE_NAME = 'downloads';
const DB_VERSION = 1;
const LS_FALLBACK_KEY = 'pak_status_downloads_v1';

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB unavailable'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function readLocalStorageFallback(): DownloadRecord[] {
  try {
    const raw = localStorage.getItem(LS_FALLBACK_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalStorageFallback(records: DownloadRecord[]): void {
  try {
    // Cap preview size in localStorage fallback to prevent quota overflow
    const trimmed = records.slice(0, 25);
    localStorage.setItem(LS_FALLBACK_KEY, JSON.stringify(trimmed));
  } catch {
    // Ignore storage quota exceptions gracefully
  }
}

export async function getDownloadHistory(): Promise<DownloadRecord[]> {
  try {
    const db = await openDatabase();
    return await new Promise<DownloadRecord[]>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.getAll();
      req.onsuccess = () => {
        const items = (req.result as DownloadRecord[]).sort(
          (a, b) => b.createdAt - a.createdAt
        );
        resolve(items);
      };
      req.onerror = () => reject(req.error);
    });
  } catch {
    return readLocalStorageFallback().sort((a, b) => b.createdAt - a.createdAt);
  }
}

export async function saveDownloadRecord(record: DownloadRecord): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const current = readLocalStorageFallback();
    writeLocalStorageFallback([record, ...current.filter((r) => r.id !== record.id)]);
  }
}

export async function deleteDownloadRecord(id: string): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(id);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    const current = readLocalStorageFallback();
    writeLocalStorageFallback(current.filter((r) => r.id !== id));
  }
}

export async function clearDownloadHistory(): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch {
    try {
      localStorage.removeItem(LS_FALLBACK_KEY);
    } catch {
      // Ignore
    }
  }
}
