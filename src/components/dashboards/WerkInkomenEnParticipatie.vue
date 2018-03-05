<template>
    <div v-if="gwb && meta">
      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Bewoners over het voorzieningenaanbod in hun eigen buurt en hun eigen sportdeelname</h2>
          </div>
          <div class="grid-blok grid_6">
            <horizontal-text title="Werk en inkomen" icon="GASD_Icoon_Werk en inkomen.png" :config="werkInkomen"></horizontal-text>
          </div>
          <div class="grid-blok grid_6">
            <horizontal-text title="Participatie" icon="GASD_Icoon_Ondernemen.png" :config="participatie"></horizontal-text>
          </div>
        </div>
      </div>
      <div class="zone-clear clear"></div>

      <div class="grid-element">
        <div class="grid-blok grid_12">
          <color-legend></color-legend>
          <div class="grid-title">
            <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
          </div>
          <data-table :config="positieOntwikkeling"></data-table>
        </div>
      </div>
      <div class="zone-clear clear"></div>

      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Verschillen binnen het gebied</h2>
          </div>
          <verschillen-gebied></verschillen-gebied>
        </div>
      </div>
    </div>

</template>

<script>
import { mapGetters } from 'vuex'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'
import colorLegend from '../ColorLegend'

import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import werkInkomen from '../../../static/links/werk_inkomen'
import participatie from '../../../static/links/participatie'

export default {
  name: 'WerkInkomenEnParticipatie',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      werkInkomen,
      participatie,
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
