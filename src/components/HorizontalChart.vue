<template>
  <div>
    <table class="table table-sm borderless">
      <tbody>
      <tr>
        <td width="10%">
          <img :src="'../../static/icons/' + icon">
          {{title}}
        </td>
        <td>
          <horizontal-bar-chart v-if="chartdata" :chartdata="chartdata"></horizontal-bar-chart>
        </td>
      </tr>
      </tbody>
    </table>
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
      this.chartdata = await util.getConfigCijfers(this.gwb, this.config)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  created () {
    console.log('wv', this.config)
    this.updateData()
  }
}

</script>

<style>
</style>
