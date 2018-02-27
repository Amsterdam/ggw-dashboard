<template>
  <div></div>
</template>

<script>
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/horizontalbar'
import { COLOR } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
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
      vegaSpec.data.values = this.chartdata.map(d => ({
        key: d.label,
        value: d.recent.waarde || 0,
        label: d.recent.waarde === undefined ? 'Geen recente gegevens' : d.recent.waarde
      }))

      vegaSpec.layer[0].encoding.color.scale.range = this.chartdata
        .filter(d => d.recent.waarde)
        .map(d => d.recent.color || COLOR['ams-oranje'])

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
