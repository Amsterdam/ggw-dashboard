<template>
  <div>
    <div v-if="gwb && meta">
      <div class="alert">
        <h2>Bewoners over hun eigen buurt en woning</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Eigen buurt" icon="buurt60.jpg" :config="eigenBuurt"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Eigen woning" icon="locaties.svg" :config="eigenWoning"></horizontal-text>
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
        <div class="row">
          <div class="col-sm-8">
            <h2>Aantal woningen</h2>
          </div>
          <div class="col-sm-4">
            <h2>Andere woonvormen</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <line-chart :config="aantalWoningen"></line-chart>
          <!--<placeholder title="graph" pic="graph.png" height="200"></placeholder>-->
        </div>
        <div class="col-sm-4">
          <woonvormen :config="andereWoonvormen"></woonvormen>
        </div>
      </div>

      <div class="alert">
        <h2>Woningen naar eigendom en woonlasten</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="gemiddeldeWozWaarde"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="gemiddeldeWozWaardeM2"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="gemiddeldeHuurVrijeSector"></vertical-bar-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <stacked-bar-chart :config="typeWoningen"></stacked-bar-chart>
        </div>
        <div class="col-sm-6">
          <pie-chart title="Grootte van de woningen" :config="grootteWoningen"></pie-chart>
        </div>
      </div>

      <div class="alert">
        <h2>Woningen voor ouderen</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-bar-chart :config="percNultredewoningen"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="percVerhuisgeneigden"></vertical-bar-chart>
        </div>
        <div class="col-sm-4">
          <vertical-bar-chart :config="percWoningGeschiktOud"></vertical-bar-chart>
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
import pieChart from '../charts/PieChart'
import verticalBarChart from '../charts/VerticalBarChart'

import eigenBuurt from '../../../static/links/eigenbuurt'
import eigenWoning from '../../../static/links/eigenwoning'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import aantalWoningen from '../../../static/links/aantal_woningen'
import andereWoonvormen from '../../../static/links/andere_woonvormen'
import gemiddeldeWozWaarde from '../../../static/links/gemm_woz_waarde'
import gemiddeldeWozWaardeM2 from '../../../static/links/gemm_woz_waarde_m2'
import gemiddeldeHuurVrijeSector from '../../../static/links/gemm_huur_vrije_sector'
import typeWoningen from '../../../static/links/type_woningen'
import grootteWoningen from '../../../static/links/grootte_woningen'
import percNultredewoningen from '../../../static/links/perc_nultrede_woningen'
import percVerhuisgeneigden from '../../../static/links/perc_verhuisgeneigden_65+'
import percWoningGeschiktOud from '../../../static/links/perc_woning_geschikt_oud'
import meerInformatie from '../../../static/links/meer_informatie'
import meerCijfers from '../../../static/links/meer_cijfers'

export default {
  name: 'StedelijkeOntwikkelingEnWonen',
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
      positieOntwikkeling,
      eigenBuurt,
      eigenWoning,
      gemiddeldeWozWaarde,
      gemiddeldeWozWaardeM2,
      gemiddeldeHuurVrijeSector,
      grootteWoningen,
      percNultredewoningen,
      percVerhuisgeneigden,
      percWoningGeschiktOud,
      aantalWoningen,
      typeWoningen,
      andereWoonvormen,
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
