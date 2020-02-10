<template>
  <div>
    <div class="text-center">
      <tooltip :cijfers="chartdata">
      <h5 :v-if="title">
        {{title}}
      </h5>
      <div class="chart-container">
        <div :ref="chartRef"></div>
      </div>
      </tooltip>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from '../Tooltip'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/pie'
import { PIE_CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  actions: false,
  renderer: 'svg'
}

export default {
  name: 'PieChart',
  components: {
    tooltip: tooltip
  },
  props: [
    'title',
    'legendTitle',
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
      const totalWaarde = this.chartdata.reduce((total, value) => total + value.recent.waarde, 0)

      vegaSpec.data[0].values = this.chartdata.map(d => ({
        key: d.label,
        value: d.recent.waarde,
        display: (d.recent.waarde / totalWaarde) > 0.05 ? util.displayWaarde(d.recent) : ''
      }))

      vegaSpec.scales[0].range = PIE_CHART_COLORS
      vegaSpec.legends[0].title = this.legendTitle
      vegaSpec.legends[0].values = util.getLegendLabels(this.chartdata)
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
