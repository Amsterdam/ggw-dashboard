import { getAllStadsdelen, getAllGebieden, getAllWijken, getAllBuurten, getCity, getWijken, getBuurten, getGebiedType, getGwb, getGwbSummary, getDetail, GEBIED_TYPE } from './apis/gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers, CIJFERS } from './apis/bbga'
import { getGeometries as getGeoGeometries, GEBIED_TYPE as GEO_GEBIED_TYPE } from './apis/map'

async function getLatestConfigCijfers (gwb, config) {
  const latestCijfers = await getConfigCijfers(gwb, config, CIJFERS.LATEST)
  if (latestCijfers.recent && latestCijfers.recent.waarde !== null) {
    return latestCijfers
  }
  return getConfigCijfers(gwb, config, CIJFERS.ALL)
}

function getTooltip (cijfers) {
  return withYear => `
    <h3 class="condensed">Definitie</h3>
    <div>${cijfers.meta.definitie}</div>
    <h3 class="condensed">Bron</h3>
    <div>${cijfers.meta.bron}</div>
    <h3 class="condensed">Peildatum</h3>
    <div>${cijfers.meta.peildatum} ${withYear ? cijfers.recent.jaar : ''}</div>
    `
}

async function getConfigCijfers (gwb, config, recentOrAll = CIJFERS.ALL) {
  let data = config.map(async c => {
    try {
      const cijfers = await getGebiedCijfers(c.variabele, gwb, recentOrAll)
      if (c.post) {
        cijfers.cijfers.forEach(cijfer => { cijfer.post = c.post })
      }
      return {
        ...cijfers,
        label: c.label || cijfers.meta.label,
        tooltip: getTooltip(cijfers)
      }
    } catch (e) {
      console.error('Variable not found', c.variabele)
      return {
        label: c.label || c.variabele
      }
    }
  })

  return Promise.all(data)
}

function getYearCijfers (data, last = null) {
  data = data.filter(item => item.cijfers)

  let cijfers = flatten(
    data.map(item =>
      item.cijfers.map(cijfer => ({
        x: cijfer.jaar,
        y: cijfer.waarde,
        variable: item.label,
        color: cijfer.color,
        cijfer
      }))))

  if (last) {
    const maxYear = getMaxYear(cijfers)
    cijfers = cijfers.filter(cijfer => cijfer.x > maxYear - last)
  }

  return cijfers
}

function getMaxYear (cijfers) {
  return cijfers.reduce((max, cijfer) => cijfer.x > max ? cijfer.x : max, -1)
}

async function getGeometries (gebiedType) {
  const geoGebiedType = {
    [GEBIED_TYPE.Stadsdeel]: GEO_GEBIED_TYPE.Stadsdeel,
    [GEBIED_TYPE.Gebied]: GEO_GEBIED_TYPE.Gebied,
    [GEBIED_TYPE.Wijk]: GEO_GEBIED_TYPE.Wijk,
    [GEBIED_TYPE.Buurt]: GEO_GEBIED_TYPE.Buurt
  }[gebiedType]

  return getGeoGeometries(geoGebiedType)
}

async function getGwbs (gebiedType) {
  const getAll = {
    [GEBIED_TYPE.Stadsdeel]: getAllStadsdelen,
    [GEBIED_TYPE.Gebied]: getAllGebieden,
    [GEBIED_TYPE.Wijk]: getAllWijken,
    [GEBIED_TYPE.Buurt]: getAllBuurten
  }
  if (getAll[gebiedType]) {
    return getAll[gebiedType]()
  } else {
    return []
  }
}

const flatten = list => list.reduce(
  (a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []
)

export default {
  getAllStadsdelen,
  getAllGebieden,
  getAllWijken,
  getAllBuurten,
  getCity,
  getWijken,
  getBuurten,
  getDetail,
  getAllMeta,
  getMeta,
  getConfigCijfers,
  getLatestConfigCijfers,
  getYearCijfers,
  getMaxYear,
  CIJFERS,
  getAllCijfers,
  getGebiedCijfers,
  getGebiedType,
  getGwb,
  getGwbs,
  getGwbSummary,
  GEBIED_TYPE,
  getGeometries,
  flatten
}
