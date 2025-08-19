/**
 * DESIGN DECISION: Custom LRU cache implementation over external libraries.
 *
 * WHY: Avoids external dependencies for this critical infrastructure component.
 * TRADEOFF: Simpler implementation trades advanced features (TTL, statistics) for reliability.
 * PERFORMANCE: O(1) access with automatic memory management prevents unbounded growth.
 *
 * Alternative considered: Using Map without eviction - rejected due to memory leak risk
 * in long-running server applications with diverse chain/client combinations.
 */
export class LRUCache<K, V> {
  private cache = new Map<K, V>();
  private readonly maxSize: number;

  constructor(maxSize: number) {
    this.maxSize = maxSize;
  }

  get(key: K): V | undefined {
    const value = this.cache.get(key);
    if (value !== undefined) {
      // PERFORMANCE: Move to end to maintain LRU ordering - prevents premature eviction
      this.cache.delete(key);
      this.cache.set(key, value);
    }
    return value;
  }

  set(key: K, value: V): void {
    // INVARIANT: Remove existing key to update position in insertion order
    this.cache.delete(key);

    // MEMORY MANAGEMENT: Enforce size limit to prevent unbounded growth
    if (this.cache.size >= this.maxSize) {
      // WHY: Maps preserve insertion order - first key is least recently used
      const firstKey = this.cache.keys().next().value;
      if (firstKey !== undefined) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, value);
  }

  clear(): void {
    this.cache.clear();
  }
}
