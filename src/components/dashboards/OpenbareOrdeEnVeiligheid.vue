<template>
  <div>
    <div v-if="gwb && meta">

      <div class="alert">
        <h2>Bewoners over veiligheid en overlast in hun eigen buurt</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Veiligheid" icon="veelpleger.jpg" :config="veiligheid"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Overlast" icon="silhouet daders.jpg" :config="overlast"></horizontal-text>
        </div>
      </div>

      <div class="alert">
        <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <data-table :config="positieOntwikkeling"></data-table>
        </div>
        <div class="col-sm">
        </div>
      </div>

      <div class="alert">
        <h2>Verschillen binnen het gebied</h2>
      </div>

      <verschillen-gebied></verschillen-gebied>

      <div class="alert">
        <h2>Aandeel bewoners dat veel overlast ervaart van….</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="horecagelegenheden"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="drugs"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="dronkenMensen"></vertical-bar-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="rondhangendeJongeren"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="lastigVallenOpStraat"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="buurtbewoners"></vertical-bar-chart>
        </div>
      </div>

      <div class="alert">
        <h2>Aandeel 15-plussers dat de afgelopen 12 maanden slachtoffer is geweest van….</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="vermogensDelicten"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="geweldSlachtoffers"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="vandalismeSlachtoffers"></vertical-bar-chart>
        </div>
      </div>

    </div>

    <div v-else class="text-center">
      <h2>Gegevens laden...</h2>
      <img src="../../../static/icons/loading.gif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'

import veiligheid from '../../../static/links/veiligheid'
import overlast from '../../../static/links/overlast'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import horecagelegenheden from '../../../static/links/horeca'
import drugs from '../../../static/links/drugs'
import dronkenMensen from '../../../static/links/dronken_mensen'
import rondhangendeJongeren from '../../../static/links/rondhangende_jongeren'
import lastigVallenOpStraat from '../../../static/links/lastig_vallen_op_straat'
import buurtbewoners from '../../../static/links/buurtbewoners'
import vermogensDelicten from '../../../static/links/vermogensdelicten'
import geweldSlachtoffers from '../../../static/links/geweld_slachtoffers'
import vandalismeSlachtoffers from '../../../static/links/vandalisme_slachtoffers'

export default {
  name: 'OpenbareOrdeEnVeiligheid',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart
  },
  data () {
    return {
      veiligheid,
      overlast,
      positieOntwikkeling,
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
