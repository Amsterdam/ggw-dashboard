import { getAllGebieden, getAllWijken, getAllBuurten, getWijken, getBuurten, getGebiedType, getGwb, getGwbSummary, getDetail, GEBIED_TYPE } from './apis/gebieden'
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
    <h2>Definitie</h2>
    <div>${cijfers.meta.definitie}</div>
    <h2>Bron</h2>
    <div>${cijfers.meta.bron}</div>
    <h2>Peildatum</h2>
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

async function getGeometries (gebiedType) {
  const geoGebiedType = {
    [GEBIED_TYPE.Gebied]: GEO_GEBIED_TYPE.Gebied,
    [GEBIED_TYPE.Wijk]: GEO_GEBIED_TYPE.Wijk,
    [GEBIED_TYPE.Buurt]: GEO_GEBIED_TYPE.Buurt
  }[gebiedType]

  return getGeoGeometries(geoGebiedType)
}

async function getGwbs (gebiedType) {
  const getAll = {
    [GEBIED_TYPE.Gebied]: getAllGebieden,
    [GEBIED_TYPE.Wijk]: getAllWijken,
    [GEBIED_TYPE.Buurt]: getAllBuurten
  }
  return getAll[gebiedType]()
}

export default {
  getAllGebieden,
  getAllWijken,
  getAllBuurten,
  getWijken,
  getBuurten,
  getDetail,
  getAllMeta,
  getMeta,
  getConfigCijfers,
  getLatestConfigCijfers,
  CIJFERS,
  getAllCijfers,
  getGebiedCijfers,
  getGebiedType,
  getGwb,
  getGwbs,
  getGwbSummary,
  GEBIED_TYPE,
  getGeometries
}
