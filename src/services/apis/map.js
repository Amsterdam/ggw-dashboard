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


const allGeometries = {};

export async function getGeometriesGeoJson(gebiedType) {
  if (!gebiedType || gebiedType === "Stad") {
    return;
  }

  if (allGeometries[gebiedType]) {
    return allGeometries[gebiedType];
  }

  // buurt, buurtcombinatie (wijk), gebiedsgerichtwerken, stadsdeel
  const url =
    getUrl() +
    "?request=getfeature" +
    "&version=1.1.0" +
    "&service=wfs" +
    "" +
    "&outputformat=geojson" +
    `&typename=${GEBIED_TYPE[gebiedType]}`;

  const data = await readData(url);
  
  const geometries = { ...data };
    
  geometries.features = data.features.map((feature) => ({
    ...feature,
    geometry: rdPolygonToWgs84(feature.geometry)
  }));

  allGeometries[gebiedType] = geometries;

  return geometries;
}
