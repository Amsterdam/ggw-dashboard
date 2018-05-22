<template>
  <div v-if="gwb && meta">
    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Bevolkingssamenstelling</h2>
        </div>
        <div class="col-6">
          <horizontal-text title="Inwoners" icon="man.png" :config="inwoners"></horizontal-text>
        </div>
        <div class="col-6">
          <horizontal-text title="Huishoudens" icon="gezinnetje.png" :config="huishoudens"></horizontal-text>
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
            <h2>Aantal inwoners</h2>
        </div>
        <div class="col-8">
          <line-chart :config="aantalInwoners" colors="4"></line-chart>
        </div>
        <div class="col-4">
            <span><b>De aantallen zijn inclusief…</b></span>
            <woonvormen :config="andereInwoners"></woonvormen>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Migratieachtergrond</h2>
        </div>
        <div class="col-6">
          <line-chart :config="migratieachtergrond"></line-chart>
        </div>
        <div class="col-6">
          <pie-chart title="" :config="migratieVerdeling"></pie-chart>
        </div>
      </div>
    </div>
    <div class="zone-clear clear"></div>

    <div class="row">
      <div class="col-12 card">
        <div class="grid-title">
          <h2>Huishoudenssamenstelling</h2>
        </div>
        <div class="col-7">
          <stacked-bar-chart :config="huishoudsamenstelling" last="7"></stacked-bar-chart>
        </div>
      </div>
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
