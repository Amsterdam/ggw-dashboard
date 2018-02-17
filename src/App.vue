<template>
  <div id="app" class="app container-fluid">
    <ams-header>Header</ams-header>
    <ggw-selector class="sticky-top"></ggw-selector>
    <router-view/>
  </div>
</template>

<script>
import amsHeader from './components/AMSHeader'
import ggwSelector from './components/GGWSelector'

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
  @import "../static/ams.scss";

  .app {
    margin-top: 5px;
  }
</style>
