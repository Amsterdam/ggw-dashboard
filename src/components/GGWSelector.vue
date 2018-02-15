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
                           :options="selection.gebieden"
                           text-field="naam"
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
                           :options="selection.wijken"
                           text-field="naam"
                           value-field="code"
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
                           :options="selection.buurten"
                           text-field="naam"
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

const DEFAULT_GEBIED = 'DX01'

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
        themas: null,
        thema: null
      }
    }
  },
  computed: {
    ...mapGetters([
      'gebied',
      'wijk',
      'buurt'
    ])
  },
  methods: {
    ...mapActions({
    })
  },
  watch: {
  },
  async mounted () {
    this.selection.gebieden = await util.getGebieden()
    this.selection.gebied = this.selection.gebieden.find(g => g.code === DEFAULT_GEBIED).code
  }
}
</script>

<style lang="scss" scoped>
</style>
