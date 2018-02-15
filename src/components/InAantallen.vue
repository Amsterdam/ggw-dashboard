<template>
  <div>
    <table class="table table-sm b-table-fixed" v-if="gebied">
      <thead>
      <tr>
        <th colspan="2" class="text-center">{{gebied.naam}} in aantallen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="d in data" :key="d.label">
        <td>{{d.label}}</td>
        <td>{{d.waarde.toLocaleString()}} {{d.na}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import inAantallen from '../../static/links/in_aantallen'

export default {
  props: [
  ],
  data () {
    return {
      data: null
    }
  },
  computed: {
    ...mapGetters([
      'gebied',
      'wijk',
      'buurt'
    ])
  },
  watch: {
    'gebied' () {
      if (this.gebied) {
        this.updateData()
      }
    }
  },
  methods: {
    async updateData () {
      if (this.data) {
        this.data = this.data.map(d => ({ ...d, waarde: '', na: null }))
      }
      const meta = await util.getMeta()
      let data = inAantallen.map(async ia => {
        try {
          const iaMeta = meta.find(m => m.variabele === ia.variabele.toUpperCase())
          const cijfers = await util.getCijfers(this.gebied, iaMeta)
          return {
            label: ia.label,
            label2: iaMeta.label,
            variabele: ia.variabele,
            variabele2: iaMeta.variabele,
            bron: iaMeta.bron,
            waarde: cijfers[0].waarde,
            jaar: cijfers[0].jaar,
            na: ia.na
          }
        } catch (err) {
          console.log('Error', err)
          return {
            label: ia.label,
            waarde: '?'
          }
        }
      })
      this.data = await Promise.all(data)
      console.log('data', data)
    }
  },
  async created () {
    this.updateData()
  }
}
</script>

<style scoped>
</style>
