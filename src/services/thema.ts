import Bevolking from "../themas/Bevolking";
import Verkeer from "../themas/Verkeer";
import Duurzaamheid from "../themas/Duurzaamheid";
import Economie from "../themas/Economie";
import GebiedInHetKort from "../themas/GebiedInHetKort";
import Onderwijs from "../themas/Onderwijs";
import Werk from "../themas/Werk";
import Sport from "../themas/Sport";
import SocialeKracht from "../themas/SocialeKracht";
import Wonen from "../themas/Wonen";
import OpenbareRuimte from "../themas/OpenbareRuimte";
import Jeugd from "../themas/Jeugd";
import Ouderen from "../themas/Ouderen";
import Veiligheid from "../themas/Veiligheid";
import Zorg from "../themas/Zorg";

import {
  BEVOLKING,
  DUURZAAMHEID,
  ECONOMIE,
  GEZONDHEID_ZORG,
  IN_HET_KORT,
  JEUGD,
  ONDERWIJS,
  OPENBARE_RUIMTE,
  OUDEREN,
  SOCIALE_KRACHT,
  SPORT_EN_CULTUUR,
  VEILIGHEID,
  VERKEER,
  WERK_INKOMEN,
  WONEN,
} from "./themaNames";

/**
 * The total set of available themas of which the user can choose from
 */
export const THEMAS = {
  [IN_HET_KORT]: GebiedInHetKort,
  [BEVOLKING]: Bevolking,
  [DUURZAAMHEID]: Duurzaamheid,
  [ECONOMIE]: Economie,
  [GEZONDHEID_ZORG]: Zorg,
  [JEUGD]: Jeugd,
  [ONDERWIJS]: Onderwijs,
  [OPENBARE_RUIMTE]: OpenbareRuimte,
  [OUDEREN]: Ouderen,
  [SOCIALE_KRACHT]: SocialeKracht,
  [SPORT_EN_CULTUUR]: Sport,
  [VEILIGHEID]: Veiligheid,
  [VERKEER]: Verkeer,
  [WERK_INKOMEN]: Werk,
  [WONEN]: Wonen,
};

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

export const URL_THEMA_MAPPING = Object.keys(THEMAS).reduce((acc, curr) => {
  return {
    ...acc,
    [THEMA_URL_MAPPING[curr]]: curr,
  };
}, {});
