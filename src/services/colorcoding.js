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

function getCategory (zScore) {
  const average = 0.5
  const categories = [
    {
      inCategory: s => s >= 2 * average,
      color: COLOR['ams-donkergroen']
    },
    {
      inCategory: s => (average <= s && s < 2 * average),
      color: COLOR['ams-groen']
    },
    {
      inCategory: s => (-average < s && s < average),
      color: COLOR['ams-lichtgrijs']
    },
    {
      inCategory: s => (-2 * average < s && s <= -average),
      color: COLOR['ams-blauw']
    },
    {
      inCategory: s => s <= -2 * average,
      color: COLOR['ams-donkerblauw']
    }
  ]
  return categories.find(c => c.inCategory(zScore))
}

export function getColor (variable, value, year) {
  const varStd = std.filter(item => item.variabele === variable)
  if (varStd.length) {
    const ref = varStd.find(item => item.jaar === year)
    if (ref) {
      const zScore = (value - ref.gem) / ref.SD
      const category = getCategory(zScore)
      return category.color
    } else {
      console.error('No ref voor var', variable, year)
    }
  }
}
