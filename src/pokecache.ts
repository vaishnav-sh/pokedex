type CacheEntry<T> = {
  createdAt: number;
  val: T;
};

export class Cache {
  #cache = new Map<string, CacheEntry<unknown>>();
  #interval;
  #reapIntervalId: NodeJS.Timeout | undefined;

  constructor(interval: number) {
    this.#interval = interval;
    this.#reapIntervalId = setInterval(() => {
      this.#reap();
    }, this.#interval);
  }

  #reap() {
    for (const [key, entry] of this.#cache) {
      if (Date.now() - entry.createdAt > this.#interval) {
        this.#cache.delete(key);
      }
    }
  }

  stopReapLoop() {
    clearInterval(this.#reapIntervalId);
    this.#reapIntervalId = undefined;
  }

  add<T>(key: string, value: T) {
    const entry = {
      createdAt: Date.now(),
      val: value
    }
    if (this.#cache.get(key)) {
      this.#cache.set(key, entry);
    } else {
      this.#cache.set(key, entry);
    }
  }

  get<T>(key: string): CacheEntry<T> | undefined {
    return this.#cache.get(key) as CacheEntry<T> | undefined;
  }
}
