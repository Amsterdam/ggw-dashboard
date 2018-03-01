import {readData, readPaginatedData} from '../datareader'
import gebiedscodes from '../../../static/tmp/gebieden'
import { cacheResponse } from '../cache'

// Transform list of gebiedscodes into object
const localGebiedscodes = {}
gebiedscodes.forEach(g => { localGebiedscodes[g.gebiedcode] = g })

// export const GEBIED_TYPE = {
//   Stad: 'Stad',
//   Stadsdeel: 'Stadsdeel',
//   Gebied: 'Gebied',
//   Wijk: 'Wijk',
//   Buurt: 'Buurt'
// }

function getUrl (endpoint) {
  return `https://api.data.amsterdam.nl/gebieden${endpoint}`
}

function enhanceGWB (gwb) {
  gwb.vollcode = gwb.vollcode || gwb._display.match(/\((.*)\)/)[1] // Gebied and Buurt
  gwb.code = gwb.code || gwb.vollcode
  gwb.volledige_code = gwb.volledige_code || gwb.vollcode
  gwb.gebiedType = getGebiedType(gwb.volledige_code)
  gwb.naam = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiednaam : gwb.naam
  gwb.display = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiedcodenaam : `${gwb.vollcode} ${gwb.naam}`
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
  const url = entity._links.self.href
  const data = await readData(url)
  enhanceGWB(data)
  return data
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
    return 'Stadsdeel'
  } else if (/^DX\d\d$/.test(gebiedCode)) {
    return 'Gebied'
  } else if (/^[A-Z]\d\d$/.test(gebiedCode)) {
    return 'Wijk'
  } else if (/^[A-Z]\d\d[a-z]$/.test(gebiedCode)) {
    return 'Buurt'
  } else if (/STAD/.test(gebiedCode)) {
    return 'Stad'
  } else {
    return '?' + gebiedCode
  }
}

export async function getGwb (code) {
  async function getData () {
    const gebiedType = getGebiedType(code)
    let gwb = null

    if (gebiedType === 'Gebied') {
      const allGebieden = await getAllGebieden()
      gwb = allGebieden.find(g => g.code === code)
    } else if (gebiedType === 'Wijk') {
      const allWijken = await getAllWijken()
      gwb = allWijken.find(w => w.vollcode === code)
    } else if (gebiedType === 'Buurt') {
      const allBuurten = await getAllBuurten()
      const searchCode = code.substring(1)
      gwb = allBuurten.find(b => b.code === searchCode && b._display.includes(code))
    } else {
      console.error('Unknown gebied type', gebiedType, code)
      return
    }

    return readData(gwb._links.self.href)
  }

  return cacheResponse(`GWB.${code}`, getData)
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
