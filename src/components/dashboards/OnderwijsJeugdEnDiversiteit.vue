<template>
  <div>
    <div v-if="gwb && meta">

      <div class="alert">
        <h2>Bewoners over veiligheid en overlast in hun eigen buurt</h2>
      </div>

      <div class="row">
        <div class="col-sm">
          <horizontal-text title="Onderwijs en jeugd" icon="Middelbare scholier jongen-01.png" :config="onderwijsJeugd"></horizontal-text>
        </div>
        <div class="col-sm">
          <horizontal-text title="Diversiteit" icon="GASD_Icoon_Bestuur en organisatie.png" :config="diversiteit"></horizontal-text>
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
import { ONDERWIJS_JEUGD_EN_DIVERSITEIT, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'

import onderwijsJeugd from '../../../static/links/onderwijs_jeugd'
import diversiteit from '../../../static/links/diversiteit'

const kerncijfers = getKerncijfers(ONDERWIJS_JEUGD_EN_DIVERSITEIT)

export default {
  name: 'OnderwijsJeugdEnDiversiteit',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart
  },
  data () {
    return {
      onderwijsJeugd,
      diversiteit,
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
