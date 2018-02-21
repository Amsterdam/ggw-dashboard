<!--Example of a component that uses Leaflet-->
<template>
  <div class="map"></div>
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { rdMultiPolygonToWgs84 } from '../services/geojson'

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

      const wgs84Geometrie = rdMultiPolygonToWgs84(this.gwb.geometrie)

      const style = {
        'color': '#EC0000'
      }

      gwbLayer = L.featureGroup()
      wgs84Geometrie.map(geometry => L.polygon(geometry.coordinates, style).addTo(gwbLayer))
      gwbLayer.addTo(map)
      map.fitBounds(gwbLayer.getBounds())
    }
  },
  watch: {
    'gwb' () {
      this.updateData()
    }
  },
  mounted () {
    map = L.map(this.$el).setView([52.373, 4.893], 12)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)
    this.updateData()
  }
}
</script>

<style scoped>
.map {height: 200px}
</style>
