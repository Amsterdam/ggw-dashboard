<template>
  <div>
    <div v-if="gwb && meta && thema">
      <in-het-kort v-if="thema === IN_HET_KORT"></in-het-kort>
      <bevolking v-if="thema === BEVOLKING"></bevolking>
      <duurzaamheid-en-water v-if="thema === DUURZAAMHEID_EN_WATER"></duurzaamheid-en-water>
      <economie-en-cultuur v-if="thema === ECONOMIE_EN_CULTUUR"></economie-en-cultuur>
      <onderwijs-jeugd-en-diversiteit v-if="thema === ONDERWIJS_JEUGD_EN_DIVERSITEIT"></onderwijs-jeugd-en-diversiteit>
      <openbare-orde-en-veiligheid v-if="thema === OPENBARE_ORDE_EN_VEILIGHEID"></openbare-orde-en-veiligheid>
      <stedelijke-ontwikkeling-en-wonen v-if="thema === STEDELIJKE_ONTWIKKELING_EN_WONEN"></stedelijke-ontwikkeling-en-wonen>
      <verkeer-en-openbare-ruimte v-if="thema === VERKEER_EN_OPENBARE_RUIMTE"></verkeer-en-openbare-ruimte>
      <welzijn-zorg-en-sport v-if="thema === WELZIJN_ZORG_EN_SPORT"></welzijn-zorg-en-sport>
      <werk-inkomen-en-participatie v-if="thema === WERK_INKOMEN_EN_PARTICIPATIE"></werk-inkomen-en-participatie>
      <niet-in-mvp v-if="thema === NIET_IN_MVP"></niet-in-mvp>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {
  IN_HET_KORT,
  BEVOLKING,
  DUURZAAMHEID_EN_WATER,
  ECONOMIE_EN_CULTUUR,
  ONDERWIJS_JEUGD_EN_DIVERSITEIT,
  OPENBARE_ORDE_EN_VEILIGHEID,
  STEDELIJKE_ONTWIKKELING_EN_WONEN,
  VERKEER_EN_OPENBARE_RUIMTE,
  WELZIJN_ZORG_EN_SPORT,
  WERK_INKOMEN_EN_PARTICIPATIE,
  NIET_IN_MVP } from '../../services/thema'

import inHetKort from '../dashboards/InHetKort'
import bevolking from '../dashboards/Bevolking'
import duurzaamheidEnWater from '../dashboards/DuurzaamheidEnWater'
import economieEnCultuur from '../dashboards/EconomieEnCultuur'
import onderwijsJeugdEnDiversiteit from '../dashboards/OnderwijsJeugdEnDiversiteit'
import openbareOrdeEnVeiligheid from '../dashboards/OpenbareOrdeEnVeiligheid'
import stedelijkeOntwikkelingEnWonen from '../dashboards/StedelijkeOntwikkelingEnWonen'
import verkeerEnOpenbareRuimte from '../dashboards/VerkeerEnOpenbareRuimte'
import welzijnZorgEnSport from '../dashboards/WelzijnZorgEnSport'
import werkInkomenEnParticipatie from '../dashboards/WerkInkomenEnParticipatie'
import nietInMVP from '../dashboards/NietInMVP'

export default {
  name: 'GGWDashboard',
  components: {
    'in-het-kort': inHetKort,
    'bevolking': bevolking,
    'duurzaamheid-en-water': duurzaamheidEnWater,
    'economie-en-cultuur': economieEnCultuur,
    'onderwijs-jeugd-en-diversiteit': onderwijsJeugdEnDiversiteit,
    'openbare-orde-en-veiligheid': openbareOrdeEnVeiligheid,
    'stedelijke-ontwikkeling-en-wonen': stedelijkeOntwikkelingEnWonen,
    'verkeer-en-openbare-ruimte': verkeerEnOpenbareRuimte,
    'welzijn-zorg-en-sport': welzijnZorgEnSport,
    'werk-inkomen-en-participatie': werkInkomenEnParticipatie,
    'niet-in-mvp': nietInMVP
  },
  data () {
    return {
      IN_HET_KORT,
      BEVOLKING,
      DUURZAAMHEID_EN_WATER,
      ECONOMIE_EN_CULTUUR,
      ONDERWIJS_JEUGD_EN_DIVERSITEIT,
      OPENBARE_ORDE_EN_VEILIGHEID,
      STEDELIJKE_ONTWIKKELING_EN_WONEN,
      VERKEER_EN_OPENBARE_RUIMTE,
      WELZIJN_ZORG_EN_SPORT,
      WERK_INKOMEN_EN_PARTICIPATIE,
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
