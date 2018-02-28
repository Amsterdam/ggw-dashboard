const cache = {}

export async function cacheResponse (key, getData) {
  if (!cache[key]) {
    cache[key] = await getData()
  }
  return cache[key]
}
