<template>
  <div></div>
</template>

<script>
import vegaEmbed from 'vega-embed'
import config from '../../../static/charts/pie'
import { CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
}

const vegaSpec = config

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
      vegaSpec.data[0].values = this.chartdata.map(d => ({
        key: d.label,
        value: d.recent.waarde
      }))
      vegaSpec.scales[0].range = CHART_COLORS
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
