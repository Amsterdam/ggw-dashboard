<template>
  <div>
    <div class="Notification-grijs" v-for="(item, index) in data" :key="index">
      {{item.label}}
      <span v-if="item.recent"
        v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left title="">
        {{item.recent | displaywaarde}}
      </span>
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
