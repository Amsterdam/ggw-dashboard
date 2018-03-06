<template>
  <div>
    <div v-if="gwb && meta">
      <div class="alert">
        <h2>Bewoners over het verkeer en de openbare ruimte in hun eigen buurt</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Verkeer" icon="GASD_Icoon_Parkeren en beheer.png" :config="verkeer"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Openbare ruimte" icon="GASD_Icoon_Melding openbare ruimte.png" :config="openbareRuimte"></horizontal-text>
        </div>
      </div>

      <div class="alert">
        <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <data-table :config="kerncijfers"></data-table>
        </div>
        <div class="col-sm">
        </div>
      </div>

      <div class="alert">
        <h2>Verschillen binnen het gebied</h2>
      </div>

      <verschillen-gebied :config="kerncijfers"></verschillen-gebied>

      <div class="alert">
        <h2>Rapportcijfer bewoners voor schoonhouden openbare Ruimte</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="stratenEnStoepen"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="groen"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="speelvoorzieningen"></vertical-bar-chart>
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
          <vertical-bar-chart :config="parkeervoorzieningen"></vertical-bar-chart>
          <vertical-bar-chart :config="fietsparkeervoorzieningen"></vertical-bar-chart>
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
import { VERKEER_EN_OPENBARE_RUIMTE, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import lineChart from '../charts/LineChart'
import woonVormen from '../Woonvormen'
import stackedBarChart from '../charts/StackedBarChart'
import pieChart from '../charts/PieChart'
import verticalBarChart from '../charts/VerticalBarChart'

import verkeer from '../../../static/links/verkeer'
import openbareRuimte from '../../../static/links/openbare_ruimte'
import stratenEnStoepen from '../../../static/links/straten_en_stoepen'
import groen from '../../../static/links/groen'
import speelvoorzieningen from '../../../static/links/speelvoorzieningen'
import aantalParkeerplaatsen from '../../../static/links/aantal_parkeerplaatsen'
import parkeervoorzieningen from '../../../static/links/parkeervoorzieningen'
import fietsparkeervoorzieningen from '../../../static/links/fietsparkeervoorzieningen'

import meerInformatie from '../../../static/links/meer_informatie'
import meerCijfers from '../../../static/links/meer_cijfers'

const kerncijfers = getKerncijfers(VERKEER_EN_OPENBARE_RUIMTE)

export default {
  name: 'VerkeerEnOpenbareRuimte',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'line-chart': lineChart,
    'woonvormen': woonVormen,
    'stacked-bar-chart': stackedBarChart,
    'pie-chart': pieChart,
    'vertical-bar-chart': verticalBarChart
  },
  data () {
    return {
      kerncijfers,
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
