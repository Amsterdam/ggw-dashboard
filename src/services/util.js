import { readPaginatedData, readData } from './datareader'
import { getAllGebieden, getAllWijken, getAllBuurten } from './gebieden'
import { getAllThemas, getAllMeta, getAllVariables, getAllCijfers } from './bbga'

let gebieden = null
// let cijfers = {}

function getUrl (endpoint) {
  return 'https://acc.api.data.amsterdam.nl' + endpoint
}

function getKeyFromUrl (url) {
  const key = url.match(/\/([^/]*)\/$/)[1]
  return key
}

function getGebiedType (gebiedCode) {
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

// async function getAllCijfers (variable, year) {
//   if (!cijfers[variable]) {
//     cijfers[variable] = {}
//   }
//   if (!cijfers[variable][year]) {
//     cijfers[variable][year] = getConfigCijfers(null, [variable], year)
//   }
//   return cijfers[variable][year]
// }

async function getGwb (code) {
  const gebiedType = getGebiedType(code)
  let gwb = null

  if (gebiedType === 'Gebied') {
    await getGebieden()
    gwb = gebieden.find(g => g.code === code)
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

async function getDetail (entity) {
  const url = entity._links.self.href
  const data = await readData(url)
  data.volledige_code = data.volledige_code || data.code
  return data
}

async function getWijken (gebied) {
  const gebiedsDetailUrl = gebied._links.self.href
  const gebiedsDetail = await readData(gebiedsDetailUrl)

  const stadsdeel = gebiedsDetail.stadsdeel
  const stadsdeelDetailUrl = stadsdeel._links.self.href
  const stadsdeelKey = getKeyFromUrl(stadsdeelDetailUrl)

  const wijkenUrl = getUrl('/gebieden/buurtcombinatie/?stadsdeel=' + stadsdeelKey)
  const wijken = readPaginatedData(wijkenUrl)
  return wijken
}

async function getBuurten (wijk) {
  const wijkDetailUrl = wijk._links.self.href
  const wijkKey = getKeyFromUrl(wijkDetailUrl)

  const buurtenUrl = getUrl('/gebieden/buurt/?buurtcombinatie=' + wijkKey)
  const buurten = readPaginatedData(buurtenUrl)
  return buurten
}

async function getGebieden () {
  return getAllGebieden()
}

async function getThemas () {
  return getAllThemas()
}

async function getMeta () {
  return getAllMeta()
}

async function getVariables () {
  return getAllVariables()
}

async function getConfigCijfers (gwb, config, year = null) {
  const isPercentage = /_P$/i // Add auto-post for percentages
  const meta = await getMeta()
  let data = config.map(async c => {
    const cMeta = meta.find(m => m.variabele === c.variabele.toUpperCase())
    if (cMeta) {
      const cijfers = await getCijfers(gwb, cMeta, year)
      return {
        label: c.label || cMeta.label,
        post: c.post || (isPercentage.test(cMeta.variabele) ? '%' : null),
        ...cijfers
      }
    } else {
      console.error('Error for variable', c.variabele)
      return {
        label: c.label || c.variabele
      }
    }
  })

  return Promise.all(data)
}

async function getCijfers (gebied, meta, year = null) {
  const code = gebied && gebied.volledige_code

  const selectVariable = meta.variabele ? 'variabele=' + meta.variabele : ''
  const selectCode = code ? '&gebiedcode15=' + code : ''
  const selectYear = year ? '&jaar=' + year : ''

  const cijfersUrl = getUrl(`/bbga/cijfers/?${selectVariable}${selectCode}${selectYear}`)
  let cijfers = await readPaginatedData(cijfersUrl)
  cijfers.sort((a, b) => a.jaar - b.jaar) // oldest first
  cijfers = cijfers.map(c => ({
    jaar: c.jaar,
    waarde: c.waarde === null ? '' : c.waarde,
    gebiedcode15: c.gebiedcode15
  }))
  return {
    gebied,
    meta,
    cijfers: cijfers,
    recent: cijfers[cijfers.length - 1]
  }
}

export default {
  readPaginatedData,
  readData,
  getGebieden,
  getWijken,
  getBuurten,
  getThemas,
  getDetail,
  getMeta,
  getVariables,
  getCijfers,
  getConfigCijfers,
  getAllCijfers,
  getGebiedType,
  getGwb
}
