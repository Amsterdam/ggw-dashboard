import std from '../../static/tmp/std'

export const COLOR = {
  'ams-geel': '#FFE600',
  'ams-oranje': '#FF9100',
  'ams-rood': '#EC0000',
  'ams-donkergroen': '#00A03C',
  'ams-groen': '#BED200',
  'ams-paars': '#A00078',
  'ams-magenta': '#E50082',
  'ams-donkerblauw': '#004699',
  'ams-blauw': '#009DE6',
  'ams-lichtgrijs': '#E8E8E8',
  'ams-middengrijs': '#BEBEBE',
  'ams-donkergrijs': '#787878',
  'ams-antraciet': '#434343',
  'ams-wit': '#FFFFFF',
  'ams-zwart': '#000000',
  'ams-body': '#434343',
  'ams-footer': '#666666',
  'ams-hint': '#787878',
  'ams-form-field': '#BEBEBE',
  'ams-background-sidebars': '#E5E5E5',
  'ams-top-menu': '#F3F3F3'
}

export const CHART_COLORS = [
  COLOR['ams-blauw'],
  COLOR['ams-rood'],
  COLOR['ams-groen'],
  COLOR['ams-paars'],
  COLOR['ams-oranje']
]

export const CATEGORY_COLORS = [
  {
    text: 'veel meer/beter dan gemiddeld',
    color: '#00A03C'
  },
  {
    text: 'meer/beter dan gemiddeld',
    color: '#B4E600'
  },
  {
    text: 'rond stedelijk gemiddelde',
    color: '#E8E8E8'
  },
  {
    text: 'minder/slechter dan gemiddeld',
    color: '#B1D9F5'
  },
  {
    text: 'veel minder/slechter dan gemiddeld',
    color: '#00A0E6'
  },
  {
    text: 'geen cijfers beschikbaar',
    color: COLOR['ams-wit']
  }
]

function getCategory (zScore) {
  const average = 0.5
  const categories = [
    {
      inCategory: s => s >= 2 * average,
      color: CATEGORY_COLORS[0].color
    },
    {
      inCategory: s => (average <= s && s < 2 * average),
      color: CATEGORY_COLORS[1].color
    },
    {
      inCategory: s => (-average < s && s < average),
      color: CATEGORY_COLORS[2].color
    },
    {
      inCategory: s => (-2 * average < s && s <= -average),
      color: CATEGORY_COLORS[3].color
    },
    {
      inCategory: s => s <= -2 * average,
      color: CATEGORY_COLORS[4].color
    }
  ]
  return categories.find(c => c.inCategory(zScore))
}

export function getColor (meta, value, year) {
  const variable = meta.variabele
  const revert = meta.kleurenpalet === 2 ? -1 : 1
  const varStd = std
    .filter(item => item.variabele === variable && item.jaar <= year)
    .sort((item1, item2) => item2.jaar - item1.jaar)
  if (varStd.length) {
    const ref = varStd[0] // most recent year
    const zScore = (value - ref.gem) / ref.SD
    const category = getCategory(zScore * revert)
    return category.color
  }
}
