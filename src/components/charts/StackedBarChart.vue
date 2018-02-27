<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../../static/charts/stackedbar5'
import { CHART_COLORS } from '../../services/colorcoding'

const vegaEmbedOptions = {
  'actions': {
    'export': false,
    'source': false,
    'editor': false},
  'renderer': 'svg'
}

export default {
  name: 'StackedBarChart',
  components: {
  },
  props: [
    'config'
  ],
  data () {
    return {
      chartdata: null
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
      vegaSpec.data.values = []
      this.chartdata.forEach(data => {
        vegaSpec.data.values = vegaSpec.data.values.concat(
          data.cijfers.map(cijfer => ({
            x: cijfer.jaar,
            y: cijfer.waarde,
            variable: data.label
          }))
        )
      })
      vegaSpec.scales[2].range = CHART_COLORS
      vegaEmbed(this.$el, vegaSpec, vegaEmbedOptions)
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
