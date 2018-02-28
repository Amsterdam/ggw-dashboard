import { getAllGebieden, getWijken, getBuurten, getGebiedType, getGwb, getDetail } from './apis/gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers, CIJFERS } from './apis/bbga'

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
      console.error('Error for variable', c.variabele, e)
      return {
        label: c.label || c.variabele
      }
    }
  })

  return Promise.all(data)
}

export default {
  getAllGebieden,
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
  getGwb
}
