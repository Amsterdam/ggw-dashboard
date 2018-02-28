<!--Example of a component that uses Leaflet-->
<template>
  <div class="map"></div>
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { rd, rdMultiPolygonToWgs84, tileLayer } from '../services/geojson'

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
    map = L.map(this.$el, {
      crs: rd,
      zoomControl: false,
      scrollWheelZoom: false
    }).setView([52.35, 4.9], 12)

    map.addLayer(tileLayer())

    this.updateData()
  }
}
</script>

<style scoped>
.map {height: 200px}
</style>
