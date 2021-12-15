/**
 * All logic regarding the interface with the maps API
 */

import { readData } from "../datareader";
import { rdPolygonToWgs84 } from "../geojson";
import { GeoJsonObject } from "geojson";

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
function getUrl(): string {
  return "https://map.data.amsterdam.nl/maps/gebieden";
}

const allGeometries = {};

export async function getGeometriesGeoJson(gebiedType: string):GeoJsonObject {
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
    geometry: rdPolygonToWgs84(feature.geometry),
  }));

  allGeometries[gebiedType] = geometries;

  return geometries;
}
