import { getAllGebieden, getWijken, getBuurten, getGebiedType, getGwb, getDetail } from './gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers } from './bbga'

async function getConfigCijfers (gwb, config) {
  let data = config.map(async c => {
    try {
      const cijfers = await getGebiedCijfers(c.variabele, gwb)
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
  getAllCijfers,
  getGebiedCijfers,
  getGebiedType,
  getGwb
}
