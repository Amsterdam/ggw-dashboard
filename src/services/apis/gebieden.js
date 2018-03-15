/**
 * All logic regarding the interface with the Gebieden API
 */

import {readData, readPaginatedData} from '../datareader'
/**
 * The list of gebieden is supplied by OIS. If information about a gebied is available in this list it is used instead of the API data
 */
import gebiedscodes from '../../../static/tmp/gebieden'
import wijkgebied from '../../../static/tmp/wijkgebied'
import { cacheResponse } from '../cache'

/**
 * Transform list of gebiedscodes into object
 */
const localGebiedscodes = {}
gebiedscodes.forEach(g => { localGebiedscodes[g.gebiedcode] = g })

/**
 * Constant to denote the gebied types in the Gebieden API
 * @type {{Stad: string, Stadsdeel: string, Gebied: string, Wijk: string, Buurt: string}}
 */
export const GEBIED_TYPE = {
  Stad: 'Stad',
  Stadsdeel: 'Stadsdeel',
  Gebied: 'Gebied',
  Wijk: 'Wijk',
  Buurt: 'Buurt'
}

/**
 * Returns the complete url for the Gebieden API given an endpoint
 * @param endpoint
 * @returns {string}
 */
function getUrl (endpoint) {
  return `https://api.data.amsterdam.nl/gebieden${endpoint}`
}

/**
 * Gets the enhanced information for a given gebied, wijk or buurt
 * This method is meant to compensate for the fact that within the gebieden API different endpoints use different formats
 * The order of the lines is fairly sensitive
 * @param gwb
 * @returns {*}
 */
export function enhanceGWB (gwb) {
  gwb.vollcode = gwb.vollcode || gwb.volledige_code || gwb._display.match(/\((.*)\)$/)[1] // Gebied and Buurt
  gwb.code = gwb.code || gwb.vollcode
  gwb.volledige_code = gwb.volledige_code || gwb.vollcode
  gwb.gebiedType = getGebiedType(gwb.volledige_code)
  gwb.naam = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiednaam : gwb.naam
  gwb.display = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiedcodenaam : `${gwb.vollcode} ${gwb.naam}`
  return gwb
}

/**
 * Enhances a list of gebied, wijk, buurten
 * @param gwbList
 * @returns {*}
 */
function enhancedGWBList (gwbList) {
  gwbList.forEach(g => enhanceGWB(g))
  gwbList.sort((gwb1, gwb2) => gwb1.vollcode.localeCompare(gwb2.vollcode))
  return gwbList
}

/**
 * Occasionally the key of a gebied, wijk or buurt is required
 * This key is not available as a property but is only to be derived from the detail url
 * @param url
 */
export function getKeyFromUrl (url) {
  return url.match(/\/([^/]*)\/$/)[1]
}

/**
 * Gets all details of a given gebied, wijk, buurt
 * The HAL Json self href is used to get the requested info
 * The returned info contains the geometry for the given entity
 * @param entity
 * @returns {Promise<*>}
 */
export async function getDetail (entity) {
  async function getData () {
    const url = entity._links.self.href
    const data = await readData(url)
    enhanceGWB(data)
    return data
  }
  return cacheResponse(`GWB.detail.${entity.vollcode}`, getData)
}

/**
 * Get all wijken for a given gebied
 * Unfortunately the logic is complex and the result is wrong
 * The gebieden API does not implement the logic to get wijken within a given gebied
 * Instead, the wijken within the stadsdeel of the given gebied are returned
 * @param gebied
 * @returns {Promise<*>}
 */
export async function getWijken (gebied) {
  // Get the wijk codes of all wijken within the gebied
  const wijkgebieden = wijkgebied
    .filter(wg => wg.gebied === gebied.vollcode)

  const gebiedsDetailUrl = gebied._links.self.href
  const gebiedsDetail = await readData(gebiedsDetailUrl)

  const stadsdeel = gebiedsDetail.stadsdeel
  const stadsdeelDetailUrl = stadsdeel._links.self.href
  const stadsdeelKey = getKeyFromUrl(stadsdeelDetailUrl)

  // Get all wijken within the stadsdeel
  const wijkenUrl = getUrl('/wijk/?stadsdeel=' + stadsdeelKey)
  let wijken = await readPaginatedData(wijkenUrl)

  // Filter the wijken for being a wijk within the gebied
  wijken = wijken
    .filter(w => wijkgebieden.find(wg => wg.wijk === w.vollcode))
  return enhancedGWBList(wijken)
}

