import Vue from 'vue'

export const HTTPStatus = {
  pending: 0,
  success: 0,
  error: 0
}

async function get (url) {
  HTTPStatus.pending++
  const result = Vue.axios.get(url)
  result.then(() => {
    HTTPStatus.pending--
    HTTPStatus.success++
  }, () => {
    HTTPStatus.pending--
    HTTPStatus.error++
  })
  return result
}

export async function readPaginatedData (url) {
  let next = url
  let results = []
  let page = 1
  let pageSize = 100
  const concatParam = url.includes('?') ? '&' : '?'
  while (next) {
    try {
      const requestUrl = `${url}${concatParam}page=${page}&page_size=${pageSize}`
      let response = await get(requestUrl)
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
  let response = await get(url)
  return resolve(response)
}
