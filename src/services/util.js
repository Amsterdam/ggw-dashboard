/**
 * The util module combines the logic of the API's that are used in his application
 * It also provides for a series of helper methods that are shared between components
 *
 * A lot of the logic is based upon configurations.
 * Configurations contain the data for charts, tables and overviews.
 * The configurations are kept in seperate static folder of the application so that it can maintained
 * by OIS without needing to update the application code
 * Configurations provide for a data-driven user interface
 */

import { getAllStadsdelen, getAllGebieden, getAllWijken, getAllBuurten, getCity, getWijken, getBuurten, getGebiedType, getGwb, getGwbSummary, getDetail, GEBIED_TYPE } from './apis/gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers, CIJFERS } from './apis/bbga'
import { getGeometries as getGeoGeometries, GEBIED_TYPE as GEO_GEBIED_TYPE } from './apis/map'

/**
 * Gets the most recent cijfers for a given configuration
 * @param gwb
 * @param config
 * @returns {Promise<*>}
 */
async function getLatestConfigCijfers (gwb, config) {
  const latestCijfers = await getConfigCijfers(gwb, config, CIJFERS.LATEST)
  if (latestCijfers.recent && latestCijfers.recent.waarde !== null) {
    return latestCijfers
  }
  return getConfigCijfers(gwb, config, CIJFERS.ALL)
}

/**
 * Gets the tooltip (which is actually a modal dialog) for the given cijfers
 * A cijfer contains a reference to it's meta data that allows for a verbose description of the meaning and source for the given cijfer.
 * @param cijfers
 * @returns {function(*): string}
 */
function getTooltip (cijfers) {
  return withYear => `
    <h3 class="condensed">Definitie</h3>
    <div>${cijfers.meta.definitie}</div>
    <h3 class="condensed">Bron</h3>
    <div>${cijfers.meta.bron}</div>
    <h3 class="condensed">Peildatum</h3>
    <div>${cijfers.meta.peildatum} ${withYear ? cijfers.recent.jaar : ''}</div>
    `
}

/**
 * Get the cijfers for a gebied, wijk or buurt given a configuration
 * Optionally one can specify to receive only the most recent cijfers
 * Default the cijfers for all years are returned
 * @param gwb gebied, wijk, buurt
 * @param config
 * @param recentOrAll Only the most recent year or all years (default)
 * @returns {Promise<any[]>}
 */
async function getConfigCijfers (gwb, config, recentOrAll = CIJFERS.ALL) {
  let data = config.map(async (c, index) => {
    try {
      const cijfers = await getGebiedCijfers(c.variabele, gwb, recentOrAll)
      if (c.post) {
        cijfers.cijfers.forEach(cijfer => { cijfer.post = c.post })
      }
      return {
        ...cijfers,
        label: c.label || cijfers.meta.label,
        tooltip: getTooltip(cijfers),
        index
      }
    } catch (e) {
      console.error('Variable not found', c.variabele)
      return {
        label: c.label || c.variabele
      }
    }
  })

  return Promise.all(data)
}

/**
 * Utility method for charts
 * Based upon a data set (retrieved from getConfigCijfers) it returns a chart data set with x, y, color and variable values
 * Optionally one can specify to retrieve only the last n years
 * @param data
 * @param last Optional parameter to retrieve only the last n cijfers
 * @returns {*}
 */
function getYearCijfers (data, last = null) {
  data = data.filter(item => item.cijfers)

  /**
   * Compute year totals to supress the display of insignificant values
   */
  const totalWaarde = data.reduce((total, item) => {
    item.cijfers.forEach(cijfer => {
      total[cijfer.jaar] = total[cijfer.jaar] || 0
      total[cijfer.jaar] += cijfer.waarde
    })
    return total
  }, {})

  let cijfers = flatten(
    data.map(item =>
      item.cijfers.map(cijfer => ({
        x: cijfer.jaar,
        y: cijfer.waarde,
        variable: item.label,
        index: item.index,
        color: cijfer.color,
        display: (cijfer.waarde / totalWaarde[cijfer.jaar]) > 0.075 ? displayWaarde(cijfer) : '',
        cijfer
      }))))

  if (last) {
    const maxYear = getMaxYear(cijfers)
    cijfers = cijfers.filter(cijfer => cijfer.x > maxYear - last)
  }

  return cijfers
}

