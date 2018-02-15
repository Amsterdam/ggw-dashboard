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
      <td>{{d.label}}</td>
      <td v-for="y in years" :key="y" class="text-center" v-if="d[y]">{{d[y].waarde.toLocaleString()}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'

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
      const meta = await util.getMeta()
      let data = this.config.map(async c => {
        const cMeta = meta.find(m => m.variabele === c.variabele.toUpperCase())
        if (cMeta) {
          const cijfers = await util.getCijfers(this.gwb, cMeta)
          return {
            label: c.label || cMeta.label,
            ...cijfers
          }
        } else {
          console.log('Error for variable', c.variabele)
          return {
            label: c.label || c.variabele
          }
        }
      })

      data = await Promise.all(data)

      for (let item of data) {
        for (let year of this.years) {
          item[year] = {jaar: year, waarde: ''}
          if (item.cijfers) {
            item[year] = item.cijfers.find(c => c.jaar === year) || item[year]
          }
        }
      }

      this.data = data
      console.log('data', this.data)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  created () {
    this.data = this.config.map(c => ({label: c.label || c.variabele}))
    this.updateData()
  }
}
</script>

<style scoped>
</style>
