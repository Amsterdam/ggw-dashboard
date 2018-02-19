<!--Example of a component that uses Leaflet-->
<template>
  <div class="map"></div>
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import proj4 from 'proj4'

const config = {
  rd: {
    code: 'EPSG:28992',
    projection: '+proj=sterea +lat_0=52.15616055555555 +lon_0=5.38763888888889 +k=0.9999079 +x_0=155000 +' +
    'y_0=463000 +ellps=bessel +units=m +towgs84=565.2369,50.0087,465.658,-0.406857330322398,0.3507326' +
    '76542563,-1.8703473836068,4.0812 +no_defs',
    transformation: {
      resolutions: [
        3440.640, 1720.320, 860.160, 430.080, 215.040, 107.520, 53.760, 26.880, 13.440, 6.720,
        3.360, 1.680, 0.840, 0.420, 0.210, 0.105, 0.0525
      ],
      bounds: [
        [-285401.92, 22598.08],
        [595301.9199999999, 903301.9199999999]
      ],
      origin: [-285401.92, 22598.08]
    }
  },
  wgs84: {
    code: 'EPSG:4326',
    projection: '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
  },
  earthRadius: 6378137 // The radius in meters
}

function rdToWgs84 (rdCoordinates) {
  // console.log('coordinates', rdCoordinates)
  const wgs84Coordinates = proj4(config.rd.projection, config.wgs84.projection,
    [rdCoordinates[0], rdCoordinates[1]])
  return [
    wgs84Coordinates[1], wgs84Coordinates[0]
  ]
}

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

      const coordinates = this.gwb.geometrie.coordinates[0]
      const wgs84Coordinates = coordinates[0].map(c => rdToWgs84(c))

      const style = {
        'color': 'red'
      }

      var latlngs = [wgs84Coordinates]
      gwbLayer = L.polygon(latlngs, style).addTo(map)
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
