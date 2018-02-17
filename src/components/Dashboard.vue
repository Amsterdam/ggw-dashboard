<!--Example of a component with a link and how to watch for state changes-->
<template>
  <div>
    <div v-if="gwb && meta">

      <div class="row">
        <div class="col-sm">
          <pano></pano>
        </div>
        <div class="col-sm">
          <in-aantallen></in-aantallen>
        </div>
      </div>

      <div class="alert">
        <h2>Samenstelling woningvoorraad en bevolking van {{gwb.naam}}</h2>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <horizontal-chart
            title="Woningvoorraad"
            icon="wonen_en_leefomgeving.svg"
            :config="woningVoorraad"
          ></horizontal-chart>
        </div>
        <div class="col-sm-6">
          <horizontal-chart
            title="Sociaal-economisch"
            icon="werk_en_inkomen.svg"
            :config="sociaalEconomisch"
          ></horizontal-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <horizontal-chart
            title="Leeftijd"
            icon="kind_icoon_met_bal_60.png"
            :config="leeftijd"
          ></horizontal-chart>
        </div>
        <div class="col-sm-6">
          <horizontal-chart
            title="Migratie-achtergrond"
            icon="locaties.svg"
            :config="migratieAchtergrond"
          ></horizontal-chart>
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
          <placeholder title="plot" pic="plot.png" height="200"></placeholder>
        </div>
      </div>

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

      <div class="row">
        <div class="col-sm">
          <placeholder title="kaart" pic="kaart.png" height="200"></placeholder>
        </div>
        <div class="col-sm">
          <placeholder title="toelichting" pic="toelichting.png" height="200"></placeholder>
        </div>
      </div>

      <div class="alert">
        <div class="row">
          <div class="col-sm">
            <h2>Aantal woningen</h2>
          </div>
          <div class="col-sm">
            <h2>Andere woonvormen</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm">
          <placeholder title="graph" pic="graph.png" height="200"></placeholder>
        </div>
        <div class="col-sm">
          <placeholder title="woonvormen" pic="andere-woonvormen.png" height="200"></placeholder>
        </div>
      </div>

      <div class="alert">
        <h2>Woningen naar eigendom en woonlasten</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <vertical-chart :config="gemiddeldeWozWaarde"></vertical-chart>
        </div>
        <div class="col-sm">
          <vertical-chart :config="gemiddeldeWozWaardeM2"></vertical-chart>
        </div>
        <div class="col-sm">
          <vertical-chart :config="gemiddeldeHuurVrijeSector"></vertical-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm">
          <placeholder title="graph" height="200" pic="huur-verdeling.png"></placeholder>
        </div>
        <div class="col-sm">
          <pie title="Grootte van de woningen" :config="grootteWoningen"></pie>
        </div>
      </div>

      <div class="alert">
        <h2>Woningen voor ouderen</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <vertical-chart :config="percNultredewoningen"></vertical-chart>
        </div>
        <div class="col-sm">
          <vertical-chart :config="percVerhuisgeneigden"></vertical-chart>
        </div>
        <div class="col-sm">
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
      <img src="../../static/icons/loading.gif">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import vegaExample from './VegaExample'
import leafletExample from './LeafletExample'
import amsHeader from './AMSHeader'
import ggwSelector from './GGWSelector'
import placeholder from './Placeholder'
import horizontalChart from './HorizontalChart'
import verticalBarChart from './VerticalBarChart'
import verticalChart from './VerticalChart'
import horizontalText from './HorizontalText'
import pie from './Pie'
import pieChart from './PieChart'
import inAantallen from './InAantallen'
import dataTable from './DataTable'
import pano from './Pano'

import woningVoorraad from '../../static/links/woningvoorraad'
import sociaalEconomisch from '../../static/links/sociaaleconomisch'
import leeftijd from '../../static/links/leeftijd'
import migratieAchtergrond from '../../static/links/migratieachtergrond'
import positieOntwikkeling from '../../static/links/positie_en_ontwikkeling'
import eigenBuurt from '../../static/links/eigenbuurt'
import eigenWoning from '../../static/links/eigenwoning'
import grootteWoningen from '../../static/links/grootte_woningen'
import gemiddeldeWozWaarde from '../../static/links/gemm_woz_waarde'
import gemiddeldeWozWaardeM2 from '../../static/links/gemm_woz_waarde_m2'
import gemiddeldeHuurVrijeSector from '../../static/links/gemm_huur_vrije_sector'
import percNultredewoningen from '../../static/links/perc_nultrede_woningen'
import percVerhuisgeneigden from '../../static/links/perc_verhuisgeneigden_65+'
import percWoningGeschiktOud from '../../static/links/perc_woning_geschikt_oud'
import meerInformatie from '../../static/links/meer_informatie'
import meerCijfers from '../../static/links/meer_cijfers'

export default {
  name: 'GGWDashboard',
  components: {
    'vega-example': vegaExample,
    'leaflet-example': leafletExample,
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'horizontal-chart': horizontalChart,
    'vertical-bar-chart': verticalBarChart,
    'vertical-chart': verticalChart,
    'pie': pie,
    'pie-chart': pieChart,
    'in-aantallen': inAantallen,
    'pano': pano,
    'data-table': dataTable,
    'horizontal-text': horizontalText,
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
    ...mapActions({
    })
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../../static/ams.scss";

  .alert {
    margin-top: 5px;
    background-color: $ams-lichtgrijs;
  }
</style>
