<template>
  <div>
    <div v-if="gwb && meta && thema">
      <in-het-kort v-if="thema.id === IN_HET_KORT"></in-het-kort>
      <niet-in-mvp v-if="thema.id === NIET_IN_MVP"></niet-in-mvp>
    </div>

    <div v-else class="text-center">
      <h2>Gegevens laden...</h2>
      <img src="../../../static/icons/loading.gif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { IN_HET_KORT, NIET_IN_MVP } from '../../services/thema'
import inHetKort from '../dashboards/InHetKort'
import nietInMVP from '../dashboards/NietInMVP'

export default {
  name: 'GGWDashboard',
  components: {
    'in-het-kort': inHetKort,
    'niet-in-mvp': nietInMVP
  },
  data () {
    return {
      IN_HET_KORT,
      NIET_IN_MVP
    }
  },
  computed: {
    ...mapGetters([
      'gwb',
      'meta',
      'thema'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
