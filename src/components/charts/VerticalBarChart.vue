<template>
  <div></div>
</template>

<script>
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/verticalbar'
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
      vegaSpec.data.values = this.chartdata[0].cijfers.map(d => ({
        key: d.jaar,
        value: d.waarde,
        color: d.color
      }))
      vegaSpec.layer[0].encoding.color.scale.range = vegaSpec.data.values.map(v => v.color || COLOR['ams-groen'])
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
