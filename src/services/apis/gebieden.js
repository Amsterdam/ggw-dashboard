import {readData, readPaginatedData} from '../datareader'
import gebiedscodes from '../../../static/tmp/gebieden'

// Transform list of gebiedscodes into object
const localGebiedscodes = {}
gebiedscodes.forEach(g => { localGebiedscodes[g.gebiedcode] = g })

let allGebieden = null
let allWijken = null
let allBuurten = null

let allGwb = {}

// export const GEBIED_TYPE = {
//   Stad: 'Stad',
//   Stadsdeel: 'Stadsdeel',
//   Gebied: 'Gebied',
//   Wijk: 'Wijk',
//   Buurt: 'Buurt'
// }

function getUrl (endpoint) {
  return `https://acc.api.data.amsterdam.nl/gebieden${endpoint}`
}

function enhanceGWB (gwb) {
  gwb.gebiedType = getGebiedType(gwb.volledige_code)
  gwb.vollcode = gwb.vollcode || gwb.code || gwb._display.match(/\((.*)\)/)[1]
  gwb.volledige_code = gwb.volledige_code || gwb.vollcode
  gwb.code = gwb.code || gwb.vollcode
  gwb.naam = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiednaam : gwb.naam
  gwb.display = localGebiedscodes[gwb.vollcode] ? localGebiedscodes[gwb.vollcode].gebiedcodenaam : `${gwb.vollcode} ${gwb.naam}`
}

function enhancedGWBList (gwbList) {
  gwbList.forEach(g => enhanceGWB(g))
  gwbList.sort((gwb1, gwb2) => gwb1.vollcode.localeCompare(gwb2.vollcode))
  return gwbList
}

async function _getAllGebieden () {
  const url = getUrl('/gebiedsgerichtwerken/')
  const gebieden = await readPaginatedData(url)
  return enhancedGWBList(gebieden)
}

async function _getAllWijken () {
  const url = getUrl('/wijk/')
  const wijken = await readPaginatedData(url)
  return enhancedGWBList(wijken)
}

async function _getAllBuurten () {
  const url = getUrl('/buurt/')
  const buurten = await readPaginatedData(url)
  return enhancedGWBList(buurten)
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
  if (allGwb[code]) {
    return allGwb[code]
  }

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
  }

  if (!gwb) {
    console.error('GWB not found', gebiedType, code)
  }

  allGwb[code] = readData(gwb._links.self.href)
  return allGwb[code]
}

export async function getAllGebieden () {
  if (!allGebieden) {
    allGebieden = _getAllGebieden()
  }
  return allGebieden
}

export async function getAllWijken () {
  if (!allWijken) {
    allWijken = _getAllWijken()
  }
  return allWijken
}

export async function getAllBuurten () {
  if (!allBuurten) {
    allBuurten = _getAllBuurten()
  }
  return allBuurten
}
