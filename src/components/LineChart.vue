<template>
  <div></div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import vegaEmbed from 'vega-embed'
import vegaSpec from '../../static/charts/linechart5'

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
      console.log('Line chart data', this.chartdata)
      vegaSpec.data.values = this.chartdata[0].cijfers.map(d => ({
        key: d.jaar,
        value: d.waarde
      }))
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
