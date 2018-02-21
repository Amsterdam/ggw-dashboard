import { readPaginatedData } from './datareader'

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

// function getGebiedType (gebiedCode) {
//   if (/^[A-Z]$/.test(gebiedCode)) {
//     return 'Stadsdeel'
//   } else if (/^DX\d\d$/.test(gebiedCode)) {
//     return 'Gebied'
//   } else if (/^[A-Z]\d\d$/.test(gebiedCode)) {
//     return 'Wijk'
//   } else if (/^[A-Z]\d\d[a-z]$/.test(gebiedCode)) {
//     return 'Buurt'
//   } else if (/STAD/.test(gebiedCode)) {
//     return 'Stad'
//   } else {
//     return '?' + gebiedCode
//   }
// }

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
