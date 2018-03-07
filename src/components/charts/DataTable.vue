<template>
  <table class="table table-sm table-bordered" v-if="data">
    <thead>
    <tr>
      <th></th>
      <th v-for="y in years" :key="y" class="text-center">{{y}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="d in data" :key="d.label">
      <td>
        <tooltip :cijfers="data" :cijfer="d">{{d.label}}</tooltip>
      </td>
      <td
        v-for="y in years" :key="y"
        :style="{'background-color': d[y].color, 'color' : d[y].textColor}"
        v-if="d[y]"
        class="text-center">
        {{ d[y] | displaywaarde }}
      </td>
    </tr>
    </tbody>
  </table>
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
  async created () {
    this.data = this.config.map(c => ({label: c.label || c.variabele}))
    this.updateData()
  }
}
</script>

<style scoped>
  td.text-center {
    text-align: center;
  }
</style>
