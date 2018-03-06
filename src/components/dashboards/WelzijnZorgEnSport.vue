<template>
  <div>
    <div v-if="gwb && meta">

      <div class="alert">
        <h2>Bewoners over het voorzieningenaanbod in hun eigen buurt en hun eigen sportdeelname</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Welzijn en zorg" icon="Eva_oma_rollator.png" :config="welzijnZorg"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Sport" icon="Adam_sport_WT_voetbal.png" :config="sport"></horizontal-text>
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

      <verschillen-gebied :config="kerncijfers"></verschillen-gebied>

    </div>

    <div v-else class="text-center">
      <h2>Gegevens laden...</h2>
      <img src="../../../static/icons/loading.gif">
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

import welzijnZorg from '../../../static/links/welzijn_zorg'
import sport from '../../../static/links/sport'

const kerncijfers = getKerncijfers(WELZIJN_ZORG_EN_SPORT)

export default {
  name: 'WelzijnZorgEnSport',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart
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
