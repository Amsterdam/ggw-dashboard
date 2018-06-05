<template>
  <div>
    <table class="table table-sm table-bordered" v-if="data">
      <thead>
      <tr>
        <th></th>
        <th v-for="y in years" :key="y" class="text-center">{{y}}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="d in data" :key="d.variabele">
        <td>
          <tooltip :cijfers="data" :cijfer="d">{{d.label}}</tooltip>
        </td>
        <td
          v-for="y in years" :key="y"
          :style="{'background-color': d[y].color, 'color' : d[y].textColor}"
          v-if="d[y]"
          class="text-center">
          <tooltip :cijfers="data" :cijfer="d" v-if="d[y].waarde">{{ d[y] | displaywaarde }}</tooltip>
          <tooltip :cijfers="data" :cijfer="d" v-else>n.b.</tooltip>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import tooltip from '../Tooltip'

import util from '../../services/util'

export default {
  name: 'DataTable',
  components: {
    'tooltip': tooltip
  },
  props: [
    'config'
  ],
  data () {
    return {
      data: null,
      years: []
    }
  },
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  methods: {
    async updateData () {
      const data = await util.getConfigCijfers(this.gwb, this.config)

      /**
       * Show the last 4 years only
       * @type {*}
       */
      const cijfers = util.getYearCijfers(data)
      const maxYear = util.getMaxYear(cijfers)
      this.years = [3, 2, 1, 0].map(i => maxYear - i)

      for (let item of data) {
        item.tooltipText = item.tooltip ? item.tooltip(false) : ''
        for (let year of this.years) {
          item[year] = {jaar: year, waarde: ''}
          if (item.cijfers) {
            item[year] = item.cijfers.find(c => c.jaar === year) || item[year]
          }
        }
      }

      this.data = data
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

<style scoped>
  td.text-center {
    text-align: center;
  }
</style>
