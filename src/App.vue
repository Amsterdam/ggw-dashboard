<template>
  <div id="app" class="grid-container">
    <ams-header>Header</ams-header>
    <div class="sticky-top">
      <ggw-selector></ggw-selector>
    </div>

    <div class="contents-wrapper">
      <div class="grid-container container_12 breakout-container">
        <div class="grid-zone grid_12 z-kolom1-4_1 breakout-zone hasbgcolor bgcolor_superlightgrey">
          <div class="grid-blok grid_6">
            <gwb-map></gwb-map>
          </div>
          <div class="grid-blok grid_6">
            <color-legend></color-legend>
          </div>
        </div>
      </div>
    </div>
    <div class="grid-wrapper wrapper_12 contents-wrapper">
      <div class="grid-container container_12 main-view">
        <div class="grid-zone grid_12">
            <router-view></router-view>
        </div>
      </div>
    </div>

    <loading-component></loading-component>
  </div>
</template>

<script>
import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'
import gwbMap from './components/GWBMap'
import loadingComponent from './components/LoadingComponent'
import colorLegend from './components/ColorLegend'

export default {
  name: 'App',
  components: {
    'color-legend': colorLegend,
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'gwb-map': gwbMap,
    'loading-component': loadingComponent
  }
}
</script>
