<template>
  <div>
    <div v-if="gwb && meta">

      <div class="row">
        <div class="col-sm">
          <pano></pano>
        </div>
        <div class="col-sm">
          <in-aantallen></in-aantallen>
        </div>
      </div>

      <div class="alert">
        <h2>Samenstelling woningvoorraad en bevolking van {{gwb.naam}}</h2>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <horizontal-chart
            title="Woningvoorraad"
            icon="wonen_en_leefomgeving.svg"
            :config="woningVoorraad"
          ></horizontal-chart>
        </div>
        <div class="col-sm-6">
          <horizontal-chart
            title="Sociaal-economisch"
            icon="werk_en_inkomen.svg"
            :config="sociaalEconomisch"
          ></horizontal-chart>
        </div>
      </div>

      <div class="row">
        <div class="col-sm-6">
          <horizontal-chart
            title="Leeftijd"
            icon="kind_icoon_met_bal_60.png"
            :config="leeftijd"
          ></horizontal-chart>
        </div>
        <div class="col-sm-6">
          <horizontal-chart
            title="Migratie-achtergrond"
            icon="locaties.svg"
            :config="migratieAchtergrond"
          ></horizontal-chart>
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
    </div>

    <div v-else class="text-center">
      <h2>Gegevens laden...</h2>
      <img src="../../static/icons/loading.gif">
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import horizontalChart from './HorizontalChart'
import inAantallen from './InAantallen'
import dataTable from './DataTable'
import pano from './Pano'

import woningVoorraad from '../../static/links/woningvoorraad'
import sociaalEconomisch from '../../static/links/sociaaleconomisch'
import leeftijd from '../../static/links/leeftijd'
import migratieAchtergrond from '../../static/links/migratieachtergrond'
import positieOntwikkeling from '../../static/links/positie_en_ontwikkeling'

export default {
  name: 'InHetKort',
  components: {
    'horizontal-chart': horizontalChart,
    'in-aantallen': inAantallen,
    'pano': pano,
    'data-table': dataTable
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
