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

    <loading-component></loading-component>
  </div>
</template>

<script>
import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'
import loadingComponent from './components/LoadingComponent'

export default {
  name: 'App',
  components: {
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector,
    'loading-component': loadingComponent
  }
}
</script>
