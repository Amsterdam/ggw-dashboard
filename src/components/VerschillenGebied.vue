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
        <!--<button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Stadsdeel'}" v-on:click="setGebiedType('Stadsdeel')">Stadsdelen</button>-->
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Gebied'}" @click="setGebiedType('Gebied')">Gebieden</button>
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Wijk'}" @click="setGebiedType('Wijk')">Wijken</button>
        <button class="btn" :disabled="!variable" :class="{'btn-primary': gebiedType === 'Buurt'}" @click="setGebiedType('Buurt')">Buurten</button>
      </div>
    </div>
    <div class="col-sm-6">
      <div v-if="loading">
        Laden gegevens...
      </div>
      <div v-else-if="gebiedType && variable && !highLow.length">
        Geen cijfers beschikbaar
      </div>
      <div v-else>
        <div v-if="own && own.gebiedType === gebiedType && own.recent">
          <h4>Geselecteerde {{own.gebiedType.toLowerCase()}}</h4>
          <span class="font-weight-bold">{{ownIndex}}</span>
          {{own.gebied.naam}}:
          <span
            v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left
            title="">
            {{own.recent | displaywaarde}}
          </span>
        </div>

        <div v-for="(item, index) in highLow" :key="index">
          <h4 v-if="!(index % FRAGMENT)">
            {{index === 0 ? 'Hoogst' : 'Laagst'}} scorende {{gebiedType.toLowerCase()}}
          </h4>
          <div>
            <span class="font-weight-bold">{{index % FRAGMENT + 1}}</span>
            <span :class="{'highlight-own': item.gwb.naam === own.gebied.naam}">
              {{item.gwb.naam}}:
              <span
                v-b-tooltip.hover v-b-tooltip.click v-b-tooltip.left
                title="">
                {{item | displaywaarde}}
              </span>
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
import { rd, tileLayer } from '../services/geojson'
import util from '../services/util'
import { getShapes } from '../services/map'
import positieOntwikkeling from '../../static/links/positie_en_ontwikkeling'

let map
let gwbLayer = null

function clearLayers () {
  if (gwbLayer) {
    map.removeLayer(gwbLayer)
  }
  gwbLayer = null
}

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
      gebiedType: 'Gebied',
      gebiedTypes: ['Gebied', 'Wijk', 'Buurt'],
      lowest: [],
      highest: [],
      own: null,
      ownIndex: null,
      highLow: [],
      loading: false
    }
  },
  methods: {
    noCijfers () {
      this.loading = false
      this.highLow = []
      clearLayers()
    },

    setGebiedType (type) {
      this.gebiedType = type
      this.updateData()
    },

    async getOwn () {
      // Try to derive most recent year from the cijfers for the current gwb
      let gwb = this.gwb
      if (this.gebiedType === 'Buurt' && this.buurt) {
        gwb = this.buurt
      } else if (this.gebiedType === 'Wijk' && this.wijk) {
        gwb = this.wijk
      } else if (this.gebiedType === 'Gebied' && this.gebied) {
        gwb = this.gebied
      }

      return util.getGebiedCijfers(this.variable, gwb, util.CIJFERS.LATEST)
    },

    async updateData () {
      if (!this.variable) {
        return this.noCijfers()
      }

      clearLayers()
      this.loading = true

      this.own = await this.getOwn()
      if (!this.own && this.own.recent && this.own.recent.jaar) {
        // Unable to specify a search year...
        return this.noCijfers()
      }

      this.own.gebiedType = util.getGebiedType(this.own.recent.gebiedcode15)

      const cijfers = await this.getCijfers(this.own.recent.jaar)

      this.loading = false

      this.cijferView(cijfers)
    },

    async getCijfers (recentYear) {
      // Sort and filter cijfers for gebiedType and waarde
      let cijfers = await util.getAllCijfers(this.variable, recentYear)
      cijfers = cijfers.filter(c => c.waarde !== null)
      cijfers = cijfers.filter(c => util.getGebiedType(c.gebiedcode15) === this.gebiedType)
      cijfers = cijfers.sort((c1, c2) => c2.waarde - c1.waarde)

      if (cijfers.length < 2 * this.FRAGMENT) {
        // At least 5 low and high are expected
        return this.noCijfers()
      }

      this.ownIndex = cijfers.findIndex(c => c.gebiedcode15 === this.own.recent.gebiedcode15) + 1

      // Get only the lowest and highest values
      const highest = cijfers.slice(0, this.FRAGMENT)
      const lowest = cijfers.slice(cijfers.length - this.FRAGMENT)
      const highLow = highest.concat(lowest.reverse())

      // Add gebieds info for the 10 remaining cijfers
      this.highLow = await Promise.all(highLow.map(async c => {
        const gwb = await util.getGwbSummary(c.gebiedcode15)
        return {
          ...c,
          gwb
        }
      }))

      return cijfers
    },

    async cijferView (cijfers) {
      const cijfersLookup = {}
      cijfers.forEach(cijfer => { cijfersLookup[cijfer.gebiedcode15] = cijfer })

      const shapes = await getShapes(this.gebiedType, (gebiedcode15) => {
        const c = cijfersLookup[gebiedcode15]
        return {
          'fillOpacity': 0.8,
          'fillColor': (c && c.color) || 'white',
          'color': 'gray',
          'opacity': 0.5,
          'weight': 1
        }
      })

      this.showShapes(shapes)
    },

    async gwbView () {
      clearLayers()

      const shapes = await getShapes(this.gebiedType || 'Gebied', () => ({
        'color': 'gray',
        'opacity': 0.5,
        'weight': 1
      }))

      this.showShapes(shapes)
    },

    showShapes (shapes) {
      clearLayers()
      gwbLayer = L.featureGroup()
      shapes.forEach(shape => shape.addTo(gwbLayer))
      gwbLayer.addTo(map)
      map.fitBounds(gwbLayer.getBounds())
    },

    async showVariables () {
      const variables = await Promise.all(positieOntwikkeling.map(async po => {
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
      this.variables = variables
    }

  },
  watch: {
    async 'gwb' () {
      if (this.gwb) {
        this.own.gebiedType = util.getGebiedType(this.gwb.volledige_code)
        // this.gebiedType = util.getGebiedType(this.gwb.volledige_code)
        // Update of the map takes too much time to follow the gebied type
        // this.updateData()
      }
    },
    'variable' () {
      this.updateData()
    }
  },

  created () {
    this.showVariables()
    this.gwbView()
  },

  mounted () {
    map = L.map(this.$refs.map, {
      crs: rd,
      zoomControl: true,
      scrollWheelZoom: false
    }).setView([52.35, 4.9], 6)

    map.addLayer(tileLayer())
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
