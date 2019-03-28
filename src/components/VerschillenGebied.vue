<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="mode_input selectie">
          <div class="invoer">
            <b-form-select v-model="variable"
                           :disabled="loading || drawing"
                           :options="variables || []"
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
    <div class="row">
      <div class="col-lg-7 pad-top-bottom ">
          <div :ref="mapRef" class="map"></div>
      </div>
      <div class="col-lg-5 pad-top-bottom marge-left ">
        <div v-if="gebiedType && variable && !highLow.length">
          Geen cijfers beschikbaar
        </div>
        <div v-else>
        <span v-if="cityCijfers" class="pad-top-bottom">
          <b>{{ cityCijfers.gebied.naam }}: {{ cityCijfers.recent | displaywaarde }}</b>
        </span>

        <div class="pad-top-bottom">
          <div v-if="own && own.gebiedType === gebiedType && own.recent">
            <span><b>Geselecteerde {{ own.gebiedType.toLowerCase() }}</b></span>
            <div class="listitem">
              <span class="itemrank">{{ ownIndex }}.</span> {{ own.gebied.naam }}: {{ own.recent | displaywaarde }}
            </div>
          </div>

          <div v-if="highLow.length > 1">
            <div class="subtitle">
              <b>Hoogst scorende {{ gebiedType.toLowerCase() }}</b>
            </div>
            <div class="listitem" :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in highestScores" :key="index">
              <span class="itemrank">{{ item.ranking }}.</span> {{ item.gwb.naam }}: {{ item | displaywaarde }}
            </div>
          </div>

          <div v-if="highLow.length > FRAGMENT">
            <div class="subtitle">
              <b>Laagst scorende {{ gebiedType.toLowerCase() }}</b>
            </div>
            <div class="listitem" :class="{'highlight-own': item.gwb.naam === own.gebied.naam}" v-for="(item, index) in lowestScores" :key="index">
              <span class="itemrank">{{ item.ranking }}.</span> {{ item.gwb.naam }}: {{ item | displaywaarde }}
            </div>
          </div>
        </div>
        </div>
        </div>
      </div>

      <b-row>
        <b-col cols="12">
          <fieldset class="mode_input text row_verplicht">
            <b-row class="antwoorden checkboxen">
              <div class="label">Filter</div>

              <b-col sm="12" lg="auto" class="antwoord">
                <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Stadsdeel'" @click="setGebiedType('Stadsdeel')" type="radio" name="gebiedFilter" id="0">
                <label for="0">Stadsdelen</label>
              </b-col>

              <b-col sm="12" lg="auto" class="antwoord">
                <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Gebied'" @click="setGebiedType('Gebied')" type="radio" name="gebiedFilter" id="1">
                <label for="1">Gebieden</label>
              </b-col>

              <b-col sm="12" lg="auto" class="antwoord">
                <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Wijk'" @click="setGebiedType('Wijk')" type="radio" name="gebiedFilter" id="2">
                <label for="2">Wijken</label>
              </b-col>

              <b-col sm="12" lg="auto" class="antwoord">
                <input :disabled="!variable || loading || drawing" :checked="gebiedType === 'Buurt'" @click="setGebiedType('Buurt')" type="radio" name="gebiedFilter" id="3">
                <label for="3">Buurten</label>
              </b-col>
            </b-row>
          </fieldset>
        </b-col>
      </b-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import util from '../services/util'
import { getShapes, drawShapes, amsMap } from '../services/map'
import { COLOR, getRankingColor } from '../services/colorcoding'

/**
 * The highest and lowest 5 cijfers are reported
 * @type {number}
 */
const FRAGMENT = 5

/**
 * The map that can show the results
 */
let map
/**
 * The layer that holds the results
 */
let gwbLayer = null

