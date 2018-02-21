import Vue from 'vue'

export async function readPaginatedData (url) {
  let next = url
  let results = []
  while (next) {
    try {
      let response = await Vue.axios.get(next)
      next = response.data._links.next.href
      results = results.concat(response.data.results)
    } catch (e) {
      next = null
    }
  }
  return results
}

export async function readData (url, resolve = d => d.data) {
  let response = await Vue.axios.get(url)
  return resolve(response)
}
