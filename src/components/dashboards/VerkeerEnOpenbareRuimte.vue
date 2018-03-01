<template>
  <div>
    <div v-if="gwb && meta">
      <div class="alert">
        <h2>Bewoners over het verkeer en de openbare ruimte in hun eigen buurt</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Verkeer" icon="parkeren_60.png" :config="verkeer"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Openbare ruimte" icon="openbare_ruimte_60.png" :config="openbareRuimte"></horizontal-text>
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
        <h2>Rapportcijfer bewoners voor schoonhouden openbare Ruimte</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-chart :config="stratenEnStoepen"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="groen"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="speelvoorzieningen"></vertical-chart>
        </div>
      </div>

      <div class="alert">
        <h2>Parkeren</h2>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <line-chart :config="aantalParkeerplaatsen"></line-chart>
        </div>
        <div class="col-sm-6">
          <vertical-chart :config="parkeervoorzieningen"></vertical-chart>
          <vertical-chart :config="fietsparkeervoorzieningen"></vertical-chart>
        </div>
      </div>

      <div class="alert">
        <div class="row">
          <div class="col-sm">
            <h2>Meer informatie</h2>
          </div>
          <div class="col-sm">
            <h2>Meer cijfers</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm">
          <div v-for="info in meerInformatie" :key="info.label">
            <a :href="info.url" target="_blank">{{info.label}}</a>
          </div>
        </div>
        <div class="col-sm">
          <div v-for="info in meerCijfers" :key="info.label">
            <a :href="info.url" target="_blank">{{info.label}}</a>
          </div>
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
import lineChart from '../charts/LineChart'
import woonVormen from '../Woonvormen'
import stackedBarChart from '../charts/StackedBarChart'
import pie from '../charts/Pie'
import verticalChart from '../charts/VerticalChart'

import verkeer from '../../../static/links/verkeer'
import openbareRuimte from '../../../static/links/openbare_ruimte'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import stratenEnStoepen from '../../../static/links/straten_en_stoepen'
import groen from '../../../static/links/groen'
import speelvoorzieningen from '../../../static/links/speelvoorzieningen'
import aantalParkeerplaatsen from '../../../static/links/aantal_parkeerplaatsen'
import parkeervoorzieningen from '../../../static/links/parkeervoorzieningen'
import fietsparkeervoorzieningen from '../../../static/links/fietsparkeervoorzieningen'

import meerInformatie from '../../../static/links/meer_informatie'
import meerCijfers from '../../../static/links/meer_cijfers'

export default {
  name: 'VerkeerEnOpenbareRuimte',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'line-chart': lineChart,
    'woonvormen': woonVormen,
    'stacked-bar-chart': stackedBarChart,
    'pie': pie,
    'vertical-chart': verticalChart
  },
  data () {
    return {
      positieOntwikkeling,
      verkeer,
      openbareRuimte,
      stratenEnStoepen,
      groen,
      speelvoorzieningen,
      aantalParkeerplaatsen,
      parkeervoorzieningen,
      fietsparkeervoorzieningen,
      meerInformatie,
      meerCijfers
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
