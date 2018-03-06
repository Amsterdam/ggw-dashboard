<template>
  <div class="chart-container">
    <div :ref="chartRef"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/linechart5'
import { CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
}

export default {
  name: 'LineChart',
  components: {
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
      this.chartdata = await util.getConfigCijfers(this.gwb, this.config)

      let cijfers = util.flatten(
        this.chartdata.map(data =>
          data.cijfers.map(cijfer => ({
            x: cijfer.jaar,
            y: cijfer.waarde,
            variable: data.label,
            dash: /prognose/i.test(data.label)
          }))))

      vegaSpec.data[0].values = cijfers
      vegaSpec.scales[2].range = CHART_COLORS.slice(0, this.colors || CHART_COLORS.length)
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
