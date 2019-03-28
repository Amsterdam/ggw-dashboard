<template>
  <div class="chart-container">
    <tooltip :cijfers="chartdata">
      <div :ref="chartRef"></div>
    </tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from '../Tooltip'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/linechart5'
import { LINE_CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': false,
  'renderer': 'svg'
}

export default {
  name: 'LineChart',
  components: {
    'tooltip': tooltip
  },
  props: [
    'config',
    'colors'
  ],
  data () {
    return {
      chartdata: null,
      chartRef: `${this._uid}.lineChart`
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      const data = await util.getConfigCijfers(this.gwb, this.config)
      this.chartdata = data

      let cijfers = util.flatten(
        this.chartdata.map(data =>
          data.cijfers.map(cijfer => ({
            x: cijfer.jaar,
            y: cijfer.waarde,
            variable: data.label,
            dash: /prognose/i.test(data.label) // show prognose variables as dashed lines
          }))))

      if (!vegaSpec.legends) {
        vegaSpec.legends = [{}]
      }

      vegaSpec.legends[0].values = util.getLegendLabels(this.chartdata)
      vegaSpec.data[0].values = cijfers
      vegaSpec.scales[2].range = LINE_CHART_COLORS.slice(0, this.colors || LINE_CHART_COLORS.length)
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
