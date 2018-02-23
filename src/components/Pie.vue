<template>
  <div>
    <div class="text-center">
      <h5>{{title}}</h5>
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
      this.chartdata = await util.getLatestConfigCijfers(this.gwb, this.config)
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
