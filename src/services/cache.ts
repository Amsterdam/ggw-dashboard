const cache = {};

/**
 * Checks if any cached value is stored for the given key
 * If so, returns the cached value
 * If not, calss getData(), stores the result and returns the promise
 * @param key
 * @param getData
 * @returns {Promise<*>}
 */
export async function cacheResponse(key: string, getData: () => any) {
  if (!cache[key]) {
    cache[key] = getData();
  }
  return cache[key];
}
