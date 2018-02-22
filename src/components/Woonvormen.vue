<template>
  <div>
    <div v-for="(item, index) in data" :key="index">
      <h4>
        {{item.label}}
        {{item.recent.waarde.toLocaleString()}}
      </h4>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'

export default {
  name: 'Woonvormen',
  components: {
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
      this.data = await util.getConfigCijfers(this.gwb, this.config)
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
