import { readPaginatedData } from '../datareader'
import { getColor } from '../colorcoding'
import { cacheResponse } from '../cache'

function getUrl (endpoint) {
  return `https://api.data.amsterdam.nl/bbga${endpoint}`
}

export async function getAllMeta () {
  async function getData () {
    const url = getUrl('/meta/')
    const data = await readPaginatedData(url)
    const dataObject = {}
    data.forEach(item => { dataObject[item.variabele] = item })
    return dataObject
  }

  return cacheResponse(
    'allMeta',
    getData
  )
}

export async function getMeta (variableName) {
  const meta = await getAllMeta()
  return meta[variableName.toUpperCase()]
}

async function getCijfers (meta, year = null, gebiedCode = null) {
  const isPercentage = /_P$/i // Add auto-post for percentages
  const post = isPercentage.test(meta.variabele) ? '%' : ''

  const selectVariable = `variabele=${meta.variabele}`
  const selectYear = year ? `&jaar=${year}` : ''
  const selectGebiedCode = gebiedCode ? `&gebiedcode15=${gebiedCode}` : ''

  const url = getUrl(`/cijfers/?${selectVariable}${selectYear}${selectGebiedCode}`)
  let cijfers = await readPaginatedData(url)

  cijfers.sort((a, b) => a.jaar - b.jaar) // oldest first
  return cijfers.map(c => ({
    jaar: c.jaar,
    waarde: c.waarde === '' || c.waarde === undefined ? null : c.waarde, // Sometimes the API returns '' for null value
    post,
    gebiedcode15: c.gebiedcode15,
    color: getColor(meta, c.waarde, c.jaar)
  }))
}

export async function getAllCijfers (variableName, year) {
  variableName = variableName.toUpperCase()
  const meta = await getMeta(variableName)
  const getData = async () => getCijfers(meta, year)

  return cacheResponse(
    `allCijfers.${variableName}.${year}`,
    getData
  )
}

export const CIJFERS = {
  ALL: 'all',
  LATEST: 'latest'
}

export async function getGebiedCijfers (variableName, gebied, recentOrAll = CIJFERS.ALL) {
  variableName = variableName.toUpperCase()
  const meta = await getMeta(variableName)
  const jaar = recentOrAll === CIJFERS.ALL ? null : recentOrAll

  async function getData () {
    const cijfers = await getCijfers(
      meta,
      jaar,
      gebied.volledige_code
    )
    return {
      gebied,
      meta,
      cijfers: cijfers,
      recent: cijfers.length ? cijfers[cijfers.length - 1] : undefined
    }
  }

  return cacheResponse(
    `gebiedCijfers.${variableName}.${gebied.volledige_code}.${recentOrAll}`,
    getData
  )
}
