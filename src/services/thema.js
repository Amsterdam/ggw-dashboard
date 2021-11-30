/**
 * Each thema has a set of kerncijfers that are supplied by OIS
 */
import kerncijfers from "../static/links/kerncijfers.json";

/**
 * Each thema is identied by a string in the UI
 */

export const IN_HET_KORT = "Gebied in het kort";
export const BEVOLKING = "Bevolking";
export const DUURZAAMHEID_EN_WATER = "Duurzaamheid en water";
export const ECONOMIE_EN_CULTUUR = "Economie en cultuur";
export const ONDERWIJS_JEUGD_EN_DIVERSITEIT = "Onderwijs, jeugd en diversiteit";
export const OPENBARE_ORDE_EN_VEILIGHEID = "Openbare orde en veiligheid";
export const STEDELIJKE_ONTWIKKELING_EN_WONEN =
  "Stedelijke ontwikkeling en wonen";
export const VERKEER_EN_OPENBARE_RUIMTE = "Verkeer en Openbare ruimte";
export const WELZIJN_ZORG_EN_SPORT = "Welzijn, zorg en sport";
export const WERK_INKOMEN_EN_PARTICIPATIE = "Werk, inkomen en participatie";
export const SOCIALE_KRACHT = "Sociale kracht";

/**
 * The total set of available themas of which the user can choose from
 * @type {*[]}
 */
export const THEMAS = [
  IN_HET_KORT,
  BEVOLKING,
  STEDELIJKE_ONTWIKKELING_EN_WONEN,
  VERKEER_EN_OPENBARE_RUIMTE,
  DUURZAAMHEID_EN_WATER,
  ECONOMIE_EN_CULTUUR,
  OPENBARE_ORDE_EN_VEILIGHEID,
  ONDERWIJS_JEUGD_EN_DIVERSITEIT,
  WERK_INKOMEN_EN_PARTICIPATIE,
  WELZIJN_ZORG_EN_SPORT,
  SOCIALE_KRACHT,
];

/**
 * Gets the set of kerncijfers for a given thema
 * @param thema
 */
export function getKerncijfers(thema) {
  return kerncijfers
    .filter((cijfer) => cijfer.thema === thema)
    .sort((c1, c2) => c1.volgorde - c2.volgorde);
}
