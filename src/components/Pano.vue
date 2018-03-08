<template>
  <div>
    <img v-if="url" :src="url" height="300px">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import panos from '../../static/links/panos'

let PANO_DEFAULT = null

export default {
  data () {
    return {
      url: null
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'gebied',
      'wijk',
      'buurt'
    ])
  },
  methods: {
    updatePano () {
      let pano =
        panos.find(p => p.gwb === this.gwb.volledige_code) ||
        (this.wijk && panos.find(p => p.gwb === this.wijk.volledige_code)) ||
        (this.gebied && panos.find(p => p.gwb === this.gebied.volledige_code)) ||
        PANO_DEFAULT
      this.url = pano && pano.pano
    }
  },
  watch: {
    'gwb' () {
      if (this.gwb) {
        this.updatePano()
      }
    }
  },
  created () {
    PANO_DEFAULT = panos.find(p => !p.gwb)
    this.updatePano()
  }
}
</script>

<style scoped>
</style>
