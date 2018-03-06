<template>
  <div v-if="gwb && meta">
    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Bewoners over hun eigen buurt en woning</h2>
        </div>
        <div class="grid-blok grid_6">
          <horizontal-text title="Eigen buurt" icon="buurt60.jpg" :config="eigenBuurt"></horizontal-text>
        </div>
        <div class="grid-blok grid_6">
          <horizontal-text title="Eigen woning" icon="house-icon-vector-png.png" :config="eigenWoning"></horizontal-text>
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
      <div class="grid-blok grid_8">
        <div class="grid-title">
          <h2>Aantal woningen</h2>
        </div>
        <line-chart :config="aantalWoningen"></line-chart>
      </div>
      <div class="grid-blok grid_4">
        <div class="grid-title">
          <h2>Andere woonvormen</h2>
        </div>
        <woonvormen :config="andereWoonvormen"></woonvormen>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12">
        <div class="grid-title">
          <h2>Woningen naar eigendom en woonlasten</h2>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="gemiddeldeWozWaarde"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="gemiddeldeWozWaardeM2"></vertical-bar-chart>
        </div>
        <div class="grid-blok grid_4">
          <vertical-bar-chart :config="gemiddeldeHuurVrijeSector"></vertical-bar-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
      <div class="grid-blok grid_12 pad-top-bottom">
        <div class="grid-blok grid_6">
          <stacked-bar-chart title="Type woningen" :config="typeWoningen"></stacked-bar-chart>
        </div>
        <div class="grid-blok grid_6">
          <pie-chart title="Grootte van de woningen" :config="grootteWoningen"></pie-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Woningen voor ouderen</h2>
          </div>
          <div class="grid-blok grid_4">
            <vertical-bar-chart :config="percNultredewoningen"></vertical-bar-chart>
          </div>
          <div class="grid-blok grid_4">
            <vertical-bar-chart :config="percVerhuisgeneigden"></vertical-bar-chart>
          </div>
          <div class="grid-blok grid_4">
            <vertical-bar-chart :config="percWoningGeschiktOud"></vertical-bar-chart>
          </div>
        </div>
      </div>
    <div class="zone-clear clear"></div>

    <meer-cijfers-en-informatie></meer-cijfers-en-informatie>

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
import meerCijfersEnInformatie from '../MeerCijfersEnInformatie'
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
import meerInformatie from '../../../static/links/meer_informatie'
import meerCijfers from '../../../static/links/meer_cijfers'

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
    'meer-cijfers-en-informatie': meerCijfersEnInformatie,
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

<style lang="scss" scoped>
</style>
