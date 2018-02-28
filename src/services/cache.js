const cache = {}

export async function cacheResponse (key, getData) {
  console.log('cacheResponse', key)
  if (!cache[key]) {
    cache[key] = getData()
  }
  return cache[key]
}
