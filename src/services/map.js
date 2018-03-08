import L from 'leaflet'

import util from '../services/util'
import { rd, rdMultiPolygonToWgs84 } from '../services/geojson'

const allGeometries = {}

export async function getShapes (gebiedType, getStyle) {
  const gwbs = await util.getGwbs(gebiedType)

  allGeometries[gebiedType] = allGeometries[gebiedType] || await util.getGeometries(gebiedType)

  const geometries = allGeometries[gebiedType]

  return gwbs.map(gwb => {
    const geometry = geometries[gwb.vollcode] || geometries[gwb.code]
    return L.polygon(geometry.coordinates, getStyle(gwb.vollcode))
  })
}

export function getGWBShapes (gwb, getStyle) {
  if (gwb.geometrie) {
    gwb.wgs84Geometries = gwb.wgs84Geometries || rdMultiPolygonToWgs84(gwb.geometrie) // Polygon[]
    return gwb.wgs84Geometries.map(geometry =>
      L.polygon(geometry.coordinates, getStyle(gwb.volledige_code))
    )
  } else {
    return []
  }
}

export function drawShapes (shapes, map) {
  const layer = L.featureGroup()
  shapes.forEach(shape => shape.addTo(layer))
  layer.addTo(map)
  if (shapes.length) {
    map.fitBounds(layer.getBounds())
  }
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
