<template>
  <div class="header-filter">
    <div class="row mode_input selectie">
      <div class="label">
        <label for="selectGebied">Gebied</label>
      </div>
      <div class="invoer">
        <b-form-select v-model="selection.gebied"
                       :disabled="HTTPStatus.pending > 0 || !selection.gebieden"
                       @change="updateGebied"
                       :options="selection.gebieden || []"
                       text-field="display"
                       value-field="vollcode"
                       id="selectGebied">
        </b-form-select>
      </div>
    </div>

    <div class="row mode_input selectie">
      <div class="label">
        <label for="selectWijk">Wijk</label>
      </div>
      <div class="invoer">
        <b-form-select v-model="selection.wijk"
                       :disabled="HTTPStatus.pending > 0 || !selection.wijken"
                       @change="updateWijk"
                       :options="selection.wijken || []"
                       text-field="display"
                       value-field="vollcode"
                       id="selectWijk">

          <template slot="first" v-if="!selection.wijken">
            <!-- this slot appears above the options from 'options' prop -->
            <option :value="null" disabled>geen wijk geselecteerd</option>
          </template>
        </b-form-select>
      </div>
    </div>

    <div class="row mode_input selectie">
      <div class="label">
        <label for="selectBuurt">Buurt</label>
      </div>
      <div class="invoer">
        <b-form-select v-model="selection.buurt"
                       :disabled="HTTPStatus.pending > 0 || !selection.buurten"
                       @change="updateBuurt"
                       :options="selection.buurten || []"
                       text-field="display"
                       value-field="vollcode"
                       id="selectBuurt">
          <template slot="first" v-if="!selection.buurten">
            <!-- this slot appears above the options from 'options' prop -->
            <option :value="null" disabled>geen buurt geselecteerd</option>
          </template>
        </b-form-select>
      </div>
    </div>

    <div class="row mode_input selectie">
      <div class="label">
        <label for="selectThema">Thema</label>
      </div>
      <div class="invoer">
        <b-form-select v-model="selection.thema"
                       :disabled="HTTPStatus.pending > 0 || !selection.themas"
                       @change="updateThema"
                       :options="selection.themas || []"
                       text-field="text"
                       value-field="id"
                       id="selectThema">
        </b-form-select>
      </div>
    </div>
    <div class="absolute-loader">
      <span v-if="HTTPStatus.error > 0" class="error">Sommige gegevens kunnen incompleet zijn.</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import util from '../../services/util'
import { HTTPStatus } from '../../services/datareader'
import { THEMAS, IN_HET_KORT } from '../../services/thema'

/**
 * Provides for a selection of None, for all gebieden, wijken and buurten
 * @param title gebied, wijk or buurt => gebieden, wijken, buurten
 * @param display override for derivation of title
 * @returns {{display: *|string, vollcode: null}}
 */
function getSelectNone (title, display = null) {
  return {
    display: display || `geen ${title} geselecteerd`,
    vollcode: null
  }
}

