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
  props: [
    'chartdata'
  ],
  watch: {
    'chartdata' () {
      this.updateChart()
    }
  },
  methods: {
    updateChart () {
      vegaSpec.data[0].values = this.chartdata.map((d, i) => ({
        id: i,
        field: d.recent.waarde
      }))
      vegaEmbed(this.$el, vegaSpec, vegaEmbedOptions)
    }
  },
  created () {
  },
  mounted () {
    this.updateChart()
  }
}
</script>
