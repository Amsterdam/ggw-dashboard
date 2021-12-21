/**
 * Each thema is identied by a string in the UI
 */

export const IN_HET_KORT = "Gebied in het kort";
export const BEVOLKING = "Bevolking";
export const DUURZAAMHEID = "Duurzaamheid";
export const ECONOMIE = "Economie";
export const ONDERWIJS = "Onderwijs";
export const VERKEER = "Verkeer";
export const SPORT_EN_CULTUUR = "Sport en cultuur";
export const WERK_INKOMEN = "Werk en inkomen";
export const WONEN = "Wonen";
export const SOCIALE_KRACHT = "Sociale kracht";
export const OPENBARE_RUIMTE = "Openbare ruimte";
export const VEILIGHEID = "Veiligheid en Overlast";
export const GEZONDHEID_ZORG = "Gezondheid en zorg";
export const JEUGD = "Jeugd";
export const OUDEREN = "Ouderen";

/**
 * The total set of available themas of which the user can choose from
 */
export const THEMAS = [
  IN_HET_KORT,
  BEVOLKING,
  WONEN,
  OPENBARE_RUIMTE,
  VEILIGHEID,
  VERKEER,
  ECONOMIE,
  WERK_INKOMEN,
  JEUGD,
  ONDERWIJS,
  SPORT_EN_CULTUUR,
  OUDEREN,
  GEZONDHEID_ZORG,
  DUURZAAMHEID,
  SOCIALE_KRACHT,
];

export const THEMA_URL_MAPPING = {
  [IN_HET_KORT]: "in-het-kort",
  [BEVOLKING]: "bevolking",
  [VERKEER]: "verkeer",
  [DUURZAAMHEID]: "duurzaamheid",
  [ECONOMIE]: "economie",
  [ONDERWIJS]: "onderwijs",
  [WERK_INKOMEN]: "werk-en-inkomen",
  [SPORT_EN_CULTUUR]: "sport-en-cultuur",
  [WONEN]: "wonen",
  [SOCIALE_KRACHT]: "sociale-kracht",
  [OPENBARE_RUIMTE]: "openbare-ruimte",
  [VEILIGHEID]: "veiligheid-en-overlast",
  [GEZONDHEID_ZORG]: "gezondheid-en-zorg",
  [JEUGD]: "jeugd",
  [OUDEREN]: "ouderen",
};

export const URL_THEMA_MAPPING = THEMAS.reduce((acc, curr) => {
  return {
    ...acc,
    [THEMA_URL_MAPPING[curr]]: curr,
  };
}, {});
