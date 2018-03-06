import kerncijfers from '../../static/tmp/kerncijfers'

export const IN_HET_KORT = 'Gebied in het kort'
export const BEVOLKING = 'Bevolking'
export const DUURZAAMHEID_EN_WATER = 'Duurzaamheid en water'
export const ECONOMIE_EN_CULTUUR = 'Economie en cultuur'
export const ONDERWIJS_JEUGD_EN_DIVERSITEIT = 'Onderwijs, jeugd en diversiteit'
export const OPENBARE_ORDE_EN_VEILIGHEID = 'Openbare orde en veiligheid'
export const STEDELIJKE_ONTWIKKELING_EN_WONEN = 'Stedelijke ontwikkeling en wonen'
export const VERKEER_EN_OPENBARE_RUIMTE = 'Verkeer en Openbare ruimte'
export const WELZIJN_ZORG_EN_SPORT = 'Welzijn, zorg en sport'
export const WERK_INKOMEN_EN_PARTICIPATIE = 'Werk, inkomen en participatie'
export const NIET_IN_MVP = 'Niet in MVP'

export const THEMAS = [
  IN_HET_KORT,
  BEVOLKING,
  DUURZAAMHEID_EN_WATER,
  ECONOMIE_EN_CULTUUR,
  ONDERWIJS_JEUGD_EN_DIVERSITEIT,
  OPENBARE_ORDE_EN_VEILIGHEID,
  STEDELIJKE_ONTWIKKELING_EN_WONEN,
  VERKEER_EN_OPENBARE_RUIMTE,
  WELZIJN_ZORG_EN_SPORT,
  WERK_INKOMEN_EN_PARTICIPATIE,
  NIET_IN_MVP
]

export function getKerncijfers (thema) {
  return kerncijfers
    .filter(cijfer => cijfer['Thema Kerncijfertabel'] === thema)
    .sort((c1, c2) => c1['Volgorde kerncijfertabel'] - c2['Volgorde kerncijfertabel'])
}
