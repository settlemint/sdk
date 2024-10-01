interface CacheEntry<T> {
  data: T;
  expiry: number;
}

interface CacheOptions {
  maxSize: number;
  ttl: number; // Time-to-live in milliseconds
}

// biome-ignore lint/suspicious/noExplicitAny: the setters and getters handle the type safety
const cacheStore: Map<string, CacheEntry<any>> = new Map();

const DEFAULT_OPTIONS: CacheOptions = {
  maxSize: 500, // Maximum number of items in the cache
  ttl: 1000 * 60 * 60 * 24, // 24 hours in milliseconds
};

/**
 * Retrieves cached data if available and not expired.
 * Updates the entry's position to mark it as recently used.
 * @param key - The cache key.
 * @param options - Optional cache configuration.
 * @returns The cached data or null if not found/expired.
 */
export function getCache<T>(key: string): T | null {
  const entry = cacheStore.get(key) as CacheEntry<T> | undefined;

  if (!entry) {
    return null;
  }

  const now = Date.now();
  if (now > entry.expiry) {
    cacheStore.delete(key);
    return null;
  }

  // Refresh the entry's position to mark it as recently used
  cacheStore.delete(key);
  cacheStore.set(key, entry);

  return entry.data;
}

/**
 * Stores data in the cache.
 * Evicts the least recently used item if the cache exceeds maxSize.
 * @param key - The cache key.
 * @param data - The data to cache.
 * @param options - Optional cache configuration.
 */
export function setCache<T>(key: string, data: T, options: Partial<CacheOptions> = {}): void {
  const currentOptions = { ...DEFAULT_OPTIONS, ...options };
  const now = Date.now();
  const expiry = now + currentOptions.ttl;

  if (cacheStore.has(key)) {
    cacheStore.delete(key);
  } else if (cacheStore.size >= currentOptions.maxSize) {
    // Evict the least recently used (first) entry
    const firstKey = cacheStore.keys().next().value;
    if (firstKey) {
      cacheStore.delete(firstKey);
    }
  }

  cacheStore.set(key, { data, expiry });
}
