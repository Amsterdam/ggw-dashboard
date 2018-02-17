<template>
  <div></div>
</template>

<script>
import vegaEmbed from 'vega-embed'
import config from '../../static/charts/pie'

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
      vegaSpec.data[0].values = this.chartdata.map((d, i) => ({
        key: d.label,
        value: d.recent.waarde
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
