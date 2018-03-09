import axios from 'axios'

/**
 * Register HTTP status
 * @type {{pending: number, success: number, error: number}}
 */
export const HTTPStatus = {
  pending: 0, // The number of pending HTTP requests
  success: 0, // The number of successfully received responses
  error: 0 // The number of error responses
}

/**
 * Simple HTTP GET method for a given url
 * @param url
 * @returns {Promise<AxiosPromise<any>>}
 */
async function get (url) {
  HTTPStatus.pending++
  const result = axios.get(url)
  result.then(() => {
    HTTPStatus.pending--
    HTTPStatus.success++
  }, () => {
    HTTPStatus.pending--
    HTTPStatus.error++
  })
  return result
}

/**
 * Reads a sequence of responses from a HAL-Json endpoint
 * The endpoint is asked for data until there is no more data available (next = null)
 * A pagesize of 1000 is used to limit the number of successive requests
 * @param url
 * @returns {Promise<Array>}
 */
export async function readPaginatedData (url) {
  let next = url
  let results = []
  let page = 1
  let pageSize = 1000
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

/**
 * Requests data from a given url, resolving to response.data (default) or any other optionally specified value
 * @param url
 * @param resolve
 * @returns {Promise<*>}
 */
export async function readData (url, resolve = d => d.data) {
  let response = await get(url)
  return resolve(response)
}
