<template>
  <ul>
    <li v-for="(item, index) in data" :key="index">
      <tooltip :cijfers="data" :cijfer="item">
      {{item.label}}
      <span v-if="item.recent">
        {{item.recent | displaywaarde}}
      </span>
      </tooltip>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
import tooltip from './Tooltip'
import util from '../services/util'

export default {
  name: 'Woonvormen',
  components: {
    'tooltip': tooltip
  },
  props: [
    'config'
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
  methods: {
    async updateData () {
      this.data = await util.getLatestConfigCijfers(this.gwb, this.config)
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
