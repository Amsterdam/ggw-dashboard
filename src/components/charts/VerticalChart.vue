<template>
  <div>
    <h5 class="text-center"
        v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.top title="">
      {{title}}
    </h5>
    <div class="text-center">
      <div :ref="chartRef"></div>
      <!--<vertical-bar-chart v-if="chartdata" :chartdata="chartdata"></vertical-bar-chart>-->
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../../services/util'
// import verticalBarChart from './VerticalBarChart'
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
  name: 'VerticalChart',
  components: {
    // 'vertical-bar-chart': verticalBarChart
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
      vegaSpec.data.values = this.chartdata[0].cijfers.map(d => ({
        key: d.jaar,
        value: d.waarde,
        color: d.color
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