export default {
  name: 'GGWSelector',
  components: {
  },
  data () {
    return {
      selection: {
        gebieden: null,
        gebied: null,
        wijken: null,
        wijk: null,
        buurten: null,
        buurt: null,
        themas: THEMAS,
        thema: null
      },
      gebiedDetail: null,
      wijkDetail: null,
      buurtDetail: null,
      themaDetail: null,
      HTTPStatus
    }
  },
  computed: {
    ...mapGetters([
    ])
  },
  methods: {
    ...mapActions({
      setGebied: 'setGebied',
      setWijk: 'setWijk',
      setBuurt: 'setBuurt',
      setGWB: 'setGWB',
      setThema: 'setThema'
    }),

    /**
     * When a gebied is choosen
     * Defaults to Amsterdam when gebied = null
     * @param gebiedCode
     * @param wijkCode
     * @returns {Promise<void>}
     */
    async updateGebied (gebiedCode, wijkCode = null) {
      this.wijkDetail = null
      this.selection.wijk = null
      this.selection.wijken = null

      this.buurtDetail = null
      this.selection.buurt = null
      this.selection.buurten = null
      if (gebiedCode) {
        const gebied = this.selection.gebieden.find(g => g.vollcode === gebiedCode)

        this.gebiedDetail = await util.getDetail(gebied)

        if (gebied.gebiedType !== 'Stadsdeel') {
          const wijken = await util.getWijken(gebied)
          this.selection.wijken = [getSelectNone('wijk')].concat(wijken)
        }
      } else {
        const gebied = await util.getCity()
        this.gebiedDetail = gebied
        this.selection.gebied = null
      }

      if (!wijkCode) {
        this.updateState()
      }
    },

    async updateWijk (wijkCode, buurtCode = null) {
      this.buurtDetail = null
      this.selection.buurt = null
      this.selection.buurten = null

      if (wijkCode) {
        const wijk = this.selection.wijken.find(w => w.vollcode === wijkCode)

        this.wijkDetail = await util.getDetail(wijk)

        const buurten = await util.getBuurten(wijk)
        this.selection.buurten = [getSelectNone('buurt')].concat(buurten)
      } else {
        this.wijkDetail = null
      }

      if (!buurtCode) {
        this.updateState()
      }
    },

    async updateBuurt (buurtCode) {
      if (buurtCode) {
        const buurt = this.selection.buurten.find(b => b.vollcode === buurtCode)

        this.buurtDetail = await util.getDetail(buurt)
      } else {
        this.buurtDetail = null
      }

      this.updateState()
    },

    async updateThema (themaId) {
      this.selection.thema = themaId
      this.themaDetail = this.selection.thema
      this.updateState()
    },

    /**
     * The state is updated at the end of the selection of gebied, wijk, buurt
     * and after selecting a thema
     */
    updateState () {
      this.setGebied(this.gebiedDetail)
      this.setWijk(this.wijkDetail)
      this.setBuurt(this.buurtDetail)
      this.setGWB(this.buurtDetail || this.wijkDetail || this.gebiedDetail)
      this.setThema(this.themaDetail)
      this.updateUrl()
    },

    /**
     * To allow for a browser refresh, the url reflects the selected gebied, wijk, buurt and thema
     */
    updateUrl () {
      this.$router.push({
        name: this.$route.name,
        query: {
          gebied: this.selection.gebied || 'all',
          wijk: this.selection.wijk,
          buurt: this.selection.buurt,
          thema: this.selection.thema
        }
      })
    },

    /**
     * On load the url is parsed to restore the state
     * @returns {Promise<void>}
     */
    async parseRoute () {
      const { gebied, wijk, buurt, thema } = this.$route.query

      this.selection.thema = thema || IN_HET_KORT
      this.updateThema(this.selection.thema)

      this.selection.gebied = gebied === 'all' ? null : (gebied || 'DX01')
      await this.updateGebied(this.selection.gebied, wijk)

      if (wijk) {
        this.selection.wijk = wijk
        await this.updateWijk(this.selection.wijk, buurt)

        if (buurt) {
          this.selection.buurt = buurt
          this.updateBuurt(this.selection.buurt)
        }
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // console.log('Route changed from', from, to)
    }
  },
  async created () {
    // const allStadsdelen = await util.getAllStadsdelen()

    this.selection.gebieden = [getSelectNone('gebied', 'Amsterdam')]
      // .concat({ display: 'Centrum', gebiedType: 'Stadsdeel', vollcode: 'A', _links: { self: { href: 'https://api.data.amsterdam.nl/gebieden/stadsdeel/03630000000018/' } } })
      .concat(await util.getAllStadsdelen())
      .concat(await util.getAllGebieden())

    this.parseRoute()
  }
}
</script>

<style lang="scss" scoped>
  @import "~amsterdam-stijl/dist/scss/ams-breakpoints";
  @import "~amsterdam-stijl/dist/scss/ams-colorpalette";

  .invoer {
    margin-bottom: .5rem;
  }

  select {
    width: 100%;
    padding: .4rem;
  }

  .absolute-loader {
    position: absolute;
    right: 1rem;
    top: -3rem;
    padding: .5rem;
    color: $ams-oranje;
  }

</style>
