import Vue from 'vue'

let meta = null
let variables = null
let themas = null

async function readPaginatedData (url) {
  let next = url
  let results = []
  while (next) {
    try {
      let response = await Vue.axios.get(next)
      next = response.data._links.next.href
      results = results.concat(response.data.results)
    } catch (e) {
      next = null
    }
  }
  return results
}

async function readData (url) {
  let response = await Vue.axios.get(url)
  return response.data
}

function getUrl (endpoint) {
  return 'https://acc.api.data.amsterdam.nl' + endpoint
}

function getKeyFromUrl (url) {
  const key = url.match(/\/([^/]*)\/$/)[1]
  return key
}

async function getGebieden () {
  const gebiedenUrl = getUrl('/gebieden/gebiedsgerichtwerken/')
  const gebieden = await readPaginatedData(gebiedenUrl)
  return gebieden
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

async function getThemas () {
  if (!themas) {
    const themasUrl = 'https://acc.api.data.amsterdam.nl/bbga/themas/'
    themas = await readData(themasUrl)
  }
  return themas.themas
}

async function getMeta () {
  if (!meta) {
    const metaUrl = getUrl('/bbga/meta')
    meta = await readPaginatedData(metaUrl)
  }
  return meta
}

async function getVariables () {
  if (!variables) {
    const variablesUrl = getUrl('/bbga/variabelen/')
    variables = await readData(variablesUrl)
  }
  return variables.variabelen
}

async function getCijfers (gebied, meta) {
  const code = gebied.volledige_code

  const cijfersUrl = getUrl(`/bbga/cijfers/?gebiedcode15=${code}&variabele=${meta.variabele}`)
  let cijfers = await readPaginatedData(cijfersUrl)
  cijfers.sort((a, b) => a.jaar - b.jaar) // oldest first
  cijfers = cijfers.map(c => ({jaar: c.jaar, waarde: c.waarde === null ? '' : c.waarde}))
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
  getCijfers
}
