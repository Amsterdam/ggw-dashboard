import L from 'leaflet'

import util from '../services/util'
import { rd, rdMultiPolygonToWgs84 } from '../services/geojson'

const allGeometries = {}

/**
 * Retuns the geometries (polygons) for a given gebied type (STAD, Stadsdeel, ...)
 * Each polygon is styled according to the given styling method
 * @param gebiedType
 * @param getStyle styling method that is invoked for each polygon
 * @returns {Promise<void>}
 */
export async function getShapes (gebiedType, getStyle) {
  const gwbs = await util.getGwbs(gebiedType)

  allGeometries[gebiedType] = allGeometries[gebiedType] || await util.getGeometries(gebiedType)

  const geometries = allGeometries[gebiedType]

  return gwbs.map(gwb => {
    const geometry = geometries[gwb.vollcode] || geometries[gwb.code]
    return L.polygon(geometry.coordinates, getStyle(gwb.vollcode))
  })
}

/**
 * Returns the geometries (polygons) for a given gebied, wijk or buurt
 * Each polygon is styled according to the given styling method
 * @param gwb
 * @param getStyle styling method that is invoked for each polygon
 * @returns {Array}
 */
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

/**
 * Draws a series of shapes (polygons) on the given Leaflet map
 * @param shapes
 * @param map
 * @returns {*} the layer holding the drawn polygons. Can be used for later removel of the layer
 */
export function drawShapes (shapes, map) {
  const layer = L.featureGroup()
  shapes.forEach(shape => shape.addTo(layer))
  layer.addTo(map)
  if (shapes.length) {
    map.fitBounds(layer.getBounds())
  }
  return layer
}

/**
 * Returns a Leaflet map for Amsterdam
 * @param el
 * @returns {*}
 */
export function amsMap (el) {
  const map = L.map(el, {
    crs: rd,
    attributionControl: false,
    zoomControl: true,
    scrollWheelZoom: false
  }).setView([52.35, 4.9], 6)

  map.addLayer(tileLayer())
  return map
}

/**
 * Returns a tile layer for Amsterdam
 * This tyle layer can be used to show a given shape on the map of Amsterdam
 * @returns {*}
 */
function tileLayer () {
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
