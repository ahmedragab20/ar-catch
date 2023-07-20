import { TCacheStrategy } from "../types";
import {
  supportedCachingStrategy,
  cachingStrategies,
  isObject,
} from "./helpers";
import CacheStore from "../state/cache-store";

export default class Cache {
  /**
   * The caching strategy key.
   */
  private readonly _key: string = "NO-CACHE";

  /**
   * The set of cached keys.
   */
  private _cachedKeys = new Set<string>();

  /**
   * Create a new instance of the Cache class.
   * @param k - The caching strategy.
   * @throws {Error} If an invalid caching strategy is provided.
   */
  constructor(k: TCacheStrategy) {
    if (!supportedCachingStrategy(k)) {
      throw new Error(
        `Invalid caching strategy. Expected one of: ` + cachingStrategies()
      );
    }

    this._key = k?.toUpperCase();
  }

  /**
   * Set the cached keys.
   * @param value - The cached key to add.
   */
  public set cachedKeys(value: string) {
    this._cachedKeys.add(value);
  }

  /**
   * Get the cached keys.
   * @returns An array of cached keys.
   */
  public get cachedKeys(): any { // TODO:: fix the type
    return Array.from(this._cachedKeys);
  }

  /**
   * Check if a specific key is cached.
   * @param key - The key to check.
   * @returns True if the key is cached, false otherwise.
   */
  public isCached(key: string): boolean {
    switch (this._key) {
      case "NO-CACHE":
        return (
          isObject(this.getCacheNoCache(key)) &&
          Object.keys(this.getCacheNoCache(key)).length > 0
        );
      case "PER-SESSION":
        return (
          isObject(this.getCachePerSession(key)) &&
          Object.keys(this.getCachePerSession(key)).length > 0
        );
      case "RELOAD":
        return (
          isObject(this.getCacheReload(key)) &&
          Object.keys(this.getCacheReload(key)).length > 0
        );
      default:
        return false;
    }
  }

  /**
   * The cache map for different caching strategies.
   */
  private readonly cache: Map<TCacheStrategy, any> = new Map<
    TCacheStrategy,
    any
  >();

  /**
   * Set the cache for the NO-CACHE strategy.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  private readonly setCacheNoCache = (key: string, value: any): void => {
    this.cache.set("NO-CACHE", {
      [key]: value,
    });
    //[TODO]:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  /**
   * Get the cache for the NO-CACHE strategy.
   * @param key - The cache key.
   * @returns The cache value.
   */
  private readonly getCacheNoCache = (key: string): any => {
    return {};

    //[TODO]:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  /**
   * Set the cache for the PER-SESSION strategy.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  private readonly setCachePerSession = (key: string, value: any): void => {
    this.cache.set("PER-SESSION", {
      [key]: value,
    });

    if (window) {
      // set that in the session storage
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        const parsedSessionCache = JSON.parse(sessionCache);

        window.sessionStorage.setItem(
          "PER-SESSION",
          JSON.stringify({
            ...parsedSessionCache,
            [key]: value,
          })
        );

        return;
      }

      window.sessionStorage.setItem(
        "PER-SESSION",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  /**
   * Get the cache for the PER-SESSION strategy.
   * @param key - The cache key.
   * @returns The cache value.
   */
  private readonly getCachePerSession = (key: string): any => {
    if (window) {
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        const parsedSessionCache = JSON.parse(sessionCache) || {};

        return parsedSessionCache?.[key] || {};
      }
    }
  };

  /**
   * Set the cache for the RELOAD strategy.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  private readonly setCacheReload = (key: string, value: any): void => {
    this.cache.set("RELOAD", {
      [key]: value,
    });

    new CacheStore("RELOAD").setCaches(key, value);
  };

  /**
   * Get the cache for the RELOAD strategy.
   * @param key - The cache key.
   * @returns The cache value.
   */
  private readonly getCacheReload = (key: string): any => {
    // convert the cache to an array and filter it by the key

    const cache = new CacheStore(this._key);

    return cache.getCaches(key) || {};
  };

  /**
   *
   * clear Cache by key from all the strategies that have it
   * @param key - The cache key.
   */
  public clearCache(key: string): void {
    const strategies = cachingStrategies();

    strategies.forEach((strategy) => {
      if (strategy.toUpperCase() === "PER-SESSION") {
        if (window) {
          const sessionCache = window.sessionStorage.getItem("PER-SESSION");

          if (sessionCache) {
            const parsedSessionCache = JSON.parse(sessionCache) || {};

            delete parsedSessionCache[key];

            window.sessionStorage.setItem(
              "PER-SESSION",
              JSON.stringify({
                ...parsedSessionCache,
              })
            );
          }
        }
      } else if (strategy.toUpperCase() === "RELOAD") {
        new CacheStore("RELOAD").clearCache(key);
      }
    });
  }

  /**
   * clears all the cache from all the strategies
   * @returns void
   */
  public clearAllCaches(): void {
    const strategies = cachingStrategies();

    strategies.forEach((strategy) => {
      if (strategy.toUpperCase() === "PER-SESSION") {
        if (window) {
          window.sessionStorage.removeItem("PER-SESSION");
        }
      } else if (strategy.toUpperCase() === "RELOAD") {
        new CacheStore("RELOAD").clearAllCaches();
      }
    });
  }

  /**
   * Set the cache value for the specified key.
   * @param key - The cache key.
   * @param value - The cache value.
   * @throws {Error} If the key or value is not provided, or if the key is not a string.
   */
  public set(key: string, value: any): void {
    if (!key || !value || typeof key !== "string") {
      throw new Error(
        "You must provide a key and a value, and the key must be a string"
      );
    }

    this._cachedKeys.add(key);

    switch (this._key) {
      case "NO-CACHE":
        // this.setCacheNoCache(key, value); TODO:: add it later
        break;
      case "PER-SESSION":
        this.setCachePerSession(key, value);
        break;

      case "RELOAD":
        this.setCacheReload(key, value);
        break;

      default:
        break;
    }
  }

  /**
   * Get the cache value for the specified key.
   * @param key - The cache key.
   * @returns The cache value.
   * @throws {Error} If the key is not provided.
   */
  public get(key: string): any {
    if (!key) {
      throw new Error("You must provide a key");
    }

    switch (this._key) {
      case "NO-CACHE":
        return {}; // this.getCacheNoCache(key); TODO:: add it later
      case "PER-SESSION":
        return this.getCachePerSession(key);
      case "RELOAD":
        return this.getCacheReload(key);

      default:
        break;
    }
  }
}