/**
 * Small utility method for charts to get the max value for a set of data retrieved from getYearCijfers
 * @param cijfers
 */
function getMaxYear (cijfers) {
  return cijfers.reduce((max, cijfer) => cijfer.x > max ? cijfer.x : max, -1)
}

/**
 * Returns the geometries (set of leaflet Polygons) for a given gebied type
 * @param gebiedType
 * @returns {Promise<*>}
 */
async function getGeometries (gebiedType) {
  const geoGebiedType = {
    [GEBIED_TYPE.Stadsdeel]: GEO_GEBIED_TYPE.Stadsdeel,
    [GEBIED_TYPE.Gebied]: GEO_GEBIED_TYPE.Gebied,
    [GEBIED_TYPE.Wijk]: GEO_GEBIED_TYPE.Wijk,
    [GEBIED_TYPE.Buurt]: GEO_GEBIED_TYPE.Buurt
  }[gebiedType]

  return getGeoGeometries(geoGebiedType)
}

/**
 * Returns the set of gebied, wijk or buurten for a given gebied type
 * @param gebiedType
 * @returns {Promise<*>}
 */
async function getGwbs (gebiedType) {
  const getAll = {
    [GEBIED_TYPE.Stadsdeel]: getAllStadsdelen,
    [GEBIED_TYPE.Gebied]: getAllGebieden,
    [GEBIED_TYPE.Wijk]: getAllWijken,
    [GEBIED_TYPE.Buurt]: getAllBuurten
  }
  if (getAll[gebiedType]) {
    return getAll[gebiedType]()
  } else {
    return []
  }
}

/**
 * Flattens an array
 * @param list
 */
const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

/**
 * Provides for a display value for a cijfer, using the NL locale for numbers
 * @param cijfer
 * @returns {string}
 */
const displayWaarde = cijfer => {
  if (cijfer && cijfer.waarde !== null) {
    return `${cijfer.waarde.toLocaleString('NL')}${cijfer.post || ''}`
  }
}

/*
 * Code copied from Atlas to decode base62 encoded headings in pano urls
 */
const CHARSET = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')

function decodeString (s, len = s.length) {
  if (len > 1) {
    const quotient = s.substr(0, len - 1)
    const remainder = s.charAt(len - 1)
    return 62 *
      decodeString(quotient, len - 1) +
      decodeString(remainder, 1)
  } else {
    return CHARSET.indexOf(s)
  }
}

function base62DecodeAngle (s, precision) {
  if (s[0] === '-') {
    return 360 - Number(decodeString(s.substring(1))) / Math.pow(10, precision)
  } else {
    return Number(decodeString(s)) / Math.pow(10, precision)
  }
}

/**
 * Util exports het methods in an object. Usage will therefore be like util.getCity instead of import {getCity} from util
 * This has been done for reasons of simplicity only
 */
export default {
  getAllStadsdelen,
  getAllGebieden,
  getAllWijken,
  getAllBuurten,
  getCity,
  getWijken,
  getBuurten,
  getDetail,
  getAllMeta,
  getMeta,
  getConfigCijfers,
  getLatestConfigCijfers,
  getYearCijfers,
  getMaxYear,
  CIJFERS,
  getAllCijfers,
  getGebiedCijfers,
  getGebiedType,
  getGwb,
  getGwbs,
  getGwbSummary,
  GEBIED_TYPE,
  getGeometries,
  flatten,
  displayWaarde,
  decodeString,
  base62DecodeAngle
}
