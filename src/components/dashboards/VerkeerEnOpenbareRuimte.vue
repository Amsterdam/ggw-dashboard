<template>
  <div v-if="gwb && meta">
    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Bewoners over het verkeer en de openbare ruimte in hun eigen buurt</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <horizontal-text title="Verkeer" icon="GASD_Icoon_Parkeren en beheer.png" :config="verkeer"></horizontal-text>
          </div>
          <div class="col-lg-6">
            <horizontal-text title="Openbare ruimte" icon="GASD_Icoon_Melding openbare ruimte.png" :config="openbareRuimte"></horizontal-text>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Ontwikkeling van {{gwb.naam}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <data-table :config="kerncijfers"></data-table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Verschillen binnen het gebied</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Rapportcijfer bewoners voor schoonhouden openbare Ruimte</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-4 content-centered">
            <vertical-bar-chart :config="stratenEnStoepen"></vertical-bar-chart>
          </div>
          <div class="col-lg-4 content-centered">
            <vertical-bar-chart :config="groen"></vertical-bar-chart>
          </div>
          <div class="col-lg-4 content-centered">
            <vertical-bar-chart :config="speelvoorzieningen"></vertical-bar-chart>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Parkeren</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 content-centered">
            <line-chart :config="aantalParkeerplaatsen"></line-chart>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-lg-6 content-centered">
            <vertical-bar-chart :config="parkeervoorzieningen"></vertical-bar-chart>
          </div>
          <div class="col-lg-6 content-centered">
            <vertical-bar-chart :config="fietsparkeervoorzieningen"></vertical-bar-chart>
          </div>
        </div>
      </div>
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
import colorLegend from '../ColorLegend'

import verkeer from '../../../static/links/verkeer'
import openbareRuimte from '../../../static/links/openbare_ruimte'
import stratenEnStoepen from '../../../static/links/straten_en_stoepen'
import groen from '../../../static/links/groen'
import speelvoorzieningen from '../../../static/links/speelvoorzieningen'
import aantalParkeerplaatsen from '../../../static/links/aantal_parkeerplaatsen'
import parkeervoorzieningen from '../../../static/links/parkeervoorzieningen'
import fietsparkeervoorzieningen from '../../../static/links/fietsparkeervoorzieningen'

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
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
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
      fietsparkeervoorzieningen
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
