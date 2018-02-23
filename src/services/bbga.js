import {readData, readPaginatedData} from './datareader'
import { getColor } from './colorcoding'

let allMeta = null
let allVariables = null
let allThemas = null
let allCijfers = {}
let allGebiedCijfers = {}

function getUrl (endpoint) {
  return `https://acc.api.data.amsterdam.nl/bbga${endpoint}`
}

export async function getAllThemas () {
  if (!allThemas) {
    const url = getUrl('/themas/')
    allThemas = readData(url, d => d.data.themas)
  }
  return allThemas
}

export async function getAllMeta () {
  if (!allMeta) {
    const url = getUrl('/meta/')
    allMeta = readPaginatedData(url)
  }
  return allMeta
}

export async function getAllVariables () {
  if (!allVariables) {
    const url = getUrl('/variabelen/')
    allVariables = readData(url, d => d.data.variabelen)
  }
  return allVariables
}

export async function getMeta (variableName) {
  const search = variableName.toUpperCase()
  const all = await getAllMeta()
  return all.find(m => m.variabele === search)
}

async function getCijfers (meta, year = null, gebiedCode = null) {
  const selectVariable = `variabele=${meta.variabele}`
  const selectYear = year ? `&jaar=${year}` : ''
  const selectGebiedCode = gebiedCode ? `&gebiedcode15=${gebiedCode}` : ''

  const url = getUrl(`/cijfers/?${selectVariable}${selectYear}${selectGebiedCode}`)
  let cijfers = await readPaginatedData(url)

  cijfers.sort((a, b) => a.jaar - b.jaar) // oldest first
  cijfers = cijfers.map(c => ({
    jaar: c.jaar,
    waarde: c.waarde === null ? '' : c.waarde,
    gebiedcode15: c.gebiedcode15,
    color: getColor(meta.variabele, c.waarde, c.jaar)
  }))

  return cijfers
}

export async function getAllCijfers (variableName, year) {
  variableName = variableName.toUpperCase()
  if (!allCijfers[variableName]) {
    const meta = await getMeta(variableName)
    allCijfers[variableName] = {
      meta,
      year: {}
    }
  }

  if (!allCijfers[variableName].year[year]) {
    allCijfers[variableName].year[year] = await getCijfers(
      allCijfers[variableName].meta,
      year
    )
  }

  return allCijfers[variableName].year[year]
}

export const CIJFERS = {
  ALL: 'all',
  LATEST: 'latest'
}

export async function getGebiedCijfers (variableName, gebied, recentOrAll = CIJFERS.ALL) {
  const isPercentage = /_P$/i // Add auto-post for percentages

  async function _getGebiedCijfers (meta, gebied, jaar) {
    const cijfers = await getCijfers(
      meta,
      jaar,
      gebied.volledige_code
    )
    return {
      gebied,
      meta,
      cijfers: cijfers,
      post: isPercentage.test(meta.variabele) ? '%' : null,
      recent: cijfers.length ? cijfers[cijfers.length - 1] : {}
    }
  }

  const jaarKey = recentOrAll
  variableName = variableName.toUpperCase()

  if (!allGebiedCijfers[variableName]) {
    const meta = await getMeta(variableName)
    allGebiedCijfers[variableName] = {
      meta,
      gebied: {}
    }
  }

  if (!allGebiedCijfers[variableName].gebied[gebied.volledige_code]) {
    allGebiedCijfers[variableName].gebied[gebied.volledige_code] = {}
  }

  if (!allGebiedCijfers[variableName].gebied[gebied.volledige_code][jaarKey]) {
    allGebiedCijfers[variableName].gebied[gebied.volledige_code][jaarKey] = await _getGebiedCijfers(
      allGebiedCijfers[variableName].meta,
      gebied,
      recentOrAll === CIJFERS.ALL ? null : recentOrAll
    )
  }

  return allGebiedCijfers[variableName].gebied[gebied.volledige_code][jaarKey]
}
