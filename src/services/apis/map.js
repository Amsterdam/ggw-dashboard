import { readData } from '../datareader'
import { rdPolygonToWgs84 } from '../geojson'

export const GEBIED_TYPE = {
  Stadsdeel: 'Stadsdeel',
  Gebied: 'Gebiedsgerichtwerken',
  Wijk: 'Buurtcombinatie',
  Buurt: 'Buurt'
}

function getUrl (endpoint) {
  return 'https://map.data.amsterdam.nl/maps/gebieden'
}

export async function getGeometries (gebiedType) {
  if (!gebiedType) {
    return []
  }
  // buurt, buurtcombinatie (wijk), gebiedsgerichtwerken, stadsdeel
  const url = getUrl() +
    '?request=getfeature' +
    '&version=1.1.0' +
    '&service=wfs' + '' +
    '&outputformat=geojson' +
    `&typename=${gebiedType}`
  const data = await readData(url)

  const geometries = {}
  data.features.forEach(item => {
    geometries[item.properties.vollcode || item.properties.code] = rdPolygonToWgs84(item.geometry)
  })

  return geometries
}
