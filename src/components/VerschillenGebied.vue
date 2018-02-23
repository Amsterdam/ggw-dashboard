<!--Example of a component that uses Leaflet-->
<template>
  <div class="row">
    <div class="col-sm-6">
      <b-form-select v-model="variable"
                     :options="variables"
                     text-field="label"
                     value-field="variable">
      </b-form-select>
      <div ref="map" class="map"></div>
      <div class="text-center">
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Gebied'}" v-on:click="setGebiedType('Gebied')">Gebieden</button>
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Wijk'}" v-on:click="setGebiedType('Wijk')">Wijken</button>
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Buurt'}" v-on:click="setGebiedType('Buurt')">Buurten</button>
      </div>
    </div>
    <div class="col-sm-6">
      <div v-if="loading">
        Laden gegevens...
      </div>
      <div v-else-if="gebiedType && variable && !cijfers.length">
        Geen cijfers beschikbaar
      </div>
      <div v-else>
        <div v-if="own && own.gebiedType === gebiedType && own.recent">
          <h4>Geselecteerde {{own.gebiedType.toLowerCase()}}</h4>
          <span class="font-weight-bold">{{ownIndex}}</span>
          {{own.gebied.naam}}: {{(own.recent.waarde || "").toLocaleString()}}
        </div>

        <div v-for="(item, index) in cijfers" :key="index">
          <h4 v-if="!(index % FRAGMENT)">
            {{index == 0 ? 'Hoogst' : 'Laagst'}} scorende {{gebiedType.toLowerCase()}}
          </h4>
          <div>
            <span class="font-weight-bold">{{index % FRAGMENT + 1}}</span>
            <span :class="{'highlight-own': item.gwb.naam === own.gebied.naam}">
              {{item.gwb.naam}}:
              {{(item.waarde || "").toLocaleString()}}
            </span>
          </div>
        </div>
      </div>

    </div>
  </div>
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
      'gwb',
      'gebied',
      'wijk',
      'buurt'
    ])
  },
  data () {
    return {
      FRAGMENT: 5,
      variable: null,
      variables: [],
      gebiedType: null,
      gebiedTypes: ['Gebied', 'Wijk', 'Buurt'],
      lowest: [],
      highest: [],
      own: null,
      ownIndex: null,
      cijfers: [],
      loading: false
    }
  },
  methods: {
    noCijfers () {
      this.loading = false
      this.cijfers = []
    },
    setGebiedType (type) {
      this.gebiedType = type
    },
    async getOwn () {
      if (!(this.gebiedType && this.variable)) {
        return
      }

      // Try to derive most recent year from the cijfers for the current gwb
      let gwb = this.gwb
      if (this.gebiedType === 'Buurt' && this.buurt) {
        gwb = this.buurt
      } else if (this.gebiedType === 'Wijk' && this.wijk) {
        gwb = this.wijk
      } else if (this.gebiedType === 'Gebied' && this.gebied) {
        gwb = this.gebied
      }
      const own = await util.getGebiedCijfers(this.variable, gwb, util.CIJFERS.LATEST)
      own.gebiedType = util.getGebiedType(own.recent.gebiedcode15)
      return own
    },
    async updateData () {
      if (!(this.gebiedType && this.variable)) {
        return
      }

      this.loading = true

      this.own = await this.getOwn()
      const recentYear = this.own.recent.jaar

      if (!recentYear) {
        return this.noCijfers()
      }

      // Sort and filter cijfers for gebiedType and waarde
      let cijfers = await util.getAllCijfers(this.variable, recentYear)
      cijfers = cijfers.filter(c => c.waarde !== '')
      cijfers = cijfers.filter(c => util.getGebiedType(c.gebiedcode15) === this.gebiedType)
      cijfers = cijfers.sort((c1, c2) => c2.waarde - c1.waarde)

      if (cijfers.length < 2 * this.FRAGMENT) {
        return this.noCijfers()
      }

      this.ownIndex = cijfers.findIndex(c => c.gebiedcode15 === this.own.recent.gebiedcode15) + 1

      // Get only the lowest and highest values
      const highest = cijfers.slice(0, this.FRAGMENT)
      const lowest = cijfers.slice(cijfers.length - this.FRAGMENT)
      const highLow = highest.concat(lowest)

      // Add gebieds info for the 10 remaining cijfers
      const gwbs = await Promise.all(highLow.map(async (c, i) => {
        const gwb = await util.getGwb(c.gebiedcode15)
        return {
          ...c,
          gwb
        }
      }))

      this.loading = false
      this.cijfers = gwbs
      this.showCijfers()
    },
    showCijfers () {
      if (gwbLayer) {
        map.removeLayer(gwbLayer)
      }

      if (!(this.gebiedType && this.variable)) {
        return
      }

      const gwbs = this.cijfers

      gwbLayer = L.featureGroup()
      gwbs.forEach((gwb, i) => {
        const wgs84Geometrie = rdMultiPolygonToWgs84(gwb.gwb.geometrie)
        wgs84Geometrie.map(geometry => L.polygon(geometry.coordinates, {'color': gwb.color}).addTo(gwbLayer))
      })

      if (this.own) {
        const wgs84Geometrie = rdMultiPolygonToWgs84(this.own.gebied.geometrie)
        wgs84Geometrie.map(geometry => L.polygon(geometry.coordinates, {'color': this.own.recent.color}).addTo(gwbLayer))
      }

      gwbLayer.addTo(map)
      map.fitBounds(gwbLayer.getBounds())
    }
  },
  watch: {
    async 'gwb' () {
      if (this.gwb) {
        this.gebiedType = util.getGebiedType(this.gwb.volledige_code)
        this.own = await this.getOwn()
        this.showCijfers()
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
    this.variables = await Promise.all(positieOntwikkeling.map(async po => {
      const meta = await util.getMeta(po.variabele)
      if (meta) {
        return {
          label: po.label || meta.label,
          variable: meta.variabele
        }
      } else {
        return {
          label: po.label || po.variabele
        }
      }
    }))

    this.gebiedType = util.getGebiedType(this.gwb.volledige_code)
  },
  mounted () {
    map = L.map(this.$refs.map).setView([52.373, 4.893], 12)
    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png').addTo(map)
  }
}
</script>

<style lang="scss" scoped>
@import "../../static/ams.scss";

.map {
  height: 350px;
  margin-top: 5px;
  margin-bottom: 5px;
}

.select {
  width: 100%;
}

.highlight-own {
  color: $ams-blauw
}
</style>
