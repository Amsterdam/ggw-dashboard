<template>
  <div id="app" class="grid-container">
    <ams-header>Header</ams-header>
    <ggw-selector class="sticky-top"></ggw-selector>
    <router-view></router-view>
  </div>
</template>

<script>
import amsHeader from './components/layout/AMSHeader'
import ggwSelector from './components/layout/GGWSelector'

export default {
  name: 'App',
  components: {
    'ams-header': amsHeader,
    'ggw-selector': ggwSelector
  }
}
</script>

<!-- Global styling -->
<style lang="scss">

  .app {
    margin-top: 5px;
  }
</style>
