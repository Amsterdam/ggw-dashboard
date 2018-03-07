import {readData, readPaginatedData} from '../datareader'
import gebiedscodes from '../../../static/tmp/gebieden'
import { cacheResponse } from '../cache'

// Transform list of gebiedscodes into object
const localGebiedscodes = {}
gebiedscodes.forEach(g => { localGebiedscodes[g.gebiedcode] = g })

export const GEBIED_TYPE = {
  Stad: 'Stad',
  Stadsdeel: 'Stadsdeel',
  Gebied: 'Gebied',
  Wijk: 'Wijk',
  Buurt: 'Buurt'
}

function getUrl (endpoint) {
  return `https://api.data.amsterdam.nl/gebieden${endpoint}`
}

function enhanceGWB (gwb) {
  gwb.vollcode = gwb.vollcode || gwb.volledige_code || gwb._display.match(/\((.*)\)$/)[1] // Gebied and Buurt
  gwb.code = gwb.code || gwb.vollcode
  gwb.volledige_code = gwb.volledige_code || gwb.vollcode
  gwb.gebiedType = getGebiedType(gwb.volledige_code)
  gwb.naam = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiednaam : gwb.naam
  gwb.display = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiedcodenaam : `${gwb.vollcode} ${gwb.naam}`
  return gwb
}

function enhancedGWBList (gwbList) {
  gwbList.forEach(g => enhanceGWB(g))
  gwbList.sort((gwb1, gwb2) => gwb1.vollcode.localeCompare(gwb2.vollcode))
  return gwbList
}

function getKeyFromUrl (url) {
  return url.match(/\/([^/]*)\/$/)[1]
}

export async function getDetail (entity) {
  async function getData () {
    const url = entity._links.self.href
    const data = await readData(url)
    enhanceGWB(data)
    return data
  }
  return cacheResponse(`GWB.detail.${entity.vollcode}`, getData)
}

export async function getWijken (gebied) {
  const gebiedsDetailUrl = gebied._links.self.href
  const gebiedsDetail = await readData(gebiedsDetailUrl)

  const stadsdeel = gebiedsDetail.stadsdeel
  const stadsdeelDetailUrl = stadsdeel._links.self.href
  const stadsdeelKey = getKeyFromUrl(stadsdeelDetailUrl)

  const wijkenUrl = getUrl('/wijk/?stadsdeel=' + stadsdeelKey)
  const wijken = await readPaginatedData(wijkenUrl)
  return enhancedGWBList(wijken)
}

export async function getBuurten (wijk) {
  const wijkDetailUrl = wijk._links.self.href
  const wijkKey = getKeyFromUrl(wijkDetailUrl)

  const buurtenUrl = getUrl('/buurt/?buurtcombinatie=' + wijkKey)
  const buurten = await readPaginatedData(buurtenUrl)
  return enhancedGWBList(buurten)
}

export function getGebiedType (gebiedCode) {
  if (/^[A-Z]$/.test(gebiedCode)) {
    return GEBIED_TYPE.Stadsdeel
  } else if (/^DX\d\d$/.test(gebiedCode)) {
    return GEBIED_TYPE.Gebied
  } else if (/^[A-Z]\d\d$/.test(gebiedCode)) {
    return GEBIED_TYPE.Wijk
  } else if (/^[A-Z]\d\d[a-z]$/.test(gebiedCode)) {
    return GEBIED_TYPE.Buurt
  } else if (/STAD/.test(gebiedCode)) {
    return GEBIED_TYPE.Stad
  } else {
    return '?' + gebiedCode
  }
}

const GWB = {} // local dict to get GWB for a given code

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

export async function getGwb (code) {
  const gwb = await getGwbSummary(code)
  if (gwb) {
    return getDetail(gwb)
  }
}

export async function getCity () {
  return enhanceGWB({
    vollcode: 'STAD'
  })
}

export async function getAllStadsdelen () {
  const url = getUrl('/stadsdeel/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allStadsdelen', getData)
}

export async function getAllGebieden () {
  const url = getUrl('/gebiedsgerichtwerken/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allGebieden', getData)
}

export async function getAllWijken () {
  const url = getUrl('/wijk/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allWijken', getData)
}

export async function getAllBuurten () {
  const url = getUrl('/buurt/')
  const getData = async () => enhancedGWBList(await readPaginatedData(url))
  return cacheResponse('allBuurten', getData)
}
