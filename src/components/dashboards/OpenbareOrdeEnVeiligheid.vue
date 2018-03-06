<template>
  <div v-if="gwb && meta">
    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Bewoners over veiligheid en overlast in hun eigen buurt</h2>
        </div>

        <div class="grid-blok grid_6">

          <horizontal-text title="Veiligheid" icon="veelpleger.jpg" :config="veiligheid"></horizontal-text>
        </div>
        <div class="grid-blok grid_6">

          <horizontal-text title="Overlast" icon="silhouet daders.jpg" :config="overlast"></horizontal-text>
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
        <data-table :config="kerncijfers"></data-table>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Verschillen binnen het gebied</h2>
        </div>

      <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Aandeel bewoners dat veel overlast ervaart van….</h2>
        </div>

        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="horecagelegenheden"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="drugs"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="dronkenMensen"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="rondhangendeJongeren"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="lastigVallenOpStraat"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="buurtbewoners"></vertical-bar-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Aandeel 15-plussers dat de afgelopen 12 maanden slachtoffer is geweest van….</h2>
        </div>

        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="vermogensDelicten"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="geweldSlachtoffers"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="vandalismeSlachtoffers"></vertical-bar-chart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { OPENBARE_ORDE_EN_VEILIGHEID, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'
import colorLegend from '../ColorLegend'

import veiligheid from '../../../static/links/veiligheid'
import overlast from '../../../static/links/overlast'
import horecagelegenheden from '../../../static/links/horeca'
import drugs from '../../../static/links/drugs'
import dronkenMensen from '../../../static/links/dronken_mensen'
import rondhangendeJongeren from '../../../static/links/rondhangende_jongeren'
import lastigVallenOpStraat from '../../../static/links/lastig_vallen_op_straat'
import buurtbewoners from '../../../static/links/buurtbewoners'
import vermogensDelicten from '../../../static/links/vermogensdelicten'
import geweldSlachtoffers from '../../../static/links/geweld_slachtoffers'
import vandalismeSlachtoffers from '../../../static/links/vandalisme_slachtoffers'

const kerncijfers = getKerncijfers(OPENBARE_ORDE_EN_VEILIGHEID)

export default {
  name: 'OpenbareOrdeEnVeiligheid',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      veiligheid,
      overlast,
      kerncijfers,
      horecagelegenheden,
      drugs,
      dronkenMensen,
      rondhangendeJongeren,
      lastigVallenOpStraat,
      buurtbewoners,
      vermogensDelicten,
      geweldSlachtoffers,
      vandalismeSlachtoffers
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
