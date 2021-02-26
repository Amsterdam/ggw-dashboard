<template>
  <div>
    <img v-if="url" :src="url">
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import panos from '../../static/links/panos'
import { base62DecodeAngle } from '../services/base62'

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
    /**
     * Find the most mathing pano for the current gwb
     */
    updatePano () {
      const pano =
        panos.find(p => p.gwb === this.gwb.volledige_code) ||
        (this.wijk && panos.find(p => p.gwb === this.wijk.volledige_code)) ||
        (this.gebied && panos.find(p => p.gwb === this.gebied.volledige_code)) ||
        PANO_DEFAULT
      const panoUrl = pano && pano.pano
      const panoFile = pano && pano.file

      // https://api.data.amsterdam.nl/panorama/thumbnail/TMX7316010203-000227_pano_0000_001160/?width=400&heading=135
      // https://data.amsterdam.nl/#?mpb=topografie&mpz=9&mpo=pano::T&mpv=52.4147109:4.8858658&sbf=BS&sbh=-FR&sbi=TMX7316010203-000317_pano_0000_004374&sbl=ZTGzH:3J5Kv&sbp=13

      let sbi, sbh
      try {
        sbi = panoUrl.match(/&sbi=([^&]*)/)[1]
        sbh = panoUrl.match(/&sbh=([^&]*)/)[1]
        sbh = Math.round(base62DecodeAngle(sbh, 1))
      } catch (error) {
        console.error('Missing pano for', this.gwb.volledige_code)
        sbi = 'TMX7316010203-000353_pano_0002_000059'
        sbh = 205
      }
      const width = 500
      const url = `https://api.data.amsterdam.nl/panorama/thumbnail/${sbi}/?width=${width}&heading=${sbh}`

      this.url = panoFile || url
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
    /**
     * The default pano is the pano that has an empty gwb field
     * This value will only be used if no gwb pano can be found
     */
    PANO_DEFAULT = panos.find(p => !p.gwb)
    this.updatePano()
  }
}
</script>

<style scoped>
  img {
    margin-top: 5px;
    width: 100%;
  }
</style>
