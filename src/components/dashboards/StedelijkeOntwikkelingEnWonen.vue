<template>
  <div v-if="gwb && meta">
    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Bewoners over hun eigen buurt en woning</h2>
        </div>
        <div class="col-6">
          <horizontal-text title="Eigen buurt" icon="buurt.png" :config="eigenBuurt"></horizontal-text>
        </div>
        <div class="col-6">
          <horizontal-text title="Eigen woning" icon="house.png" :config="eigenWoning"></horizontal-text>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12">
        <div class="grid-title">
          <h2>Ontwikkeling van {{gwb.naam}}</h2>
        </div>
        <data-table :config="kerncijfers"></data-table>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12">
        <div class="grid-title">
          <h2>Verschillen binnen het gebied</h2>
        </div>

        <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Aantal woningen</h2>
        </div>
        <div class="col-8">
          <line-chart :config="aantalWoningen" :colors="4"></line-chart>
        </div>
        <div class="col-4">
          <span><b>Andere woonvormen</b></span>
          <woonvormen :config="andereWoonvormen"></woonvormen>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Woningen naar eigendom en woonlasten</h2>
        </div>
        <div class="col-4">
          <vertical-bar-chart :config="gemiddeldeWozWaarde"></vertical-bar-chart>
        </div>
        <div class="col-4">
          <vertical-bar-chart :config="gemiddeldeWozWaardeM2"></vertical-bar-chart>
        </div>
        <div class="col-4">
          <vertical-bar-chart :config="gemiddeldeHuurVrijeSector"></vertical-bar-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12 card">
        <div class="col-6">
          <stacked-bar-chart title="Type woningen" :config="typeWoningen"></stacked-bar-chart>
        </div>
        <div class="col-6">
          <pie-chart title="Grootte van de woningen" :config="grootteWoningen"></pie-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
        <div class="col-12 card">
          <div class="grid-title">
            <h2>Woningen voor ouderen</h2>
          </div>
          <div class="col-4">
            <vertical-bar-chart :config="percNultredewoningen"></vertical-bar-chart>
          </div>
          <div class="col-4">
            <vertical-bar-chart :config="percVerhuisgeneigden"></vertical-bar-chart>
          </div>
          <div class="col-4">
            <vertical-bar-chart :config="percWoningGeschiktOud"></vertical-bar-chart>
          </div>
        </div>
      </div>
    <div class="zone-clear clear"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { STEDELIJKE_ONTWIKKELING_EN_WONEN, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import lineChart from '../charts/LineChart'
import woonVormen from '../Woonvormen'
import stackedBarChart from '../charts/StackedBarChart'
import pieChart from '../charts/PieChart'
import verticalBarChart from '../charts/VerticalBarChart'
import colorLegend from '../ColorLegend'

import eigenBuurt from '../../../static/links/eigenbuurt'
import eigenWoning from '../../../static/links/eigenwoning'
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

const kerncijfers = getKerncijfers(STEDELIJKE_ONTWIKKELING_EN_WONEN)

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
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      kerncijfers,
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
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
</style>
