<template>
  <div>
    <div v-if="gwb && meta">
      <div class="grid-element">
        <div class="grid-blok grid_12">
        <color-legend></color-legend>
          <div class="grid-title">
            <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
          </div>
        </div>
      </div>
      <div class="grid-blok grid_12">
        <data-table :config="kerncijfers"></data-table>
      </div>

      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Verschillen binnen het gebied</h2>
          </div>
        </div>
      </div>
      <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DUURZAAMHEID_EN_WATER, getKerncijfers } from '../../services/thema'

import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'

import colorLegend from '../ColorLegend.vue'

const kerncijfers = getKerncijfers(DUURZAAMHEID_EN_WATER)

export default {
  name: 'DuurzaamheidEnWater',
  components: {
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'color-legend': colorLegend
  },
  data () {
    return {
      kerncijfers
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
