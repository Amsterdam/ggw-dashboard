<template>
  <div>
    <div v-if="gwb && meta">
      <div class="grid-element">
        <div class="grid-blok grid_12 pad-top-bottom">
          <div class="grid-title">
            <h2>Bewoners over hun eigen buurt en woning</h2>
          </div>

          <div class="grid-blok grid_6">
            <horizontal-text title="Bedrijvigheid" icon="Missing.jpg" :config="bedrijvigheid"></horizontal-text>
          </div>
          <div class="grid-blok grid_6">
            <horizontal-text title="Cultuur" icon="Missing.jpg" :config="cultuur"></horizontal-text>
          </div>
        </div>

        <color-legend></color-legend>
        <div class="grid-title">
          <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
        </div>

        <div class="grid-blok grid_12">
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
            <h2>Aantal vestigingen en werkzame personen</h2>
          </div>
          <line-chart :config="aantalVestigingenEnWerkzamePersonen"></line-chart>
        </div>
        <div class="grid-blok grid_4">
          <div class="grid-title">
            <h2>Van de vestigingen is…</h2>
          </div>
            <woonvormen :config="typeVestiging"></woonvormen>
        </div>
      </div>

      <div class="zone-clear clear"></div>

      <div class="grid-element">
        <div class="grid-blok grid_6">
          <div class="grid-title">
            <h2>Vestigingen naar hoofdfunctie</h2>
          </div>
          <pie-chart title="" :config="vestigingenHoofdfunctie"></pie-chart>
          </div>
          <div class="grid-blok grid_6">
            <div class="grid-title">
              <h2>Werkzame personen naar hoofdfunctie</h2>
            </div>
          <pie-chart title="" :config="werkzamenHoofdfunctie"></pie-chart>
          </div>
        </div>
      </div>
      <div class="zone-clear clear"></div>

      <!--<div class="grid-element">-->
        <!--<div class="grid-blok grid_6">-->
          <!--<div class="grid-title">-->
            <!--<h2>Horeca</h2>-->
          <!--</div>-->
            <!--<line-chart :config="horeca"></line-chart>-->
        <!--</div>-->
        <!--<div class="grid-blok grid_6">-->
          <!--<div class="grid-title">-->
            <!--<h2>Leegstand</h2>-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { ECONOMIE_EN_CULTUUR, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import lineChart from '../charts/LineChart'
import woonVormen from '../Woonvormen'
import pieChart from '../charts/PieChart'

import bedrijvigheid from '../../../static/links/bedrijvigheid'
import cultuur from '../../../static/links/cultuur'
import aantalVestigingenEnWerkzamePersonen from '../../../static/links/aantal_vestigingen_werkzamen'
import typeVestiging from '../../../static/links/type_vestiging'
import vestigingenHoofdfunctie from '../../../static/links/vestigingen_hoofdfunctie'
import werkzamenHoofdfunctie from '../../../static/links/werkzamen_hoofdfunctie'
import horeca from '../../../static/links/horeca'
import colorLegend from '../ColorLegend'

const kerncijfers = getKerncijfers(ECONOMIE_EN_CULTUUR)

export default {
  name: 'EconomieEnCultuur',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'line-chart': lineChart,
    'woonvormen': woonVormen,
    'pie-chart': pieChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      bedrijvigheid,
      cultuur,
      kerncijfers,
      aantalVestigingenEnWerkzamePersonen,
      typeVestiging,
      vestigingenHoofdfunctie,
      werkzamenHoofdfunctie,
      horeca
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
