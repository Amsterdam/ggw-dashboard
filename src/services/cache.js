const cache = {}

export async function cacheResponse (key, getData) {
  if (!cache[key]) {
    cache[key] = getData()
  }
  return cache[key]
}
