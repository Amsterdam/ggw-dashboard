<template>
  <div id="app" class="grid-container">
    <ams-header>Header</ams-header>

    <div class="sticky-top">
      <ggw-selector></ggw-selector>
    </div>

    <div class="grid-wrapper wrapper_12 contents-wrapper">
      <div class="grid-container container_12 main-view">
        <div class="grid-zone grid_12">
            <router-view></router-view>
        </div>
      </div>
    </div>

    <div class="contents-wrapper" v-if="gwb && meta && thema">
      <div class="grid-container container_12 breakout-container">
        <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_darkgrey">
          <meer-cijfers-en-informatie></meer-cijfers-en-informatie>
        </div>
      </div>
    </div>

    <loading-component></loading-component>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'
import meerCijfersEnInformatie from './components/MeerCijfersEnInformatie'
import loadingComponent from './components/LoadingComponent'

export default {
  name: 'App',
  components: {
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'meer-cijfers-en-informatie': meerCijfersEnInformatie,
    'loading-component': loadingComponent
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
