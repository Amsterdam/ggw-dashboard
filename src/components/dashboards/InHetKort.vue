<template>
  <div>
    <div v-if="gwb && meta">
      <div class="grid-element align-center">
        <div class="grid-blok grid_6">
            <pano></pano>
        </div>
        <div class="grid-blok grid_6">
            <in-aantallen></in-aantallen>
        </div>
      </div>

      <div class="grid-element">
        <color-legend></color-legend>
        <div class="grid-blok grid_12 card">
          <div class="grid-title">
            <h2>Samenstelling woningvoorraad en bevolking van {{gwb.naam}}</h2>
          </div>
          <div class="grid-blok grid_6">
            <horizontal-bar-chart
              title="Woningvoorraad"
              icon="wonen_en_leefomgeving.svg"
              :config="woningVoorraad"
            ></horizontal-bar-chart>
          </div>
          <div class="grid-blok grid_6">
            <horizontal-bar-chart
              title="Sociaal-economisch"
              icon="werk_en_inkomen.svg"
              :config="sociaalEconomisch"
            ></horizontal-bar-chart>
          </div>
          <div class="grid-blok grid_6">
              <horizontal-bar-chart
                title="Leeftijd"
                icon="kind_icoon_met_bal_60.png"
                :config="leeftijd"
              ></horizontal-bar-chart>
          </div>
          <div class="grid-blok grid_6">
              <horizontal-bar-chart
                title="Migratie-achtergrond"
                icon="locaties.svg"
                :config="migratieAchtergrond"
              ></horizontal-bar-chart>
          </div>
        </div>
      </div>

      <div class="grid-element">
        <div class="grid-blok grid_12">
          <div class="grid-title">
            <h2>Positie en ontwikkeling van {{gwb.naam}} t.o.v. het stedelijk gemiddelde</h2>
          </div>
        </div>
      </div>

      <div class="grid-blok grid_12 align-center">
        <data-table :config="positieOntwikkeling"></data-table>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import horizontalBarChart from '../charts/HorizontalBarChart'
import inAantallen from '../InAantallen'
import dataTable from '../charts/DataTable'
import pano from '../Pano'

import woningVoorraad from '../../../static/links/woningvoorraad'
import sociaalEconomisch from '../../../static/links/sociaaleconomisch'
import leeftijd from '../../../static/links/leeftijd'
import migratieAchtergrond from '../../../static/links/migratieachtergrond'
import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'
import colorLegend from '../ColorLegend'

export default {
  name: 'InHetKort',
  components: {
    'horizontal-bar-chart': horizontalBarChart,
    'in-aantallen': inAantallen,
    'pano': pano,
    'data-table': dataTable,
    'color-legend': colorLegend
  },
  data () {
    return {
      woningVoorraad,
      sociaalEconomisch,
      leeftijd,
      migratieAchtergrond,
      positieOntwikkeling
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta'
    ])
  },
  methods: {
    ...mapActions({
    })
  },
  watch: {
  }
}
</script>

<style lang="scss" scoped>
  @import "~stijl/src/styles/generic/ams-colorpalette.scss";

  .align-center {
    text-align: center;
  }

  .grid-blok.grid_6 {
    flex: auto;
  }
</style>
