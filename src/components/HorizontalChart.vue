<template>
  <div>
    <div class="row">
      <div class="col-sm-3">
        <div class="float-left">
          <div class="text-center">
            <div><img :src="'../../static/icons/' + icon"></div>
            <div class="font-weight-bold">{{title}}</div>
          </div>
        </div>
      </div>
      <div class="col-sm-9">
        <horizontal-bar-chart v-if="chartdata" :chartdata="chartdata"></horizontal-bar-chart>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import horizontalBarChart from './HorizontalBarChart'

export default {
  name: 'HorizontalChart',
  components: {
    'horizontal-bar-chart': horizontalBarChart
  },
  props: [
    'title',
    'icon',
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
