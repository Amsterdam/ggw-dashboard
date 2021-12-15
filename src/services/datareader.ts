import axios from "axios";
import get from "lodash/get";

/**
 * Register HTTP status
 * @type {{pending: number, success: number, error: number}}
 */
export const HTTPStatus = {
  pending: 0, // The number of pending HTTP requests
  success: 0, // The number of successfully received responses
  error: 0, // The number of error responses
};

/**
 * Sleep a number of milliseconds
 * Usage: await sleep(n)
 * @param ms
 * @returns {Promise<any>}
 */
function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

/**
 * Simple HTTP GET method for a given url
 * @param url
 * @param nTries optional parameter specifying the number of retries, default = 5
 * @returns {Promise<*>}
 */
async function fetchData(url: string, options = {}, nTries = 5) {
  let result;
  let nTry = 0;
  do {
    try {
      HTTPStatus.pending++; // Track pending requests
      // eslint-disable-next-line prefer-const
      result = await axios.get(url, options);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Retry...", url);
      nTry++;
      await sleep(nTry * 100); // small sleep before retry request
    } finally {
      HTTPStatus.pending--;
    }
  } while (!result && nTry < nTries);

  if (result) {
    HTTPStatus.success++;
    return result;
  } else {
    // All retries have failed
    // eslint-disable-next-line no-console
    console.error("Request failed", url);
    HTTPStatus.error++;
    throw new Error("Request failed");
  }
}

/**
 * Reads a sequence of responses from a HAL-Json endpoint
 * The endpoint is asked for data until there is no more data available (next = null)
 * A pagesize of 1000 is used to limit the number of successive requests
 * @param url
 * @returns {Promise<Array>}
 */
export async function readPaginatedData(
  url: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  options = {},
  dataSelector = "results",
) {
  let next = url;
  let results = [];
  // let page = 1;
  const pageSize = 100000;
  const concatParam = url.includes("?") ? "&" : "?";
  while (next) {
    try {
      const requestUrl = `${url}${concatParam}_pageSize=${pageSize}`; //page=${page}&
      const response = await fetchData(requestUrl);
      next = response.data?.next?.href;
      results = results.concat(get(response.data, dataSelector));
      // page += 1;
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      next = "";
    }
  }

  return results;
}

/**
 * Requests data from a given url, resolving to response.data (default) or any other optionally specified value
 * @param url
 * @param resolve
 * @returns {Promise<*>}
 */
export async function readData(url: string, options = {}, resolve = (d) => d.data) {
  const response = await fetchData(url, options);
  return resolve(response);
}
