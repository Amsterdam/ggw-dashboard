<!--Example of a component that uses Leaflet-->
<template>
  <div class="map"></div>
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
    map = amsMap(this.$el)
    this.updateData()
  }
}
</script>

<style scoped>
.map {height: 200px}
</style>
