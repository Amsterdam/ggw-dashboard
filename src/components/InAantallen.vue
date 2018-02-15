<template>
  <div>
    <table class="table table-sm" v-if="gwb">
      <thead>
      <tr>
        <th colspan="2" class="text-center">{{gwb.naam}} in aantallen</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="d in data" :key="d.label">
        <td width="50%">{{d.label}}</td>
        <td width="50%" v-if="d.recent">{{d.recent.waarde.toLocaleString()}} {{d.na}}</td>
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
      'gwb'
    ])
  },
  watch: {
    'gwb' () {
      if (this.gwb) {
        this.updateData()
      }
    }
  },
  methods: {
    async updateData () {
      const meta = await util.getMeta()
      let data = inAantallen.map(async ia => {
        try {
          const iaMeta = meta.find(m => m.variabele === ia.variabele.toUpperCase())
          const cijfers = await util.getCijfers(this.gwb, iaMeta)
          return {
            label: ia.label,
            na: ia.na,
            ...cijfers
          }
        } catch (err) {
          console.log('Error', err)
          return {
            label: ia.label
          }
        }
      })
      this.data = await Promise.all(data)
    }
  },
  async created () {
    this.data = inAantallen.map(ia => ({label: ia.label}))
    this.updateData()
  }
}
</script>

<style scoped>
</style>
