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

async function readData (url, resolve = d => d.data) {
  let response = await Vue.axios.get(url)
  return resolve(response)
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
    console.log('get Themas')
    const themasUrl = 'https://acc.api.data.amsterdam.nl/bbga/themas/'
    themas = readData(themasUrl, d => d.data.themas)
  }
  return themas
}

async function getMeta () {
  if (!meta) {
    console.log('get Meta')
    const metaUrl = getUrl('/bbga/meta')
    meta = readPaginatedData(metaUrl)
  }
  return meta
}

async function getVariables () {
  if (!variables) {
    console.log('get Variables')
    const variablesUrl = getUrl('/bbga/variabelen/')
    variables = readData(variablesUrl, d => d.data.variabelen)
  }
  return variables
}

async function getConfigCijfers (gwb, config) {
  const isPercentage = /_P$/i // Add auto-post for percentages
  const meta = await getMeta()
  let data = config.map(async c => {
    const cMeta = meta.find(m => m.variabele === c.variabele.toUpperCase())
    console.log(c.variabele, c.post)
    if (cMeta) {
      const cijfers = await getCijfers(gwb, cMeta)
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
  getCijfers,
  getConfigCijfers
}
