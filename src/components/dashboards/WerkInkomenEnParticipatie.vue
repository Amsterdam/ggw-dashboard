<template>
    <div v-if="gwb && meta">
      <div class="row">
        <div class="col-12 card">
          <div class="row">
            <div class="col-12 grid-title">
              <h2>Bewoners en werk, inkomen en participatie</h2>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <horizontal-text title="Werk en inkomen" icon="werk_en_inkomen.png" :config="werkInkomen"></horizontal-text>
            </div>
            <div class="col-lg-6">
              <horizontal-text title="Participatie" icon="ondernemen.png" :config="participatie"></horizontal-text>
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
import { WERK_INKOMEN_EN_PARTICIPATIE, getKerncijfers } from '../../services/thema'

import horizontalText from '../charts/HorizontalText'
import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'
import verticalBarChart from '../charts/VerticalBarChart'
import colorLegend from '../ColorLegend'

import werkInkomen from '../../../static/links/werk_inkomen'
import participatie from '../../../static/links/participatie'

const kerncijfers = getKerncijfers(WERK_INKOMEN_EN_PARTICIPATIE)

export default {
  name: 'WerkInkomenEnParticipatie',
  components: {
    'horizontal-text': horizontalText,
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'vertical-bar-chart': verticalBarChart,
    'color-legend': colorLegend
  },
  data () {
    return {
      werkInkomen,
      participatie,
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
