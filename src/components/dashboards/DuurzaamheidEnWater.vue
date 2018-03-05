<template>
  <div>
    <div v-if="gwb && meta">
      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
          </div>
        </div>
      </div>
      <color-legend></color-legend>
      <div class="grid-blok grid_12">
        <data-table :config="positieOntwikkeling"></data-table>
      </div>

      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Verschillen binnen het gebied</h2>
          </div>
        </div>
      </div>
      <verschillen-gebied></verschillen-gebied>
    </div>
  <div class="clear"></div>
  <meer-cijfers-en-informatie></meer-cijfers-en-informatie>
  <div class="clear"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'

import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'

import meerCijfersEnInformatie from '../MeerCijfersEnInformatie'
import colorLegend from '../ColorLegend.vue'

export default {
  name: 'DuurzaamheidEnWater',
  components: {
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'meer-cijfers-en-informatie': meerCijfersEnInformatie,
    'color-legend': colorLegend
  },
  data () {
    return {
      positieOntwikkeling
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta'
    ])
  },
  methods: {
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
