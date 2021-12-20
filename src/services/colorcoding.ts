import { StdType, MetaType } from "../types";
import kleurenTabel from "../static/kleurcodetabel.json";

/**
 * The Amsterdam style guide colors
 */
export const COLOR = {
  "ams-geel": "#FFE600",
  "ams-oranje": "#FF9100",
  "ams-rood": "#EC0000",
  "ams-donkergroen": "#00A03C",
  "ams-groen": "#BED200",
  "ams-paars": "#A00078",
  "ams-magenta": "#E50082",
  "ams-donkerblauw": "#004699",
  "ams-blauw": "#009DE6",
  "ams-lichtgrijs": "#E8E8E8",
  "ams-middengrijs": "#BEBEBE",
  "ams-donkergrijs": "#787878",
  "ams-antraciet": "#434343",
  "ams-wit": "#FFFFFF",
  "ams-zwart": "#000000",
  "ams-body": "#434343",
  "ams-footer": "#666666",
  "ams-hint": "#787878",
  "ams-form-field": "#BEBEBE",
  "ams-background-sidebars": "#E5E5E5",
  "ams-top-menu": "#F3F3F3",
};

/**
 * The chart colors for charts that are not colored on z-score
 * For example pie and stacked bar charts
 */

const EXTRA_CHART_COLORS = [
  "#FFE600", // Geel
  "#E60082", // Donkerroze
  "#000000", // Zwart
  "#007099", // Donkerblauw
  "#BED200", // Olijfgroen
];

export const STACKED_CHART_COLORS = [
  "#A00078", // Paars
  "#BEBEBE", // Grijs
  "#FF9100", // Oranje
  "#787878", // Donkergrijs
  "#FF0000", // Rood
].concat(EXTRA_CHART_COLORS);

export const PIE_CHART_COLORS = [
  "#A00078", // Paars
  "#BEBEBE", // Grijs
  "#FF9100", // Oranje
  "#E8E8E8", // Lichtgrijs
  "#FF0000", // Rood
].concat(EXTRA_CHART_COLORS);

export const LINE_CHART_COLORS = [
  "#FF0000", // Rood
  "#A00078", // Paars
  "#787878", // Donkergrijs
  "#FF9100", // Oranje
  "#BEBEBE", // Lichter grijs
].concat(EXTRA_CHART_COLORS);

const ABSOLUTE_COLORS = [
  "#E5F2FC",
  "#D9E9F7",
  "#CEE0F2",
  "#C2D8ED",
  "#B7CFE8",
  "#ABC7E3",
  "#A0BEDE",
  "#94B5D9",
  "#89ADD4",
  "#7DA4CF",
  "#729CCA",
  "#6793C5",
  "#5B8AC0",
  "#5082BB",
  "#4479B6",
  "#3971B1",
  "#2D68AC",
  "#225FA7",
  "#1657A2",
  "#0B4E9D",
  "#004699",
].reverse();

export const VERSCHILLEN_SELECTED = "#000000";

/**
 * The colors for charts that are colored on z-score
 * Foreground color (color) and an optional text color can be specified for each category
 * @type {*[]}
 */
export const CATEGORY_COLORS = [
  {
    text: "veel meer/beter dan gemiddeld",
    color: "#00A03C",
    textColor: COLOR["ams-wit"],
  },
  {
    text: "meer/beter dan gemiddeld",
    color: "#B4E600",
  },
  {
    text: "rond stedelijk gemiddelde",
    color: "#E8E8E8",
  },
  {
    text: "minder/slechter dan gemiddeld",
    color: "#B1D9F5",
  },
  {
    text: "veel minder/slechter dan gemiddeld",
    color: "#00A0E6",
    textColor: COLOR["ams-wit"],
  },
  {
    text: "geen cijfers beschikbaar",
    color: COLOR["ams-wit"],
  },
];

/**
 * Gets the category from CATEGORY_COLORS for the given z-score
 * @param zScore
 */
