<template>
  <div class="chart-container">
    <tooltip :cijfers="chartdata">
      <h5>
        {{title}}
      </h5>
    <div :ref="chartRef"></div>
    </tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from '../Tooltip'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/stackedbar5'
import { STACKED_CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': false,
  'renderer': 'svg'
}

export default {
  name: 'StackedBarChart',
  components: {
    'tooltip': tooltip
  },
  props: [
    'title',
    'config',
    'last',
    'excludeYears'
  ],
  data () {
    return {
      chartdata: null,
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
      this.chartdata = await util.getConfigCijfers(this.gwb, this.config)
      const cijfers = util.getYearCijfers(this.chartdata, this.last, this.excludeYears)

      if (!vegaSpec.legends) vegaSpec.legends = [{}]

      vegaSpec.data.values = cijfers
      vegaSpec.scales[2].range = STACKED_CHART_COLORS
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

<style>
</style>
