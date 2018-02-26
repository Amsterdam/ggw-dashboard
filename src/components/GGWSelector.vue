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
                           value-field="code"
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
                           value-field="code"
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
                           :options="selection.themas"
                           text-field="naam"
                           value-field="code"
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
import util from '../services/util'

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
        themas: ['Gebied in het kort'],
        thema: 'Gebied in het kort'
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
      const gebied = this.selection.gebieden.find(g => g.code === gebiedCode)

      this.selection.wijk = null
      this.selection.wijken = null

      this.selection.buurt = null
      this.selection.buurten = null

      const gebiedDetail = await util.getDetail(gebied)
      this.setGebied(gebiedDetail, null, null)

      this.selection.wijken = await util.getWijken(gebied)
    },
    async updateWijk (wijkCode) {
      const wijk = this.selection.wijken.find(w => w.vollcode === wijkCode)

      this.selection.buurt = null
      this.selection.buurten = null

      const wijkDetail = await util.getDetail(wijk)
      this.setWijk(wijkDetail, null)

      this.selection.buurten = await util.getBuurten(wijk)
    },
    async updateBuurt (buurtCode) {
      const buurt = this.selection.buurten.find(b => b.code === buurtCode)

      const buurtDetail = await util.getDetail(buurt)
      this.setBuurt(buurtDetail)
    },
    async updateThema (thema) {
    }
  },
  watch: {
  },
  async created () {
    this.selection.gebieden = await util.getAllGebieden()

    this.selection.gebied = 'DX01'
    this.updateGebied(this.selection.gebied)
  }
}
</script>

<style lang="scss" scoped>
</style>