/**
 * Get the buurten within a given wijk
 * Unfortunately the logic is complex; the access is by deriving a key value out of the self url...
 * @param wijk
 * @returns {Promise<*>}
 */
export async function getBuurten (wijk) {
  const wijkDetailUrl = wijk._links.self.href
  const wijkKey = getKeyFromUrl(wijkDetailUrl)

  const buurtenUrl = getUrl('/buurt/?buurtcombinatie=' + wijkKey)
  const buurten = await readPaginatedData(buurtenUrl)
  return enhancedGWBList(buurten)
}

/**
 * Returns the type of gebied for a given gebied code
 * Note that the logic is quite cumbersome, the type is derived from the format of the gebied code
 * @param gebiedCode
 * @returns {*}
 */
export function getGebiedType (gebiedCode) {
  if (/^[A-Z]$/.test(gebiedCode)) {
    return GEBIED_TYPE.Stadsdeel
  } else if (/^DX\d\d$/.test(gebiedCode)) {
    return GEBIED_TYPE.Gebied
  } else if (/^[A-Z]\d\d$/.test(gebiedCode)) {
    return GEBIED_TYPE.Wijk
  } else if (/^[A-Z]\d\d[a-z]$/.test(gebiedCode)) {
    return GEBIED_TYPE.Buurt
  } else if (/^STAD$/.test(gebiedCode)) {
    return GEBIED_TYPE.Stad
  } else {
    return '?' + gebiedCode
  }
}

/**
 * Local object to cache the getGWBSummary responses
 * @type {{}}
 */
const GWB = {}

/**
 * Gets the gebied, wijk, buurt info for a given gebiedCode
 * @param code
 * @returns {Promise<*>}
 */
export async function getGwbSummary (code) {
  if (GWB[code]) {
    return GWB[code]
  }

  const gebiedType = getGebiedType(code)
  let gwbCollection = []

  if (gebiedType === GEBIED_TYPE.Stad) {
    return getCity()
  } else if (gebiedType === GEBIED_TYPE.Stadsdeel) {
    gwbCollection = await getAllStadsdelen()
  } else if (gebiedType === GEBIED_TYPE.Gebied) {
    gwbCollection = await getAllGebieden()
  } else if (gebiedType === GEBIED_TYPE.Wijk) {
    gwbCollection = await getAllWijken()
  } else if (gebiedType === GEBIED_TYPE.Buurt) {
    gwbCollection = await getAllBuurten()
  } else {
    console.error('Unknown gebied type', gebiedType, code)
    return null
  }

  GWB[code] = gwbCollection.find(item => item.vollcode === code)
  return GWB[code]
}

/**
 * Gets the full info, including geometry, for a given gebiedCode
 * @param code
 * @returns {Promise<*>}
 */
export async function getGwb (code) {
  const gwb = await getGwbSummary(code)
  if (gwb) {
    return getDetail(gwb)
  }
}

/**
 * The city as such is not exposed by the gebieden API
 * The method compensates for the ommission by providing a faked Amsterdam stad object
 * Note that any call to getDetail, summary or whatever will fail because it does only exist internally
 * @returns {Promise<*>}
 */
export async function getCity () {
  return enhanceGWB({
    vollcode: 'STAD'
  })
}

/**
 * Gets all the stadsdelen
 * The result is cached
 * @returns {Promise<*>}
 */
export async function getAllStadsdelen () {
  const url = getUrl('/stadsdeel/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allStadsdelen', getData)
}

/**
 * Gets all the gebieden
 * The result is cached
 * @returns {Promise<*>}
 */
export async function getAllGebieden () {
  const url = getUrl('/gebiedsgerichtwerken/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allGebieden', getData)
}

/**
 * Gets all the wijken
 * The result is cached
 * @returns {Promise<*>}
 */
export async function getAllWijken () {
  const url = getUrl('/wijk/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allWijken', getData)
}

/**
 * Gets all the buurten
 * The result is cached
 * @returns {Promise<*>}
 */
export async function getAllBuurten () {
  const url = getUrl('/buurt/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allBuurten', getData)
}
