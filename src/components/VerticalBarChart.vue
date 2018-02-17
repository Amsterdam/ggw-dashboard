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
  'description': '',
  'height': 100,
  'width': 250,
  'data': {
    'values': [
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
      'y': {'field': 'Aantal', 'type': 'quantitative', 'axis': {'title': null, 'tickCount': 5, 'offset': 5}},
      'x': {'field': 'Type', 'type': 'ordinal', 'sort': null, 'axis': {'labels': true, 'labelPadding': 5, 'ticks': false, 'title': null}},
      'color': {
        'field': 'Type',
        'type': 'nominal',
        'scale': {'range': ['#BED200']},
        'legend': null
      }
    }
  }]
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
      vegaSpec.data.values = this.chartdata[0].cijfers.map(d => ({
        Type: d.jaar,
        Aantal: d.waarde
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
