<template>
  <div class="chart-container" v-if="gwb">
    <div class="text-center">
      <div>
        <icon :icon="icon" :title="title"></icon>
      </div>
    </div>

    <div :ref="chartRef"></div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import icon from '../Icon'
import util from '../../services/util'
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
  name: 'HorizontalBarChart',
  components: {
    'icon': icon
  },
  props: [
    'title',
    'icon',
    'config'
  ],
  data () {
    return {
      chartdata: null,
      chartRef: `${this._uid}.horzBarChart`
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
      this.updateChart()
    },

    updateChart () {
      vegaSpec.data.values = this.chartdata.map(d => ({
        key: d.label,
        value: (d.recent && d.recent.waarde) || 0,
        label: (d.recent && d.recent.waarde !== null) ? d.recent.waarde : 'Geen gegevens'
      }))

      vegaSpec.layer[0].encoding.color.scale.range = this.chartdata
        .filter(d => d.recent && d.recent.waarde)
        .map(d => d.recent.color || COLOR['ams-oranje'])

      vegaEmbed(this.$refs[this.chartRef], vegaSpec, vegaEmbedOptions)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  async created () {
    this.updateData()
  }
}

</script>

<style>
</style>
