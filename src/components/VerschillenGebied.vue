<!--Example of a component that uses Leaflet-->
<template>
  <div class="grid-element">
    <div class="grid-blok grid_12">
      <div class="rij mode_input selectie">
        <div class="invoer">
          <b-form-select v-model="variable"
                           :options="variables"
                           text-field="label"
                           value-field="variable">
              <template slot="first">
                <!-- this slot appears above the options from 'options' prop -->
                <option :value="null" disabled>-- Selecteer een categorie --</option>
              </template>
          </b-form-select>
        </div>
      </div>
      <div ref="map" class="map"></div>


      <fieldset class="rij mode_input text rij_verplicht">
        <div class="antwoorden checkboxen">
          <div class="label">
            <label for="gebiedFilter">Filter</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable" :checked="gebiedType === 'Gebied'" @click="setGebiedType('Gebied')" type="radio" name="gebiedFilter" id="1">
            <label for="1">Gebieden</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable" :checked="gebiedType === 'Wijk'" @click="setGebiedType('Wijk')" type="radio" name="gebiedFilter" id="2">
            <label for="2">Wijken</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable" :checked="gebiedType === 'Buurt'" @click="setGebiedType('Buurt')" type="radio" name="gebiedFilter" id="3">
            <label for="3">Buurten</label>
          </div>
        </div>
      </fieldset>

      <loading-component :simple="true" v-if="loading"></loading-component>
      <div v-else-if="gebiedType && variable && !highLow.length" class="grid-wrapper wrapper_12 alert-wrapper bgcolor_orange">
        <div class="grid-container container_12 grid-alerts ">
          <div class="melding rich-content">
            Geen cijfers beschikbaar
          </div>
        </div>
      </div>
      <div v-else>
        <table v-if="own && own.gebiedType === gebiedType && own.recent">
          <thead>
            <tr>
              <th colspan="3">
                Geselecteerde {{own.gebiedType.toLowerCase()}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ownIndex}}</td>
              <td>{{own.gebied.naam}}</td>
              <td>{{own.recent | displaywaarde}}</td>
            </tr>
          </tbody>
        </table>

        <table v-if="highLow.length">
          <thead>
          <tr>
            <th colspan="3">
              Hoogst scorende {{gebiedType.toLowerCase()}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in highLow" :key="index" v-if="index < FRAGMENT">
            <td>{{index % FRAGMENT + 1}}</td>
            <td>{{item.gwb.naam}}</td>
            <td>{{item | displaywaarde}}</td>
          </tr>
          </tbody>
        </table>

        <table v-if="highLow.length">
          <thead>
          <tr>
            <th colspan="3">
              Laagst scorende {{gebiedType.toLowerCase()}}
            </th>
          </tr>
          </thead>
          <tbody>
          <tr :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in highLow" :key="index" v-if="index >= FRAGMENT">
            <td>{{index % FRAGMENT + 1}}</td>
            <td>{{item.gwb.naam}}</td>
            <td>{{item | displaywaarde}}</td>
          </tr>
          </tbody>
        </table>
        </div>
      </div>
    </div>
</template>

<script>
import L from 'leaflet'
import { mapGetters } from 'vuex'
import { rd, rdMultiPolygonToWgs84, tileLayer } from '../services/geojson'
import util from '../services/util'
import positieOntwikkeling from '../../static/links/positie_en_ontwikkeling'
import loadingComponent from './LoadingComponent'

let map
let gwbLayer = null

function clearLayers () {
  if (gwbLayer) {
    map.removeLayer(gwbLayer)
  }
  gwbLayer = null
}

export default {
  components: {
    'loading-component': loadingComponent
  },
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
      this.loading = true

      if (this.gebiedType && !this.variable) {
        this.initialView()
        return this.noCijfers()
      } else if (!(this.gebiedType && this.variable)) {
        return this.noCijfers()
      }

      this.own = await this.getOwn()
      if (!this.own) {
        return this.noCijfers()
      }

      const recentYear = this.own.recent && this.own.recent.jaar
      if (!recentYear) {
        return this.noCijfers()
      }

      this.own.gebiedType = util.getGebiedType(this.own.recent.gebiedcode15)

      // Sort and filter cijfers for gebiedType and waarde
      let cijfers = await util.getAllCijfers(this.variable, recentYear)
      cijfers = cijfers.filter(c => c.waarde !== null)
      cijfers = cijfers.filter(c => util.getGebiedType(c.gebiedcode15) === this.gebiedType)
      cijfers = cijfers.sort((c1, c2) => c2.waarde - c1.waarde)

      if (cijfers.length < 2 * this.FRAGMENT) {
        return this.noCijfers()
      }

      this.ownIndex = cijfers.findIndex(c => c.gebiedcode15 === this.own.recent.gebiedcode15) + 1

      // Get only the lowest and highest values
      const highest = cijfers.slice(0, this.FRAGMENT)
      const lowest = cijfers.slice(cijfers.length - this.FRAGMENT)
      const highLow = highest.concat(lowest.reverse())

      // Add gebieds info for the 10 remaining cijfers
      const highLowGwbs = await Promise.all(highLow.map(async c => {
        const gwb = await util.getGwb(c.gebiedcode15)
        return {
          ...c,
          gwb
        }
      }))

      this.loading = false
      this.highLow = highLowGwbs
      clearLayers()

      gwbLayer = L.featureGroup()
      cijfers.forEach(c => {
        util.getGwb(c.gebiedcode15).then(gwb => {
          const wgs84Geometrie = rdMultiPolygonToWgs84(gwb.geometrie)
          wgs84Geometrie.map(geometry => {
            const shape = L.polygon(geometry.coordinates, {
              'fillOpacity': 0.8,
              'fillColor': c.color,
              'color': 'gray',
              'opacity': 0.5,
              'weight': 1
            })
            shape.addTo(gwbLayer)
          })
        })
      })
      gwbLayer.addTo(map)
    },
    async initialView () {
      // const getGebieden = {
      //   'Gebied': util.getAllGebieden,
      //   'Wijk': util.getAllWijken,
      //   'Buurt': util.getAllBuurten
      // }
      //
      // const gebieden = await getGebieden[this.gebiedType]()
      //
      // clearLayers()
      // gwbLayer = L.featureGroup()
      // gebieden.forEach(g => {
      //   util.getGwb(g.vollcode).then(gwb => {
      //     const wgs84Geometrie = rdMultiPolygonToWgs84(gwb.geometrie)
      //     wgs84Geometrie.map(geometry => {
      //       const shape = L.polygon(geometry.coordinates, {
      //         'color': 'gray',
      //         'opacity': 0.5,
      //         'weight': 1
      //       })
      //       shape.addTo(gwbLayer)
      //     })
      //   })
      // })
      // gwbLayer.addTo(map)
    }
  },
  watch: {
    async 'gwb' () {
      if (this.gwb) {
        this.setGebiedType(util.getGebiedType(this.gwb.volledige_code))
      }
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
    this.initialView()
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
@import "~stijl/src/styles/generic/ams-colorpalette.scss";

  .map {
    height: 350px;
    margin-top: 5px;
    margin-bottom: 5px;
  }

  table {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .highlight-own {
    background-color: $ams-blauw;
  }

  .antwoord {
    display: inline-block;
    width: 25%;

    input, label {
      cursor: pointer;
    }
  }

  .rij_verplicht {
    +.alert-wrapper {
      padding-top: 0;
      margin-top: -1rem;
    }
  }
</style>