/**
 * Utility method to clear any previous results before showing new results
 */
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
    ]),

    highestScores () {
      return this.highLow.filter((number, index) => index < FRAGMENT)
    },

    lowestScores () {
      return this.highLow.filter((number, index) => index >= FRAGMENT)
    }
  },
  props: [
    'config'
  ],
  data () {
    return {
      FRAGMENT,
      variable: null,
      variables: [],
      gebiedType: util.GEBIED_TYPE.Stadsdeel,
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
    /**
     * Cleaning local data when no cijfers are available
     */
    noCijfers () {
      this.loading = false
      this.drawing = false
      this.highLow = []
      clearLayers()
    },

    /**
     * Updates the gebied type for which the results should be shown
     * @param type
     */
    setGebiedType (type) {
      this.gebiedType = type
      this.updateData()
    },

    /**
     * Allow the gebiedtype to follow the gebiedtype of the selected gwb
     */
    followGebiedtype () {
      if (this.gwb) {
        let gebiedType = util.getGebiedType(this.gwb.vollcode)
        if (gebiedType === util.GEBIED_TYPE.Stad) {
          gebiedType = util.GEBIED_TYPE.Stadsdeel
        }
        this.setGebiedType(gebiedType)
      }
    },

    /**
     * The results are compared against the 'own' data
     * The own data means the 'lowest' choosen value for buurt, wijk, gebied
     * The type of the shown results should then match the type of the currently selected one
     * @returns {Promise<*>}
     */
    async getOwn () {
      let gwb = this.gwb
      if (this.gebiedType === util.GEBIED_TYPE.Buurt && this.buurt) {
        gwb = this.buurt
      } else if (this.gebiedType === util.GEBIED_TYPE.Wijk && this.wijk) {
        gwb = this.wijk
      } else if (this.gebiedType === util.GEBIED_TYPE.Gebied && this.gebied) {
        gwb = this.gebied
      } else if (this.gebiedType === util.GEBIED_TYPE.Stadsdeel) {
        // Stadsdeel is not a selection so compare to any selected gebied
        gwb = this.gebied
      }
      // Return the most actual cijfers to the selected value (own)
      return util.getGebiedCijfers(this.variable, gwb, util.CIJFERS.LATEST)
    },

    /**
     * Update the shown results (data)
     * @returns {Promise<*|void>}
     */
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

      /**
       * Show the cijfers for the whole city
       */
      const city = await util.getCity()
      this.cityCijfers = await util.getGebiedCijfers(this.variable, city, util.CIJFERS.LATEST)

      this.own.gebiedType = util.getGebiedType(this.own.recent.gebiedcode15)

      /**
       * Show ths cijfers for the current selected gebied
       */
      const cijfers = await this.getCijfers(this.own.recent.jaar)

      this.loading = false

      if (cijfers) {
        this.cijferView(cijfers)
      }
    },

    /**
     * Gets the cijfers for the most recent year (which is the year for the currently selected gebied, wijk, buurt)
     * @param recentYear
     * @returns {Promise<*>}
     */
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
      /**
       * Default is that higher values indicates better
       * For some variables higher values however mean worse instead of better
       * So reverse the results for this type of variables
       */
      if (variableDetail.revert) {
        cijfers = cijfers.reverse()
      }

      /**
       * Provide for an index that denotes the ranking of each gebied
       */
      cijfers.forEach((c, i) => { c.ranking = i + 1 })

      /**
       * Find ranking for the currently selected gwb
       */
      this.ownIndex = cijfers.findIndex(c => c.gebiedcode15 === this.own.recent.gebiedcode15) + 1

      /**
       * Divide the list in high-low
       * If the list gets too small, show all cijfers in one fragment
       */
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
      const highLow = highest.concat(lowest)

      // Add gebieds info for the 10 remaining cijfers to show their names
      this.highLow = await Promise.all(highLow.map(async c => {
        const gwb = await util.getGwbSummary(c.gebiedcode15)
        return {
          ...c,
          gwb
        }
      }))

      return cijfers
    },

    /**
     * View the results, showing each geometry in it's z-score color or white if a reference is missing
     * @param cijfers
     * @returns {Promise<void>}
     */
    async cijferView (cijfers) {
      clearLayers()
      this.drawing = true

      const cijfersLookup = {}
      cijfers.forEach(cijfer => { cijfersLookup[cijfer.gebiedcode15] = cijfer })

      const getStyles = (gebiedcode15) => {
        const c = cijfersLookup[gebiedcode15]
        return {
          fillOpacity: 0.8,
          fillColor: c ? (c.color || getRankingColor(c.ranking - 1, cijfers.length - 1)) : COLOR['ams-wit'],
          color: COLOR['ams-donkergrijs'],
          opacity: 0.5,
          weight: 1
        }
      }

      const getTooltip = (polygon, gebiedcode15) => {
        const c = cijfersLookup[gebiedcode15]

        if (!c) {
          return
        }

        const { ranking, waarde } = c

        polygon.bindTooltip(`
          ranking: ${ranking}<br />
          score: ${waarde}
        `, { direction: 'top' })
      }

      const shapes = await getShapes(this.gebiedType, getStyles, getTooltip)

      this.showShapes(shapes)
    },

    /**
     * Show only the geometries of the current gebied type
     * Default is stadsdeel if no gebied type is set
     * The method is used at initialisation of the component only
     * Not used for now
     * @returns {Promise<void>}
     */
    async gwbView () {
      clearLayers()
      this.drawing = true

      const shapes = await getShapes(this.gebiedType || util.GEBIED_TYPE.Stadsdeel, () => ({
        'color': COLOR['ams-donkergrijs'],
        'opacity': 0.5,
        'weight': 1
      }))

      this.showShapes(shapes)
    },

    /**
     * Utility method to show shapes on the map
     * @param shapes
     */
    showShapes (shapes) {
      clearLayers()
      this.drawing = true

      gwbLayer = drawShapes(shapes, map)

      this.drawing = false
    },

    /**
     * Provide for a list of variable out of which the user can choose
     * The default variable choosen will be the first variable of the list
     * @returns {Promise<void>}
     */
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
      this.followGebiedtype()
    }
  },

  created () {
    /**
     * Provide for an intial map and list of variables to select from
     */
    this.showVariables()
    this.followGebiedtype()
  },

  mounted () {
    map = amsMap(this.$refs[this.mapRef])
  }
}
</script>

<style lang="scss" scoped>
@import "~amsterdam-stijl/dist/scss/ams-colorpalette";

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

  .row_verplicht {
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

  .subtitle {
    margin-bottom: .33rem;
    margin-top: .33rem;
  }

  .listitem {
    margin-left: .5rem;
  }

  .itemrank {
    float: left;
    width: 2.5rem;
    font-weight: bold;
  }

</style>
