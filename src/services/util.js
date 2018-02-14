import Vue from 'vue'

async function readPaginatedData (url) {
  let next = url
  let results = []
  while (next) {
    try {
      let response = await Vue.axios.get(next)
      console.log('Plain response', response)
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
  return readData(url)
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
  const themasUrl = 'https://acc.api.data.amsterdam.nl/bbga/themas/'
  const themas = await readData(themasUrl)
  return themas.themas
}

async function getMeta () {
  const metaUrl = getUrl('/bbga/meta')
  const meta = readPaginatedData(metaUrl)
  return meta
}

async function getVariables () {
  const variablesUrl = getUrl('/bbga/variabelen/')
  const variables = await readData(variablesUrl)
  return variables.variabelen
}

async function getCijfers (gebied, meta) {
  const code = gebied.volledige_code || gebied.code

  const cijfersUrl = getUrl(`/bbga/cijfers/?gebiedcode15=${code}&variabele=${meta.variabele}`)
  const cijfers = await readPaginatedData(cijfersUrl)
  return cijfers.map(c => ({jaar: c.jaar, waarde: c.waarde}))
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
