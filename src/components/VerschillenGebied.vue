<template>
  <div>
    <div class="grid-element">
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
      </div>
    </div>
    <div class="zone-clear clear"></div>
    <div class="grid-element">
      <div class="grid-blok grid_8 pad-top-bottom pull-up">
          <div :ref="mapRef" class="map"></div>
      </div>
      <div class="grid-blok grid_4 pad-top-bottom marge-left pull-up">
        <div v-if="gebiedType && variable && !highLow.length">
          Geen cijfers beschikbaar
        </div>
        <div v-else>
        <span v-if="cityCijfers" class="pad-top-bottom">
          <b>{{cityCijfers.gebied.naam}}: {{cityCijfers.recent | displaywaarde }}</b>
        </span>

        <div class="pad-top-bottom">
          <div v-if="own && own.gebiedType === gebiedType && own.recent">
            <span><b>Geselecteerde {{own.gebiedType.toLowerCase()}}</b></span>
            <ol :start="ownIndex">
              <li>
                {{own.gebied.naam}}: {{own.recent | displaywaarde}}
              </li>
            </ol>
          </div>

          <div v-if="highLow.length">
            <span>
              <b>Hoogst scorende {{gebiedType.toLowerCase()}}</b>
            </span>
            <div>
              <ol>
                <li :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in highLow" :key="index" v-if="index < FRAGMENT">
                  {{item.gwb.naam}}: {{item | displaywaarde}}
                </li>
              </ol>
            </div>
          </div>

          <div v-if="highLow.length > FRAGMENT">
            <span>
              <b>Laagst scorende {{gebiedType.toLowerCase()}}</b>
            </span>
            <div>
              <ol>
                <li :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in highLow" :key="index" v-if="index >= FRAGMENT">
                  {{item.gwb.naam}}: {{item | displaywaarde}}
                </li>
              </ol>
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>
      <div class="zone-clear clear"></div>
      <div class="grid-element">
        <div class="grid-blok grid_12">
          <fieldset class="rij mode_input text rij_verplicht">
            <div class="antwoorden checkboxen">
              <div class="label">
                <label for="gebiedFilter">Filter</label>
              </div>

              <div class="antwoord">
                <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Stadsdeel'" @click="setGebiedType('Stadsdeel')" type="radio" name="gebiedFilter" id="0">
                <label for="0">Stadsdelen</label>
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
        </div>
      </div>
    <div class="zone-clear clear"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import { getShapes, drawShapes, amsMap } from '../services/map'
import { COLOR } from '../services/colorcoding'

const FRAGMENT = 5

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
  props: [
    'config'
  ],
  data () {
    return {
      FRAGMENT,
      variable: null,
      variables: [],
      gebiedType: util.GEBIED_TYPE.Gebied,
      gebiedTypes: [
        util.GEBIED_TYPE.Stadsdeel,
        util.GEBIED_TYPE.Gebied,
        util.GEBIED_TYPE.Wijk,
        util.GEBIED_TYPE.Buurt
      ],
      lowest: [],
      highest: [],
      own: null,
      ownIndex: null,
      cityCijfers: null,
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
      if (this.gebiedType === util.GEBIED_TYPE.Buurt && this.buurt) {
        gwb = this.buurt
      } else if (this.gebiedType === util.GEBIED_TYPE.Wijk && this.wijk) {
        gwb = this.wijk
      } else if (this.gebiedType === util.GEBIED_TYPE.Gebied && this.gebied) {
        gwb = this.gebied
      } else if (this.gebiedType === util.GEBIED_TYPE.Stadsdeel) {
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
      if (!(this.own && this.own.recent && this.own.recent.jaar)) {
        // Unable to specify a search year...
        return this.noCijfers()
      }

      const city = await util.getCity()
      this.cityCijfers = await util.getGebiedCijfers(this.variable, city, util.CIJFERS.LATEST)

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

      if (cijfers.length <= 0) {
        return this.noCijfers()
      }

      const variableDetail = this.variables.find(v => v.variable === this.variable)
      if (variableDetail.revert) {
        cijfers = cijfers.reverse()
      }

      this.ownIndex = cijfers.findIndex(c => c.gebiedcode15 === this.own.recent.gebiedcode15) + 1

      let highest, lowest
      if (cijfers.length <= 2 * FRAGMENT) {
        // Show the whole list
        this.FRAGMENT = cijfers.length
        highest = cijfers
        lowest = []
      } else {
        // Get only the lowest and highest values
        this.FRAGMENT = FRAGMENT
        highest = cijfers.slice(0, this.FRAGMENT)
        lowest = cijfers.slice(cijfers.length - this.FRAGMENT)
      }
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

      const shapes = await getShapes(this.gebiedType || util.GEBIED_TYPE.Gebied, () => ({
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
      const variables = await Promise.all(this.config.map(async po => {
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
      this.variable = this.variables[0].variable
    }

  },
  watch: {
    'variable' () {
      this.updateData()
    },
    'gwb' () {
      if (this.gwb) {
        const gebiedType = util.getGebiedType(this.gwb.vollcode)
        this.setGebiedType(gebiedType)
      }
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
    height: 25rem;
  }

  .highlight-own {
    color: $ams-blauw;
  }

  .antwoord {
    display: inline-block;
    width: 20%;

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

  ol {
    margin: .33rem;
  }

  .marge-left {
    padding-left: .33rem;
  }

  .pull-up {
    margin-top: -1rem;
  }

</style>
