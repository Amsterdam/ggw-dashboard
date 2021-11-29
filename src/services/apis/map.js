/**
 * All logic regarding the interface with the maps API
 */

import { readData } from "../datareader";
import { rdPolygonToWgs84 } from "../geojson";

/**
 * Constant to denote the gebied types in the maps API
 * @type {{Stadsdeel: string, Gebied: string, Wijk: string, Buurt: string}}
 */
export const GEBIED_TYPE = {
  Stadsdeel: "Stadsdeel",
  Gebied: "Gebiedsgerichtwerken",
  Wijk: "Buurtcombinatie",
  Buurt: "Buurt",
};

/**
 * Returns the complete url for the maps API given an endpoint
 * @param endpoint
 * @returns {string}
 */
function getUrl() {
  return "https://map.data.amsterdam.nl/maps/gebieden";
}

/**
 * Gets all geometries with a given gebied type (gebied, wijk, buurt, stadsdeel)
 * The geometries are converted from the rd crs to wgs84
 * @param gebiedType
 * @returns {Promise<*>}
 */
export async function getGeometries(gebiedType) {
  if (!gebiedType) {
    return [];
  }
  // buurt, buurtcombinatie (wijk), gebiedsgerichtwerken, stadsdeel
  const url =
    getUrl() +
    "?request=getfeature" +
    "&version=1.1.0" +
    "&service=wfs" +
    "" +
    "&outputformat=geojson" +
    `&typename=${gebiedType}`;
  const data = await readData(url);

  const geometries = {};
  data.features.forEach((item) => {
    geometries[item.properties.vollcode || item.properties.code] =
      rdPolygonToWgs84(item.geometry);
  });

  return geometries;
}


// const allGeometries = {}
/**
 * Draws a series of shapes (polygons) on the given Leaflet map
 * @param shapes
 * @param map
 * @returns {*} the layer holding the drawn polygons. Can be used for later removel of the layer
 */
export function drawShapes (shapes) {
  const layer = L.featureGroup()
  shapes.forEach(shape => shape.addTo(layer))
  // layer.addTo(map)
  // if (shapes.length) {
    // map.fitBounds(layer.getBounds())
  // }
  return layer
}

/**
 * Returns a Leaflet map for Amsterdam
 * @param el
 * @returns {*}
 */
export function amsMap () {
  // const map = L.map(el, {
  //   crs: rd,
  //   attributionControl: false,
  //   zoomControl: true,
  //   scrollWheelZoom: false
  // }).setView([52.35, 4.9], 6)

  // map.addLayer(tileLayer())
  // return map
}