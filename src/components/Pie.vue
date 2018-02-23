<template>
  <div>
    <div class="text-center">
      <h5 v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.top :title="tooltip">
        {{title}}
      </h5>
      <pie-chart v-if="chartdata" :chartdata="chartdata"></pie-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import pieChart from './PieChart'

export default {
  name: 'Pie',
  components: {
    'pie-chart': pieChart
  },
  props: [
    'title',
    'config'
  ],
  data () {
    return {
      chartdata: null,
      tooltip: null
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
      this.tooltip = this.chartdata[0].meta && this.chartdata[0].meta.bron
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
