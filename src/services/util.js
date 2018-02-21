import { getAllGebieden, getWijken, getBuurten, getGebiedType, getGwb, getDetail } from './gebieden'
import { getAllMeta, getMeta, getAllCijfers, getGebiedCijfers } from './bbga'

async function getConfigCijfers (gwb, config) {
  const isPercentage = /_P$/i // Add auto-post for percentages
  let data = config.map(async c => {
    try {
      const cijfers = await getGebiedCijfers(c.variabele, gwb)
      return {
        label: c.label || cijfers.meta.label,
        post: c.post || (isPercentage.test(cijfers.meta.variabele) ? '%' : null),
        ...cijfers
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
