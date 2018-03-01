<template>
  <div>
    <div class="text-center">
      <h5 v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.top title="">
        {{title}}
      </h5>
      <div :ref="chartRef"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/pie'
import { CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
}

export default {
  name: 'PieChart',
  components: {
  },
  props: [
    'title',
    'config'
  ],
  data () {
    return {
      chartdata: null,
      tooltip: null,
      chartRef: `${this._uid}.pieChart`
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      this.chartdata = await util.getLatestConfigCijfers(this.gwb, this.config)
      this.tooltip = this.chartdata[0].meta && this.chartdata[0].meta.bron
      this.updateChart()
    },

    updateChart () {
      vegaSpec.data[0].values = this.chartdata.map(d => ({
        key: d.label,
        value: d.recent.waarde
      }))

      vegaSpec.scales[0].range = CHART_COLORS
      vegaEmbed(this.$refs[this.chartRef], vegaSpec, vegaEmbedOptions)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  created () {
    this.updateData()
  }
}
</script>

<style>
</style>
