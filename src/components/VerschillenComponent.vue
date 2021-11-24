<template>
  <div>
    <div class="row">
      <div class="col-12">
        <div class="mode_input selectie">
          <div class="invoer">
            <b-form-select v-model="variable"
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
        <span v-if="cityCijfers" class="pad-top-bottom">
          <b>aantal {{ cityCijfers.length }}</b>
        </span>

        </div>
      </div>
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

    getGebiedType (vollcode) {
      if (vollcode.match(/^\w$/)) {
        // stadsdeel
        return util.GEBIED_TYPE.Stadsdeel
      } else if (vollcode.match(/^DX\d{2}$/)) {
        // gebied
        return util.GEBIED_TYPE.Gebied
      } else if (vollcode.match(/^\w\d{2}$/)) {
        // wijk
        return util.GEBIED_TYPE.Wijk
      } else if (vollcode.match(/^\w\d{2}\w$/)) {
        // buurt
        return util.GEBIED_TYPE.Buurt
      }
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

      const gebied = await util.getGebiedCijfers(this.variable, this.gwb, util.CIJFERS.LATEST)

      console.log('this.gwb code', this.gwb.vollcode)

      const gebiedType = this.getGebiedType(this.gwb.vollcode)

      const cijfers = await this.getVerschillenCijfers(this.variable, gebiedType, gebied.cijfers.jaar)
      this.cityCijfers = cijfers
      this.loading = false

      if (cijfers) {
        this.cijferView(cijfers, gebiedType)
      }
    },

    /**
     * Gets the cijfers for the most recent year (which is the year for the currently selected gebied, wijk, buurt)
     * @param variable
     * @param gebiedType
     * @param recentYear
     * @returns {Promise<*>}
     */
    async getVerschillenCijfers (variable, gebiedType, recentYear) {
      console.log('getVerschillenCijfers', variable, gebiedType, recentYear)
      // Sort and filter cijfers for gebiedType and waarde
      let cijfers = await util.getAllCijfers(variable, recentYear)

      cijfers = cijfers.filter(c => c.waarde !== null)
      cijfers = cijfers.filter(c => c.jaar === recentYear)
      cijfers = cijfers.filter(c => util.getGebiedType(c.gebiedcode15) === gebiedType)
      cijfers = cijfers.sort((c1, c2) => c2.waarde - c1.waarde)

      if (cijfers.length <= 0) {
      }

      console.log('cijfers', cijfers)

      /**
       * Provide for an index that denotes the ranking of each gebied
       */
      cijfers.forEach((c, i) => { c.ranking = i + 1 })

      return cijfers
    },

    /**
     * View the results, showing each geometry in it's z-score color or white if a reference is missing
     * @param cijfers
     * @returns {Promise<void>}
     */
    async cijferView (cijfers, gebiedType) {
      clearLayers()
      this.drawing = true

      const cijfersLookup = {}
      cijfers.forEach(cijfer => { cijfersLookup[cijfer.gebiedcode15] = cijfer })

      const shapes = await getShapes(gebiedType, (gebiedcode15) => {
        const c = cijfersLookup[gebiedcode15]
        return {
          fillOpacity: 0.8,
          fillColor: c ? (c.color || getRankingColor(c.ranking - 1, cijfers.length - 1)) : COLOR['ams-wit'],
          color: COLOR['ams-donkergrijs'],
          opacity: 0.5,
          weight: 1
        }
      })

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
        const meta = await util.getMeta(po.indicatorDefinitieId)
        if (meta) {
          return {
            label: po.label || meta.label,
            variable: meta.indicatorDefinitieId,
            revert: meta.kleurenpalet === 2
          }
        } else {
          return {
            label: po.label || po.indicatorDefinitieId
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
      this.updateData()
      // this.followGebiedtype()
    }
  },

  created () {
    /**
     * Provide for an intial map and list of variables to select from
     */
    this.showVariables()
    // this.followGebiedtype()
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

  .antwoorden {
    margin: 0 auto;

    @media (max-width: 640px) {
      flex-direction: column;
    }
  }

  .antwoord {
    display: inline-block;
    flex: 1;
    margin-bottom: 0;

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