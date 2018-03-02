<!--Example of a component that uses Leaflet-->
<template>
  <div class="map" :ref="mapRef"></div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getGWBShapes, drawShapes, amsMap } from '../services/map'
import { COLOR } from '../services/colorcoding'

let map
let gwbLayer = null

export default {
  computed: {
    ...mapGetters([
      'gwb'
    ])
  },
  data () {
    return {
      mapRef: `${this._uid}.map`
    }
  },
  methods: {
    async updateData () {
      if (gwbLayer) {
        map.removeLayer(gwbLayer)
      }

      if (!this.gwb) {
        return
      }

      const shapes = getGWBShapes(this.gwb, () => ({
        'color': COLOR['ams-rood']
      }))
      gwbLayer = drawShapes(shapes, map)
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  mounted () {
    map = amsMap(this.$refs[this.mapRef])
    this.updateData()
  }
}
</script>

<style scoped>
.map {height: 200px}
</style>
