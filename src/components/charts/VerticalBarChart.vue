<template>
  <div>
    <tooltip :cijfers="chartdata">
    <h5 class="text-center">
      {{title}}
    </h5>
    <div class="chart-container">
      <div :ref="chartRef"></div>
    </div>
    </tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from '../Tooltip'

import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/verticalbar'
import { COLOR } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': false,
  'renderer': 'svg'
}

export default {
  name: 'VerticalBarChart',
  components: {
    'tooltip': tooltip
  },
  props: [
    'config'
  ],
  data () {
    return {
      chartdata: null,
      title: null,
      tooltip: null,
      chartRef: `${this._uid}.vertBarChart`
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
      this.title = this.chartdata[0].label
      this.tooltip = this.chartdata[0].meta && this.chartdata[0].meta.bron

      this.updateChart()
    },

    updateChart () {
      vegaSpec.data.values = (this.chartdata[0].cijfers || [])
        .filter(d => d.waarde)
        .map((d, i) => ({
          key: d.jaar,
          value: d.waarde,
          color: d.color,
          i
        }))
      vegaSpec.layer[0].encoding.color.scale.range = vegaSpec.data.values.map(v => v.color || COLOR['ams-groen'])
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
