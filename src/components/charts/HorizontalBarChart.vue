<template>
  <div class="block-container" v-if="gwb">
    <tooltip :cijfers="chartdata">

      <div class="col-12">
        <icon :icon="icon" :title="title"></icon>
      </div>
      <div class="col-12">
        <div :ref="chartRef"></div>
      </div>
    </tooltip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from '../Tooltip'
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
    'tooltip': tooltip,
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
      vegaSpec.data.values = this.chartdata.map((d, i) => ({
        key: d.label,
        value: (d.recent && d.recent.waarde) || 0,
        label: (d.recent && d.recent.waarde !== null) ? d.recent.waarde : 'Geen gegevens',
        color: (d.recent && d.recent.color) || COLOR['ams-oranje'],
        i
      }))

      vegaSpec.layer[0].encoding.color.scale.range = vegaSpec.data.values.map(v => v.color)
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

<style lang="scss" scoped>
  .block-container {
    display: flex;
    align-items: left;
    align-self: left;
    justify-content: center;
    width: 100%;

    .icon-container {
      height: 50px !important;
    }
  }
</style>
