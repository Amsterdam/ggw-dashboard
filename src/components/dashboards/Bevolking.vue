<template>
  <div>
    <div v-if="gwb && meta">
      <div class="alert">
        <h2>Bevolkingssamenstelling</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Inwoners" icon="Missing.jpg" :config="inwoners"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Huishoudens" icon="Gezinnetje.svg" :config="huishoudens"></horizontal-text>
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

      <verschillen-gebied></verschillen-gebied>

      <div class="alert">
        <div class="row">
          <div class="col-sm-8">
            <h2>Aantal inwoners</h2>
          </div>
          <div class="col-sm-4">
            <h2>De aantallen zijn inclusief…</h2>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <line-chart :config="aantalInwoners" colors="4"></line-chart>
        </div>
        <div class="col-sm-4">
          <woonvormen :config="andereInwoners"></woonvormen>
        </div>
      </div>

      <div class="alert">
        <h2>Migratieachtergrond</h2>
      </div>

      <div class="row">
        <div class="col-sm-8">
          <line-chart :config="migratieachtergrond"></line-chart>
        </div>
        <div class="col-sm-4">
          <pie-chart title="" :config="migratieVerdeling"></pie-chart>
        </div>
      </div>

      <div class="alert">
        <div class="col-sm-6 offset-sm-6">
          <h2>Huishoudsamenstelling</h2>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6 offset-sm-6">
          <stacked-bar-chart :config="huishoudsamenstelling" last="7"></stacked-bar-chart>
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
import { BEVOLKING, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import lineChart from '../charts/LineChart'
import woonVormen from '../Woonvormen'
import pieChart from '../charts/PieChart'
import stackedBarChart from '../charts/StackedBarChart'

import inwoners from '../../../static/links/inwoners'
import huishoudens from '../../../static/links/huishoudens'
import aantalInwoners from '../../../static/links/aantal_inwoners'
import andereInwoners from '../../../static/links/andere_inwoners'
import migratieachtergrond from '../../../static/links/migratieachtergrond'
import migratieVerdeling from '../../../static/links/migratie_verdeling'
import huishoudsamenstelling from '../../../static/links/huishoudsamenstelling'

const kerncijfers = getKerncijfers(BEVOLKING)

export default {
  name: 'Bevolking',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'line-chart': lineChart,
    'woonvormen': woonVormen,
    'pie-chart': pieChart,
    'stacked-bar-chart': stackedBarChart
  },
  data () {
    return {
      inwoners,
      huishoudens,
      kerncijfers,
      aantalInwoners,
      andereInwoners,
      migratieachtergrond,
      migratieVerdeling,
      huishoudsamenstelling
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
