<template>
  <div>
    <div v-if="gwb && meta">
      <div class="alert">
        <h2>Bewoners over hun eigen buurt en woning</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Bedrijvigheid" icon="x.jpg" :config="bedrijvigheid"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Cultuur" icon="x.svg" :config="cultuur"></horizontal-text>
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
            <h2>Aantal vestigingen en werkzame personen</h2>
          </div>
          <div class="col-sm-4">
            <h2>Van de vestigingen is…</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <line-chart :config="aantalVestigingenEnWerkzamePersonen"></line-chart>
        </div>
        <div class="col-sm-4">
          <woonvormen :config="typeVestiging"></woonvormen>
        </div>
      </div>

      <div class="alert">
        <div class="row">
          <div class="col-sm-6">
            <h2>Vestigingen naar hoofdfunctie</h2>
          </div>
          <div class="col-sm-6">
            <h2>Werkzame personen naar hoofdfunctie</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <pie-chart title="" :config="vestigingenHoofdfunctie"></pie-chart>
        </div>
        <div class="col-sm-6">
          <pie-chart title="" :config="werkzamenHoofdfunctie"></pie-chart>
        </div>
      </div>

      <div class="alert">
        <div class="row">
          <div class="col-sm-6">
            <h2>Horeca</h2>
          </div>
          <div class="col-sm-6">
            <h2>Leegstand</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <!--<line-chart :config="horeca"></line-chart>-->
        </div>
        <div class="col-sm-6">
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
import pieChart from '../charts/PieChart'

import bedrijvigheid from '../../../static/links/bedrijvigheid'
import cultuur from '../../../static/links/cultuur'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import aantalVestigingenEnWerkzamePersonen from '../../../static/links/aantal_vestigingen_werkzamen'
import typeVestiging from '../../../static/links/type_vestiging'
import vestigingenHoofdfunctie from '../../../static/links/vestigingen_hoofdfunctie'
import werkzamenHoofdfunctie from '../../../static/links/werkzamen_hoofdfunctie'
import horeca from '../../../static/links/horeca'

export default {
  name: 'EconomieEnCultuur',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'line-chart': lineChart,
    'woonvormen': woonVormen,
    'pie-chart': pieChart
  },
  data () {
    return {
      bedrijvigheid,
      cultuur,
      positieOntwikkeling,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
