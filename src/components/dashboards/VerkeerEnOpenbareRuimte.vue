<template>
  <div v-if="gwb && meta">
    <div class="grid-element">
      <div class="grid-blok grid_12 card">
        <div class="grid-title">
          <h2>Bewoners over het verkeer en de openbare ruimte in hun eigen buurt</h2>
        </div>
        <div class="grid-blok grid_6">
          <horizontal-text title="Verkeer" icon="GASD_Icoon_Parkeren en beheer.png" :config="verkeer"></horizontal-text>
        </div>
        <div class="grid-blok grid_6">
          <horizontal-text title="Openbare ruimte" icon="GASD_Icoon_Melding openbare ruimte.png" :config="openbareRuimte"></horizontal-text>
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
      <div class="grid-blok grid_12 card">
        <div class="grid-title">
          <h2>Rapportcijfer bewoners voor schoonhouden openbare Ruimte</h2>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="stratenEnStoepen"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="groen"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="speelvoorzieningen"></vertical-bar-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12 card">
        <div class="grid-title">
          <h2>Parkeren</h2>
        </div>
        <div class="grid-blok grid_10">
          <line-chart :config="aantalParkeerplaatsen"></line-chart>
        </div>
      </div>

      <div class="grid-blok grid_12 card">
        <div class="grid-blok grid_6">
          <vertical-bar-chart :config="parkeervoorzieningen"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_6">
          <vertical-bar-chart :config="fietsparkeervoorzieningen"></vertical-bar-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <meer-cijfers-en-informatie></meer-cijfers-en-informatie>

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
import meerCijfersEnInformatie from '../MeerCijfersEnInformatie'
import colorLegend from '../ColorLegend'

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
    'vertical-bar-chart': verticalBarChart,
    'meer-cijfers-en-informatie': meerCijfersEnInformatie,
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
