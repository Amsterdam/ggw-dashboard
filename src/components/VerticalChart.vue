<template>
  <div>
    <h5 class="text-center">{{title}}</h5>
    <div class="text-center">
      <vertical-bar-chart v-if="chartdata" :chartdata="chartdata"></vertical-bar-chart>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import verticalBarChart from './VerticalBarChart'

export default {
  name: 'VerticalChart',
  components: {
    'vertical-bar-chart': verticalBarChart
  },
  props: [
    'config'
  ],
  data () {
    return {
      chartdata: null,
      title: ''
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
