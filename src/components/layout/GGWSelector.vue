<!--Example of a component that uses D3-->
<template>
  <div class="alert">
    <div class="row">
      <div class="col-sm">
        <b-form inline class="row">
          <div class="col-sm-3">
            <label for="selectGebied">Gebied</label>
          </div>
          <div class="col-sm-9" v-if="selection.gebieden">
            <b-form-select v-model="selection.gebied"
                           @change="updateGebied"
                           :options="selection.gebieden"
                           text-field="display"
                           value-field="vollcode"
                           id="selectGebied">
            </b-form-select>
          </div>
        </b-form>
        <b-form inline class="row">
          <div class="col-sm-3">
            <label for="selectWijk">Wijk</label>
          </div>
          <div class="col-sm-9" v-if="selection.wijken">
            <b-form-select v-model="selection.wijk"
                           @change="updateWijk"
                           :options="selection.wijken"
                           text-field="display"
                           value-field="vollcode"
                           id="selectWijk">
            </b-form-select>
          </div>
        </b-form>
        <b-form inline class="row">
          <div class="col-sm-3">
            <label for="selectBuurt">Buurt</label>
          </div>
          <div class="col-sm-9" v-if="selection.buurten">
            <b-form-select v-model="selection.buurt"
                           @change="updateBuurt"
                           :options="selection.buurten"
                           text-field="display"
                           value-field="vollcode"
                           id="selectBuurt">
            </b-form-select>
          </div>
        </b-form>
      </div>
      <div class="col-sm">
        <b-form inline class="row">
          <div class="col-sm-3">
            <label for="selectThema">Thema</label>
          </div>
          <div class="col-sm-9" v-if="selection.themas">
            <b-form-select v-model="selection.thema"
                           @change="updateThema"
                           :options="selection.themas"
                           text-field="text"
                           value-field="id"
                           id="selectThema">
            </b-form-select>
          </div>
        </b-form>
      </div>
    </div>
  </div>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import util from '../../services/util'
import { THEMAS, IN_HET_KORT } from '../../services/thema'

function getSelectNone (title) {
  return {
    display: `Alle ${title}`,
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
      }
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
      setThema: 'setThema'
    }),
    async updateGebied (gebiedCode) {
      this.selection.wijk = null
      this.selection.wijken = null

      this.selection.buurt = null
      this.selection.buurten = null

      if (gebiedCode) {
        const gebied = this.selection.gebieden.find(g => g.code === gebiedCode)

        const gebiedDetail = await util.getDetail(gebied)
        this.setGebied(gebiedDetail, null, null)

        const wijken = await util.getWijken(gebied)
        this.selection.wijken = [getSelectNone('wijken')].concat(wijken)
      } else {
        this.setGebied(null, null, null)
      }
    },
    async updateWijk (wijkCode) {
      this.selection.buurt = null
      this.selection.buurten = null

      if (wijkCode) {
        const wijk = this.selection.wijken.find(w => w.vollcode === wijkCode)

        const wijkDetail = await util.getDetail(wijk)
        this.setWijk(wijkDetail, null)

        const buurten = await util.getBuurten(wijk)
        this.selection.buurten = [getSelectNone('buurten')].concat(buurten)
      } else {
        this.setWijk(null, null)
      }
    },
    async updateBuurt (buurtCode) {
      if (buurtCode) {
        const buurt = this.selection.buurten.find(b => b.code === buurtCode)

        const buurtDetail = await util.getDetail(buurt)
        this.setBuurt(buurtDetail)
      } else {
        this.setBuurt(null)
      }
    },
    async updateThema (themaId) {
      this.setThema(THEMAS[themaId])
    }
  },
  watch: {
    // '$route' (to, from) {
    //   console.log('Route changed from', from, to)
    // }
  },
  async created () {
    this.selection.gebieden = await util.getAllGebieden()
    // this.selection.gebieden = [getSelectNone('gebieden')].concat(gebieden)

    this.selection.gebied = 'DX01'
    this.updateGebied(this.selection.gebied)

    this.selection.thema = IN_HET_KORT
    this.updateThema(this.selection.thema)
  }
}
</script>

<style lang="scss" scoped>
</style>
