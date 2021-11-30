/**
 * Each thema has a set of kerncijfers that are supplied by OIS
 */
import kerncijfers from "../static/links/kerncijfers.json";

/**
 * Each thema is identied by a string in the UI
 */

export const IN_HET_KORT = "Gebied in het kort";
export const BEVOLKING = "Bevolking";
export const DUURZAAMHEID = "Duurzaamheid";
export const ECONOMIE = "Economie";
export const ONDERWIJS = "Onderwijs";
export const OPENBARE_ORDE_EN_VEILIGHEID = "Openbare orde en veiligheid";
export const STEDELIJKE_ONTWIKKELING_EN_WONEN = "Stedelijke ontwikkeling en wonen";
export const VERKEER_EN_OPENBARE_RUIMTE = "Verkeer en Openbare ruimte";
export const SPORT_EN_CULTUUR = "Sport en cultuur";
export const WERK_INKOMEN_EN_PARTICIPATIE = "Werk, inkomen en participatie";
export const WONEN = "Wonen";
export const SOCIALE_KRACHT = "Sociale kracht";
export const OPENBARE_RUIMTE = "Openbare ruimte";
export const VEILIGHEID = "Veiligheid en Overlast";
export const GEZONDHEID_ZORG = "Gezondheid en zorg";

/**
 * The total set of available themas of which the user can choose from
 */
export const THEMAS = [
  IN_HET_KORT,
  BEVOLKING,
  STEDELIJKE_ONTWIKKELING_EN_WONEN,
  VERKEER_EN_OPENBARE_RUIMTE,
  DUURZAAMHEID,
  ECONOMIE,
  OPENBARE_ORDE_EN_VEILIGHEID,
  ONDERWIJS,
  WERK_INKOMEN_EN_PARTICIPATIE,
  SPORT_EN_CULTUUR,
  WONEN,
  SOCIALE_KRACHT,
  OPENBARE_RUIMTE,
  VEILIGHEID,
  GEZONDHEID_ZORG,
];

export const THEMA_URL_MAPPING = {
  [IN_HET_KORT]: "in-het-kort",
  [BEVOLKING]: "bevolking",
  [STEDELIJKE_ONTWIKKELING_EN_WONEN]: "stedelijke-ontwikkeling-en-wonen",
  [VERKEER_EN_OPENBARE_RUIMTE]: "verkeer-en-openbare-ruimte",
  [DUURZAAMHEID]: "duurzaamheid",
  [ECONOMIE]: "economie",
  [OPENBARE_ORDE_EN_VEILIGHEID]: "openbare-orde-en-veiligheid",
  [ONDERWIJS]: "onderwijs",
  [WERK_INKOMEN_EN_PARTICIPATIE]: "werk-inkomen-en-participatie",
  [SPORT_EN_CULTUUR]: "sport-en-cultuur",
  [WONEN]: "wonen",
  [SOCIALE_KRACHT]: "sociale-kracht",
  [OPENBARE_RUIMTE]: "openbare-ruimte",
  [VEILIGHEID]: "veiligheid",
  [GEZONDHEID_ZORG]: "gezondheid-en-zorg",
};

export const URL_THEMA_MAPPING = THEMAS.reduce((acc, curr) => {
  return {
    ...acc,
    [THEMA_URL_MAPPING[curr]]: curr,
  };
}, {});

/**
 * Gets the set of kerncijfers for a given thema
 * @param thema
 */
export function getKerncijfers(thema) {
  return kerncijfers.filter((cijfer) => cijfer.thema === thema).sort((c1, c2) => c1.volgorde - c2.volgorde);
}
