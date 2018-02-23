import { getAllGebieden, getWijken, getBuurten, getGebiedType, getGwb, getDetail } from './gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers, CIJFERS } from './bbga'

async function getLatestConfigCijfers (gwb, config) {
  return getConfigCijfers(gwb, config, CIJFERS.LATEST)
}

async function getConfigCijfers (gwb, config, recentOrAll = CIJFERS.ALL) {
  let data = config.map(async c => {
    try {
      const cijfers = await getGebiedCijfers(c.variabele, gwb, recentOrAll)
      const post = c.post || cijfers.post
      return {
        ...cijfers,
        label: c.label || cijfers.meta.label,
        post
      }
    } catch (e) {
      console.error('Error for variable', c.variabele)
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
