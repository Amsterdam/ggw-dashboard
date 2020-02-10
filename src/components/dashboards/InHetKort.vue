<template>
  <div v-if="gwb && meta">
    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-lg-6">
              <pano></pano>
          </div>
          <div class="col-lg-6 content-centered">
              <in-aantallen></in-aantallen>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Samenstelling woningvoorraad en bevolking van {{gwb.naam}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-lg-6">
            <horizontal-bar-chart
              title="Woningvoorraad"
              icon="wonen_en_leefomgeving.png"
              :config="woningVoorraad"
            ></horizontal-bar-chart>
          </div>
          <div class="col-lg-6">
            <horizontal-bar-chart
              title="Sociaal-economisch"
              icon="werk_en_inkomen.png"
              :config="sociaalEconomisch"
            ></horizontal-bar-chart>
          </div>
          <div class="col-lg-6">
              <horizontal-bar-chart
                title="Leeftijd"
                icon="kind_icoon_met_bal.png"
                :config="leeftijd"
              ></horizontal-bar-chart>
          </div>
          <div class="col-lg-6">
              <horizontal-bar-chart
                title="Migratie-achtergrond"
                icon="locaties.png"
                :config="migratieAchtergrond"
              ></horizontal-bar-chart>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-12 card">
        <div class="row">
          <div class="col-12 grid-title">
            <h2>Ontwikkeling van {{gwb.naam}}</h2>
          </div>
        </div>
        <div class="row">
          <div class="col-12 content-centered">
            <data-table :config="positieOntwikkeling" :isCentered="true"></data-table>
          </div>
        </div>
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

export default {
  name: 'InHetKort',
  components: {
    'horizontal-bar-chart': horizontalBarChart,
    'in-aantallen': inAantallen,
    pano: pano,
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

<style lang="scss" scoped>
</style>