function getCategory(zScore: number, kleurenpalet: number): { color: string; textColor?: string; index: number } {
  const colors = kleurenTabel.kleur[kleurenTabel.kleurenpalet[kleurenpalet].kleur];

  const average = 0.5;
  const categories = [
    {
      inCategory: (s) => 2 * average <= s, // s groter dan of gelijk aan 1
      color: colors[0],
      textColor: kleurenTabel.tekst_kleur[colors[0]] || "#000000",
      index: 0,
    },
    {
      inCategory: (s) => average <= s && s < 2 * average, // s groter dan of gelijk aan 0.5 en s kleiner dan 1
      color: colors[1],
      textColor: kleurenTabel.tekst_kleur[colors[1]] || "#000000",
      index: 1,
    },
    {
      inCategory: (s) => average > s && s > -average, // s kleiner dan 0,5 en s groter dan -0,5
      color: colors[2],
      textColor: kleurenTabel.tekst_kleur[colors[2]] || "#000000",
      index: 2,
    },
    {
      inCategory: (s) => -average >= s && s > 2 * -average, // s kleiner dan of gelijk aan -0,5 en s groter dan -1
      color: colors[3],
      textColor: kleurenTabel.tekst_kleur[colors[3]] || "#000000",
      index: 3,
    },
    {
      inCategory: (s) => -2 * average >= s, // s kleiner dan -1
      color: colors[4],
      textColor: kleurenTabel.tekst_kleur[colors[4]] || "#000000",
      index: 4,
    },
  ];

  const defaultCategory = { color: "FFF498", textColor: "#000000", index: 0 };
  const result = categories.find((c) => c.inCategory(zScore));

  return result || defaultCategory;
}

/**
 * Gets the color and an optional text color for a variable value in a year
 * @param meta  The variable, denoted by it's meta information
 * @param value The value for the variable
 * @param year  The year for which the value is valid
 * @returns {{color, textColor: *|textColSDor}}
 */
export function getColor(
  meta: MetaType,
  value: number,
  year: number,
  stdValue: StdType[],
): { color: string; textColor?: string; index: number } {
  if (value !== null) {
    const variable = meta.indicatorDefinitieId;
    const varStd = stdValue
      .filter(({ jaar, indicatorDefinitieId }) => indicatorDefinitieId === variable && jaar <= year)
      .sort((item1, item2) => item2.jaar - item1.jaar);

    if (varStd.length) {
      const ref = varStd[0]; // most recent year
      const zScore = (value - ref.gemiddelde) / ref.standaardafwijking;

      const category = getCategory(zScore, meta.kleurenpalet);

      return {
        color: category.color,
        textColor: category.textColor,
        index: category.index,
      };
    }
  }

  // No data or something went wrong so just use white and black.
  return {
    color: "#FFFFFF",
    textColor: "#000000",
    index: 0,
  };
}

export function getRankingColor(ranking: number, maxRanking: number) {
  const index = Math.round(((ABSOLUTE_COLORS.length - 1) / maxRanking) * ranking);
  return ABSOLUTE_COLORS[index];
}

/**
 * Given a config (a list of indicatorId's) return the static color list found in kleurcodetabel.json
 *
 */
export function getColorsUsingStaticDefinition(config: any) {
  const indexMax = Math.min(config?.length, 6); // The maximum number of distict items is 6
  const indexMin = Math.max(1, indexMax); // The minimum number of distinct items is 1.

  return kleurenTabel.kleur[`grafiek_${indexMin}`];
}

export function getColorGivenValueAndColorPalet(kleurenpalet: number, waarde: number | string) {
  if (typeof waarde === "string") {
    return "#000000";
  }

  // Treat 1 and 3 as the same, values above zero are considerd good and given a green color.
  if (kleurenpalet === 1 || kleurenpalet === 3) {
    return waarde < 0 ? kleurenTabel.kleur.amsterdam_rood : kleurenTabel.kleur.amsterdam_groen;
  }

  return waarde <= 0 ? kleurenTabel.kleur.amsterdam_groen : kleurenTabel.kleur.amsterdam_rood;
}
