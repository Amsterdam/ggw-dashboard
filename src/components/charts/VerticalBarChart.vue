<template>
  <div>
    <tooltip :cijfers="chartdata">
      <h5 class="text-center">{{title}}</h5>
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
import { getOneStd } from '../../services/apis/bbga'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/verticalbar'
import { COLOR } from '../../services/colorcoding'

const vegaEmbedOptions = {
  actions: false,
  renderer: 'svg'
}

export default {
  name: 'VerticalBarChart',
  components: {
    tooltip
  },
  props: ['config'],
  data() {
    return {
      chartdata: null,
      title: null,
      tooltip: null,
      chartRef: `${this._uid}.vertBarChart`
    }
  },
  computed: {
    ...mapGetters(['gwb'])
  },
  methods: {
    async updateData() {
      this.chartdata = await util.getConfigCijfers(this.gwb, this.config)
      this.title = this.chartdata[0].label
      this.tooltip = this.chartdata[0].meta && this.chartdata[0].meta.bron
      const variabele = this.chartdata[0].meta && this.chartdata[0].meta.variabele

      const stdevs = await getOneStd(variabele) // .filter((item) => item.indicatorDefinitieId === variabele)
      console.log('sd', stdevs)
      vegaSpec.data.values = (this.chartdata[0].cijfers || [])
        .filter(d => d.waarde)
        .map((d, i) => ({
          key: d.jaar,
          value: d.waarde,
          color: d.color,
          gemiddelde: stdevs.find(sd => sd.jaar === d.jaar).gemiddelde,
          i
        }))

      if (!vegaSpec.legends) {
        vegaSpec.legends = [{}]
      }

      vegaSpec.legends[0].values = util.getLegendLabels(this.chartdata)
      vegaSpec.layer[0].encoding.color.scale.range = vegaSpec.data.values.map(v => v.color || COLOR['ams-blauw'])
      vegaEmbed(this.$refs[this.chartRef], vegaSpec, vegaEmbedOptions)
    }
  },
  watch: {
    gwb() {
      this.updateData()
    }
  },
  created() {
    this.updateData()
  }
}
</script>

<style>
</style>
