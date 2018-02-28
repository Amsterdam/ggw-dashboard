import Vue from 'vue'

export async function readPaginatedData (url) {
  let next = url
  let results = []
  let page = 1
  let pageSize = 100
  const concatParam = url.includes('?') ? '&' : '?'
  while (next) {
    try {
      const requestUrl = `${url}${concatParam}page=${page}&page_size=${pageSize}`
      let response = await Vue.axios.get(requestUrl)
      next = response.data._links.next.href
      results = results.concat(response.data.results)
      page += 1
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
