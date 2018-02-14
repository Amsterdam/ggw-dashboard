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
  '$schema': 'https://vega.github.io/schema/vega/v3.0.json',
  'width': 200,
  'height': 200,
  'autosize': 'none',
  'data': [
    {
      'name': 'table',
      'values': [
        {'id': 1, 'field': 4},
        {'id': 2, 'field': 6},
        {'id': 3, 'field': 10},
        {'id': 4, 'field': 3},
        {'id': 5, 'field': 7},
        {'id': 6, 'field': 8}
      ],
      'transform': [
        {
          'type': 'pie',
          'field': 'field'
        }
      ]
    }
  ],
  'scales': [
    {
      'name': 'color',
      'type': 'ordinal',
      'range': {'scheme': 'category20'}
    }
  ],
  'marks': [
    {
      'type': 'arc',
      'from': {'data': 'table'},
      'encode': {
        'enter': {
          'fill': {'scale': 'color', 'field': 'id'},
          'x': {'signal': 'width / 2'},
          'y': {'signal': 'height / 2'}
        },
        'update': {
          'startAngle': {'field': 'startAngle'},
          'endAngle': {'field': 'endAngle'},
          'outerRadius': {'signal': 'width / 2'}
        }
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
