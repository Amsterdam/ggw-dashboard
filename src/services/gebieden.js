import {readData, readPaginatedData} from './datareader'

let allGebieden = null
let allWijken = null
let allBuurten = null

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

async function _getAllGebieden () {
  const url = getUrl('/gebiedsgerichtwerken/')
  const _gebieden = await readPaginatedData(url)
  _gebieden.forEach(g => {
    g.vollcode = g.vollcode || g.code
  })
  return _gebieden
}

async function _getAllWijken () {
  const url = getUrl('/wijk/')
  const _wijken = await readPaginatedData(url)
  _wijken.forEach(w => {
    w.code = w.code || w.vollcode
  })
  return _wijken
}

async function _getAllBuurten () {
  const url = getUrl('/buurt/')
  const _buurten = await readPaginatedData(url)
  _buurten.forEach(b => {
    b.vollcode = b.vollcode || b._display.match(/\((.*)\)/)[1]
  })
  return _buurten
}

function getKeyFromUrl (url) {
  const key = url.match(/\/([^/]*)\/$/)[1]
  return key
}

export async function getDetail (entity) {
  const url = entity._links.self.href
  const data = await readData(url)
  data.volledige_code = data.volledige_code || data.code
  data.gebiedType = getGebiedType(data.volledige_code)
  return data
}

export async function getWijken (gebied) {
  const gebiedsDetailUrl = gebied._links.self.href
  const gebiedsDetail = await readData(gebiedsDetailUrl)

  const stadsdeel = gebiedsDetail.stadsdeel
  const stadsdeelDetailUrl = stadsdeel._links.self.href
  const stadsdeelKey = getKeyFromUrl(stadsdeelDetailUrl)

  const wijkenUrl = getUrl('/wijk/?stadsdeel=' + stadsdeelKey)
  const wijken = readPaginatedData(wijkenUrl)
  return wijken
}

export async function getBuurten (wijk) {
  const wijkDetailUrl = wijk._links.self.href
  const wijkKey = getKeyFromUrl(wijkDetailUrl)

  const buurtenUrl = getUrl('/buurt/?buurtcombinatie=' + wijkKey)
  const buurten = readPaginatedData(buurtenUrl)
  return buurten
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

  return readData(gwb._links.self.href)
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
