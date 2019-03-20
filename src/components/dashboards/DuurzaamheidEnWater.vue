<template>
  <div>
    <div v-if="gwb && meta">
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
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <verschillen-gebied :config="kerncijfers"></verschillen-gebied>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { DUURZAAMHEID_EN_WATER, getKerncijfers } from '../../services/thema'

import dataTable from '../charts/DataTable'
import verschillenGebied from '../VerschillenGebied'

const kerncijfers = getKerncijfers(DUURZAAMHEID_EN_WATER)

export default {
  name: 'DuurzaamheidEnWater',
  components: {
    'data-table': dataTable,
    'verschillen-gebied': verschillenGebied
  },
  data () {
    return {
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
