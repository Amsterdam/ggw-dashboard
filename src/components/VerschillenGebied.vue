<!--Example of a component that uses Leaflet-->
<template>
  <div class="row">
    <div class="col-sm">
      <div ref="map" class="map"></div>
    </div>
    <div class="col-sm">
      <b-form inline class="row">
        <div>
          <b-form-select v-model="variable"
                         @change="onVariable"
                         :options="variables"
                         text-field="label"
                         value-field="variable">
          </b-form-select>
          <b-form-select v-model="gebiedType"
                         @change="onGebiedType"
                         :options="gebiedTypes">
          </b-form-select>
        </div>
      </b-form>
      <div>
        <h4>Hoogst scorende</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="i in highest" :key="i.gebiedcode15">
            {{i.gwb.naam}}
            ({{i.waarde.toLocaleString()}})
          </li>
        </ul>
      </div>
      <div>
        <h4>Laagst scorende</h4>
        <ul class="list-group">
          <li class="list-group-item" v-for="i in lowest" :key="i.gebiedcode15">
            {{i.gwb.naam}}
            ({{i.waarde.toLocaleString()}})
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!--<div class="map"></div>-->
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { rdMultiPolygonToWgs84 } from '../services/geojson'
import util from '../services/util'
import positieOntwikkeling from '../../static/links/positie_en_ontwikkeling'

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
      variable: null,
      variables: [],
      gebiedType: null,
      gebiedTypes: ['Gebied', 'Wijk', 'Buurt'],
      lowest: [],
      highest: []
    }
  },
  methods: {
    onGebiedType (gebiedType) {
    },
    async onVariable (variable) {
    },
    async updateData () {
      if (!(this.gebiedType && this.variable)) {
        return
      }

      if (gwbLayer) {
        map.removeLayer(gwbLayer)
      }

      const gebiedCijfers = await util.getConfigCijfers(this.gwb, [this.variable])

      const recentYear = gebiedCijfers[0].recent.jaar

      let cijfers = await util.getAllCijfers(this.variable, recentYear)
      cijfers = cijfers[0].cijfers
      cijfers = cijfers.filter(c => c.waarde !== '' && util.getGebiedType(c.gebiedcode15) === this.gebiedType)
      cijfers = cijfers.sort((c1, c2) => c1.waarde - c2.waarde)

      const lowest = cijfers.slice(0, 5)
      const highest = cijfers.slice(cijfers.length - 5)
      const all = lowest.concat(highest)

      const gwbs = await Promise.all(all.map(async (c, i) => ({
        ...c,
        gwb: await util.getGwb(c.gebiedcode15),
        i
      })))

      this.lowest = gwbs.slice(0, 5).reverse()
      this.highest = gwbs.slice(5).reverse()

      const lowStyle = {
        'color': '#EC0000'
      }

      const highStyle = {
        'color': '#00A03C'
      }

      gwbLayer = L.featureGroup()
      gwbs.forEach(gwb => {
        const wgs84Geometrie = rdMultiPolygonToWgs84(gwb.gwb.geometrie)
        wgs84Geometrie.map(geometry => L.polygon(geometry.coordinates, gwb.i < 5 ? lowStyle : highStyle).addTo(gwbLayer))
      })
      gwbLayer.addTo(map)
      map.fitBounds(gwbLayer.getBounds())
    }
  },
  watch: {
    'gwb' () {
      if (this.gwb) {
        this.gebiedType = util.getGebiedType(this.gwb.volledige_code)
      }
    },
    'gebiedType' () {
      this.updateData()
    },
    'variable' () {
      this.updateData()
    }
  },
  async created () {
    const allMeta = await util.getMeta()

    this.variables = positieOntwikkeling.map(po => {
      const meta = allMeta.find(m => m.variabele === po.variabele.toUpperCase())
      if (meta) {
        return {
          label: po.label || meta.label,
          variable: meta
        }
      } else {
        return {
          label: po.label || po.variabele
        }
      }
    })

    this.gebiedType = util.getGebiedType(this.gwb.volledige_code)
  },
  mounted () {
    map = L.map(this.$refs.map).setView([52.373, 4.893], 12)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)
    // this.updateData()
  }
}
</script>

<style scoped>
  .map {height: 350px}
</style>
