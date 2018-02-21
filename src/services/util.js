import { readPaginatedData, readData } from './datareader'
import { getAllGebieden, getGebiedType, getGwb } from './gebieden'
import { getAllThemas, getAllMeta, getAllVariables, getAllCijfers, getGebiedCijfers } from './bbga'

function getUrl (endpoint) {
  return 'https://acc.api.data.amsterdam.nl' + endpoint
}

function getKeyFromUrl (url) {
  const key = url.match(/\/([^/]*)\/$/)[1]
  return key
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
  return getGebiedCijfers(meta.variabele, gebied)
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
  getGebiedCijfers,
  getGebiedType,
  getGwb
}
