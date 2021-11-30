/**
 * All logic regarding the interface with the BBGA API
 */

import { readData } from "../datareader";
import { getColor } from "../colorcoding";
import { cacheResponse } from "../cache";

/**
 * Returns the complete url for the BBGA API given an endpoint
 * @param endpoint
 * @returns {string}
 */
function getUrlv1(endpoint) {
  return `https://api.data.amsterdam.nl/v1/bbga${endpoint}`;
}

/**
 * Get all meta information for the BBGA variables.
 * The data is transformed into an object for faster access
 * The data is cached
 * @returns {Promise<*>}
 */
export async function getAllMeta() {
  async function getData() {
    const url = getUrlv1('/indicatoren_definities/?_pageSize=100000&_format=json')
    const data = await readData(url)
    const dataObject = {}

    data._embedded.indicatoren_definities.forEach((item) => {
      dataObject[item.variabele.toUpperCase()] = {
        ...item,
        indicatorDefinitieId: item.variabele,
      };
    });
    return dataObject;
  }

  return cacheResponse("allMeta", getData);
}

/**
 * Gets the meta information for a given variable name
 * When the variable name ends with the special value [LATEST] the most recent year variable is used
 * If meta contains VAR2018 and VAR2019 and the variable name is VAR[LATEST] then the meta for VAR2019 is returned
 * @param variableName
 * @returns {Promise<*>}
 */
export async function getMeta(variableName) {
  const meta = await getAllMeta();

  // Check for special variables, eg "Bev_prog[LATEST]"
  const isLatest = new RegExp(/\[LATEST\]$/i);
  if (isLatest.test(variableName)) {
    let baseName = variableName.replace(isLatest, ""); // Bev_prog
    baseName = new RegExp("^" + baseName, "i"); // /^Bev_prog/i
    const vars = Object.keys(meta)
      .filter((key) => baseName.test(key))
      .sort()
      .reverse();
    if (!vars.length) {
      return;
    }
    variableName = vars[0];
  }
  return meta[variableName.toUpperCase()];
}

/**
 * Import the standard deviations and averages for Amsterdam as provided by OIS
 * This is an fixed url published in dcatd.
 * These values are used to calculate z-scores
 * The z-scores are used to color values so that the color denotes the distance in std's to the average
 * The result is cached
 * @returns {Promise<{indicatorDefinitieId}[]>}
 */
export async function getStd() {
  const url = getUrlv1(
    "/statistieken/?_pageSize=10000&_format=json&_fields=indicatorDefinitieId,jaar,gemiddelde,standaardafwijking",
  );

  async function getData() {
    const data = await readData(url);

    return data._embedded.statistieken;
  }

  return cacheResponse("std", getData);
}

/**
 * Get one standard deviations of a specific variable for Amsterdam as provided by OIS
 * This is an fixed url published in dcatd.
 * These values are used to calculate z-scores
 * The z-scores are used to color values so that the color denotes the distance in std's to the average
 * The result is cached
 * @returns {Promise<[array of stddes]>}
 */
export async function getOneStd(variabele) {
  const sdvars = await getStd();
  return sdvars
    .filter((sd) => sd.indicatorDefinitieId === variabele.toUpperCase())
    .map((sd) => ({ ...sd, jaar: sd.jaar, gemiddelde: sd.gemiddelde }));
}

/**
 * Get the values for a given variable identified by its meta
 * An optional year can be specified to get only the values for the specified year. Default is to return all years
 * An optional gebiedCode can be specified to get the values for the given gebied. Default is to return the values for all gebied, wijk, buurten
 * The result is sorted on year (old to new)
 * The fact that null values are sometimes reported as empty strings is solved by setting both to null
 * The values will contain colors that allow for coloring of the cijfers based on the z-score
 * @param meta
 * @param year
 * @param gebiedCode
 * @returns {Promise<{jaar: *|number|string, waarde: null, post: string, gebiedcode15: *|string, color, textColor: *|textColor}[]>}
 */
async function getCijfers(meta, year = null, gebiedCode = null) {
  const post = meta.symbool === '%' ? meta.symbool : '' // only copy % symbol

  const selectVariable = `indicatorDefinitieId=${meta.indicatorDefinitieId}`
  const selectGebiedCode = gebiedCode ? `&gebiedcode15=${gebiedCode}` : ''
  const isLatest = year === 'latest'
  const url = getUrlv1(
    `/kerncijfers/?${selectVariable}${selectGebiedCode}&_pageSize=100000&_format=json`
  )
  const cijfers = await readData(url)
  const std = await getStd()

  const array = cijfers._embedded.kerncijfers
  array.sort((a, b) => a.jaar - b.jaar) // oldest first
  const results = array.map(c => ({
    jaar: c.jaar,
    waarde: c.waarde === "" || c.waarde === undefined ? null : c.waarde, // Sometimes the API returns '' for null value
    post,
    gebiedcode15: c.gebiedcode15,
    ...getColor(
      {
        indicatorDefinitieId: meta?.indicatorDefinitieId ? meta?.indicatorDefinitieId : indicatorDefinitieId,
        kleurenpalet: meta?.kleurenpalet ? meta.kleurenpalet : "",
      },
      c.waarde,
      c.jaar,
      std,
    ),
  }));

  return isLatest ? results.pop() : results;
}

/**
 * Gets all cijfers for a given variable
 * The values is cached
 * @param variableName
 * @param year optional value to get only the cijfers for a given year
 * @returns {Promise<*>}
 */
export async function getAllCijfers(variableName, year) {
  variableName = variableName.toUpperCase();
  const meta = await getMeta(variableName);
  const getData = async () => getCijfers(meta, year);

  return cacheResponse(`allCijfers.${variableName}.${year}`, getData);
}

/**
 * Constants to denote if all or only the most recent cijfers are requested
 * @type {{ALL: string, LATEST: string}}
 */
export const CIJFERS = {
  ALL: "all",
  LATEST: "latest",
};

/**
 * Get the cijfers for a given variable and gebied, wijk or buurt
 * The value is cached
 * @param variableName
 * @param gebied
 * @param recentOrAll
 * @returns {Promise<*>}
 */
export async function getGebiedCijfers(variableName, gebied, recentOrAll = CIJFERS.ALL) {
  variableName = variableName.toUpperCase();
  const meta = await getMeta(variableName);
  const jaar = recentOrAll === CIJFERS.ALL ? null : recentOrAll;

  async function getData() {
    const cijfers = await getCijfers(meta, jaar, gebied.volledige_code, variableName);

    return {
      gebied,
      meta,
      cijfers: cijfers,
      recent: cijfers?.length ? cijfers[cijfers.length - 1] : undefined,
    };
  }

  return cacheResponse(`gebiedCijfers.${variableName}.${gebied.volledige_code}.${recentOrAll}`, getData);
}
