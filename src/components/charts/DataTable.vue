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
      <td v-b-tooltip.hover.click v-b-tooltip.html.topright :title="d.tooltipText">
        {{d.label}}
      </td>
      <td
        v-for="y in years" :key="y"
        :style="{'background-color': d[y].color}"
        class="text-center"
        v-if="d[y]">
        {{ d[y] | displaywaarde }}
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../../services/util'

export default {
  name: 'DataTable',
  components: {
  },
  props: [
    'config'
  ],
  data () {
    return {
      data: null,
      years: [2014, 2015, 2016, 2017]
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
</style>
