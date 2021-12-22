/**
 * The util module combines the logic of the API's that are used in his application
 * It also provides for a series of helper methods that are shared between components
 *
 * A lot of the logic is based upon configurations.
 * Configurations contain the data for charts, tables and overviews.
 * The configurations are kept in seperate static folder of the application so that it can maintained
 * by OIS without needing to update the application code
 * Configurations provide for a data-driven user interface
 */

import { vega } from "vega-embed";

import {
  getAllStadsdelen,
  getAllGebieden,
  getAllWijken,
  getAllBuurten,
  getCity,
  getBuurten,
  getGebiedType,
  getDetail,
  GEBIED_TYPE,
} from "./apis/gebieden";
import {
  getAllMeta,
  getMeta,
  getAllCijfers,
  getGebiedCijfers,
  getVerschillenCijfers,
  CIJFERS,
  getStd,
} from "./apis/bbga";
import { Cijfers } from "../types";

/**
 * Gets the most recent cijfers for a given configuration
 * @param gwb
 * @param config
 * @returns {Promise<*>}
 */
async function getLatestConfigCijfers(gwb, config) {
  return getConfigCijfers(gwb, config, CIJFERS.ALL);
}

/**
 * Get the cijfers for a gebied, wijk or buurt given a configuration
 * Optionally one can specify to receive only the most recent cijfers
 * Default the cijfers for all years are returned
 *
 * @param {Object} gwb gebied, wijk, buurt
 * @param {Object} config
 * @param {String} [recentOrAll=CIJFERS.ALL] Only the most recent year or all years (default)
 *
 */
async function getConfigCijfers(gwb, config, recentOrAll = CIJFERS.ALL): Promise<Cijfers[]> {
  const data = config.map(async (c, index) => {
    try {
      const cijfers = await getGebiedCijfers(c.indicatorDefinitieId, gwb, recentOrAll);

      return {
        ...cijfers,
        label: c.label || cijfers?.meta?.label,
        showInLegend: c.showInLegend !== undefined ? c.showInLegend : true,
        index,
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error("Variable not found", c.indicatorDefinitieId);
      // eslint-disable-next-line no-console
      console.error(e);
      return {
        label: c?.label || c?.indicatorDefinitieId,
      };
    }
  });

  return Promise.all(data);
}

/**
 * Utility method for charts
 * Based upon a data set (retrieved from getConfigCijfers) it returns a chart data set with x, y, color and variable values
 * Optionally one can specify to retrieve only the last n years
 *
 * @param {Object} data
 * @param {Number} last Optional parameter to retrieve only the last n cijfers
 * @param {Object} [include={}] Options for including specific years from the dataset
 * @param {Boolean} include.odd - Include only odd years from the dataset
 * @param {Boolean} include.even - Include only even years from the dataset
 * @param {Number} include.before - Include only years before the given value
 * @param {Number} include.after - Include only years after the given value
 * @param {Number[]} include.exact - Include only years in the list of gives values
 * @returns {Object}
 */
function getYearCijfers(data, last = null, include = {}) {
  // @ts-ignore
  const { odd, even, before, after, exact } = include;
  const cijferData = data.filter(({ cijfers }) => cijfers);

  /**
   * Compute year totals to supress the display of insignificant values
   */
  const totalWaarde = cijferData.reduce((total, item) => {
    item.cijfers.forEach((cijfer) => {
      total[cijfer.jaar] = total[cijfer.jaar] || 0;
      total[cijfer.jaar] += cijfer.waarde;
    });
    return total;
  }, {});

  const cijfers = cijferData
    .map((item) =>
      item.cijfers.map((cijfer) => ({
        x: cijfer.jaar,
        y: cijfer.waarde,
        variable: item.label,
        index: item.index,
        color: cijfer.color,
        display: cijfer.waarde / totalWaarde[cijfer.jaar] > 0.075 ? displayWaarde(cijfer) : "",
        cijfer,
      })),
    )
    .flat()
    .filter(({ x }) => {
      if (odd) {
        return x % 2 > 0;
      }
      if (even) {
        return x % 2 === 0;
      }
      return true;
    })
    .filter(({ x }) => {
      if (before) {
        return x < before;
      }
      if (after) {
        return x > after;
      }
      return true;
    })
    .filter(({ x }) => {
      if (Array.isArray(exact) && exact.every((year) => !Number.isNaN(+year))) {
        return exact.includes(x);
      }
      return true;
    });

  if (last) {
    const maxYear = getMaxYear(cijfers);
    return cijfers.filter((cijfer) => cijfer.x > maxYear - last);
  }

  return cijfers;
}

/**
 * Small utility method for charts to get the max value for a set of data retrieved from getYearCijfers
 * @param cijfers
 */
function getMaxYear(cijfers) {
  return cijfers.reduce((max, cijfer) => (cijfer.x > max ? cijfer.x : max), -1);
}

/**
 * Returns the set of gebied, wijk or buurten for a given gebied type
 * @param gebiedType
 * @returns {Promise<*>}
 */
async function getGwbs(gebiedType) {
  const getAll = {
    [GEBIED_TYPE.Stadsdeel]: getAllStadsdelen,
    [GEBIED_TYPE.Gebied]: getAllGebieden,
    [GEBIED_TYPE.Wijk]: getAllWijken,
    [GEBIED_TYPE.Buurt]: getAllBuurten,
  };
  if (getAll[gebiedType]) {
    return getAll[gebiedType]();
  } else {
    return [];
  }
}

/**
 * Provides for a display value for a cijfer, using the NL locale for numbers
 * @param cijfer
 * @returns {string}
 */
const displayWaarde = (cijfer) => {
  if (cijfer && cijfer.waarde !== null) {
    return `${cijfer.waarde.toLocaleString("NL")}${cijfer.post || ""}`;
  }
};

/**
 * Gets a list of labels that need to be displayed in a graph's legend
 *
 * @param {Object[]} configCijfers - Result set from call to getConfigCijfers function
 * @returns {String[]}
 */
const getLegendLabels = (configCijfers) => {
  const config = [...configCijfers].filter(({ showInLegend }) => showInLegend).map(({ label }) => label);

  const legendLabels = new Set(config);

  return Array.from(legendLabels);
};

const setVegaLocale = () => {
  vega.formatLocale({
    decimal: ",",
    thousands: ".",
    grouping: [3],
    currency: ["", "\u00a0€"],
  });
};

const formatNumber = (value) => {
  if (typeof value === "number") {
    return new Intl.NumberFormat("nl-NL", { maximumSignificantDigits: 6 }).format(value);
  }

  return value;
};

/**
 * Util exports het methods in an object. Usage will therefore be like util.getCity instead of import {getCity} from util
 * This has been done for reasons of simplicity only
 */
const util = {
  CIJFERS,
  displayWaarde,
  GEBIED_TYPE,
  getAllBuurten,
  getAllCijfers,
  getAllGebieden,
  getAllMeta,
  getAllStadsdelen,
  getAllWijken,
  getBuurten,
  getCity,
  getConfigCijfers,
  getDetail,
  getGebiedCijfers,
  getVerschillenCijfers,
  getGebiedType,
  getGwbs,
  getLatestConfigCijfers,
  getLegendLabels,
  getMaxYear,
  getMeta,
  getYearCijfers,
  getStd,
  setVegaLocale,
  formatNumber,
};

export default util;
