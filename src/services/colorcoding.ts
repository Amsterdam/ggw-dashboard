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
function getCategory(zScore: number) 
  : { color: string, textColor?: string } {
  const average = 0.5;
  const categories = [
    {
      inCategory: (s) => 2 * average <= s,
      color: CATEGORY_COLORS[0].color,
      textColor: CATEGORY_COLORS[0].textColor,
    },
    {
      inCategory: (s) => average <= s && s < 2 * average,
      color: CATEGORY_COLORS[1].color,
    },
    {
      inCategory: (s) => average < s && s < -average,
      color: CATEGORY_COLORS[2].color,
    },
    {
      inCategory: (s) => -average >= s && s > 2 * -average,
      color: CATEGORY_COLORS[3].color,
    },
    {
      inCategory: (s) => -2 * average >= s,
      color: CATEGORY_COLORS[4].color,
      textColor: CATEGORY_COLORS[4].textColor,
    },
  ];

  const defaultCategory = { color: CATEGORY_COLORS[2].color };

  return categories.find((c) => c.inCategory(zScore)) || defaultCategory;
}

/**
 * Gets the color and an optional text color for a variable value in a year
 * @param meta  The variable, denoted by it's meta information
 * @param value The value for the variable
 * @param year  The year for which the value is valid
 * @returns {{color, textColor: *|textColSDor}}
 */

export function getColor(meta: any, value: number, year: number, stdValue: any) 
: { color: string, textColor?: string }
{
  if (value !== null) {
    const variable = meta.indicatorDefinitieId;
    const varStd = stdValue
      .filter(
        ({ jaar, indicatorDefinitieId }) =>
          indicatorDefinitieId === variable && jaar <= year
      )
      .sort((item1, item2) => item2.jaar - item1.jaar);

    if (varStd.length) {
      const ref = varStd[0]; // most recent year
      let zScore = (value - ref.gemiddelde) / ref.standaardafwijking;

      if (meta.kleurenpalet === 2) {
        zScore = 0 - zScore;
      }

      const category = getCategory(zScore);

      return {
        color: category.color,
        textColor: category.textColor,
      };
    }
  }

  return {
    color: "",
    textColor: "",
  };
}

export function getRankingColor(ranking: number, maxRanking: number) {
  const index = Math.round(
    ((ABSOLUTE_COLORS.length - 1) / maxRanking) * ranking
  );
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
