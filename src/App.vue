<template>
  <div id="app" class="grid-container">
    <ams-header>Header</ams-header>

    <div class="contents-wrapper sticky-top">
      <div class="grid-container container_12 breakout-container">
        <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_white">
          <ggw-selector ></ggw-selector>
        </div>
      </div>
    </div>

    <div class="contents-wrapper">
      <div class="grid-container container_12 breakout-container">
        <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_superlightgrey">
          <gwb-map></gwb-map>
          <color-legend></color-legend>
        </div>
      </div>
    </div>
    <div class="grid-wrapper wrapper_12 contents-wrapper">
      <div class="grid-container container_12">
        <div class="grid-zone grid_12">
            <router-view></router-view>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div class="page-overlay" v-if="HTTPStatus.pending > 0">
          <loading-component></loading-component>
      </div>
    </transition>
  </div>
</template>

<script>
import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'
import gwbMap from './components/GWBMap'
import colorLegend from './components/ColorLegend'
import { HTTPStatus } from './services/datareader'
import loadingComponent from './components/LoadingComponent'


export default {
  name: 'App',
  components: {
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'gwb-map': gwbMap,
    'color-legend': colorLegend,
    'loading-component': loadingComponent
  },
  data() {
    return {
      HTTPStatus
    }
  }
}
</script>

<!-- Global styling -->
<style lang="scss">

  .app {
    margin-top: 5px;
  }

  .sticky-top {
    .grid-zone.hasbgcolor{
      padding-top: 0;
      padding-bottom: 0;
    }
    .grid-wrapper {
      padding-bottom: 0;
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .4s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>
