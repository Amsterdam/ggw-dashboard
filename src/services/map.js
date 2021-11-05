import L from "leaflet";

import { rd, rdPolygonToWgs84 } from "../services/geojson";

/**
 * Returns the geometries (polygons) for a given gebied, wijk or buurt
 * Each polygon is styled according to the given styling method
 * @param gwb
 * @param getStyle styling method that is invoked for each polygon
 * @returns {Array}
 */
export function getGWBShapes(gwb, getStyle) {
  if (gwb.geometrie) {
    gwb.wgs84Geometries = gwb.wgs84Geometries || [
      rdPolygonToWgs84(gwb.geometrie),
    ];

    return gwb.wgs84Geometries.map((geometry) =>
      L.polygon(geometry.coordinates, getStyle(gwb.volledige_code))
    );
  } else {
    return [];
  }
}

/**
 * Draws a series of shapes (polygons) on the given Leaflet map
 * @param shapes
 * @param map
 * @returns {*} the layer holding the drawn polygons. Can be used for later removel of the layer
 */
export function drawShapes(shapes, map) {
  const layer = L.featureGroup();
  shapes.forEach((shape) => shape.addTo(layer));
  layer.addTo(map);
  if (shapes.length) {
    map.fitBounds(layer.getBounds());
  }
  return layer;
}

/**
 * Returns a Leaflet map for Amsterdam
 * @param el
 * @returns {*}
 */
export function amsMap(el) {
  const map = L.map(el, {
    crs: rd,
    attributionControl: false,
    zoomControl: true,
    scrollWheelZoom: false,
  }).setView([52.35, 4.9], 6);

  map.addLayer(tileLayer());
  return map;
}

/**
 * Returns a tile layer for Amsterdam
 * This tyle layer can be used to show a given shape on the map of Amsterdam
 * @returns {*}
 */
function tileLayer(map) {
  return L.tileLayer(
    "https://t1.data.amsterdam.nl/topo_rd_zw/{z}/{x}/{y}.png",
    {
      tms: true,
      minZoom: 0,
      maxZoom: 20,
      opacity: 0.3,
    }
  );
}
