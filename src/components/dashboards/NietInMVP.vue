<!--Example of a component with a link and how to watch for state changes-->
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
          <vertical-chart :config="gemiddeldeWozWaarde"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="gemiddeldeWozWaardeM2"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="gemiddeldeHuurVrijeSector"></vertical-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <stacked-bar-chart :config="typeWoningen"></stacked-bar-chart>
        </div>
        <div class="col-sm-6">
          <pie title="Grootte van de woningen" :config="grootteWoningen"></pie>
        </div>
      </div>

      <div class="alert">
        <h2>Woningen voor ouderen</h2>
      </div>

      <div class="row">
        <div class="col-sm-4">
          <vertical-chart :config="percNultredewoningen"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="percVerhuisgeneigden"></vertical-chart>
        </div>
        <div class="col-sm-4">
          <vertical-chart :config="percWoningGeschiktOud"></vertical-chart>
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
import { mapActions, mapGetters } from 'vuex'
import gwbMap from '../GWBMap'
import amsHeader from '../layout/AMSHeader'
import ggwSelector from '../layout/GGWSelector'
import placeholder from '../Placeholder'
import horizontalChart from '../charts/HorizontalChart'
import verticalChart from '../charts/VerticalChart'
import horizontalText from '../charts/HorizontalText'
import pie from '../charts/Pie'
import inAantallen from '../InAantallen'
import dataTable from '../charts/DataTable'
import lineChart from '../charts/LineChart'
import stackedBarChart from '../charts/StackedBarChart'
import woonVormen from '../Woonvormen'
import pano from '../Pano'
import verschillenGebied from '../VerschillenGebied'

import woningVoorraad from '../../../static/links/woningvoorraad'
import sociaalEconomisch from '../../../static/links/sociaaleconomisch'
import leeftijd from '../../../static/links/leeftijd'
import migratieAchtergrond from '../../../static/links/migratieachtergrond'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import eigenBuurt from '../../../static/links/eigenbuurt'
import eigenWoning from '../../../static/links/eigenwoning'
import grootteWoningen from '../../../static/links/grootte_woningen'
import gemiddeldeWozWaarde from '../../../static/links/gemm_woz_waarde'
import gemiddeldeWozWaardeM2 from '../../../static/links/gemm_woz_waarde_m2'
import gemiddeldeHuurVrijeSector from '../../../static/links/gemm_huur_vrije_sector'
import percNultredewoningen from '../../../static/links/perc_nultrede_woningen'
import percVerhuisgeneigden from '../../../static/links/perc_verhuisgeneigden_65+'
import percWoningGeschiktOud from '../../../static/links/perc_woning_geschikt_oud'
import meerInformatie from '../../../static/links/meer_informatie'
import meerCijfers from '../../../static/links/meer_cijfers'
import aantalWoningen from '../../../static/links/aantal_woningen'
import typeWoningen from '../../../static/links/type_woningen'
import andereWoonvormen from '../../../static/links/andere_woonvormen'

export default {
  name: 'NietInMVP',
  components: {
    'gwb-map': gwbMap,
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'horizontal-chart': horizontalChart,
    'vertical-chart': verticalChart,
    'pie': pie,
    'in-aantallen': inAantallen,
    'pano': pano,
    'data-table': dataTable,
    'line-chart': lineChart,
    'stacked-bar-chart': stackedBarChart,
    'horizontal-text': horizontalText,
    'verschillen-gebied': verschillenGebied,
    'woonvormen': woonVormen,
    'placeholder': placeholder
  },
  data () {
    return {
      woningVoorraad,
      sociaalEconomisch,
      leeftijd,
      migratieAchtergrond,
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
      meerInformatie,
      meerCijfers,
      aantalWoningen,
      typeWoningen,
      andereWoonvormen
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta'
    ])
  },
  methods: {
    ...mapActions({
    })
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../../static/ams";

  .alert {
    margin-top: 5px;
    background-color: $ams-lichtgrijs;
  }
</style>
