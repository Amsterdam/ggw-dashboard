/**
 * All logic regarding the interface with the BBGA API
 */

import { readPaginatedData, readData } from '../datareader'
import { getColor } from '../colorcoding'
import { cacheResponse } from '../cache'

/**
 * Returns the complete url for the BBGA API given an endpoint
 * @param endpoint
 * @returns {string}
 */
function getUrl(endpoint) {
  return `https://api.data.amsterdam.nl/bbga${endpoint}`
}

/**
 * Get all meta information for the BBGA variables.
 * The data is transformed into an object for faster access
 * The data is cached
 * @returns {Promise<*>}
 */
export async function getAllMeta() {
  async function getData() {
    const url = getUrl('/meta/')
    const data = await readPaginatedData(url)
    const dataObject = {}

    data.forEach(item => {
      dataObject[item.variabele.toUpperCase()] = item
    })

    return dataObject
  }

  return cacheResponse('allMeta', getData)
}

/**
 * Gets the meta information for a given variable name
 * When the variable name ends with the special value [LATEST] the most recent year variable is used
 * If meta contains VAR2018 and VAR2019 and the variable name is VAR[LATEST] then the meta for VAR2019 is returned
 * @param variableName
 * @returns {Promise<*>}
 */
export async function getMeta(variableName) {
  const meta = await getAllMeta()

  // Check for special variables, eg "Bev_prog[LATEST]"
  const isLatest = new RegExp(/\[LATEST\]$/i)
  if (isLatest.test(variableName)) {
    let baseName = variableName.replace(isLatest, '') // Bev_prog
    baseName = new RegExp('^' + baseName, 'i') // /^Bev_prog/i
    const vars = Object.keys(meta)
      .filter(key => baseName.test(key))
      .sort()
      .reverse()
    if (!vars.length) {
      return
    }
    variableName = vars[0]
  }
  return meta[variableName.toUpperCase()]
}

/**
 * This is a fixed static url published in dcatd. The maintainers can publish updates of the data in
 *  https://data.amsterdam.nl/datasets/G5JpqNbhweXZSw/basisbestand-gebieden-amsterdam-bbga/
 *
*/
const STD_DATAL_LOCATION_URL = 'https://api.data.amsterdam.nl/dcatd/datasets/G5JpqNbhweXZSw/purls/3'

/**
 * Import the standard deviations and averages for Amsterdam as provided by OIS
 * This is an fixed url published in dcatd.
 * These values are used to calculate z-scores
 * The z-scores are used to color values so that the color denotes the distance in std's to the average
 * The result is cached
 * @returns {Promise<*>}
 */
export async function getStd() {
  const url = STD_DATAL_LOCATION_URL
  const getData = async () => readData(url)
  return cacheResponse('std', getData)
}

/**
 * Get the values for a given variable identified by its meta
 * An optional year can be specified to get only the values for the specified year. Default is to return all years
 * An optional gebiedCode can be specified to get the values for the given gebied. Default is to return the values for all gebied, wijk, buurten
 * The result is sorted on year (old to new)
 * The fact that null values are sometimes reported as empty strings is solved by setting both to null
 * The values will contain colors that allow for coloring of the cijfers based on the z-score
 * @param meta
 * @param year
 * @param gebiedCode
 * @returns {Promise<{jaar: *|number|string, waarde: null, post: string, gebiedcode15: *|string, color, textColor: *|textColor}[]>}
 */
async function getCijfers(meta, year = null, gebiedCode = null) {
  const post = meta.symbool === '%' ? meta.symbool : '' // only copy % symbol

  const selectVariable = `variabele=${meta.variabele}`
  const selectYear = year ? `&jaar=${year}` : ''
  const selectGebiedCode = gebiedCode ? `&gebiedcode15=${gebiedCode}` : ''

  const url = getUrl(
    `/cijfers/?${selectVariable}${selectYear}${selectGebiedCode}`
  )
  const cijfers = await readPaginatedData(url)
  const std = await getStd()

  cijfers.sort((a, b) => a.jaar - b.jaar) // oldest first
  return cijfers.map(c => ({
    jaar: c.jaar,
    waarde: c.waarde === '' || c.waarde === undefined ? null : c.waarde, // Sometimes the API returns '' for null value
    post,
    gebiedcode15: c.gebiedcode15,
    ...getColor(meta, c.waarde, c.jaar, std)
  }))
}

/**
 * Gets all cijfers for a given variable
 * The values is cached
 * @param variableName
 * @param year optional value to get only the cijfers for a given year
 * @returns {Promise<*>}
 */
export async function getAllCijfers(variableName, year) {
  variableName = variableName.toUpperCase()
  const meta = await getMeta(variableName)
  const getData = async () => getCijfers(meta, year)

  return cacheResponse(`allCijfers.${variableName}.${year}`, getData)
}

/**
 * Constants to denote if all or only the most recent cijfers are requested
 * @type {{ALL: string, LATEST: string}}
 */
export const CIJFERS = {
  ALL: 'all',
  LATEST: 'latest'
}

/**
 * Get the cijfers for a given variable and gebied, wijk or buurt
 * The value is cached
 * @param variableName
 * @param gebied
 * @param recentOrAll
 * @returns {Promise<*>}
 */
export async function getGebiedCijfers(
  variableName,
  gebied,
  recentOrAll = CIJFERS.ALL
) {
  variableName = variableName.toUpperCase()
  const meta = await getMeta(variableName)
  const jaar = recentOrAll === CIJFERS.ALL ? null : recentOrAll

  async function getData() {
    const cijfers = await getCijfers(meta, jaar, gebied.volledige_code)
    return {
      gebied,
      meta,
      cijfers: cijfers,
      recent: cijfers.length ? cijfers[cijfers.length - 1] : undefined
    }
  }

  return cacheResponse(
    `gebiedCijfers.${variableName}.${gebied.volledige_code}.${recentOrAll}`,
    getData
  )
}
