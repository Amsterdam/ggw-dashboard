<template>
  <div class="centered">
    <table class="in-aantallen-table" v-if="gwb">
      <thead>
        <tr>
          <th colspan="2">{{ gwb.naam }} in aantallen</th>
        </tr>
      </thead>
      <tbody>
      <tr v-for="d in data" :key="d.label">
        <td width="50%">
          <tooltip :cijfers="data" :cijfer="d">{{ d.label }}</tooltip>
        </td>
        <td width="50%" v-if="d.recent">
          <tooltip :cijfers="data" :cijfer="d">{{ d.recent | displaywaarde }}</tooltip>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import tooltip from './Tooltip'

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
  components: {
    'tooltip': tooltip
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
      this.data = await util.getLatestConfigCijfers(this.gwb, inAantallen)
    }
  },
  created () {
    this.data = inAantallen.map(ia => ({ label: ia.label }))
    this.updateData()
  }
}
</script>

<style scoped>
  .in-aantallen-table {
    white-space: nowrap;
  }
</style>
