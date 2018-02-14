<template>
  <div></div>
</template>

<script>
import vegaEmbed from 'vega-embed'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
}

const vegaSpec = {
  '$schema': 'https://vega.github.io/schema/vega-lite/v2.json',
  'description': 'Woningvoorraad',
  'data': {
    'values': [
      {'Type': 'Koop', 'Aantal': 7931},
      {'Type': 'Particuliere huur', 'Aantal': 11868},
      {'Type': 'Corporatiebezit', 'Aantal': 8753}
    ]
  },
  'config': {
    'style': {
      'cell': {
        'stroke': 'transparent'
      }
    }
  },
  'layer': [{
    'mark': {
      'type': 'bar'
    },
    'encoding': {
      'x': {'field': 'Aantal', 'type': 'quantitative', 'axis': {'labels': false, 'domain': false, 'grid': false, 'ticks': false, 'title': null}},
      'y': {'field': 'Type', 'type': 'ordinal', 'sort': null, 'axis': {'labels': true, 'domain': false, 'grid': false, 'ticks': false, 'title': null}},
      'color': {
        'field': 'Type',
        'type': 'nominal',
        'scale': {'range': ['#00A03C', '#009DE6', '#E8E8E8']},
        'legend': null
      }
    }
  },
  {
    'mark': {
      'type': 'text',
      'align': 'left',
      'baseline': 'middle',
      'dx': 3
    },
    'encoding': {
      'x': {'field': 'Aantal', 'type': 'quantitative', 'axis': {'labels': false, 'domain': false, 'grid': false, 'ticks': false, 'title': null}},
      'y': {'field': 'Type', 'type': 'ordinal', 'sort': null, 'axis': {'labels': true, 'domain': false, 'grid': false, 'ticks': false, 'title': null}},
      'text': {'field': 'Aantal', 'type': 'quantitative'}
    }
  }
  ]
}

export default {
  mounted () {
    vegaEmbed(this.$el, vegaSpec, vegaEmbedOptions)
  }
}
</script>
