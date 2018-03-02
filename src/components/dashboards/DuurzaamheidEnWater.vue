<template>
  <div>
    <div v-if="gwb && meta">
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

      <meer-cijfers-en-informatie></meer-cijfers-en-informatie>

    </div>

    <div v-else class="text-center">
      <h2>Gegevens laden...</h2>
      <img src="../../../static/icons/loading.gif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'

import positieOntwikkeling from '../../../static/links/positie_en_ontwikkeling'

import meerCijfersEnInformatie from '../MeerCijfersEnInformatie'

export default {
  name: 'DuurzaamheidEnWater',
  components: {
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied,
    'meer-cijfers-en-informatie': meerCijfersEnInformatie
  },
  data () {
    return {
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
  },
  watch: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
