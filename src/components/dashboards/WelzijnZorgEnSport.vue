<template>
    <div v-if="gwb && meta">
      <div class="row">
        <div class="col-12 card">
          <div class="row">
            <div class="col-12 grid-title">
              <h2>Bewoners over voorzieningenaanbod in de buurt en hun eigen sportdeelname</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <horizontal-text title="Welzijn en zorg" icon="Eva_oma_rollator.png" :config="welzijnZorg"></horizontal-text>
            </div>
            <div class="col-lg-6">
              <horizontal-text title="Sport" icon="Adam_sport_WT_voetbal.png" :config="sport"></horizontal-text>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 grid-title">
              <h2>Ontwikkeling van {{gwb.naam}}</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <data-table :config="kerncijfers"></data-table>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-12 grid-title">
              <h2>Verschillen binnen het gebied</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { WELZIJN_ZORG_EN_SPORT, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'
import colorLegend from '../ColorLegend'

import welzijnZorg from '../../../static/links/welzijn_zorg'
import sport from '../../../static/links/sport'

const kerncijfers = getKerncijfers(WELZIJN_ZORG_EN_SPORT)

export default {
  name: 'WelzijnZorgEnSport',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      welzijnZorg,
      sport,
      kerncijfers
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
