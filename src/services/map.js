import L from 'leaflet'

import util from '../services/util'
import { rd, rdMultiPolygonToWgs84 } from '../services/geojson'

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
  gwbDetails.forEach(gwb => { polygons = polygons.concat(getGWBShapes(gwb, getStyle)) })
  return polygons
}

export function getGWBShapes (gwb, getStyle) {
  gwb.wgs84Geometries = gwb.wgs84Geometries || rdMultiPolygonToWgs84(gwb.geometrie) // Polygon[]
  return gwb.wgs84Geometries.map(geometry =>
    L.polygon(geometry.coordinates, getStyle(gwb.volledige_code))
  )
}

export function drawShapes (shapes, map) {
  const layer = L.featureGroup()
  shapes.forEach(shape => shape.addTo(layer))
  layer.addTo(map)
  map.fitBounds(layer.getBounds())
  return layer
}

export function amsMap (el) {
  const map = L.map(el, {
    crs: rd,
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([52.35, 4.9], 6)

  map.addLayer(tileLayer())
  return map
}

export function tileLayer () {
  return L.tileLayer(
    'https://t1.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png',
    {
      tms: true,
      minZoom: 0,
      maxZoom: 20,
      opacity: 0.3
    }
  )
}
