import L from 'leaflet'

import util from '../services/util'
import { rdMultiPolygonToWgs84 } from '../services/geojson'

export async function getShapes (gebiedType, getStyle) {
  const getGebieden = {
    'Gebied': util.getAllGebieden,
    'Wijk': util.getAllWijken,
    'Buurt': util.getAllBuurten
  }
  const gwbs = await getGebieden[gebiedType]()

  // Get gwb details, load in parallel, wait for all finished
  const gwbDetails = await Promise.all(
    gwbs.map(gwb => util.getGwb(gwb.vollcode))
  )

  // Transform each gwb geometry into L.Polygon[]
  // Save the polygons with the gwb for faster access
  let polygons = []
  gwbDetails.forEach(gwb => {
    gwb.wgs84Geometries = gwb.wgs84Geometries || rdMultiPolygonToWgs84(gwb.geometrie) // Polygon[]
    polygons = polygons.concat(gwb.wgs84Geometries.map(geometry =>
      L.polygon(geometry.coordinates, getStyle(gwb.volledige_code))
    ))
  })

  return polygons
}
