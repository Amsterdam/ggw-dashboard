<!--Example of a component that uses Leaflet-->
<template>
    <div class="grid-blok grid_12">
      <div class="rij mode_input selectie">
        <div class="invoer">
          <b-form-select v-model="variable"
                         :disabled="loading || drawing"
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
      <div :ref="mapRef" class="map"></div>

      <fieldset class="rij mode_input text rij_verplicht">
        <div class="antwoorden checkboxen">
          <div class="label">
            <label for="gebiedFilter">Filter</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Gebied'" @click="setGebiedType('Gebied')" type="radio" name="gebiedFilter" id="1">
            <label for="1">Gebieden</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Wijk'" @click="setGebiedType('Wijk')" type="radio" name="gebiedFilter" id="2">
            <label for="2">Wijken</label>
          </div>

          <div class="antwoord">
            <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Buurt'" @click="setGebiedType('Buurt')" type="radio" name="gebiedFilter" id="3">
            <label for="3">Buurten</label>
          </div>
        </div>
      </fieldset>

      <div v-if="!loading && gebiedType && variable && !highLow.length" class="grid-wrapper wrapper_12 alert-wrapper bgcolor_orange">
        <div class="grid-container container_12 grid-alerts ">
          <div class="melding rich-content">
            Geen cijfers beschikbaar
          </div>
        </div>
      </div>
      <div v-else>
        <div class="grid-blok grid_12 align-center">
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
        </div>
        <div class="grid-blok grid_6 align-right">
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
        </div>

        <div class="grid-blok grid_6">
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
import { mapGetters } from 'vuex'
import util from '../services/util'
import { getShapes, drawShapes, amsMap } from '../services/map'
import { COLOR } from '../services/colorcoding'
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
      loading: false,
      drawing: false,
      mapRef: `${this._uid}.map`
    }
  },
  methods: {
    noCijfers () {
      this.loading = false
      this.drawing = false
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

      this.loading = true
      clearLayers()

      this.own = await this.getOwn()
      if (!this.own && this.own.recent && this.own.recent.jaar) {
        // Unable to specify a search year...
        return this.noCijfers()
      }

      this.own.gebiedType = util.getGebiedType(this.own.recent.gebiedcode15)

      const cijfers = await this.getCijfers(this.own.recent.jaar)

      this.loading = false

      if (cijfers) {
        this.cijferView(cijfers)
      }
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

      const variableDetail = this.variables.find(v => v.variable === this.variable)
      if (variableDetail.revert) {
        cijfers = cijfers.reverse()
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
      clearLayers()
      this.drawing = true

      const cijfersLookup = {}
      cijfers.forEach(cijfer => { cijfersLookup[cijfer.gebiedcode15] = cijfer })

      const shapes = await getShapes(this.gebiedType, (gebiedcode15) => {
        const c = cijfersLookup[gebiedcode15]
        return {
          'fillOpacity': 0.8,
          'fillColor': (c && c.color) || COLOR['ams-wit'],
          'color': COLOR['ams-donkergrijs'],
          'opacity': 0.5,
          'weight': 1
        }
      })

      this.showShapes(shapes)
    },

    async gwbView () {
      clearLayers()
      this.drawing = true

      const shapes = await getShapes(this.gebiedType || 'Gebied', () => ({
        'color': COLOR['ams-donkergrijs'],
        'opacity': 0.5,
        'weight': 1
      }))

      this.showShapes(shapes)
    },

    showShapes (shapes) {
      clearLayers()
      this.drawing = true

      gwbLayer = drawShapes(shapes, map)

      this.drawing = false
    },

    async showVariables () {
      const variables = await Promise.all(positieOntwikkeling.map(async po => {
        const meta = await util.getMeta(po.variabele)
        if (meta) {
          return {
            label: po.label || meta.label,
            variable: meta.variabele,
            revert: meta.kleurenpalet === 2
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
    'variable' () {
      this.updateData()
    }
  },

  created () {
    this.showVariables()
    this.gwbView()
  },

  mounted () {
    map = amsMap(this.$refs[this.mapRef])
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
    margin: 1rem;
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
