import initCatch from "./core/config";
import { TCacheStrategy } from "./types";
import Cache from "./utils/Cache";

/**
 * Custom hook to manage caching based on the provided caching strategy.
 * @param strategy - The caching strategy to use.
 * @param key - The key for the cache.
 * @param value - The value to be cached.
 * @returns An object with cache management functions.
 * @throws {Error} If the caching strategy is not provided.
 */
const useCacheUtil = (strategy: TCacheStrategy) => {
  if (!strategy) {
    throw new Error("Please provide a caching strategy");
  }

  const cache = new Cache(strategy);

  /**
   * Get the cached keys.
   * @returns An array of cached keys.
   */
  const getCachedKeys = () => cache.cachedKeys;

  /**
   * Get the cached value for the specified key.
   * @param key - The cache key.
   * @returns The cached value.
   */
  const get = (key: string) => cache.get(key);

  /**
   * Set the cache value for the specified key.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  const set = (key: string, value: any) => cache.set(key, value);

  /**
   * Clear the cache for the specified key.
   * @param key - The cache key to clear.
   */
  const clearCache = (key: string) => cache.clearCache(key);

  /**
   * Clear all caches based on the caching strategy.
   */
  const clearAllCaches = () => cache.clearAllCaches();

  /**
   * Check if a specific key is cached.
   * @param key - The cache key.
   * @returns True if the key is cached, false otherwise.
   */
  const isCached = (key: string) => cache.isCached(key);

  return {
    getCachedKeys,
    get,
    set,
    clearCache,
    clearAllCaches,
    isCached,
  };
};

/**
 * This is the main entry point of the library, used to configure global settings.
 * @param {IFetchGlobalConfig} req - The global configuration object for the library.
 * @returns {Function} - A function to use the configured settings.
 * @example
 * import { $catch } from "ar-catch";
 *
 * // Configure the library with global settings
 * catch({
 *   // The base URL used for all requests
 *   baseURL: "your.base.url",
 *
 *   // The default alias that you want to use to call the library
 *   alias: "$anything",
 *
 *   // The default options for all requests, similar to the options in the fetch() method
 *   defaultOptions: {
 *     headers: {},
 *     ...etc
 *   },
 *
 *   // This function will be executed before the request is sent
 *   onReq: (req) => {
 *     // Modify the request object or perform actions before sending the request
 *     // e.g., adding custom headers, authentication, etc.
 *   },
 *
 *   // This function will be executed after the request is sent and a response is received
 *   onRes: (res) => {
 *     // Process the response or perform actions after receiving the response
 *     // e.g., handling global error responses, logging, etc.
 *   },
 *
 *   // This function will be executed if there is an error during the request or response handling
 *   onErr: (err) => {
 *     // Handle the error or perform actions when an error occurs
 *     // e.g., handling network errors, displaying error messages, etc.
 *   },
 * });
 *
 * @tip if you found an issue to access the alias globally, you can just use (window.yourAlias)
 */
const $catch = initCatch;

/**
 * a utility function to manage caching based on the provided caching strategy.
 * @namespace useCache
 * @param {TCacheStrategy} strategy - The caching strategy to use.
 * @returns An object with cache management functions.
 * @throws {Error} If the caching strategy is not provided.
 **/
const useCache = useCacheUtil;

export {
  $catch,
  useCache
};
